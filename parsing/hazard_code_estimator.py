# TODO
#  описать GHS классификатор в виде некоего класса
#  в системе GHS шкала опасности убывает от 1 до 4
#  Каждому GHS коду соответствует 1 класс и 1 категория опасности
#  У одного кода GHS могут быть несколько подкатегорий A, B, C с убыванием опасности от А до C
#  Все классы и категории, которые собраны в JSON являются утвержденными, поэтому их меньше, чем самих кодов безопасности

class HazardClassificator:
    def __init__(self):
        self._hazard_classificator = {
        # Иерархия вложенности: class(category(code)))
        'WATER_REACT': {
            'Water-react.': {
                '1': ['H260'],
                '2': ['H261'],
                '3': ['H261']
            }
        },
        'EXPLOSIVES': {
            'Unst. Expl.': {
                '': ['H200']
            },
            'Expl.': {
                '1.1': ['201'],
                '1.2': ['202'],
                '1.3': ['203'],
                '1.4': ['204'],
                '1.5': ['205'],
                '1.6': ['']
            }

        },
        'RESPIRATORY_SKIN_SENSITISERS': {
            'Skin Sens.': {
                '1': ['H317'],
                '1A': ['H317'],
                '1B': ['H317']
            },
            'Resp. Sens.': {
                '1': ['H334'],
                '1A': ['H334'],
                '1B': ['H334']
            }
        },
        'SKIN_CORROSION_IRRITATION': {
            'Skin Corr.': {
                '1': ['H314'],
                '1A': ['H314'],
                '1B': ['H314'],
                '1C': ['H314']
            },
            'Skin Irrit.': {
                '2': ['H315']
            },
            'Skin Mild Irrit.': {
                '3': ['H316']
            }
        },
        'SELF_REACTED_AND_ORGANIC_PEROXIDES': {
            'Self-react.': {
                'A': ['H240'],
                'B': ['H241'],
                'C': ['H242'],
                'D': ['H242'],
                'E': ['H242'],
                'F': ['H242'],
                'G': ['']
            },
            'Org. Perox.': {
                'A': ['H240'],
                'B': ['H241'],
                'C': ['H242'],
                'D': ['H242'],
                'E': ['H242'],
                'F': ['H242'],
                'G': ['']
            }
        },
        'OXIDISING_LIQUIDS_AND_SOLIDS': {
            'Ox. Sol.': {
                '1': ['H271'],
                '2': ['H272'],
                '3': ['H272']
            },
            'Ox. Liq.': {
                '1': ['H271'],
                '2': ['H272'],
                '3': ['H272']
            }
        },
        'ACUTE_TOXICITY': {
            'Acute Tox.': {
                '1': ['H300', 'H310', 'H330'],
                '2': ['H300', 'H310', 'H330'],
                '3': ['H301', 'H311', 'H331'],
                '4': ['H302', 'H312', 'H332'],
                '5': ['H303', 'H313', 'H333']
            }
        },
        'EYE_DAMAGE_IRRITATION': {
            'Eye Dam.': {
                '1': ['H318']
            },
            'Eye Irrit.': {
                '2': ['H319', 'H320'],
                '2A': ['319'],
                '2B': ['320']
            }
        },
        'AEROSOL': {
            'Aerosol': {
                '1': ['H222'],
                '2': ['H223'],
                '3': ['H229']
            }
        },
        'REPRODUCTIVE_TOXICITY': {
            'Repr.': {
                '1A': ['H360'],
                '1B': ['H360'],
                '2': ['H361']
            },
            'Lact.': {
                '': ['H362']
            }
        },
        'MUTAGENICITY': {
            'Muta.': {
                '1A': ['H340'],
                '1B': ['H340'],
                '2': ['H341']
            }
        },
        'CARCINOGENICITY': {
            'Carc.': {
                '1A': ['H350'],
                '1B': ['H350'],
                '2': ['H351']
            }
        },
        'TARGET_ORGAN_TOXICITY_SINGLE_EXPOSURE': {
            'STOT SE': {
                '1': ['H370'],
                '2': ['H371'],
                '3': ['H335', 'H336']
            }
        },
        'TARGET_ORGAN_TOXICITY_REPITED_EXPOSURE': {
            'STOT RE': {
                '1': ['H372'],
                '2': ['H373']
            },
        },
        'HAZARDOUS_AQUATIC_ENVIRONMENT': {
            'Aquatic Chronic': {
                '1': ['H410'],
                '2': ['H411'],
                '3': ['H412'],
                '4': ['H413']
            },
            'Aquatic Acute': {
                '1': ['H400'],
                '2': ['H401'],
                '3': ['H402']
            }
        },
        'ASPIRATION_TOXICITY': {
            'Asp. Tox.': {
                '1': ['H304'],
                '2': ['H305']
            }
        },
        'FLAMMABLE_LIQUIDS': {
            'Flam. Liq.': {
                '1': ['H224'],
                '2': ['H225'],
                '3': ['H226'],
                '4': ['H227'],
            }
        },
        'FLAMMABLE_SOLIDS': {
            'Flam. Sol.': {
                '1': ['H228'],
                '2': ['H228']
            }
        },
        'PYROPHORIC_LIQUIDS': {
            'Pyr. Liq.': {
                '1': ['H250']
            }
        },
        'PYROPHORIC_SOLIDS': {
            'Pyr. Sol.': {
                '1': ['H250']
            }
        },
        'OXIDISING_GASES': {
            'Ox. Gas': {
                '1': ['H270']
            }
        },
        'SELF_HEATING_SUBSTANCES_AND_MIXTURES': {
            'Self-heat.': {
                '1': ['H251'],
                '2': ['H252']
            }
        },
        'GASES_UNDER_PRESSURE': {
            'Press. Gas': {
                '(Comp.)': ['H280'],
                '(Liq.)': ['H280'],
                '(Ref. Liq.)': ['H281'],
                '': ''  # код и категория отсутствуют
            }
        },
        'FLAMMAMBLE_GASES': {
            'Flam. Gas': {
                '1': ['H220'],
                '2': ['H221'],
            },
            'Chem. Unst. Gas': {
                'A': ['H230'],
                'B': ['H231']
            }
        },
        'HAZARDOUS_OZONE_LAYER': {
            'Ozone': {
                '1': ['H420']
            }
        },
        'NOT_CLASSIFIED': {
            'Not Classified': {
                '': ['']
            }
        },
        'CORROSIVE_METALS': {
            'Met. Corr.': {
                '1': ['H290']
            }
        }
    }
        self.classes = list(self._hazard_classificator.keys())
        self.code_by_abbreviature_category()

    def abbreviature_category_by_code(self):
        print(self.classes)

    def code_by_abbreviature_category(self):
        print('ddfdfdfdf')

