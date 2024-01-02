from .services.hazard_assessor import HazardMeter
from .services.ocr import ImageOCR
from .serializers import IngredientsSerializer, ProductSerializer, DetailsIngredientSerializer
from .services.text_blocks_screening import IngredientsBlockFinder
from .services.db_tools import DBQueries
from .services.ocr_settings import *
import logging

class Search:
    def __init__(self):
        self.box_index = None  # Target block with text
        self.queryset = None
        self.output_image = None

    def _get_queryset(self, **kwargs):
        if 'request_text' in kwargs:
            logging.info('Text processing started...')
            finder = IngredientsBlockFinder(data=kwargs['request_text'])
            logging.info('Text processing completed...')
            self.queryset = finder.get_data()
            if finder.box_index != None:
                self.box_index = finder.box_index
        elif 'pk' in kwargs:
            self.queryset = DBQueries().search_in_db(pk=kwargs['pk'])

    def get_context(self, **kwargs):
        if 'image' in kwargs:
            ocr = ImageOCR(img=kwargs['image'])
            kwargs['request_text'] = ocr.get_text(
                text_lang=DEFAULT_LANG,
                crop=kwargs['crop'],

            )
        elif 'text' in kwargs:
            kwargs['request_text'] = [{
                'lang':DEFAULT_LANG,
                'text':kwargs['text']
            }]

        self._get_queryset(**kwargs)

        ingredients_data = IngredientsSerializer(self.queryset, many=True).data
        logging.info('Hazard data processing started...')
        output_data = HazardMeter(data=ingredients_data, display_format=kwargs['display_format']).get_data()
        logging.info('Hazard data processing completed')
        output_data['image_with_ingredients'] = None
        if self.box_index != None:
            output_data['image_with_ingredients'] = ocr.draw_boxes(
                index=self.box_index,
                max_resolution=700,
                color= (0,255,0),
                base64=True
            )

        if kwargs['display_format'] == 'list':
            return ProductSerializer(output_data, many=False).data
        elif kwargs['display_format'] == 'detail':
            return {
                'ingredient': DetailsIngredientSerializer(output_data, many=False).data
            }
