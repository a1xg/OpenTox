from rest_framework import generics
from rest_framework import response
from .serializers import *
from .utils import DataMixin

# DRF API VIEWS
class TextSearchAPIView(DataMixin, generics.ListAPIView):
    serializer_class = TextSearchSerializer

    def post(self, request):
        serializer = TextSearchSerializer(data=request.data, many=False)
        if serializer.is_valid(raise_exception=True):
            context = self.get_context(text=serializer.validated_data['text'], display_format='list')
            return response.Response(context, status=200)
        return response.Response(serializer.errors, status=400)


class ImageSearchAPIView(DataMixin, generics.ListAPIView):
    serializer_class = ImageSearchSerializer

    def post(self, request):
        serializer = ImageSearchSerializer(data=request.data, many=False)
        if serializer.is_valid(raise_exception=True):
            context = self.get_context(
                image=serializer.validated_data["image"].read(),
                display_format='list',
                crop=serializer.validated_data["crop"]
            )
            return response.Response(context, status=200)
        return response.Response(serializer.errors, status=400)


class DetailAPIView(DataMixin, generics.RetrieveAPIView):
    def get(self, request, pk):
        context = self.get_context(display_format='detail', pk=pk)
        return response.Response(context, status=200)