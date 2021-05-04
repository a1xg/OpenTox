from django.contrib.postgres.search import SearchQuery, SearchVector, TrigramSimilarity
from .models import Safety, Ingredients
from django.db.models import Q
import re
# Примеры запросов к полям jsonb
# Запрос слова из массива JSONB Ingredients.objects.filter(data__synonyms__eng__contains='dimethyl caproamide')
# Запрос слова из поля JSONB Ingredients.objects.filter(data__inchiKey='HNXNKTMIVROLTK-UHFFFAOYSA-N')
# Запрос из реляционного поля Ingredients.objects.filter(main_name='propylparaben')
# Запрос по триграммам(выдает кучу результатов без ранжирования) Ingredients.objects.filter(main_name__trigram_similar="paraben")
# Неточный поиск по триграммам с ранжированием результата
# Ingredients.objects.annotate(similarity=TrigramSimilarity('main_name', 'propyiparaben'),).filter(similarity__gt=0.01).order_by('-similarity')
#
# TODO написать эффективные запросы в базу, для начала слова после split объединить в 1
#  запрос SQL избавившись от цикла нескольких SQL запросов
#  прикрутить препроцессинг текста и разделение на слова, Е номера и CI номера
#  написать класс TextBlock который описывает отдельный текстовый блок из приходящего словаря строк
#  написать класс создания, обработки и ранжирования, текстовых блоков


class TextBlock:
    '''Класс текстового блока'''
    e_numbers = []
    colour_index = []
    keywords = []
    results = []
    def __init__(self, lang:str, text:str):
        self.lang = lang # язык текста
        self.text = text # не нормализованный текст


class TextBlocksProcessing:
    _text_blocks = []
    _re_mask = {
        'colourIndex': r'([Cc]\.?[Iil1]\.?\s?\d{5})',
        'casNumbers': r'(\d{2,6}-\d{2}-\d{1})',
        'ecNumbers': r'(\d{3}-\d{3}-\d{1})',
        'eNumber': r'([£FEe]\d{3}[\d\w]|E\d{3})',
        'GHS_codes': r'H\d{3}',
        'inchiKey': r'[A-Z]{14}-[A-Z]{10}-[A-Z]'
    }
    def __init__(self, data:dict):
        self.data = data

    def _buildTextBlock(self):
        '''Принимаем словарь и формируем объекты текстовых блоков.
        В качестве ключей словаря указаны коды языка в формате alpha3.
        В качестве значений ненормализованная строка ключевых слов'''
        keys = list(self.data.keys())
        for key in keys:
            string = self.data.get(key)

            block = TextBlock(text=string, lang=key)

            # Ищем E номера и приводим их в порядок, если найдены, то удаляем их из остальной строки
            e_numbers = re.findall(self._re_mask['eNumber'], string)
            if e_numbers:
                block.e_numbers = ['E' + re.search(r'(\d{3}[\d\w]|\d{3})', num).group() for num in e_numbers]
                string = re.sub(self._re_mask['eNumber'], '', string)

            # Ищем colour index номера и приводим их в порядок, если найдены, то удаляем их из основной строки
            ci_numbers = re.findall(self._re_mask['colourIndex'], string)
            if ci_numbers:
                block.colour_index = ['CI ' + re.search(r'\d{5}', num).group() for num in ci_numbers]
                string = re.sub(self._re_mask['colourIndex'], '', string)

            # TODO нужна обработка текста перед сплитом
            string = re.sub(r'\'', '', string)
            block.keywords = string.lower().split(',')
            block.keywords = [keyword for keyword in block.keywords if len(keyword) > 0]

            self._text_blocks.append(block)

    # TODO доработать запросы по типу нескольких сит, все что не нашлось по
    #  точному совпадению нужно попробовать найти по триграммам
    # FIXME при повторном запросе с сайта - предыдущие query запросы прибавляются к текущему
    def _requestDB(self, block):
        '''Обращаемся к базе и возвращаем найденное'''
        # составляем комбинированный SQL запрос
        # пока поддерживаются только точные совпадения на английском и без пробелов в начале и конце текста
        query = Q(data__synonyms__eng__contains=[''])
        if block.keywords:
            for word in block.keywords:
                query |= Q(data__synonyms__eng__contains=[word])
        if block.e_numbers:
            for e in block.e_numbers:
                query |= Q(data__eNumber__contains=e)
        if block.colour_index:
            for ci in block.colour_index:
                query |= Q(data__colourIndex__contains=[ci])
        print(f'Query {query}')
        results = Ingredients.objects.filter(query)

        return results

    def getData(self):
        '''Перебираем текстовые блоки'''
        self._buildTextBlock()

        for block in self._text_blocks:
            print(f'Blocks keywords {block.keywords}')
            block.results = self._requestDB(block)

        for b in self._text_blocks:
            print(f'Results {b.results}')
            results = self._text_blocks[0].results
            self._text_blocks.clear()
        return results

    def _selectIngredientsBlock(self):
        '''Выбираем блок текста, по которому нашли больше всего совпадений в базе'''
        for block in self._text_blocks:
            # вернуть результаты из блока с наибольшими совпадениями
            pass


