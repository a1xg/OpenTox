import re

class TextPostprocessing:
    def __init__(self, input_string):
        self._input_string = input_string
        self._output_string = str

    def stringFilter(self):
        '''Cleaning text'''
        # удаляем перенос слова с переносом строки
        string = re.sub(r'-\n', '', self._input_string)
        # Фильтр заменяет перенос строки на пробел
        string = re.sub(r'\n', ' ', string)
        #  Фильтр заменяет скобки на запятые
        string = re.sub(r'[\{\[\(\)\]\}\|]', ',', string)
        # Фильтр заменяет спецсимволы на запятые
        string = re.sub(r'[*«»+=~<>:;.&]', ',', string)
        # Фильтр процентных значений
        string = re.sub(r'\d*\.?,?\s?\d?\s?%', ',', string)
        # Фильтр вырезает escape-символы и перенос слова с переносом строки,
        string = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\xff]', ',', string)
        # Фильтр заменяет идущие подряд запятые с пробелами, если их больше одной
        string = re.sub(r'(,\s+|,+){2,}', ',', string)
        # Вырезаем кавычки
        string = re.sub(r'[\'\"]', '', string)
        # убираем сочетание пробелов и запятой
        string = re.sub(r'(\s+,|,\s+)', ',', string)
        # ЗАменяем множественные пробелы на один пробел
        self._output_string = re.sub(r'\s+', ' ', string)

        return  self._output_string.lower()