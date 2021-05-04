from django.shortcuts import render
from .models import Ingredients
from .services import TextBlocksProcessing
from .forms import UploadImageForm, TextRequestForm
from .text_ocr import TextOCR
import numpy as np
import cv2


# TODO написать обработчик GHS данных
#  доработать редактор админки для легкого добавления новых ключевых слов на других языках
#  прикрутить форму загрузки картинки и модуль распознавания изображений
#  написать красивый фронтенд

def search(request):
    upload_image_form = UploadImageForm(request.POST, request.FILES)
    text_form = TextRequestForm(request.POST)
    data = {
        'title':'Форма поиска',
        'upload_image_form':upload_image_form,
        'text_form':text_form
    }
    if request.method == 'POST' and upload_image_form.is_valid():
        # Распознаем текст и получаем на выходе словари
        ocr = TextOCR(img=request.FILES['image'].read())
        text_from_img = ocr.getText(text_lang='eng', lang_detect=0, crop=1, set_font=40)
        print(f'Text from image {text_from_img}')
        finder = TextBlocksProcessing(data=text_from_img)
        results = finder.getData()
        data.update(results)
        print('-'*20)

    if request.method == 'POST' and text_form.is_valid():
        text = request.POST.get('text')
        lang = 'eng'
        finder = TextBlocksProcessing(data=[{lang:text}])
        results = finder.getData()
        data.update(results)
        print('_'*20)

    return render(request, 'safetyscan/search_results.html', data)

