import numpy as np
import cv2
import re
import pytesseract
import pycountry
from langdetect import detect, DetectorFactory
# Tesseract location if environment variable is not working correctly
pytesseract.pytesseract.tesseract_cmd = 'D:/Program/Tesseract-OCR/tesseract.exe'

class TextOCR:
    def __init__(self, img):
        self.img = img.copy()
        self.lang = str # язык указанный пользователем или определенный по его геолокации
        self.text = str # распознанный текст
        self.__scaled_orig, self.__binary_img, self.__paragraph_mask = self.__imagePreprocessing()
        self.__paragraph_boxes = self.__findBoxes(self.__paragraph_mask)
        self.__bigest_paragraph_box = self.__bigestBox(self.__paragraph_boxes)
        self.__paragraph_cropped_box = self.__paragraphBoxCropper(self.__bigest_paragraph_box)

    def __imagePreprocessing(self):
        """
        Метод морфологических преобразований
        Принимает входное изображение
        Возвращает два изображения: бинаризованное для распознавания
        текста и изображение с маской для получения контуров
        """
        # resizing of original image
        new_max_size = 2048 # set new maximal dimension of image, pix
        max_dim = max(self.img.shape[0:2])
        scale_coef = max_dim/new_max_size
        new_dim = (int(self.img.shape[1]/scale_coef),int(self.img.shape[0]/scale_coef))
        scaled_img = cv2.resize(self.img, new_dim, interpolation = cv2.INTER_AREA)

        # morphology methods
        grayscale = cv2.cvtColor(scaled_img, cv2.COLOR_BGR2GRAY)
        imgBlur = cv2.GaussianBlur(grayscale, (3, 3), 0)
        rectKernel = cv2.getStructuringElement(cv2.MORPH_RECT, (30, 30)) # def 20, 25
        sqKernel = cv2.getStructuringElement(cv2.MORPH_RECT, (60, 70)) # def 20, 25
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
        # TODO Проверить качество фильтров изображения для OCR,
        #  поэкспериментировать с разрешениями и посмотреть быстродействие
        #imshow_size = (int(new_dim[0]/2),int(new_dim[1]/2))
        #cv2.imshow('paragraph_mask', cv2.resize(paragraph_mask, imshow_size, interpolation = cv2.INTER_AREA))
        #cv2.imshow("binary_img_for_tesseract", cv2.resize(binary_img_for_tesseract, imshow_size, interpolation = cv2.INTER_AREA))
        cv2.waitKey(0)

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

    def __paragraphBoxCropper(self, paragraph_box):
        """Модуль вырезает образец текста для ускоренного распознавания языка текста"""
        # Не всегда корректно можно определить язык только лишь по фрагменту изображения,
        # поэтому метод скорее всего надо будет убрать
        [[x, y, w, h]] = paragraph_box
        crop_coef_w, crop_coef_h = 1, 0.7
        center_x, center_y = (x+w/2), (y+h/2)
        new_w, new_h = (w*crop_coef_w), (h*crop_coef_h)
        new_x, new_y = (center_x - new_w/2), (center_y - new_h/2)
        cropped_box = [[x, y, int(new_w), int(new_h)]]

        return cropped_box

    def __textRecognizer(self, conf, boxes):
        """Text recognition method
        1) Extract the region of interest from the image
        2) Recognize image_to_text and seve results in the string.
        """
        for (x, y, w, h) in boxes:
            cropped = self.__binary_img[y:y + h, x:x + w]
            results = pytesseract.image_to_string(cropped, config=conf)


        return results

    def __langDetector(self, text):
        string = '[]'.join (text)
        # remove all non-alphanumeric characters
        cleared_text = re.sub(r'[\W_]+', ' ', string)
        DetectorFactory.seed = 0

        alpha_2_lang = detect(cleared_text.lower())
        # Convert ISO 639-3 language code format from alpha_2 to alpha_3
        langdict = pycountry.languages.get(alpha_2=alpha_2_lang)
        alpha_3_lang = langdict.alpha_3

        return alpha_3_lang

    def getText(self, supposed_lang, lang_detect):
        """Defines and sets a configuration value for a image_to_text-containing image:
        --psm 8(1 word), psm 6(image_to_text block), psm 7 (one image_to_text string), psm 3 (automatic segmentation)
        More of Tesseract configs: https://muthu.co/all-tesseract-ocr-options/"""
        if lang_detect == True:
            default_config = ('-l ' + supposed_lang + '+eng --oem 1 --psm 6')
            multilang_recog_text = self.__textRecognizer(default_config, self.__bigest_paragraph_box)
            # Detect language
            self.lang = self.__langDetector(multilang_recog_text)
            custom_config = ("-l " + self.lang + " --oem 1 --psm 6")
            self.text = self.__textRecognizer(custom_config, self.__bigest_paragraph_box)
        else:
            self.lang = supposed_lang
            config = ('-l ' + self.lang + ' --oem 1 --psm 6')
            self.text = self.__textRecognizer(config, self.__bigest_paragraph_box)


    def drawBoxes(self):
        """The method of drawing of recognized texts and bounding rectangles of the image_to_text"""
        image_with_boxes = self.__scaled_orig.copy()
        for (x, y, w, h) in self.__bigest_paragraph_box:
            cv2.rectangle(image_with_boxes, (x, y),  ((x + w), (y + h)), (255, 0, 0), 2)
        #for (x, y, w, h) in self.__paragraph_cropped_box:
        #   cv2.rectangle(image_with_boxes, (x, y), ((x + w), (y + h)), (0, 255, 255), 2)
        return image_with_boxes
