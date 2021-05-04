import psycopg2
from psycopg2.extras import DictCursor
import time

test_dict = {'synonyms': {
    'eng': ['glycolic acid', 'ethylhexyl stearate', 'cetearyl alcohol', 'polysorbate-60', 'peg-100 stearats',
            'ceteareth-26', 'sodium hydroxide', 'lactic acid', 'panthenol', 'dimethicone', 'glycerin',
            'citric acid', 'salicylic acid', 'xanthan gum', 'allantoin', 'phenoxyethanol', 'methylparaben',
            'ethylparaben', 'fropyiparaben', 'euphrasia officinalis', 'eyebright', 'extract', 'melissa officinalis',
            'balm mint', 'leaf extract', 'magnolia biondi', 'magnolia', 'budflower extract', 'lecithin',
            'parfum', 'fragrance', 'sodium magnesium silicate', 'benzyi alcohol', 'methylchloroisothiazolinone',
            'methyfisothiazolinone', 'papain', 'carbomer', '2-hexanediol', 'caprylyl glycol', 'algin',
            'butylphenyl methylpropional', 'hexyl cinnamal', 'linalool', 'aluminum chlorohydrate',
            'ppg-3 benzyl ether myristate', 'cetyl alcohol', 'glyceryl stearate', 'peg-75 stearate',
            'ceteth-20', 'steareth-20', 'ppg-15 stearyl ether', 'cyclopentasiloxane', 'dimethicone crosspolymer',
            'synthetic beeswax', 'dimethicone', 'behenyl alcohol', 'tapioca starch', 'polymethylsilsesquioxane',
            'stearyl dimethicone', 'octadecene', 'polyacrylate crosspolymer-6', 'parfum', 'fragrance',
            'phenoxyethanol', 'methylparaben', 'ethylparaben', 'propylparaben', 'isopropyl myristate',
            'triticum vulgare', 'wheat', 'germ oil', 'tocopheryl acetate', 'bht', 'penthylene glycol',
            'peg-40 hydrogenated castor oil', 'trideceth', '9', 'bisabolol', 'paraffinum liquidum',
            'mineral oi', 'cetearyl alcohol', 'ceteareth-20', 'ethylhexyl isononanoate', 'glycerin',
            'helianthus', 'aton acoreimeinton vf conn', 'bop ml', 'ammonium rate', '0 istate',
            'trificum vuigare', 'wheat', 'germ oil', 'tocopheryl acetate', 'bht', 'parfum', 'fragrance',
            'fucus vesiculosus extract', 'methylparaben', 'foeniculum vulgare', 'fennel',
            'citrus medica limonum', 'lemon', 'peel oil', 'propylparaben', 'capsicum annuum',
            'biract', 'mentha piperita', 'peppermint', 'oil', 'abies sibirica',
            'citrus i mirantium bergamia', 'bergamot', 'oil', 'citrus paradisi', 'grapefruit', 'fruit extract',
            'pu camellia sinensis leaf edract', '2-bromo-2-nitropropane-1', '3-diol', 'sodium', 'idroxide',
            'citronellol', 'geraniol', 'hexyl cinnamal', 'limonene', 'linalool']},
             'colourIndex': ["CI 10385", "CI 75530", "CI 75530", "CI 75470", "CI 75135", "CI 77266", "CI 77265",
                             "CI 40825"],
             'eNumber': ["E330", "E620", "E262", "E320", "E343", "E403", "E920", "E640", "E316", "E622", "E627",
                         "E920"]}


# TODO попробовать сделать триграмный индекс для jsonb
#  0 на вход подавать массивы Е номеров, CI номеров, остальной текст не обрезать, а только почистить от спецсимволов
#  1 пробовать найти из строки подстроки(работает)
#  2 найденные имена собрать в выражение regex (word1|word2|word3) и вырезать из текста
#  3 не найденные имена искать дальше

