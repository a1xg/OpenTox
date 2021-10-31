import re
from .regex_patterns import RE_MASKS
from .text_postprocessing import TextPostprocessing
from .db_tools import DBQueries
import time

# The module analyzes the text blocks detected in the image from which
# the text was recognized. The module searches for the block that contains
# the list of ingredients by sending a query to the database.
# The block with the largest number of matches found in the database
# is the product composition.

class TextBlock:
    '''Text block class'''
    def __init__(self, lang:str, text:str):
        self.lang = lang          # language of text
        self.text = text          # unnormalized text
        self.e_numbers = []       # present in the text E*** numbers
        self.colour_index = []    # present of text Colour Index(CI) numbers
        self.keywords = []        # all keywords except numbers
        self.results = []         # objects of search results
        self.count = int          # the number of keywords found in the database
        self.index = None          # the index of the textbox returned from the OCR

class IngredientsBlockFinder:
    def __init__(self, data: list):
        self.data = data
        self._text_blocks = self._build_text_block()
        self.box_index = None

    def _build_text_block(self) -> list:
        '''We accept dictionaries and form objects of text blocks.
         Language codes in alpha3 format are specified as dictionary keys.
         The values are an unnormalized string of keywords.'''
        text_blocks = []
        for dict in self.data:
            string = dict.get('text')
            lang = dict.get('lang')
            box_index = dict.get('box_index')

            text_block = TextBlock(text=string, lang=lang)
            #if 'box_index' in
            # We look for E numbers and put them in order, if found, then remove them from the rest of the line.
            e_numbers = re.findall(RE_MASKS['eNumber'], string)
            if e_numbers:
                enums = ['E' + re.search(r'(\d{3}[\d\w]|\d{3})', num).group() for num in e_numbers]
                text_block.e_numbers = enums
                string = re.sub(RE_MASKS['eNumber'], '', string)

            # We look for color index numbers and put them in order, if found, then remove them from the main line
            ci_numbers = re.findall(RE_MASKS['colourIndex'], string)
            if ci_numbers:
                ci_nums = ['CI ' + re.search(r'\d{5}', num).group() for num in ci_numbers]
                text_block.colour_index = ci_nums
                string = re.sub(RE_MASKS['colourIndex'], '', string)

            # the remaining keywords are cleared of extra characters and spaces, separated by comma
            cleared_string = TextPostprocessing().string_filter(input_string=string)
            keyword_list = cleared_string.split(', ')
            keyword_list = [keyword for keyword in keyword_list if len(keyword) > 0]
            text_block.keywords = keyword_list
            if box_index != None:
                text_block.index = box_index
            text_blocks.append(text_block)

        return text_blocks

    def get_data(self) -> None:
        '''Looping through text blocks'''
        for text_block in self._text_blocks:
            results = DBQueries().search_in_db(text_block=text_block, update_statistics=True)
            text_block.results = results
            text_block.count = results.count()
        ingredients_block = self._select_ingredient_block()

        self.box_index = ingredients_block.index

        return ingredients_block.results

    def _select_ingredient_block(self) -> TextBlock:
        '''Select the block of text for which the most matches were found in the database'''
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