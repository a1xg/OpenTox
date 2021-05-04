import re
from image_to_text.keywords_db import KeyWords

class TextPostprocessing:
    def __init__(self, lang):
        self.lang = lang
        self.__kw = KeyWords(lang)
        self.start_keywords_mask = self.__getKeywordMask(self.__kw.start)
        self.category_mask = self.__getKeywordMask(self.__kw.category)

    def textFilter(self, string:str):

        # текст после ключевого слова, которое обычно означает состав продукта. Остальное удаляем.
        if bool(self.start_keywords_mask) == True:
            start_index = re.search(self.start_keywords_mask, string, flags=re.IGNORECASE)
            if start_index != None:
                string = string[start_index.end():]

        # Удаляем мусорные ключевые слова, если имеется список ключевых слов, иначе пропускаем
        string = re.sub(self.category_mask, ',', string, flags=re.IGNORECASE) if bool(self.category_mask) == True else string

        # Ищем E добавки
        # Некорректные и корректные Е типа 'E***', 'E*l*',
        # Не распознает кириллическую Е и так-же £
        e_num_mask = r'([£FEe]-?[\dl]{3}[\d\wl]|[£FEe]-?[\dl]{3})\b'
        e_nums = re.findall(e_num_mask, string)

            # Проверяем Е вещества и корректируем в случае необходимости
        if len(e_nums) > 0:
            e_nums = [re.sub(r'(\b(e|F|E\-)|£)', 'E', e) for e in e_nums]
            # Удаляем Е добавки, если они были найдены
            string = re.sub(e_num_mask, '', string)
        
        # удаляем перенос слова с переносом строки
        string = re.sub(r'-\n', '', string)
        # Фильтр заменяет перенос строки на пробел
        string = re.sub(r'\n', ' ', string)
        #  Фильтр заменяет скобки на запятые
        string = re.sub(r'[\{\[\(\)\]\}\|]', ',', string)
        # Фильтр заменяет спецсимволы на запятые
        string = re.sub(r'["*«»+=<>:;.&]', ',', string)
        # Фильтр процентных значений
        string = re.sub(r'\d*\.?,?\s?\d?\s?%', ',', string)

        # Фильтр вырезает escape-символы и перенос слова с переносом строки,
        string = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\xff]', ',', string).lower()

        # Фильтр заменяет идущие подряд запятые с пробелами, если их больше одной
        string = re.sub(r'(,\s+|,+){2,}', ',', string)

        wordlist = re.split(r'\b\s*?,\s*?\b', string)

        # TODO
        #  фильтр очень коротких слов и тарабарщины типа ',er 5t3 rtt sdg re gt3 fewwet gge  ddf gd,'


        return wordlist, e_nums



    def __getKeywordMask(self, keywords):
        """Метод принимает список ключевых слов и преобразует их в строку
        регулярного выражения типа r'(w|w|w|w)', и возвращает его.
        Если ключевые слова отсутствуют, метод возвращает пустую строку."""
        if bool(keywords) == True:
            if len(keywords) > 1:
                mask = r'(' + '|'.join(keywords) + r')'
            else:
                mask = r'(' + keywords[0] + r')'
        elif bool(keywords) == False:
            mask = False

        return mask
