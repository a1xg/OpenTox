from image_to_text.text_ocr import TextOCR
from langprofile.lang import LangProfile
import time
import cv2
import glob

filenames = glob.glob("images_en/*.jpg")
filenames.sort()
img_array = [cv2.imread(img) for img in filenames]

for img in img_array:
    start = time.time()
    # язык определенный по умолчанию(geoIP)
    langs = LangProfile()
    # Если пользователь указал язык текста картинки, то распознавание не нужно,
    # иначе используем язык его геолокации и определяем язык картинки
    language = langs.img if bool(langs.img) == True else langs.geoIP
    detect = False if bool(langs.img) == True else True
    ocr = TextOCR(img)
    ocr.getText(supposed_lang=language, lang_detect=detect)



    end = time.time()
    print("[TEXT EXTRACTOR] Затрачено всего [{:.6f}] секунд".format(end - start))
    print("Найденный текст:", ocr.text)

    #selected_text_image = ocr.drawBoxes()
    #cv2.imshow("Selected image_to_text", selected_text_image)
    #cv2.waitKey(2000)
    print('-------------------------------------')


