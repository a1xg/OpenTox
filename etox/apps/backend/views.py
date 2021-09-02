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

# DRF API VIEWS
class TextSearchAPIView(DataMixin, generics.ListAPIView):
    '''http://127.0.0.1:8000/search/api/'''
    serializer_class = TextSearchSerializer

    def post(self, request):
        serializer = TextSearchSerializer(data=request.data, many=False)
        if serializer.is_valid(raise_exception=True):
            context = self.get_context(text=serializer.validated_data['text'], display_format='list')
            return response.Response(context, status=200)
        return response.Response(serializer.errors, status=200)


class ImageSearchAPIView(DataMixin, generics.ListAPIView):
    serializer_class = ImageSearchSerializer

    def post(self, request):
        serializer = ImageSearchSerializer(data=request.data, many=False)
        print(f'Request data: {request.data}')
        if serializer.is_valid(raise_exception=True):
            context = self.get_context(image=serializer.validated_data["image"].read(), display_format='list')
            return response.Response(context, status=200)
        return response.Response(serializer.errors, status=200)


class DetailAPIView(DataMixin, generics.RetrieveAPIView):
    def get(self, request, pk):
        context = self.get_context(display_format='detail', pk=pk)
        return response.Response(context, status=200)