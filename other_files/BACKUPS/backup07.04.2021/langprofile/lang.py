import  pycountry
# TODO написать класс и метод определения языка пользовательского интерфейса и языка документа на основании IP ,
#  и предложить на выбор пользователю.
#  По умолчанию использовать для конфига Tesseract язык интерфейса + английский,
#  предложить пользователю отметить чекбоксы с нужными языками.

class LangProfile:
    def __init__(self):
        self.img = 'eng'
        self.geoIP = 'ukr'

    def geoIP(self):
        pass
