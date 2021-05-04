import re
from image_to_text.keywords_db import KeyWords

class TextPostprocessing:
    def __init__(self, input_dicts):
        self.input_dicts = input_dicts
        self.output_dicts = []

        #self._keywords = KeyWords(lang) # извлекаем стоп слова
        self._stringFilter()

    # метод не задействуется
    def _cropText(self):
        '''Обрезает текст содержащийся до ключевого слова, например в строке "one two three keyword four five"
        в результате останется тольк "four five" '''
        if bool(self._keywords.startwords) == True:
            # Текст после ключевого слова, которое обычно означает состав продукта. Остальное удаляем.
            start_word = re.search(self._keywords.startwords, self.string, flags=re.I)
            if start_word != None:
                # вычисляем процентное соотношение между индексом ключевого слова в общем
                # тексте и длиной всего текста. В случае, если ключевое слово находится
                # где-то в первых 20% текста, то обрезаем все, что находится до ключевого слова,
                # иначе ничего не делаем.
                diff = start_word.start() * 100 / len(self.string)
                if diff < 20:
                    self.string = self.string[start_word.end():]
        else:
            return self.string

    def _stringFilter(self):
        '''Cleaning text'''
        '''
        if bool(self.__keywords.stopwords) == True:
            # Удаляем мусорные ключевые слова, если имеется регулярное выражение с ключевыми словами, иначе пропускаем
            self.string = re.sub(self.__keywords.stopwords, ',', self.string, flags=re.I)
        
        # Ищем Е добавки, некорректные и корректные Е типа 'E***', 'E*l*'
        # (Не распознает кириллическую Е)
        e_num_mask = r'([£FEe]-?[\dl]{3}[\d\wl]|[£FEe]-?[\dl]{3})\b'
        self.enums = re.findall(e_num_mask, self.string)
        # Проверяем Е вещества и корректируем в случае необходимости
        if len(self.enums) > 0:
            self.enums = [re.sub(r'(\b(e|F|E\-)|£)', 'E', e) for e in self.enums]
            # Удаляем Е добавки из общего текста, если они были найдены
            self.string = re.sub(e_num_mask, '', self.string)
        '''
        for dict in self.input_dicts:
            lang = list(dict.keys())[0]
            string = dict[lang]
            # удаляем перенос слова с переносом строки
            string = re.sub(r'-\n', '', string)
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

            # ЗАменяем множественные пробелы на один пробел
            string = re.sub(r'\s+', ' ', string)

            self.output_dicts.append({f'{lang}':string})
