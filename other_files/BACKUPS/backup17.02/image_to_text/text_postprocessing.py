import re
from image_to_text.keywords_db import KeyWords

# TODO сделать фильтры паттернов на regex
#  проверка регулярных выражений на сайте https://regex101.com/

class TextPostprocessing:
    def __init__(self, lang):
        self.lang = lang
        self.keywords = KeyWords(lang)
        self.start_keywords_mask = r'(' + '|'.join(self.keywords.start) + r')' if len(self.keywords.start) > 1 else r'(' + self.keywords.start[0] + r')'
        self.category_mask = re.compile(r'(' + '|'.join(self.keywords.category) + r')')


    def regexPostprocessing(self, string:str):
        # Некорректные и корректные Е типа 'E***', 'E*l*',
        # Не распознает кириллическую Е и £
        e_mask = r'\b([Ee]-?[\dl][\dl][\dl][\d\wl]|[Ee]-?[\dl][\dl][\dl])\b'

        # Сохраняем текст после ключевого слова, которое обычно означает состав продукта. Остальное удаляем.
        start_index = re.search(self.start_keywords_mask, string, flags=re.IGNORECASE)
        if start_index != None:
            string = string[start_index.start():]
        # Ищем E добавки
        finded_e = re.findall(e_mask, string)
        # Удаляем Е добавки
        cleared0 = re.sub(e_mask, '', string)
        # Фильтр вырезает escape-символы и перенос слова с переносом строки
        cleared1 = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\xff]', '', cleared0).lower()

        cleared1_5 = re.sub(r'-\n', '', cleared1)
        # Фильтр заменяет перенос строки на пробел
        cleared2 = re.sub(r'\n', ' ', cleared1_5)
        #  Фильтр заменяет скобки на запятые
        cleared3 = re.sub(r'[\{\[\(\)\]\}\|]', ',', cleared2)
        # Фильтр заменяет спецсимволы на запятые
        cleared4 = re.sub(r'["*«»+<>:;.&]', ',', cleared3)
        # Фильтр процентных значений
        cleared5 = re.sub(r'\d*\.?,?\s?\d?\s?%', ',', cleared4)
        # Фильтр заменяет идущие подряд запятые с пробелами, если их больше одной
        cleared6 = re.sub(r'(,\s+|,+){2,}', ',', cleared5)
# WARNING  в некоторых текстах удаляются '-' где этого быть не должно
        cleared7 = re.sub(self.category_mask, '', cleared6)

        return cleared7,finded_e
