from .hazard_assessor import HazardMeter
from .ocr import ImageOCR
from .serializers import IngredientsSerializer, ProductSerializer, DetailsIngredientSerializer
from .text_blocks_screening import IngredientsBlockFinder
from .db_tools import DBQueries
from .ocr_settings import *

class Search:
    # TODO отдать пользователю изображение с составом
    def _get_text(self, **kwargs):
        ocr = ImageOCR(img=kwargs['image'])
        text = ocr.get_text(text_lang=DEFAULT_LANG, crop=kwargs['crop'], set_font=FONT_SIZE)
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
        output_data = HazardMeter(data=ingredients_data, display_format=kwargs['display_format']).get_data()

        if kwargs['display_format'] == 'list':
            return ProductSerializer(output_data, many=False).data
        elif kwargs['display_format'] == 'detail':
            return {'ingredient': DetailsIngredientSerializer(output_data, many=False).data}