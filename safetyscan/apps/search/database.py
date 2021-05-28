from django.contrib.postgres.search import SearchQuery, SearchVector, TrigramSimilarity
from .models import Safety, Ingredient
from django.db.models import Q, F
from .text_postprocessing import TextPostprocessing
import re
# Примеры запросов к полям jsonb
# Запрос слова из массива JSONB Ingredient.objects.filter(data__synonyms__eng__contains='dimethyl caproamide')
# Запрос слова из поля JSONB Ingredient.objects.filter(data__inchiKey='HNXNKTMIVROLTK-UHFFFAOYSA-N')
# Запрос к реляционным полям Ingredient.objects.filter(main_name='propylparaben')
# Запрос по триграммам(выдает кучу результатов без ранжирования) Ingredient.objects.filter(main_name__trigram_similar="paraben")
# Неточный поиск по триграммам с ранжированием результата
# Ingredient.objects.annotate(similarity=TrigramSimilarity('main_name', 'propyiparaben'),).filter(similarity__gt=0.01).order_by('-similarity')
#

class TextBlock:
    '''Класс текстового блока'''
    def __init__(self, lang:str, text:str):
        self.lang = lang # язык текста
        self.text = text # ненормализованный текст
        self._data = {
            'e_numbers':        [],     # присутствующие в тексте Е номера
            'colour_index':     [],     # присутствующие в текста номера Colour Index
            'keywords':         [],     # Все ключевые слова, кроме номеров
            'results':          [],     # объекты результатов поиска
            'matches_number':   int     # количеств найденных базе ключевых слов
        }

    def getItem(self, key:str):
        return self._data[key]

    def writeItem(self, key:str, data:str):
        self._data[key] = data


class DBSearch:
    _re_mask = {
        'colourIndex': r'([Cc]\.?[Iil1]\.?\s?\d{5})',
        'casNumbers': r'(\d{2,6}-\d{2}-\d{1})',
        'ecNumbers': r'(\d{3}-\d{3}-\d{1})',
        'eNumber': r'([£FEe]\-?\d{3}[\d\w]|[£FEe]\-?\d{3})',
        'GHS_codes': r'H\d{3}',
        'inchiKey': r'[A-Z]{14}-[A-Z]{10}-[A-Z]'
    }

    def __init__(self, data:list):
        self.data = data
        self._text_blocks = []

    def _buildTextBlock(self) -> TextBlock:
        '''Принимаем словари и формируем объекты текстовых блоков.
        В качестве ключей словаря указаны коды языка в формате alpha3.
        В качестве значений ненормализованная строка ключевых слов'''
        for dict in self.data:
            key = list(dict.keys())[0]
            string = dict.get(key)
            text_block = TextBlock(text=string, lang=key)
            # Ищем E номера и приводим их в порядок, если найдены, то удаляем их из остальной строки
            e_numbers = re.findall(self._re_mask['eNumber'], string)
            if e_numbers:
                enums = ['E' + re.search(r'(\d{3}[\d\w]|\d{3})', num).group() for num in e_numbers]
                text_block.writeItem(key='e_numbers', data=enums)
                string = re.sub(self._re_mask['eNumber'], '', string)

            # Ищем colour index номера и приводим их в порядок, если найдены, то удаляем их из основной строки
            ci_numbers = re.findall(self._re_mask['colourIndex'], string)
            if ci_numbers:
                ci_nums = ['CI ' + re.search(r'\d{5}', num).group() for num in ci_numbers]
                text_block.writeItem(key='colour_index', data=ci_nums)
                string = re.sub(self._re_mask['colourIndex'], '', string)

            # оставшиеся ключевые слова очищаем от лишних символов и пробелов разделяем по запятой
            cleared_string = TextPostprocessing().stringFilter(input_string=string)
            keyword_list = cleared_string.split(',')
            keyword_list = [keyword for keyword in keyword_list if len(keyword) > 0]
            text_block.writeItem(key='keywords', data=keyword_list)
            self._text_blocks.append(text_block)

    # TODO доработать запросы по типу нескольких сит: все что не нашлось по
    #  точному совпадению нужно попробовать найти по триграммам
    def _requestDB(self, text_block:TextBlock):
        '''Обращаемся к базе и возвращаем найденное'''
        # составляем комбинированный SQL запрос
        # пока поддерживаются только точные совпадения на английском и без пробелов в начале и конце текста
        query = Q()
        if text_block.getItem('keywords'):
            for word in text_block.getItem('keywords'):
                query = query | Q(data__synonyms__eng__contains=[word])
        if text_block.getItem('e_numbers'):
            for e in text_block.getItem('e_numbers'):
                query = query | Q(data__eNumber__contains=e)
        if text_block.getItem('colour_index'):
            for ci in text_block.getItem('colour_index'):
                query = query | Q(data__colourIndex__contains=[ci])

        results = Ingredient.objects.select_related('safety').filter(query)

        text_block.writeItem(key='results', data=results)
        text_block.writeItem(key='matches_number', data=len(results))

    def getData(self):
        '''Перебираем текстовые блоки'''
        self._buildTextBlock()
        [self._requestDB(block) for block in self._text_blocks]
        ingredients_block = self._selectIngredientBlock()
        results = ingredients_block.getItem('results')
        results.update(request_statistics=F('request_statistics') + 1) # update view counter to all ingredients
        return results

    def _selectIngredientBlock(self):
        '''Выбираем блок текста, по которому нашли больше всего совпадений в базе'''
        result_count = [block.getItem('matches_number') for block in self._text_blocks]
        max_matches_idx = result_count.index(max(result_count))
        return self._text_blocks[max_matches_idx]

