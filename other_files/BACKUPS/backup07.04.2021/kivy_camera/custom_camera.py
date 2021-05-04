import kivy
from kivy.uix.camera import Camera
from kivy.properties import BooleanProperty, NumericProperty
from kivy.uix.button import Button
from kivy.uix.boxlayout import BoxLayout
from text_detection.text_extractor import TextExtractor
import numpy as np
import cv2


class CustomCamera(Camera):
    detectText = BooleanProperty(False)

    def __init__(self, **kwargs):
        super(CustomCamera, self).__init__(**kwargs)

        self.isAndroid = kivy.platform == "android"

    def on_tex(self, *l):
        """
        np.frombuffer() преобразуем двоичные данные текстуры kivy в одномерный массив numpy
        image.reshape() преобразуем одномерный массив в многомерный массив
        изображения соответствующий 3 каналам RGB
        cv2.cvtColor() конвертируем цветовую схему из RGB в BGR
        ---------------------------------------------------------
        detectText вызываем распознавание текста с изображения и получаем
        изображение с выделенными текстовыми блоками
        ---------------------------------------------------------
        cv2.cvtColor() конвертируем цветовую схема из BGR в RGB
        blit_buffer() преобразуем изображение в двоичный код
        преобразуем двоичный код в текстуру kivy
        Присваиваем новое значение текстуры объекту CustomCamera
        """

        image = np.frombuffer(self.texture.pixels, dtype='uint8')
        image = image.reshape(self.texture.height, self.texture.width, -1)
        image = cv2.cvtColor(image, cv2.COLOR_RGBA2BGR)

        if self.detectText:
            image = TextExtractor(image).drawBoxes()

        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGBA)
        numpy_data = image.tostring()
        self.texture.blit_buffer(numpy_data, bufferfmt="ubyte", colorfmt='rgba')
        super(CustomCamera, self).on_tex(self.texture)


class CameraWidget(BoxLayout):
    """Виджет """
    def __init__(self, **kwargs):
        super(CameraWidget, self).__init__(orientation="vertical")
