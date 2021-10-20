DEFAULT_LANG = 'eng'

FONT_SIZE = 40

#Windows Tesseract path
TESSERACT_PATH = 'D:/Program/Tesseract-OCR/tesseract.exe'

'''
Для развертывания в Heroku не нужно конфигурировать pytesseract.tesseract_cmd и надо просто 
добавить переменную среды:
Key: tesseract 
Value: ./.apt/usr/bin/tesseract
'''