obj = HazardClassificator


"""
https://pubchem.ncbi.nlm.nih.gov/ghs/
https://www.hsa.ie/eng/Publications_and_Forms/Publications/Chemical_and_Hazardous_Substances/CLP_Regulation_No_1272-2008_A4_Poster_I.pdf
"""
"""
EXPLOSIVES:
    H200  Unst. Expl.
    H201  Expl. (1.1)
    H202  Expl. (1.2)
    H203  Expl. (1.3)
    H204  Expl. (1.4)
    H205  Expl. (1.5)
FLAMMAMBLE GASES:
    H220  Flam. Gas (1)
    H221  Flam. Gas (2)
    H230  Chem. Unst. Gas A
    H231  Chem. Unst. Gas B
AEROSOL:
    H222  Aerosol (1)
    H223  Aerosol (2)
    H229  Aerosol (3)
FLAMMAMBLE LIQUIDS:
    H224  Flam. Liq. (1)
    H225  Flam. Liq. (2)	
    H226  Flam. Liq. (3)	
    H227  Flam. Liq. (4)
FLAMMAMBLE SOLIDS:
    H228  Flam. Sol. (1 | 2)
Self reactive substances and mixtures, organic peroxides:
    H240  Self-react. (A) | Org. Perox. (A)
    H241  Self-react. (B) | Org. Perox. (B)
    H242  Self-react. (C | D | E | F) | Org. Perox. (C | D | E | F)
Pyrophoric liquids or pyrophoric solids:
    H250  Pyr. Liq. (1) | Pyr. Sol. (1)
Self heating substances and mixturs:
    H251  Self-heat. (1)
    H252  Self-heat. (2) 
Substances or mixtures which in contact with water emit flammable gases:
    H260  Water-react. (1)
    H261  Water-react. (2 | 3)
Oxidising Gases:
    H270  Ox. Gas (1)
Oxidising Liquids or Oxidising solids:
    H271  Ox. Liq. (1) | Ox. Sol. (1)
    H272  Ox. Liq. (2 | 3) | Ox. Sol. (2 | 3)
Gases under Pressure:
    H280  Press. Gas (Comp. | Liq.) 
    H281  Press. Gas (Ref. Liq. | Diss. | Comp.)
Corrosive to metals:
    H290  Met. Corr. (1)	
Aspiration Toxicity:
    H304  Asp. Tox. (1)
    H305  Asp. Tox. (2)
Acute Toxicity:
    H300  Acute Tox. (1 | 2)
    H301  Acute Tox. (3)
    H302  Acute Tox. (4)	
    H303  Acute Tox. (5)
    H310  Acute Tox. (1 | 2)	
    H311  Acute Tox. (3)	
    H312  Acute Tox. (4)
    H313  Acute Tox. (5)
    H330  Acute Tox. (1 | 2)
    H331  Acute Tox. (3)
    H332  Acute Tox. (4)
    H333  Acute Tox. (5)
Skin corrosion / irritation:
    H314  Skin Corr. (1 | 1A | 1B | 1C)	
    H315  Skin Irrit. (2)
    H316  Skin Mild Irrit. (3)
Sensitisation of the respiratory tract or the skin:
    H317  Skin Sens. (1 | 1A | 1B)
    H334  Resp. Sens. (1 | 1A | 1B)	
Serious eye damage / eye irritation:
    H318  Eye Dam. (1)
    H319  Eye Irrit. (2 | 2A)
    H320  Eye Irrit. (2 | 2B)
Germ cell mutagenicity:
    H340  Muta. (1A | 1B)
    H341  Muta. (2)
Carcinogenicity:
    H350  Carc. (1A | 1B)
    H351  Carc. (2)	
Reproductive toxicity:
    H360  Repr. (1A | 1B)
    H361  Repr. (2)	
    H362  Lact.	
Specific target organ toxicity (single exposure):
    H370  STOT SE (1)
    H371  STOT SE (2)
    H335  STOT SE (3)
    H336  STOT SE (3)
Specific target organ toxicity (repeated exposure):
    H372  STOT RE (1)	
    H373  STOT RE (2)
Hazardous to the aquatic environment:
    H400  Aquatic Acute (1)	
    H401  Aquatic Acute (2)	
    H402  Aquatic Acute (3)	
    H410  Aquatic Chronic (1)
    H411  Aquatic Chronic (2)	
    H412  Aquatic Chronic (3)
    H413  Aquatic Chronic (4)	
Hazardous to the ozone layer:
    H420  Ozone (1)
    
"""

