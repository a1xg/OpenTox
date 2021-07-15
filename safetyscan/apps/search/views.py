from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .text_blocks_screening import IngredientsBlockFinder
from .db_tools import DBQueries
from .serializers import *
from .ocr import ImageOCR
from .hazard_assessor import HazardMeter


# TODO Перевести стандартные представления на rest_framework
#  будет использовано 2 сериализатора в 1 представлении в зависимости от типа приходящих данных тернаркой будет выбираться сериализатор
#  или с помощью метода get_serializer_class()
# крутые диаграммы на js https://www.chartjs.org/docs/latest/samples/other-charts/polar-area.html

def index(request):
    '''Главная страница'''
    context = {'title': 'Search form'}
    return render(request, 'index.html', context)

def text_search(request):
    context = {}
    if request.method == 'POST':
        text = request.POST.get('text')
        lang = 'eng'
        search_results = IngredientsBlockFinder(data=[{lang: text}]).getData()
        serialized_data = IngredientsSerializer(search_results, many=True).data
        hazard_calculated = HazardMeter(data=serialized_data, display_format='hazard_summary').get_data()
        context['results'] = ProductSerializer(hazard_calculated, many=False).data
        context['title'] = 'Search results'
    return render(request, 'safetyscan/search_results.html', context)

def search_by_image(request):
    context = {}
    if request.method == 'POST':
        # Распознаем текст и получаем на выходе словари
        ocr = ImageOCR(img=request.FILES.get('image').read())
        ocr.decodeImage()
        text_from_img = ocr.getText(text_lang='eng', crop=True, set_font=40)
        search_results = IngredientsBlockFinder(data=text_from_img).getData()
        serialized_data = IngredientsSerializer(search_results, many=True).data
        hazard_calculated = HazardMeter(data=serialized_data, display_format='hazard_summary').get_data()
        context['results'] = ProductSerializer(hazard_calculated, many=False).data
        context['title'] = 'Search results'
    return render(request, 'safetyscan/search_results.html', context)

def ingredient_cart(request, id):
    queryset = DBQueries().search_in_db(pk=id)
    serialized_data = IngredientsSerializer(queryset, many=True).data
    hazard_calculated = HazardMeter(data=serialized_data, display_format='hazard_detail').get_data()
    context = {'ingredient': DetailsIngredientSerializer(hazard_calculated, many=False).data}

    return render(request, 'safetyscan/ingredient_cart.html', context)


class TestRequest(generics.GenericAPIView):
    serializer_class = TextRequeqtSerializer
    def get_serializer_class(self):

        pass
