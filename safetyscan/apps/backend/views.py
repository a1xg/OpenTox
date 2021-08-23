from django.shortcuts import render
from rest_framework import generics, viewsets
from rest_framework.views import APIView
from rest_framework import response
from .text_blocks_screening import IngredientsBlockFinder
from .db_tools import DBQueries
from .models import Ingredients
from .serializers import *
from .ocr import ImageOCR
from .hazard_assessor import HazardMeter
from .utils import DataMixin
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
        hazard_calculated = HazardMeter(data=serialized_data, display_format='list').get_data()
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
        hazard_calculated = HazardMeter(data=serialized_data, display_format='list').get_data()
        context['results'] = ProductSerializer(hazard_calculated, many=False).data
        context['title'] = 'Search results'
    return render(request, 'safetyscan/search_results.html', context)

def ingredient_cart(request, id):
    '''Представление подробной информации о ингредиенте'''
    queryset = DBQueries().search_in_db(pk=id)
    serialized_data = IngredientsSerializer(queryset, many=True).data
    hazard_calculated = HazardMeter(data=serialized_data, display_format='detail').get_data()
    context = {'ingredient': DetailsIngredientSerializer(hazard_calculated, many=False).data}
    return render(request, 'safetyscan/ingredient_cart.html', context)

# DRF API VIEWS
class TextSearchAPIView(DataMixin, generics.ListAPIView):
    '''http://127.0.0.1:8000/search/api/'''
    serializer_class = TextSearchSerializer

    def post(self, request):
        serializer = TextSearchSerializer(data=request.data, many=False)
        if serializer.is_valid(raise_exception=True):
            context = self.get_context(text=serializer.validated_data['text'], display_format='list')
            print(f'context:\n {context}')
            return response.Response(context, status=200)
        return response.Response(serializer.errors, status=200)


class ImageSearchAPIView(DataMixin, generics.ListAPIView):
    serializer_class = ImageSearchSerializer

    def post(self, request):
        serializer = ImageSearchSerializer(data=request.data, many=False)
        print(f'Request data: {request.data}')
        if serializer.is_valid(raise_exception=True):
            context = self.get_context(image=serializer.validated_data["image"].read(), display_format='list')
            print(f'context:\n {context}')
            return response.Response(context, status=200)
        return response.Response(serializer.errors, status=200)


class DetailAPIView(DataMixin, generics.RetrieveAPIView):
    def get(self, request, pk):
        context = self.get_context(display_format='detail', pk=pk)
        return response.Response(context, status=200)

class TestAPIView(DataMixin, generics.ListAPIView):
    '''Тестовая вьюха для отладки фронтенда на React'''
    serializer_class = TextSearchSerializer

    def post(self, request):
        serializer = TextSearchSerializer(data=request.data, many=False)

        if serializer.is_valid(raise_exception=True):
            print(f'request data:\n{request.data}')
            context = self.get_context(text=serializer.validated_data['text'], display_format='list')
            print(context)
        print(f'request data:\n{request.data}')
        return response.Response(context, status=200)

