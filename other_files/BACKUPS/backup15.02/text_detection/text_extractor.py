import numpy as np
import cv2
import re
import time
import pytesseract
from langdetect import detect_langs, detect, DetectorFactory
# Tesseract location if environment variable is not working correctly
pytesseract.pytesseract.tesseract_cmd = 'D:/Program/Tesseract-OCR/tesseract.exe'

# TODO вынести нейросеть tesseract на сервер, Django
#  Сделать обработку ошибок и предусмотреть отсутствие данных

class TextExtractor:
    def __init__(self, img):
        self.img = img.copy()
        self.__scaled_orig, self.__binary_img, self.__paragraph_mask = self.__imagePreprocessing()
        self.__paragraph_boxes = self.__findBoxes(self.__paragraph_mask)
        self.__bigest_paragraph_box = self.__bigestBox(self.__paragraph_boxes)
        self.__paragraph_cropped_box = self.__paragraphBoxCropper(self.__bigest_paragraph_box)
        # the dictionary of conformity ISO 639-1 and ISO 639-3
        self.__lang_dict = {'af':'afr', 'ar':'ara', 'bg':'bul', 'bn':'ben', 'ca':'cat',
                            'cs':'ces', 'cy':'cym', 'da':'dan', 'de':'deu', 'el':'ell',
                            'en':'eng', 'es':'spa', 'et':'est', 'fa':'fas', 'fi':'fin',
                            'fr':'fra', 'gu':'guj', 'he':'heb', 'hi':'hin', 'hr':'hrv',
                            'hu':'hun', 'id':'ind', 'it':'ita', 'ja':'jpn', 'kn':'kan',
                            'ko':'kor', 'lt':'lit', 'lv':'lav', 'mk':'mkd', 'ml':'mal',
                            'mr':'mar', 'ne':'nep', 'nl':'nld', 'no':'nor', 'pa':'pan',
                            'pl':'pol', 'pt':'por', 'ro':'ron', 'ru':'rus', 'sk':'slk',
                            'sl':'slv', 'so':'som', 'sq':'sqi', 'sv':'swe', 'sw':'swa',
                            'ta':'tam', 'te':'tel', 'th':'tha', 'tl':'tgl', 'tr':'tur',
                            'uk':'ukr', 'ur':'urd', 'vi':'vie'}

    def __imagePreprocessing(self):
        """
        Метод морфологических преобразований
        Принимает входное изображение
        Возвращает два изображения: бинаризованное для распознавания
        текста и изображение с маской для получения контуров
        """
        # resizing of original image
        max_dim = max(self.img.shape[0:2])
        scale_coef = max_dim/1024 # set new maximal dimension of image, pix
        new_dim = (int(self.img.shape[1]/scale_coef),int(self.img.shape[0]/scale_coef))
        scaled_img = cv2.resize(self.img, new_dim, interpolation = cv2.INTER_AREA)
        # morphology methods
        grayscale = cv2.cvtColor(scaled_img, cv2.COLOR_BGR2GRAY)
        imgBlur = cv2.GaussianBlur(grayscale, (3, 3), 0)
        rectKernel = cv2.getStructuringElement(cv2.MORPH_RECT, (20, 25))
        sqKernel = cv2.getStructuringElement(cv2.MORPH_RECT, (20, 25))
        blackhat = cv2.morphologyEx(imgBlur, cv2.MORPH_BLACKHAT, rectKernel)
        gradX = cv2.Sobel(blackhat, ddepth=cv2.CV_32F, dx=1, dy=0, ksize=-1)
        gradX = np.absolute(gradX)
        (minVal, maxVal) = (np.min(gradX), np.max(gradX))
        gradX = (255 * ((gradX - minVal) / (maxVal - minVal))).astype("uint8")
        gradX = cv2.morphologyEx(gradX, cv2.MORPH_CLOSE, rectKernel)
        threshold1 = cv2.threshold(gradX, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]
        # удаляем край изображения, что бы в дальнейшем не
        # было распознавания контуров за пределами изображения
        border = int(scaled_img.shape[1] * 0.05)
        threshold1[:, 0: border] = 0
        threshold1[:, scaled_img.shape[1] - border:] = 0
        threshold2 = cv2.morphologyEx(threshold1, cv2.MORPH_CLOSE, sqKernel)
        paragraph_mask = cv2.erode(threshold2, None, iterations=4)  # 4 default value

        # Морфологические преобразования для распознавания Tesseract
        medianBlur = cv2.medianBlur(grayscale, 3)
        thresh_img = cv2.threshold(medianBlur, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]
        binary_img_for_tesseract = cv2.bitwise_not(thresh_img)

        outpit_images = (scaled_img, binary_img_for_tesseract, paragraph_mask)

        #cv2.imshow('paragraph_mask', paragraph_mask)
        #cv2.imshow("binary_img_for_tesseract", binary_img_for_tesseract)
        #cv2.waitKey(0)

        return outpit_images

    def __findBoxes(self, mask_img):
        """
        Находим ограничивающий текст контур
        вокруг каждого контура делаем ограничивающий прямоугольник и возвращаем массив прямоугольников
        """
        contours, hierarchy = cv2.findContours(mask_img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
        contours = sorted(contours, key=cv2.contourArea, reverse=True)

        boxes = []

        for cont in contours:
            # удаляем боксы площадь которых меньше порогового значения
            (x, y, w, h) = cv2.boundingRect(cont)
            if w*h < 1000:
                continue
            else:
                # Оставшиеся боксы расширяем(%) используя коэффициенты by, bx
                by = int(h*0.02)
                bx = int(w*0.05)
                x1, x2 = abs(x - bx), (x + w + bx)
                y1, y2 = abs(y - by), (y + h + bx)
                # Проверяем не выходят ли координаты x2, y2 за пределы изображения
                if x2 > mask_img.shape[1]:
                    x2 = mask_img.shape[1]
                if y2 > mask_img.shape[0]:
                    y2 = mask_img.shape[0]

                new_W, new_H = (x2 - x1), (y2 - y1)

                boxes.append([x1, y1, new_W, new_H])

        return boxes

    def __bigestBox(self, paragraph_boxes):
        #print('Количество боксов:', paragraph_boxes)
        boxes_array = np.array(paragraph_boxes)
        areas = np.prod(boxes_array[:,2:4], axis=1)
        max_area_index = np.unravel_index(np.argmax(areas, axis=0), areas.shape)
        bigest_box = [paragraph_boxes[max_area_index[0]]]

        return bigest_box
    # TODO Стоит доработать метод распознавания языка, т.к. дважды пользоваться тессерактом слишком медленно
    def __paragraphBoxCropper(self, paragraph_box):
        """Модуль вырезает образец текста для ускоренного распознавания языка текста"""
        [[x, y, w, h]] = paragraph_box
        crop_coef_w, crop_coef_h = 1, 1
        center_x, center_y = (x+w/2), (y+h/2)
        new_w, new_h = (w*crop_coef_w), (h*crop_coef_h)
        new_x, new_y = (center_x - new_w/2), (center_y - new_h/2)
        cropped_box = [[x, y, int(new_w), int(new_h)]]

        return cropped_box

    def __textRecognizer(self, conf, boxes):
        """Text recognition method
        1) Extract the region of interest from the image
        2) Recognize image_to_text and seve results in the list.
        """
        results = []
        start = time.time()
        for (x, y, w, h) in boxes:
            cropped = self.__binary_img[y:y + h, x:x + w]
            text = pytesseract.image_to_string(cropped, config=conf)
            results.append(text)
        end = time.time()
        print("[textRecognizer] Затрачено [{:.6f}] секунд".format(end - start))

        return results

    def __langDetector(self, text_results):

        start = time.time()
        string = '[]'.join (text_results)
        # all ASCII craracters https://donsnotes.com/tech/charsets/ascii.html
        cleared_text = re.sub(r'[\x3A\x3B\x28\x29\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x7E\x7D' + \
                            '\x7B\x7C\x2E\x2C\x21\x00-\x08\x0b\x0c\x0e-\x1f\x7f-\xff-\n]', '', string)

        #print('cleared image_to_text:', cleared_text.lower())
        DetectorFactory.seed = 0
        lang = detect(cleared_text.lower())
        print("[langDetector] Язык картинки [{}] ".format(lang))

        end = time.time()

        print("[langDetector] Затрачено [{:.6f}] секунд".format(end - start))
        return lang

    def textOCRManager(self):
        """Defines and sets a configuration value for a image_to_text-containing image:
        --psm 8(1 word), psm 6(image_to_text block), psm 7 (one image_to_text string), psm 3 (automatic segmentation)
        More of Tesseract configs: https://muthu.co/all-tesseract-ocr-options/"""

        default_config = ("-l ukr+rus+eng --oem 1 --psm 6")
        multilang_recog_text = self.__textRecognizer(default_config, self.__paragraph_cropped_box)

        # Detect language
        lang = self.__langDetector(multilang_recog_text)
        custom_config = ("-l " + self.__lang_dict[lang] + " --oem 1 --psm 6")
        monolang_recog_text = self.__textRecognizer(custom_config, self.__bigest_paragraph_box)

        return monolang_recog_text

    def drawBoxes(self):
        """The method of drawing of recognized texts and bounding rectangles of the image_to_text"""
        image_with_boxes = self.__scaled_orig.copy()
        for (x, y, w, h) in self.__bigest_paragraph_box:
            cv2.rectangle(image_with_boxes, (x, y),  ((x + w), (y + h)), (255, 0, 0), 2)

        #for (x, y, w, h) in self.__paragraph_cropped_box:
        #    cv2.rectangle(image_with_boxes, (x, y), ((x + w), (y + h)), (0, 255, 255), 2)

        return image_with_boxes

