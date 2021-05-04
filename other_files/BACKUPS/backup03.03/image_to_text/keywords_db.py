# Пока поддержка трех языков
# В дальнейшм этот модуль надо перенести в SQL базу данных и прикрутить инструменты быстрого добавления новых ключевых слов

# the standart list of food additions category from wikipedia(national)
start_keywords_dict = {'eng' : ['ingredients'],
                       'rus':['состав','состав продукта'],
                        'ukr':['склад']
                       }

additive_category_dict = {'eng' : ['sweetener', 'humectants', 'flour treatment','coloring', 'bulking', 'antifoaming', 'anticaking',
                                'glazing', 'antibiotic', 'anti-caking','ph regulator','preservative', 'flavouring','flavours', 'flavoring',
                                   'flavour', 'flavor','enhancer','thickener', 'acidity', 'regulator', 'color', 'emulsifier', 'artificial',
                                   'antioxidant', 'anti-oxidant', 'stabiliser', 'colour' , 'contain', 'dyestuff'
                                   ],

                          'rus':['краситель', 'ароматизатор','консервант','загуститель','эмульгатор','регулятор', 'кислотности',
                                 'усилитель вкуса и аромата', 'антиокислитель', 'подсластитель'],
                          'ukr':['барвник','консервант','антиоксидант','регулятор', 'кислотності','загусник','емульгатор','підсилювачі',
                                     'смаку, аромату','антибіотик','піногасник','замінник']
                     }

# Модуль возвращает регулярное выражение содержащее ключевые слова для заданного языка,
# если они присутствуют в словаре, иначе возвращает False
class KeyWords:
    def __init__(self, lang):
        self.lang = lang
        self.stopwords = self. __getKeywordMask(additive_category_dict, lang)
        self.startwords = self. __getKeywordMask(start_keywords_dict, lang)

    def __checkKey(self, dict, key):
        if key in dict:
            return dict[key]
        else:
            return False

    def __getKeywordMask(self, dict, key):
        """Метод принимает список ключевых слов и преобразует их в строку
        регулярного выражения типа r'(w|w|w|w)', и возвращает его.
        Если ключевые слова отсутствуют, метод возвращает пустую строку."""
        keywords = self.__checkKey(dict, key)
        if bool(keywords) == True:
            if len(keywords) > 1:
                mask = r'(' + '|'.join(keywords) + r')'
            else:
                mask = r'(' + keywords[0] + r')'
        elif bool(keywords) == False:
            mask = False

        return mask
