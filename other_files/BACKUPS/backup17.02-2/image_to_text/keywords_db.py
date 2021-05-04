# Пока поддержка трех языков
# В дальнейшм этот модуль надо перенести в SQL базу данных и прикрутить инструменты быстрого добавления новых ключевых слов

# the standart list of food additions category from wikipedia(national)
start_keywords_dict = {'eng' : ['ingredients'],
                       'rus':['состав','состав продукта'],
                        'ukr':['склад']
                       }

additive_category_dict = {'eng' : ['sweetener', 'humectants', 'flour treatment','coloring', 'bulking', 'antifoaming', 'anticaking',
                                'glazing', 'antibiotic', 'anti-caking','ph regulator','preservative', 'flavouring','flavours', 'flavoring',
                                   'flavour', 'flavor', 'enhancer','thickener', 'acidity', 'regulator', 'color', 'emulsifier', 'artificial',
                                   'antioxidant', 'anti-oxidant', 'stabiliser', 'colour', 'dyestuffs', 'contain'
                                   ],

                          'rus':['краситель', 'ароматизатор','консервант','загуститель','эмульгатор','регулятор', 'кислотности',
                                 'усилитель вкуса и аромата', 'антиокислитель', 'подсластитель'],
                          'ukr':['барвник','консервант','антиоксидант','регулятор', 'кислотності','загусник','емульгатор','підсилювачі',
                                     'смаку, аромату','антибіотик','піногасник','замінник']
                     }

# Модуль возвращает списки ключевых слов, если они присутствуют в модуле, иначе возвращает False
class KeyWords:
    def __init__(self, lang):
        self.lang = lang
        self.stopwords = self.__checkKey(additive_category_dict, lang)
        self.startwords = self.__checkKey(start_keywords_dict, lang)


    def __checkKey(self, dict, key):
        if key in dict:
            return self.__getRegexMask(dict[key])
        else:
            return False

    def __getRegexMask(self, keywords):
        """Метод принимает список ключевых слов и преобразует их в строку
        регулярного выражения типа r'(w|w|w|w)', и возвращает его.
        Если ключевые слова отсутствуют, метод возвращает пустую строку."""
        if bool(keywords) == True:
            if len(keywords) > 1:
                re_mask = r'(' + '|'.join(keywords) + r')'
            else:
                re_mask = r'(' + keywords[0] + r')'
        elif bool(keywords) == False:
            re_mask = False

        return re_mask
