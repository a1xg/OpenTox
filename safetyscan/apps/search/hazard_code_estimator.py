# TODO
#  описать GHS классификатор в виде некоего класса
#  в системе GHS шкала опасности убывает от 1 до 4
#  Каждому GHS коду соответствует 1 класс и 1 категория опасности
#  У одного кода GHS могут быть несколько подкатегорий A, B, C с убыванием опасности от А до C
#  Все классы и категории, которые собраны в JSON являются утвержденными, поэтому их меньше, чем самих кодов безопасности

class HazardHarmonisator:
    pass





"""
https://pubchem.ncbi.nlm.nih.gov/ghs/
https://www.hsa.ie/eng/Publications_and_Forms/Publications/Chemical_and_Hazardous_Substances/CLP_Regulation_No_1272-2008_A4_Poster_I.pdf

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
