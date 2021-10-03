from rest_framework import serializers
from .models import *

# REST API request serializers
class TextSearchSerializer(serializers.Serializer):
    text = serializers.CharField()

    def validate_text(self, attrs):
        if len(attrs) <= 0:
            raise serializers.ValidationError('Please enter components')
        return attrs


class ImageSearchSerializer(serializers.Serializer):
    image = serializers.ImageField()

    def validate_image(self, attrs):
        if len(attrs) <= 0:
            raise serializers.ValidationError('Please select an image to download')
        return attrs


class Hazard_GHSSerializer(serializers.ModelSerializer):
    '''Serializer combining data from Hazard_GHS and GHS tables'''
    id = serializers.IntegerField(source='ghs.id', read_only=True)
    hazard_class = serializers.CharField(source='ghs.hazard_class', read_only=True)
    abbreviation = serializers.CharField(source='ghs.abbreviation', read_only=True)
    hazard_category = serializers.CharField(source='ghs.hazard_category', read_only=True)
    ghs_code = serializers.CharField(source='ghs.code', read_only=True)
    description = serializers.CharField(source='ghs.description', read_only=True)
    hazard_scale_score = serializers.IntegerField(source='ghs.hazard_scale_score', read_only=True)
    class Meta:
        model = Hazard_GHS
        fields = (
            'id',
            'hazard_class',
            'abbreviation',
            'hazard_category',
            'ghs_code',
            'description',
            'confirmed_status',
            'hazard_scale_score',
            'number_of_notifiers',
        )

# Model serializers for internal application logic
class HazardSerializer(serializers.ModelSerializer):
    hazard_ghs_set = Hazard_GHSSerializer(many=True, read_only=True)
    class Meta:
        model = Hazard
        fields = ('total_notifications', 'sourse', 'hazard_ghs_set','cl_inventory_id')


class IngredientsSerializer(serializers.ModelSerializer):
    hazard = HazardSerializer(many=False, read_only=True)
    class Meta:
        model = Ingredients
        fields = (
            'id',
            'main_name',
            'hazard',
            'e_number',
            'functions',
            'pubchem_cid',
            'cas_numbers',
            'ec_numbers',
            'colour_index',
            'description',
            'request_statistics',
            'synonyms'
        )

# Ingredient detail serializers
class GHSDetailsSerializer(serializers.Serializer):
    '''Ingredient hazard data serializer detail page'''
    #id = serializers.IntegerField()
    hazard_class = serializers.CharField()
    abbreviation = serializers.CharField()
    hazard_category = serializers.CharField()
    ghs_code = serializers.CharField()
    description = serializers.CharField()
    hazard_scale_score = serializers.IntegerField()
    number_of_notifiers = serializers.IntegerField()
    percent_notifications = serializers.IntegerField()


class DetailsIngredientHazardSerializer(serializers.Serializer):
    '''Ingredient hazard detail serializer'''
    hazard_ghs_set = GHSDetailsSerializer(many=True)
    ingredient_hazard_avg = serializers.IntegerField()
    total_notifications = serializers.IntegerField()
    sourse = serializers.CharField()
    cl_inventory_id = serializers.IntegerField()


class DetailsIngredientSerializer(serializers.Serializer):
    '''Serializer of data and ingredient identifiers'''
    id = serializers.IntegerField()
    hazard = DetailsIngredientHazardSerializer(many=False)
    main_name = serializers.CharField()
    e_number = serializers.CharField()
    functions = serializers.ListField()
    pubchem_cid = serializers.IntegerField()
    cas_numbers = serializers.ListField()
    ec_numbers = serializers.ListField()
    colour_index = serializers.ListField()
    description = serializers.CharField()
    request_statistics = serializers.IntegerField()
    synonyms = serializers.DictField()

# Serializers for search results
class GHSListSerializer(serializers.Serializer):
    '''Hazard data serializer of an ingredient in an ingredient list'''
    id = serializers.IntegerField()
    hazard_class = serializers.CharField()
    #abbreviation = serializers.CharField()
    #hazard_category = serializers.CharField()
    ghs_code = serializers.CharField()
    description = serializers.CharField()
    #hazard_scale_score = serializers.IntegerField()
    #number_of_notifiers = serializers.IntegerField()
    #percent_notifications = serializers.IntegerField()

class ListIngredientHazardSerializer(serializers.Serializer):
    '''Ingredient hazard data serializer on search results page'''
    ingredient_hazard_avg = serializers.FloatField()
    hazard_ghs_set = GHSListSerializer(many=True)


class ListIngredientSerializer(serializers.Serializer):
    '''Serializer of the list of ingredients in a product'''
    id = serializers.IntegerField()
    hazard = ListIngredientHazardSerializer(many=False)
    main_name = serializers.CharField()
    #e_number = serializers.CharField()
    #functions = serializers.ListField()
    #pubchem_cid = serializers.IntegerField()
    #cas_numbers = serializers.ListField()
    #ec_numbers = serializers.ListField()
    #colour_index = serializers.ListField()
    #description = serializers.CharField()
    #request_statistics = serializers.IntegerField()


class ProductHazardStatisticsSerializer(serializers.Serializer):
    '''Whole product hazard data serializer'''
    id = serializers.IntegerField()
    hazard_class = serializers.CharField()
    #abbreviation = serializers.CharField()
    #hazard_category = serializers.CharField()
    description = serializers.CharField()
    hazard_scale_score = serializers.IntegerField()
    num_of_ingredients = serializers.IntegerField()


class ProductSerializer(serializers.Serializer):
    '''Product data serializer'''
    product_ingredients = ListIngredientSerializer(many=True)
    detail_hazard_product = ProductHazardStatisticsSerializer(many=True)
    product_hazard_avg = serializers.IntegerField()

