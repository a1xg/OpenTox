import psycopg2
import re
from psycopg2.extras import DictCursor
import time

# TODO попробовать сделать триграмный индекс для jsonb
#  2 найденные имена собрать в выражение regex (word1|word2|word3) и вырезать из текста
#  3 не найденные имена искать дальше
#  4 каким то образом сделать триграмные индексы для jsonb


class Database_API:
    def __init__(self):
        self._connect = self.connectDB()
        self._cursor = self._connect.cursor(cursor_factory=DictCursor)
        self._re_mask = {
            'colourIndex':r'([Cc]\.?[Iil1]\.?\s?\d{5})',
            'casNumbers':r'(\d{2,6}-\d{2}-\d{1})',
            'ecNumbers':r'(\d{3}-\d{3}-\d{1})',
            'eNumber':r'([£FEe]\d{3}[\d\w]|E\d{3})',
            'GHS_codes':r'H\d{3}',
            'inchiKey':r'[A-Z]{14}-[A-Z]{10}-[A-Z]'
            }
        self._e_numbers = []
        self._ci_numbers = []
        self.lang = str
        self._unnormalized_text = str
        self.results = []
        self._select_fields = 'main_name, id'

    def connectDB(self):
        con = psycopg2.connect(
            database="ingredients_db",
            user="postgres",
            password="90053366MOON",
            host="127.0.0.1",
            port="5432"
        )
        return con

    def unpackKeywords(self, data:dict):
        '''Принимаем словарь с данными и распределяем данные '''
        self.lang = list(data.keys())[0]
        string = data[self.lang]
        # Находим и приводим в порядок E номера
        self._e_numbers = re.findall(self._re_mask['eNumber'], string)
        self._e_numbers = ['E' + re.search(r'(\d{3}[\d\w]|\d{3})', num).group() for num in self._e_numbers]
        # Находим и приводим в порядок colour index номера
        self._ci_numbers = re.findall(self._re_mask['colourIndex'], string)
        self._ci_numbers = ['CI ' + re.search(r'\d{5}', num).group() for num in self._ci_numbers]
        # удаляем найденные подстроки из основного текста
        self._unnormalized_text = re.sub(self._re_mask['colourIndex'],'',string)
        self._unnormalized_text = re.sub(self._re_mask['eNumber'],'', string).lower()

    def getData(self):

        start = time.time()
        if len(self._unnormalized_text) > 0:
            result = self.requestSQL(text=self._unnormalized_text, field=f'main_name', type='text_block')

        if len(self._ci_numbers) > 0: 
            for item in self._ci_numbers:
                result = self.requestSQL(text=item, field=f'colourIndex', type='word')

        if len(self._e_numbers) > 0:
            for item in self._e_numbers:
                result = self.requestSQL(text=item, field='eNumber', type='word')

        #result = self.requestSQL(text=item, field=f'synonyms,{self.lang}', search_type='word')
        #if result != None: self.results.append(result)
        end = time.time()
        print('Time {:.4f}'.format(end - start))
        self._connect.close()

    def requestSQL(self, text:str, field:str, type:str):
        # 500-2000мс 57% найдено без индекса, 24мс c индексом
        relation_search = f"""SELECT {self._select_fields} from ingredients where {field}='{text}'"""
        # 3170мс 61% найдено без индекса, 100мс с индексом
        substring_search = f"SELECT {self._select_fields} FROM ingredients WHERE '{text}' LIKE '%' || {field} || '%';"

        jsonb_search = f"SELECT {self._select_fields} from ingredients where data#>'{'{'}{field}{'}'}' ?| array['{text}']"
        # 45000мс 66% найдено, с индексом trigram_gist 2300мс и 100% найдено
        relation_trigram_search = f"""SELECT {self._select_fields}, main_name <-> '{text}' AS dist FROM ingredients ORDER BY dist LIMIT 1;"""

        if type == 'word':
            self._cursor.execute(jsonb_search)
            result = self._cursor.fetchall()
            if len(result) > 0:
                self.results.extend(result)
            else:
                self._cursor.execute(relation_trigram_search)
                result = self._cursor.fetchall()
                if len(result) > 0:
                    self.results.extend(result)
        if type == 'text_block':
            self._cursor.execute(substring_search)
            result = self._cursor.fetchall()
            if len(result) > 0:
                self.results.extend(result)
                regex_pattern = 'r(' + '|'.join([item[0] for item in result]) + ')'
                # TODO вырезать найденные названия из self._unnormalized_text
                #  так же такой метод поиска находит одно слово по несколько раз, типа sodium laureth sulphate находится как
                #  sodium laureth sulphate и sodium
