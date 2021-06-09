import re
from django.contrib.postgres.search import SearchQuery, SearchVector, TrigramSimilarity
from django.db.models import Q, F, Prefetch, Count
import pandas as pd
from .models import *
from .text_postprocessing import TextPostprocessing
from .serializers import *
# Примеры запросов к полям jsonb
# Запрос слова из массива JSONB Ingredient.objects.filter(data__synonyms__eng__contains='dimethyl caproamide')
# Запрос слова из поля JSONB Ingredient.objects.filter(data__inchiKey='HNXNKTMIVROLTK-UHFFFAOYSA-N')
# Запрос к реляционным полям Ingredient.objects.filter(main_name='propylparaben')
# Запрос по триграммам(выдает кучу результатов без ранжирования) Ingredient.objects.filter(main_name__trigram_similar="paraben")
# Неточный поиск по триграммам с ранжированием результата
# Ingredient.objects.annotate(similarity=TrigramSimilarity('main_name', 'propyiparaben'),).filter(similarity__gt=0.01).order_by('-similarity')
# TODO написать совместные тесты модулей ocr, postprocessing, DBsearch
#  попробовать выгрузить дамп ключевых слов в текстовый файл и создать пользовательский словарь Tesseract
#  написать модуль оценки опасности

class TextBlock:
    '''Класс текстового блока'''
    def __init__(self, lang:str, text:str):
        self.lang = lang # язык текста
        self.text = text # ненормализованный текст
        self.e_numbers = []             # присутствующие в тексте Е номера
        self.colour_index = []          # присутствующие в текста номера Colour Index
        self.keywords = []              # Все ключевые слова, кроме номеров
        self.results = []               # объекты результатов поиска
        self.count = int                # количеств найденных базе ключевых слов


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
                text_block.e_numbers = enums
                string = re.sub(self._re_mask['eNumber'], '', string)

            # Ищем colour index номера и приводим их в порядок, если найдены, то удаляем их из основной строки
            ci_numbers = re.findall(self._re_mask['colourIndex'], string)
            if ci_numbers:
                ci_nums = ['CI ' + re.search(r'\d{5}', num).group() for num in ci_numbers]
                text_block.colour_index = ci_nums
                string = re.sub(self._re_mask['colourIndex'], '', string)

            # оставшиеся ключевые слова очищаем от лишних символов и пробелов разделяем по запятой
            cleared_string = TextPostprocessing().stringFilter(input_string=string)
            print(f'Cleared text {cleared_string}\n-----------------')
            keyword_list = cleared_string.split(',')
            keyword_list = [keyword for keyword in keyword_list if len(keyword) > 0]
            text_block.keywords = keyword_list
            self._text_blocks.append(text_block)

    # TODO доработать запросы по типу нескольких сит: все что не нашлось по
    #  точному совпадению нужно попробовать найти по триграммам
    def _requestDB(self, text_block:TextBlock):
        '''Обращаемся к базе и возвращаем найденное'''
        # составляем комбинированный SQL запрос
        # пока поддерживаются только точные совпадения на английском и без пробелов в начале и конце текста
        query = Q()
        if text_block.keywords:
            for word in text_block.keywords:
                query = query | Q(data__synonyms__eng__contains=[word])
        if text_block.e_numbers:
            for e in text_block.e_numbers:
                query = query | Q(data__eNumber__contains=e)
        if text_block.colour_index:
            for ci in text_block.colour_index:
                query = query | Q(data__colourIndex__contains=[ci])

        results = Ingredients.objects.filter(query).select_related('hazard').prefetch_related('hazard__hazard_ghs_set__ghs')
        text_block.results = results
        text_block.count = results.count()

    def getData(self):
        '''Перебираем текстовые блоки'''
        self._buildTextBlock()
        [self._requestDB(block) for block in self._text_blocks]
        ingredients_block = self._selectIngredientBlock()
        results_pk = ingredients_block.results.values_list('pk', flat=True)
        Ingredients.objects.filter(pk__in=results_pk).update(request_statistics=F('request_statistics') + 1)
        self.hazard_estimator(IngredientsSerializer(ingredients_block.results, many=True).data)
        return ingredients_block.results


    # TODO перебрать имеющиеся уведомления опасности.
    #  1) Посчитать количество уведомлений в рамках 1 класса и принять сумму за 100%.
    #  2) Вывести средневзвешенную сумму по 10 бальной шкале, по всем категориям класса.
    #  3) Если источник GHS - Harmonised c&l и количество уведомлений по классу равно 0, то его вес = 100%
    #  4)  Из Total notifications вычесть количество NA Not classified уведомлений, остаток считать за 100%
    #  5)

    def _selectIngredientBlock(self):
        '''Выбираем блок текста, по которому нашли больше всего совпадений в базе'''
        result_count = [block.count for block in self._text_blocks]
        max_matches_idx = result_count.index(max(result_count))
        return self._text_blocks[max_matches_idx]

    def hazard_estimator(self, results):
        haz_cls = [
            'REPRODUCTIVE_TOXICITY',        # токсичность для репродуктивной системы
            'CARCINOGENICITY',              # канцерогенность
            'ACUTE_TOXICITY',               # общая токсичность
            'SKIN_CORROSION_IRRITATION',    # раздражает глаза
            'RESPIRATORY_SKIN_SENSITISERS', # аллерген
            'ASPIRATION_TOXICITY',          # токсично при вдыхании
            'MUTAGENICITY',                 # мутаген
            'EYE_DAMAGE_IRRITATION',        # раздражает глаза
            'TARGET_ORGAN_TOXICITY'         # токсичность для органов
        ]
        for result in results:
            if result['hazard']:
                main_name = result['main_name']
                hazard_data = result['hazard']
                sourse = hazard_data['sourse']
                total_notifications = hazard_data['total_notifications']
                df = pd.DataFrame(hazard_data['hazard_ghs_set'])
                print(f'Ingredient: {main_name}\nTotal notifications: {total_notifications}\nSourse: {sourse}\n',df)
                for ghs in hazard_data['hazard_ghs_set']:
                    confirmed_status = ghs['confirmed_status']
                    hazard_class = ghs['hazard_class']
                    abbreviation = ghs['abbreviation']
                    category = ghs['hazard_category']
                    hazard_score = ghs['hazard_scale_score']
                    ghs_code = ghs['ghs_code']

