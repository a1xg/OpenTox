import numpy as np
import cv2
import re
import pytesseract
import pycountry
from langdetect import detect, DetectorFactory
# Tesseract location if environment variable is not working correctly
# Tesseract version 5.0.0-alpha.20200328
pytesseract.pytesseract.tesseract_cmd = 'D:/Program/Tesseract-OCR/tesseract.exe'

# TODO После отладки парсинга википедии и pubchem и накопления большой базы веществ -
#  сделать пользовательские словари LSTM для Tesseract, это проще, чем обрабатывать ошибки распознавания


class TextOCR:
    def __init__(self, img):
        self.img = img
        self.lang = str # язык текста на изображении
        self.text = str # распознанный текст
        
        self.__scaled_img = self.__imageResizer(self.img, 2048)
        # Поиск текстовой маски, метод оптимизирован под работу с изображениями,
        # у которых максимальное измерение = 2048
        self.img_text_mask = self.__getCropMask(self.__scaled_img)
        self.__boxes = self.__findBoxes(self.img_text_mask)
        self.__bigest_box = self.__getBigestBox(self.__boxes)
        self.img_binary = self.__getBinaryImage(self.__scaled_img, self.__bigest_box, 1024)
        self.img_with_box = self.drawBoxes(1024)

        #self.__cropped_sample_text = self.__sampleTextCropper(self.__bigest_box)
        cv2.imshow("binary", self.img_binary)
        #cv2.imshow("binary img", self.__imageResizer(image=self.img_binary, max_resolution=1024))
        #cv2.imshow("box image", self.img_with_box)
        cv2.waitKey(0)

    def __imageResizer(self, image, max_resolution:int):
        """ Метод изменяет размер изображения до максимально допустимого
        с сохранением исходных пропорций независимо от вертикальной или
        горизонтальной ориентации, например если максимальное измерение
        задано, как 1000 пикселей, то могут быть получены 1000х800 или 800х1000
        """
        max_dim = max(image.shape[0:2])
        scale_coef = max_dim / max_resolution
        new_dim = (int(image.shape[1] / scale_coef), int(image.shape[0] / scale_coef))
        scaled_img = cv2.resize(image, new_dim, interpolation=cv2.INTER_CUBIC)
        return scaled_img

    def __getCropMask(self, image):
        """
        The method searches the image for a text block and creates
        mask to use it to find outlines bounding the text and crop the excess part of the image.
        """
        grayscale = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        imgBlur = cv2.GaussianBlur(grayscale, (3, 3), 0)
        rectKernel = cv2.getStructuringElement(cv2.MORPH_RECT, (40, 50)) # def 20, 25
        sqKernel = cv2.getStructuringElement(cv2.MORPH_RECT, (40, 60)) # def 20, 25
        blackhat = cv2.morphologyEx(imgBlur, cv2.MORPH_BLACKHAT, rectKernel)
        gradX = cv2.Sobel(blackhat, ddepth=cv2.CV_32F, dx=1, dy=0, ksize=-1)
        gradX = np.absolute(gradX)
        (minVal, maxVal) = (np.min(gradX), np.max(gradX))
        gradX = (255 * ((gradX - minVal) / (maxVal - minVal))).astype("uint8")
        gradX = cv2.morphologyEx(gradX, cv2.MORPH_CLOSE, rectKernel)
        threshold1 = cv2.threshold(gradX, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]
        # remove the edge of the image, so that in the future there
        # would be no outlines recognition outside the image
        border = int(image.shape[1] * 0.05)
        threshold1[:, 0: border] = 0
        threshold1[:, image.shape[1] - border:] = 0
        threshold2 = cv2.morphologyEx(threshold1, cv2.MORPH_CLOSE, sqKernel)
        crop_mask = cv2.erode(threshold2, None, iterations=4)  # 4 default value

        return crop_mask

    def __getBinaryImage(self, image, bounding_box, max_dimension):
        '''The method crops the text area of interest in the image, brings the 
        resolution of the cropped area to the new standard maximum resolution 
        (optimized for 1024 pixels), since the effectiveness of methods for 
        increasing the quality of text differs greatly for images with different
         resolutions
        '''
        # TODO возможно в метод стоит добавить коррекцию перекоса изображения
        #  так же стоит сделать счетчик строк текста и конфигуратор параметров получения бинарного изображения
        #  https://www.pyimagesearch.com/2017/02/20/text-skew-correction-opencv-python/
        (x, y, w, h) = bounding_box
        cropped_img = image[y:y + h, x:x + w]
        scaled_img = self.__imageResizer(cropped_img, max_dimension)
        grayscale = cv2.cvtColor(scaled_img, cv2.COLOR_BGR2GRAY)
        # размываем изображение
        test_gaussian = cv2.GaussianBlur(grayscale, (9, 9), 10) # норм от (17,17) до (97,97) 10 для 4000пикс
        # улучшаем резкость изображения
        test_sharpened = cv2.addWeighted(grayscale, 1.8, test_gaussian, -1.5, 0)
        # размываем изображение, что бы на следующем шаге минимизировать шум на изображении
        medianblur = cv2.medianBlur(test_sharpened, 3)
        # Делаем пороговое изображение
        test_thresh = cv2.threshold(medianblur, 0, 255, cv2.THRESH_BINARY|cv2.THRESH_OTSU)[1]
        # Считаем процентное соотношение черных пикселей отночительно всего количества пикселей
        percent_zeros = (cv2.countNonZero(test_thresh) *100 / (test_thresh.shape[1] * test_thresh.shape[0]))
        # Если фон картинки черный более чем n%, а текст белый, то инвертируем цвета
        test_binary_img_for_tesseract = cv2.bitwise_not(test_thresh) if percent_zeros < 40 else test_thresh

        return test_binary_img_for_tesseract

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

    def __getBigestBox(self, paragraph_boxes):
        #print('Количество боксов:', paragraph_boxes)
        boxes_array = np.array(paragraph_boxes)
        areas = np.prod(boxes_array[:,2:4], axis=1)
        max_area_index = np.unravel_index(np.argmax(areas, axis=0), areas.shape)
        bigest_box = paragraph_boxes[max_area_index[0]]

        return bigest_box

    def __sampleTextCropper(self, paragraph_box):
        """Модуль вырезает образец текста для ускоренного распознавания языка текста"""
        # Не всегда корректно можно определить язык только лишь по фрагменту изображения,
        # поэтому метод скорее всего надо будет убрать
        x, y, w, h = paragraph_box
        crop_coef_w, crop_coef_h = 1, 0.7
        center_x, center_y = (x+w/2), (y+h/2)
        new_w, new_h = (w*crop_coef_w), (h*crop_coef_h)
        new_x, new_y = (center_x - new_w/2), (center_y - new_h/2)
        cropped_box = [[x, y, int(new_w), int(new_h)]]

        return cropped_box

    def __textRecognizer(self, conf, image):
        """Text recognition method
        1) Extract the region of interest from the image
        2) Recognize image_to_text and seve results in the string.
        """
        return pytesseract.image_to_string(image, config=conf)

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
        """If the language recognition flag is active, then we do a trial
        text recognition in the language passed to the method + English.
        We define exactly the language and repeat the refined, monolingual
        text recognition.
        The method assigns 2 attributes:
        :self.text: recognized text
        :self.lang: the language of the text in the image

         """

        if lang_detect == True:
            default_config = ('-l ' + supposed_lang + '+eng --oem 1 --psm 6')
            multilang_recog_text = self.__textRecognizer(default_config, self.img_binary)
            # Detect language
            self.lang = self.__langDetector(multilang_recog_text)
            custom_config = ('-l ' + self.lang + ' --oem 1 --psm 6')
            self.text = self.__textRecognizer(custom_config, self.img_binary)
        else:
            self.lang = supposed_lang
            config = ('-l ' + self.lang + ' --oem 1 --psm 6')
            self.text = self.__textRecognizer(config, self.img_binary)

    def drawBoxes(self, max_resolution):
        """The method of drawing of recognized texts and bounding rectangles of the image_to_text"""
        img = self.__scaled_img
        x, y, w, h = self.__bigest_box
        image_with_boxes = cv2.rectangle(img, (x, y),  ((x + w), (y + h)), (255, 0, 0), 2)
        image_with_boxes = self.__imageResizer(image_with_boxes, max_resolution)
        return image_with_boxes
