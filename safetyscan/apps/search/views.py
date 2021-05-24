from django.shortcuts import render
from .models import Ingredients
from .services import DBSearch
from .forms import UploadImageForm, TextRequestForm
from .ocr import ImageOCR

# TODO сделать автоматическое срабатывание кнопки поиск, после того, как изображение было выбрано и нажато OK
#  прикрутить стили от input к textarea
#  сделать страницу детальной информации

def index(request):
    '''Новый дизайн главной страницы'''
    upload_image_form = UploadImageForm()
    text_form = TextRequestForm()
    data = {
        'title':'Форма поиска',
        'upload_image_form':upload_image_form,
        'text_form':text_form
    }
    return render(request, 'index.html', data)

def text_search(request):
    if request.method == 'POST':
        data = {}
        text_form = TextRequestForm(request.POST)
        print('text_search_new', text_form)
        if text_form.is_valid():
            text = request.POST.get('text')
            lang = 'eng'
            search = DBSearch(data=[{lang:text}])
            results = search.getData()
            print(results)
            print('_'*20)
            data['title'] = 'Форма поиска'
            data['text_form'] = TextRequestForm(request.POST)
            data['upload_image_form'] = UploadImageForm()
            data['result_count'] = len(results)
            data.update(results)
        else:
            print('NOT VALID')

    return render(request, 'safetyscan/search_results.html', data)

def search_by_image(request):
    if request.method == 'POST':
        upload_image_form = UploadImageForm(request.POST, request.FILES)
        if upload_image_form.is_valid():
            # Распознаем текст и получаем на выходе словари
            ocr = ImageOCR(img=request.FILES['image'].read())
            ocr.decodeImage()
            text_from_img = ocr.getText(text_lang='eng', crop=1, set_font=40)
            search = DBSearch(data=text_from_img)
            results = search.getData()
            data = {'title':'Форма поиска',
                    'text_form': TextRequestForm(),
                    'upload_image_form': UploadImageForm(),
                    'result_count':len(results)
                    }
            data.update(results)

    return render(request, 'safetyscan/search_results.html', data)