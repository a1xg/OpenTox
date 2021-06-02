from django.shortcuts import render
from django.views.generic import DetailView
from .models import Ingredients
from .database import DBSearch
from .forms import UploadImageForm, TextRequestForm
from .ocr import ImageOCR


def index(request):
    '''Главная страница'''
    upload_image_form = UploadImageForm()
    text_form = TextRequestForm()
    data = {
        'title':'Search form',
        'upload_image_form':upload_image_form,
        'text_form':text_form
    }
    return render(request, 'index.html', data)

def text_search(request):
    data = {}
    if request.method == 'POST':
        text_form = TextRequestForm(request.POST)
        if text_form.is_valid():
            text = request.POST.get('text')
            lang = 'eng'
            search = DBSearch(data=[{lang:text}])
            data['title'] = 'Search results'
            data['text_form'] = TextRequestForm(request.POST)
            data['upload_image_form'] = UploadImageForm()
            data['results'] = search.getData()
            for r in data['results']:
                print(r)
        else:
            print('NOT VALID')
    return render(request, 'safetyscan/search_results.html', data)

def search_by_image(request):
    data = {}
    if request.method == 'POST':
        upload_image_form = UploadImageForm(request.POST, request.FILES)
        if upload_image_form.is_valid():
            # Распознаем текст и получаем на выходе словари
            ocr = ImageOCR(img=request.FILES['image'].read())
            ocr.decodeImage()
            text_from_img = ocr.getText(text_lang='eng', crop=True, set_font=40)
            search = DBSearch(data=text_from_img)
            data['title'] = 'Search results'
            data['text_form'] = TextRequestForm()
            data['upload_image_form'] = UploadImageForm()
            data['results']= search.getData()
        else:
            print('NOT VALID')
    return render(request, 'safetyscan/search_results.html', data)

def details_info(request):
    return render(request, 'safetyscan/ingredient_details.html', {'':''})

class IngredientsDetailView(DetailView):
    model = Ingredients
    template_name = 'safetyscan/ingredient_details.html'
    context_object_name = 'ingredients'

