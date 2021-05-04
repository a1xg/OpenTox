# Пока поддержка трех языков
# В дальнейшм этот модуль надо перенести в SQL базу данных и прикрутить инструменты быстрого добавления новых ключевых слов

# the standart list of food additions category from wikipedia(national)
start_keywords_dict = {'eng' : ['ingredients'],
                       'rus':['состав','состав продукта'],
                        'ukr':['склад']
                       }

additive_category_dict = {'eng' : ['sweetener', 'humectants', 'flour treatment','coloring', 'bulking', 'antifoaming', 'anticaking',
                                'glazing', 'antibiotic', 'anti-caking','ph regulator','preservative', 'flavouring', 'flavour enhancer',
                                'thickener', 'acidty regulator', 'color', 'emulsifier', 'artificial flavoring', 'antioxidant', 'stabiliser'],
                          'rus':['краситель', 'ароматизатор','консервант','загуститель','эмульгатор','регулятор', 'кислотности',
                                 'усилитель вкуса и аромата', 'антиокислитель', 'подсластитель'],
                          'ukr':['барвник','консервант','антиоксидант','регулятор', 'кислотності','загусник','емульгатор','підсилювачі',
                                     'смаку, аромату','антибіотик','піногасник','замінник']
                     }

class KeyWords:
    def __init__(self, lang):
        self.lang = lang
        self.category = additive_category_dict[lang]
        self.start = start_keywords_dict[lang]
