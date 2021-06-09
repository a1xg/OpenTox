from django.shortcuts import render
from django.views.generic import DetailView, ListView
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Ingredients
from .database import DBSearch
from .serializers import *
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
            search_results = DBSearch(data=[{lang:text}]).getData()
            data['title'] = 'Search results'
            data['text_form'] = TextRequestForm(request.POST)
            data['upload_image_form'] = UploadImageForm()
            data['results'] = IngredientsSerializer(search_results, many=True).data
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
            print(f'Text from image {text_from_img}')
            search_results = DBSearch(data=text_from_img).getData()
            data['title'] = 'Search results'
            data['text_form'] = TextRequestForm()
            data['upload_image_form'] = UploadImageForm()
            data['results'] = IngredientsSerializer(search_results, many=True).data
        else:
            print('NOT VALID')
    return render(request, 'safetyscan/search_results.html', data)

def ingredient_details(request, id):
    queryset = Ingredients.objects.filter(pk=id).select_related('hazard').prefetch_related(
        'hazard__hazard_ghs_set__ghs')
    context = {
    'ingredient':IngredientsSerializer(queryset, many=True).data[0],
    'upload_image_form':UploadImageForm(),
    'text_form':TextRequestForm()
    }
    return render(request, 'safetyscan/ingredient_details.html', context)


class IngredientsListView(APIView):
    '''REST API view'''
    def get(self, request):
        ingredients = DBSearch(data=[{'eng':'propanol, ethylparaben, E110'}]).getData()
        serializer = IngredientsSerializer(ingredients, many=True)
        return Response(serializer.data)