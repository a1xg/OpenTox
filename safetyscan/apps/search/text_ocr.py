import numpy as np
import cv2
import re
import pytesseract
import pycountry
import time
from langdetect import detect, DetectorFactory
# Tesseract location if environment variable is not working correctly
# Tesseract version 5.0.0-alpha.20200328
pytesseract.pytesseract.tesseract_cmd = 'D:/Program/Tesseract-OCR/tesseract.exe'

# TODO
#  найти способы одновременной обработки нескольких изображений
#  сделать обработку return False
#  сделать проверку распознаваемого языка в списке доступных Tesseract в ином случае вернуть False
#  Сделать обработку исключения langdetect в случае картинки без текста
class ImageOCR:
    def __init__(self, img):
        self.img = img
        self.text = [] # выходной список словарей с распознанным текстом в формате {'lang':'text'}
        self.boxes = []

    def decodeImage(self):
        '''Декодирует изображение из формата base64 в numpy массив'''
        self.img = cv2.imdecode(np.fromstring(self.img, np.uint8), cv2.IMREAD_UNCHANGED)

    def _imagePreprocessing(self):
        grayscale = cv2.cvtColor(self.img, cv2.COLOR_BGR2GRAY)
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize= (8,8))
        normalised_img = clahe.apply(grayscale)
        self.img = normalised_img

    def _resizeImage(self, image, max_resolution:int):
        """ Метод изменяет размер изображения до максимально допустимого
        с сохранением исходных пропорций независимо от вертикальной или
        горизонтальной ориентации, например если максимальное измерение
        задано, как 1000 пикселей, то могут быть получены 1000х800 или 800х1000
        """
        max_dim = max(image.shape[0:2])
        scale_coef = max_dim / max_resolution
        new_dim = (int(image.shape[1] / scale_coef), int(image.shape[0] / scale_coef))
        img_scaled = cv2.resize(image, new_dim, interpolation=cv2.INTER_CUBIC)
        return img_scaled

    def _measureStrings(self):
        '''
        Метод подсчета текстовых строк на изображении
        :param image:
        :return:
        '''
        # в среднем время работы метода 0.17 сек
        num_lines = []
        font_size = []
        # срезы изображения по оси X относительно ширины изображения, для повышения
        # точности подсчета у изображений с искаженной перспективой.
        slices = ((0.35, 0.45), (0.5, 0.6), (0.65, 0.75))
        height, width = self.img.shape[0:2]
        for slice in slices:
            newX = width*slice[0]
            newW = width*slice[1] - width*slice[0]
            crop = self.img[0:height, int(newX):int(newX+newW)]
            crop = self._getTextMask(crop, font_size=0, num_lines=0)
            hist = cv2.reduce(crop, 1, cv2.REDUCE_AVG).reshape(-1)
            th = 2
            H, W = crop.shape[:2]
            lines = [y for y in range(H - 2) if hist[y] <= th and hist[y + 1] > th]
            if len(lines) > 0:
                font_size.extend([lines[i+1] - lines[i] for i in range(len(lines) - 1)])
                num_lines.append(len(lines))
        # Подчситываем среднюю высоту строки в пикселях
        mean_font_size = int(np.array(font_size).mean()) if len(font_size) > 1 else 0
        # Подсчитываем среднее количество строк, хотя возможно эта метрика не пригодится
        mean_num_lines = int(np.array(num_lines).mean()) if len(num_lines) > 1 else 0

        return (mean_font_size, mean_num_lines)

    def _getTextMask(self, image, font_size:int, num_lines:int):
        """
        The method searches the image for a text block and creates
        mask to use it to find outlines bounding the text and crop the excess part of the image.
        """
        rect_kernel_size = (100, 5)  # (W, H) default values 100, 5
        sq_kernel_size = (100, 5)  # (W, H) default values 100, 5
        if bool(font_size) == True:
            # вычислем коэффициент разреженности текста на изображении
            h_text_coef = font_size*num_lines/image.shape[0]
            rect_kernel_size = (int(font_size*0.6), int(font_size*0.4/h_text_coef))
            sq_kernel_size = (int(font_size*0.5), int(font_size*0.4/h_text_coef))
        elif bool(font_size) == False:
            None
        # применяем фильтры изображений
        imgBlur = cv2.GaussianBlur(image, (3, 3), 0) # 3Х3
        rectKernel = cv2.getStructuringElement(cv2.MORPH_RECT, rect_kernel_size)
        sqKernel = cv2.getStructuringElement(cv2.MORPH_RECT, sq_kernel_size)  
        blackhat = cv2.morphologyEx(imgBlur, cv2.MORPH_BLACKHAT, rectKernel)
        gradX = cv2.Sobel(blackhat, ddepth=cv2.CV_32F, dx=1, dy=0, ksize=-1)
        gradX = np.absolute(gradX)
        (minVal, maxVal) = (np.min(gradX), np.max(gradX))
        gradX = (255 * ((gradX - minVal) / (maxVal - minVal))).astype("uint8")
        gradX = cv2.morphologyEx(gradX, cv2.MORPH_CLOSE, rectKernel)
        threshold1 = cv2.threshold(gradX, 0, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]
        threshold2 = cv2.morphologyEx(threshold1, cv2.MORPH_CLOSE, sqKernel)
        text_mask = cv2.erode(threshold2, None, iterations=4)
        #cv2.imshow('test', text_mask)
        #cv2.waitKey(0)
        # remove the edge of the image, so that in the future there
        # would be no outlines recognition outside the image
        border = int(image.shape[1] * 0.05)
        text_mask[:, 0: border] = 0
        text_mask[:, image.shape[1] - border:] = 0

        return text_mask

    def _getBinaryImages(self, image, font_size, new_font_size:int):
        '''The method crops the text area of interest in the image, brings the 
        resolution of the cropped area to the new standard maximum resolution 
        (optimized for 1024 pixels), since the effectiveness of methods for 
        increasing the quality of text differs greatly for images with different
         resolutions
        '''
        binary_images = []
        line_num_threshold = 2 # пороговое значение количества строк на изображении, все, что меньше будет удалено
        # Если список ограничивающих рамок пуст, то ограничивающей рамкой будет все изображение
        self.boxes = [[0, 0, image.shape[1], image.shape[0]]] if len(self.boxes) <= 0 else self.boxes
        for box in self.boxes:
            (x, y, w, h) = box
            cropped_img = image[y:y + h, x:x + w]
            num_lines = int(cropped_img.shape[0]/font_size) # считаем количество строк на изображении
            # Если количество строк больше порогового значения, то обрабатываем изображение, иначе пропускаем
            if num_lines > line_num_threshold:
                #print('NUM LINES:', num_lines, '\nFONT SIZE:', font_size)
                # размываем изображение
                blur_size = int(np.ceil(font_size*0.2))
                blur_size = blur_size if blur_size % 2 != 0 else blur_size + 1
                gaussian_blured = cv2.GaussianBlur(cropped_img, (blur_size, blur_size), 10) # default 9,9
                # улучшаем резкость изображения
                test_sharpened = cv2.addWeighted(cropped_img, 1.5, gaussian_blured, -0.9, 0) # default 1.8, -1.5
                # размываем изображение, что бы на следующем шаге минимизировать шум на изображении
                median_size = int(np.ceil(font_size*0.02))
                median_size = median_size if median_size % 2 != 0 else median_size + 1
                medianblur = cv2.medianBlur(test_sharpened, median_size) # default 3
                # бинаризируем
                test_thresh = cv2.threshold(medianblur, 0, 255, cv2.THRESH_BINARY|cv2.THRESH_OTSU)[1]
                # Считаем процентное соотношение черных пикселей отноcительно всего количества пикселей
                percent_zeros = int(cv2.countNonZero(test_thresh)*100/(test_thresh.shape[1]*test_thresh.shape[0]))
                # Если фон картинки черный более чем n%, а текст белый, то инвертируем цвета
                img_binary = cv2.bitwise_not(test_thresh) if percent_zeros < 40 else test_thresh

                # отношение высоты изображения к шрифту и количеству строк
                scale_coef = font_size/new_font_size
                max_dimension = max(img_binary.shape[0:2])
                new_max_resolution = max_dimension/scale_coef
                # Ресайзим избыточно большие изображения, ориентируясь на размер шрифта
                scaled_binary_img = self._resizeImage(img_binary, new_max_resolution)
                binary_images.append(scaled_binary_img)
        # возвращаем массив бинарных изображений, если они есть.
        return binary_images if len(binary_images) > 0 else False

    def _findBoxes(self, mask_img, quantity:int):
        """
        Метод принимает бинарную маску-изображение, которая выделяет текстовые блоки.
        Параметр quantity предназначен для фильтрования найденных боксов по размеру -
        метод вернет боксы ограничивающие текст, с максимальной площадью в количестве равном quantity.
        """
        contours, hierarchy = cv2.findContours(mask_img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
        contours = sorted(contours, key=cv2.contourArea, reverse=True)
        img_area = mask_img.shape[0]*mask_img.shape[1]

        for cont in contours:
            # удаляем боксы площадь которых меньше порогового значения
            (x, y, w, h) = cv2.boundingRect(cont)
            if w*h < img_area/200:
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

                self.boxes.append([x1, y1, new_W, new_H])
        self.boxes = self._findLargestBoxes(quantity=quantity) if len(self.boxes) > quantity else self.boxes

    def _findLargestBoxes(self, quantity:int):
        '''Метод принимает список всех найденных боксов и возвращает заданное
        количество (не более чем :quantity:) боксов с наибольшей площадью'''
        boxes_array = np.array(self.boxes)
        areas = np.prod(boxes_array[:,2:4], axis=1)
        max_areas_indises = np.argpartition(areas, -quantity)[-quantity:]
        bigest_boxes = [boxes_array[i].tolist() for i in max_areas_indises]
        return bigest_boxes

    def _imageCropper(self, image, crop_coef:float):
        """Метод обрезает картинку пропорционально кроп коэффициенту (числа с плавающей точкой от 0 до 1)
        относительно центра изображения."""
        x, y, h, w = 0, 0, image.shape[0], image.shape[1]
        # Для корректного распознавания языка ширина дополнительно умножена на 1.5
        new_w, new_h = (w*crop_coef*1.5), (h*crop_coef)
        new_x, new_y = (w - new_w), (h - new_h)
        cropped_img = image[int(new_y):int(new_y+new_h), int(new_x):int(new_x+new_w)]
        return cropped_img

    def _recognizeText(self, conf:str, image):
        """Text recognition method
        1) Extract the region of interest from the image
        2) Recognize image_to_text and seve results in the string.
        """
        return pytesseract.image_to_string(image, config=conf)

    def _detectLang(self, text:str):
        # remove all non-alphanumeric characters
        cleared_text = re.sub(r'[\W_0-9]+', ' ', text)
        DetectorFactory.seed = 0
        alpha_2_lang = detect(cleared_text.lower())
        # Convert ISO 639-3 language code format from alpha_2 to alpha_3
        langdict = pycountry.languages.get(alpha_2=alpha_2_lang)
        alpha_3_lang_code = langdict.alpha_3
        return alpha_3_lang_code

    def getText(self, text_lang:str, lang_detect:bool, crop:bool, set_font:int):
        """If the language recognition flag is active, then we do a trial
        text recognition in the language passed to the method + English.
        We define exactly the language and repeat the refined, monolingual
        text recognition.
        The method assigns 2 attributes:
        :self.text: recognized text
        :self.lang: the language of the text in the image

         """
        self._imagePreprocessing()
        font_size, num_lines = self._measureStrings()
        mask_img = self._getTextMask(self.img, font_size, num_lines)
        if crop == True:
            self._findBoxes(mask_img=mask_img, quantity=2)
            binary_images = self._getBinaryImages(self.img, font_size, set_font)
        else:
            binary_images = self._getBinaryImages(self.img, font_size, set_font)
        if binary_images == False:
            return False

        for image in binary_images:
            #cv2.imshow('binary', image)
            #cv2.waitKey(0)
            if lang_detect == True:

                default_config = ('-l ' + text_lang + '+eng --oem 1 --psm 6')
                # для ускорения распознавания языка исходное изображение обрезаем.
                sample_image = self._imageCropper(image, 0.6)
                multilang_recog_text = self._recognizeText(default_config, sample_image)
                # Detect language
                recognized_lang = self._detectLang(multilang_recog_text)
                custom_config = ('-l ' + recognized_lang + ' --oem 1 --psm 6')
                text = self._recognizeText(custom_config, image)
                self.text.append({recognized_lang:text})
            else:
                config = ('-l ' + text_lang + ' --oem 1 --psm 6')
                text = self._recognizeText(config, image)

                self.text.append({text_lang:text})

        return self.text

    def drawBoxes(self, max_resolution):
        """The method of drawing of recognized texts and bounding rectangles of the image_to_text"""
        # TODO можно задать индекс бокса в self.boxes в котором были найдены компоненты и отрисовывать только его
        img_with_boxes = self.img
        for box in self.boxes:
            (x,y,w,h) = box
            cv2.rectangle(img_with_boxes, (x, y), ((x + w), (y + h)), (255, 255, 0), 10)
        img_with_boxes = self._resizeImage(img_with_boxes, max_resolution)
        #cv2.imshow('r', img_with_boxes)
        #cv2.waitKey(0)
        return img_with_boxes