class Databace_API:
    def __init__(self):
        self.connect = self._connect_db()
        self.cursor = self.connect.cursor(cursor_factory=DictCursor)

    def _connect_db(self):
        con = psycopg2.connect(
            database="ingredients_db",
            user="database_api",
            password="90053366MOON",
            host="127.0.0.1",
            port="5432"
        )
        return con

    def words_unpack(self, data:dict):
        '''Принимаем словарь с данными'''
        start = time.time()
        results = []
        if data.get('synonyms'):
            langs = list(data['synonyms'].keys())
            for lang in langs:
                for item in data['synonyms'][lang]:
                    result = self.get_data(keyword=item, jsonb_path=f'synonyms,{lang}')
                    if result != None: results.append(result)
        if data.get('colourIndex'):
            for item in data['colourIndex']:
                result = self.get_data(keyword=item, jsonb_path=f'colourIndex')
                if result != None: results.append(result)
        if data.get('eNumber'):
            for item in data['eNumber']:
                result = self.get_data(keyword=item, jsonb_path='eNumber')
                if result != None: results.append(result)
        end = time.time()
        print('Time {:.4f}'.format(end - start))

        self.connect.close()

    def get_data(self, keyword:str, jsonb_path:str):
                        # 500-2000мс 57% найдено без индекса, 24мс c индексом
                        # 'relation_search': f"""SELECT (main_name, id, safety_id) from ingredients where main_name='{keyword}'""",
                        # 3170мс 61% найдено без индекса, 100мс с индексом
        sql_strings = {'jsonb_search':f"SELECT (main_name, id, safety_id) from ingredients where data#>'{'{'}{jsonb_path}{'}'}' ?| array['{keyword}']",
                       # 45000мс 66% найдено, с индексом trigram_gist 2300мс и 100% найдено
                       'relation_trigram_search':f"""SELECT (id, main_name, safety_id), main_name <-> '{keyword}' AS dist FROM ingredients ORDER BY dist LIMIT 1;"""
                       }
        # запрос умеет искать части большой строки(подстроки) в реляционных полях:
        #  SELECT (id, main_name) FROM ingredients WHERE 'propylparaben, ethylparaben' LIKE '%' || main_name || '%';
        # запрос умеет искать по базе частичные названия по конкретному фрагменту названия в полях jsonb
        # select id,main_name from ingredients where exists(select * from jsonb_array_elements(data#>'{synonyms,eng}') where value::text like '%ylparaben%');



        print('-' * 20)
        for key in list(sql_strings.keys()):
            print(sql_strings[key])
            print(f'search type "{key}"')

            self.cursor.execute(sql_strings[key])
            result = self.cursor.fetchall()
            if len(result) > 0:
                print(result)
                return result
            else: print(result)


#print(request(keyword="propylparaben", jsonb_path='synonyms,eng'))

test = Databace_API()
test.words_unpack(data=test_dict)
"""
веществ у которых есть safety_id 8401шт
веществ у которых есть CID 7300шт
веществ у которых есть CID и safety_id 5776
есть 350 веществ с дублирующимися safety_id
Проверка статистики использования индексов SELECT * FROM pg_stat_user_indexes WHERE relname = 'ingredients';
Индекс для массива jsonb: CREATE INDEX eng_synonyms_data_gin_idx ON ingredients USING gin ((data#>'{synonyms,eng}'));
Индексы триграмм: 
(не работает) CREATE INDEX trgm_main_name_idx ON ingredients USING GIN (main_name gin_trgm_ops);
(работает) CREATE INDEX trgm_main_name_gist_idx ON ingredients USING GIST (main_name gist_trgm_ops);
Запрос по триграммам с выдачей всех совпадений их рейтингов: 
SELECT main_name, similarity(main_name, 'propylparaben') AS sml FROM ingredients WHERE main_name % 'propylparaben' ORDER BY sml DESC, main_name;
Запрос по триграммам с ограничением по выдаче самого вероятного совпадения:
SELECT main_name, main_name <-> 'propylene glycol' AS dist FROM ingredients ORDER BY dist LIMIT 1;
Неточный поиск через триграммы:
SELECT * FROM ingredients WHERE SIMILARITY(main_name,'ceramide-3') > 0.9;
поиск дублей: SELECT safety_id, count(*) FROM ingredients GROUP BY safety_id HAVING count(*) > 1;
select * from ingredients where data @@ '$.eNumber == "E536"';
UPDATE ingredients SET safety_id=250137 where id=31843;
left join колонок safety и ingredients
выбрать только те данные, у которых в поле jsonb содержится определенный ключ:
SELECT data FROM ingredients WHERE data->>'eNumber' IS NOT NULL;
SELECT safety_id, data, nfpa_osha_class, ghs_class FROM ingredients LEFT JOIN safety ON safety.id = ingredients.safety_id where cas_number='432-25-7';
Подсчет ненулевых значений по столбцу:
select count(*) from ingredients where "safety_id" is NOT NULL;
запрос с игнорированием раскладки
select * from names where lower(name)=lower('VaSya');
print(f'Data {rows}, \nTime {time.time()-start}')
поиск элемента в объекте с массивом:
select * from ingredients where data->'casNumbers' @> '["977157-28-0"]'::jsonb;
поиск элемента во вложенных объектах с массивом:
select * from ingredients where data->'synonyms'->'eng' @> '["Citrus Red 2, analytical standard"]'::jsonb;
поиск элемента в значениях ключа объекта:
select * from ingredients where data @@ '$.inchiKey == "GJUABKCEXOMRPQ-UHFFFAOYSA-N"';
"""