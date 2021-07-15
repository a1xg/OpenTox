from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .text_blocks_screening import IngredientsBlockFinder
from .db_tools import DBQueries
from .serializers import *
from .forms import UploadImageForm, TextRequestForm
from .ocr import ImageOCR
from .hazard_assessor import HazardMeter
import json

# крутые диаграммы на js https://www.chartjs.org/docs/latest/samples/other-charts/polar-area.html

def index(request):
    '''Главная страница'''
    upload_image_form = UploadImageForm()
    text_form = TextRequestForm()
    context = {
        'title':'Search form',
        'upload_image_form':upload_image_form,
        'text_form':text_form
    }
    return render(request, 'index.html', context)

def text_search(request):
    context = {}
    if request.method == 'POST':
        text_form = TextRequestForm(request.POST)
        if text_form.is_valid():
            text = request.POST.get('text')
            lang = 'eng'
            search_results = IngredientsBlockFinder(data=[{lang:text}]).getData()
            serialized_data = IngredientsSerializer(search_results, many=True).data
            context['title'] = 'Search results'
            context['text_form'] = TextRequestForm(request.POST)
            context['upload_image_form'] = UploadImageForm()
            hazard_calculated = HazardMeter(data=serialized_data, display_format='hazard_summary').get_data()
            context['results'] = ProductSerializer(hazard_calculated, many=False).data
        else:
            print('NOT VALID')
    return render(request, 'safetyscan/search_results.html', context)

def search_by_image(request):
    context = {}
    if request.method == 'POST':
        upload_image_form = UploadImageForm(request.POST, request.FILES)
        if upload_image_form.is_valid():
            # Распознаем текст и получаем на выходе словари
            ocr = ImageOCR(img=request.FILES['image'].read())
            ocr.decodeImage()
            text_from_img = ocr.getText(text_lang='eng', crop=True, set_font=40)
            search_results = IngredientsBlockFinder(data=text_from_img).getData()
            serialized_data = IngredientsSerializer(search_results, many=True).data
            context['title'] = 'Search results'
            context['text_form'] = TextRequestForm()
            context['upload_image_form'] = UploadImageForm()
            hazard_calculated = HazardMeter(data=serialized_data, display_format='hazard_summary').get_data()
            context['results'] = ProductSerializer(hazard_calculated, many=False).data
        else:
            print('NOT VALID')
    return render(request, 'safetyscan/search_results.html', context)

def ingredient_cart(request, id):
    queryset = DBQueries().search_in_db(pk=id)
    serialized_data = IngredientsSerializer(queryset, many=True).data
    hazard_calculated = HazardMeter(data=serialized_data, display_format='hazard_detail').get_data()
    context = {
        'ingredient': DetailsIngredientSerializer(hazard_calculated, many=False).data,
        'upload_image_form': UploadImageForm(),
        'text_form': TextRequestForm()
    }
    return render(request, 'safetyscan/ingredient_cart.html', context)


class TestRequest(generics.ListCreateAPIView):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer

