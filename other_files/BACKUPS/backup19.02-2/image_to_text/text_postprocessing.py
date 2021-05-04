import re
from image_to_text.keywords_db import KeyWords
import statistics


class TextPostprocessing:
    def __init__(self, lang:str, string:str):
        self.lang = lang
        self.string = string
        self.__keywords = KeyWords(lang)
        self.wordlist = [] # выходной список найденных слов
        self.longstrings = [] # список очень длинных сло
        self.enums = []
        self.getClearText()

    def __cropText(self):
        if bool(self.__keywords.startwords) == True:
            # Текст после ключевого слова, которое обычно означает состав продукта. Остальное удаляем.
            start_word = re.search(self.__keywords.startwords, self.string, flags=re.I)
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

    def __stringFilter(self):
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
        
        # удаляем перенос слова с переносом строки
        self.string = re.sub(r'-\n', '', self.string)
        # Фильтр заменяет перенос строки на пробел
        self.string = re.sub(r'\n', ' ', self.string)
        #  Фильтр заменяет скобки на запятые
        self.string = re.sub(r'[\{\[\(\)\]\}\|]', ',', self.string)
        # Фильтр заменяет спецсимволы на запятые
        self.string = re.sub(r'["*«»+=~<>:;.&]', ',', self.string)
        # Фильтр процентных значений
        self.string = re.sub(r'\d*\.?,?\s?\d?\s?%', ',', self.string)
        # Фильтр вырезает escape-символы и перенос слова с переносом строки,
        self.string = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\xff]', ',', self.string)
        # Фильтр заменяет идущие подряд запятые с пробелами, если их больше одной
        self.string = re.sub(r'(,\s+|,+){2,}', ',', self.string).lower()
        # tokenisation
        self.wordlist = re.split(r'\b\s*?,\s*?\b', self.string)

    def __wordFilter(self):
        remove = []
        word_lens = []
        for i,word in enumerate(self.wordlist):
            # фильтруем короткие строки
            if len(word) <= 3:
                remove.append(i)

            gibberish_mask = r'\b(\w{1,3}\s+?){3,}\b'
            gibberish = re.search(gibberish_mask, word)
            # если в выбранном слове присутствует бред соответствующий маске,
            # то измеряем их длину и сравниваем со словом
            if gibberish != None:
                diff = len(gibberish_mask)*100/len(word)
                # Если длина бреда > 50% строки, то всю строку удаляем
                # Если длина бреда < 50% строки, то вырезаем бред из строки
                if diff > 50:
                    remove.append(i) if i not in remove else None
                elif diff < 50:
                    self.wordlist[i] = re.sub(gibberish_mask, '', word)

            word_lens.append(len(word))


        # Извлекаем из общего списка те строки, длина которых
        # в 2 раза больше средней длины слова в датасете.
        mean_word_len = statistics.mean(word_lens)
        print('Mean len:', mean_word_len)
        for i, word in enumerate(self.wordlist):
            if len(word) > (mean_word_len*2):
                self.longstrings.append(word)
                remove.append(i) if i not in remove else None

        # удаляем 
        for i in sorted(remove, reverse=True):
            del self.wordlist[i]

        # TODO
        #  фильтр очень коротких слов и тарабарщины типа ',er 5t3 rtt sdg re gt3 fewwet gge  ddf gd,'
        #  фильтр цифр

    def getClearText(self):
        self.__cropText()
        self.__stringFilter()
        self.__wordFilter()