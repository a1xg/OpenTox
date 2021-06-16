import re
from .regex_patterns import RE_MASKS
from .text_postprocessing import TextPostprocessing
from .db_tools import DBTools

# TODO написать совместные тесты модулей ocr, postprocessing, DBTools
#  попробовать выгрузить дамп ключевых слов в текстовый файл и создать пользовательский словарь Tesseract

class TextBlock:
    '''Класс текстового блока'''
    def __init__(self, lang:str, text:str):
        self.lang = lang          # язык текста
        self.text = text          # ненормализованный текст
        self.e_numbers = []       # присутствующие в тексте Е номера
        self.colour_index = []    # присутствующие в текста номера Colour Index
        self.keywords = []        # Все ключевые слова, кроме номеров
        self.results = []         # объекты результатов поиска
        self.count = int          # количеств найденных базе ключевых слов

class IngredientBlockFinder:
    def __init__(self, data: list):
        self.data = data
        self._text_blocks = self._buildTextBlock()

    def _buildTextBlock(self) -> list:
        '''Принимаем словари и формируем объекты текстовых блоков.
        В качестве ключей словаря указаны коды языка в формате alpha3.
        В качестве значений ненормализованная строка ключевых слов'''
        text_blocks = []
        for dict in self.data:
            key = list(dict.keys())[0]
            string = dict.get(key)
            text_block = TextBlock(text=string, lang=key)
            # Ищем E номера и приводим их в порядок, если найдены, то удаляем их из остальной строки
            e_numbers = re.findall(RE_MASKS['eNumber'], string)
            if e_numbers:
                enums = ['E' + re.search(r'(\d{3}[\d\w]|\d{3})', num).group() for num in e_numbers]
                text_block.e_numbers = enums
                string = re.sub(RE_MASKS['eNumber'], '', string)

            # Ищем colour index номера и приводим их в порядок, если найдены, то удаляем их из основной строки
            ci_numbers = re.findall(RE_MASKS['colourIndex'], string)
            if ci_numbers:
                ci_nums = ['CI ' + re.search(r'\d{5}', num).group() for num in ci_numbers]
                text_block.colour_index = ci_nums
                string = re.sub(RE_MASKS['colourIndex'], '', string)

            # оставшиеся ключевые слова очищаем от лишних символов и пробелов разделяем по запятой
            cleared_string = TextPostprocessing().string_filter(input_string=string)
            print(f'Cleared text {cleared_string}\n-----------------')
            keyword_list = cleared_string.split(',')
            keyword_list = [keyword for keyword in keyword_list if len(keyword) > 0]
            text_block.keywords = keyword_list
            text_blocks.append(text_block)

        return text_blocks

    def getData(self) -> list:
        '''Перебираем текстовые блоки'''
        for text_block in self._text_blocks:
            query = DBTools(text_block=1).get_query(text_block=text_block)
            results = DBTools().get_queryset(query=query, update_statistics=True)
            text_block.results = results
            text_block.count = results.count()

        ingredients_block = self._selectIngredientBlock()
        return ingredients_block.results

    def _selectIngredientBlock(self) -> TextBlock:
        '''Выбираем блок текста, по которому нашли больше всего совпадений в базе'''
        result_count = [block.count for block in self._text_blocks]
        max_matches_idx = result_count.index(max(result_count))
        return self._text_blocks[max_matches_idx]

'''
Примеры запросов к полям jsonb
Запрос слова из массива JSONB Ingredient.objects.filter(data__synonyms__eng__contains='dimethyl caproamide')
Запрос слова из поля JSONB Ingredient.objects.filter(data__inchiKey='HNXNKTMIVROLTK-UHFFFAOYSA-N')
Запрос к реляционным полям Ingredient.objects.filter(main_name='propylparaben')
Запрос по триграммам(выдает кучу результатов без ранжирования) Ingredient.objects.filter(main_name__trigram_similar="paraben")
Неточный поиск по триграммам с ранжированием результата
Ingredient.objects.annotate(similarity=TrigramSimilarity('main_name', 'propyiparaben'),).filter(similarity__gt=0.01).order_by('-similarity')
'''