"""
Классы опасности и возможные категории имеющиеся в базе по факту
CLASS               CATEGORY
----------------------------
Water-react.        (1|2|3)
Unst. Expl.         ('')
Skin Sens.          (1|1A|1B)
Skin Mild Irrit.    (3)
Skin Irrit.         (2)
Skin Corr.          (1|1A|1B|1C)
Self-react.         (A|B|C|D|E|F|G)
Self-heat.          (1|2)
STOT SE             (1|2|3)
STOT RE             (1|2)
Resp. Sens.         (1|1A|1B)
Repr.               (1A|1B|2)
Pyr. Sol.           (1)
Pyr. Liq.           (1)
Press. Gas          ((Comp.)|(Liq.)|(Ref. Liq.)|'')
Ozone               (1)
Ox. Sol.            (1|2|3)
Ox. Liq.            (1|2|3)
Ox. Gas             (1)
Org. Perox.         (A|B|C|D|E|F|G)
Not Classified      ('')
Muta.               (1A|1B|2)
Met. Corr.          (1)
Lact.               ('')
Flam. Sol.          (1|2)
Flam. Liq.          (1|2|3|4)
Flam. Gas           (1|2)
Eye Irrit.          (2|2A|2B)
Eye Dam.            (1)
Expl.               (1.1|1.3|1.4|1.5|1.6)
Carc.               (1A|1B|2)
Asp. Tox.           (1|2)
Aquatic Chronic     (1|2|3|4)
Aquatic Acute       (1|2|3)
Aerosol             (1|2)
Acute Tox.          (1|2|3|4|5)
"""

