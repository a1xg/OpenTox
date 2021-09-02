from .hazard_assessor import HazardMeter
from .ocr import ImageOCR
from .serializers import IngredientsSerializer, ProductSerializer, DetailsIngredientSerializer
from .text_blocks_screening import IngredientsBlockFinder
from .db_tools import DBQueries

DEFAULT_LANG = 'eng'

class DataMixin:

    def _get_text(self, **kwargs):
        ocr = ImageOCR(img=kwargs['image'])
        ocr.decodeImage()
        text = ocr.getText(text_lang='eng', crop=True, set_font=40)
        return text

    def get_queryset(self, **kwargs):
        if 'text' in kwargs:
            return IngredientsBlockFinder(data=kwargs['text']).getData()
        elif 'pk' in kwargs:
            return DBQueries().search_in_db(pk=kwargs['pk'])

    def get_context(self, **kwargs):
        if 'image' in kwargs:
            kwargs['text'] = self._get_text(**kwargs)
        elif 'text' in kwargs:
            kwargs['text'] = [{DEFAULT_LANG:kwargs['text']}]

        queryset = self.get_queryset(**kwargs)
        ingredients_data = IngredientsSerializer(queryset, many=True).data
        hazard_data = HazardMeter(data=ingredients_data, display_format=kwargs['display_format']).get_data()


        if kwargs['display_format'] == 'list':
            return ProductSerializer(hazard_data, many=False).data
        elif kwargs['display_format'] == 'detail':
            return {'ingredient': DetailsIngredientSerializer(hazard_data, many=False).data}



