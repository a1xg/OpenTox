from rest_framework import serializers
from .models import *

class Hazard_GHSSerializer(serializers.ModelSerializer):
    '''Сериализатор обобщающий данные из таблиц Hazard_GHS и GHS'''
    hazard_class = serializers.CharField(source='ghs.hazard_class', read_only=True)
    abbreviation = serializers.CharField(source='ghs.abbreviation', read_only=True)
    hazard_category = serializers.CharField(source='ghs.hazard_category', read_only=True)
    ghs_code = serializers.CharField(source='ghs.code', read_only=True)
    description = serializers.CharField(source='ghs.description', read_only=True)
    hazard_scale_score = serializers.IntegerField(source='ghs.hazard_scale_score', read_only=True)

    class Meta:
        model = Hazard_GHS
        fields = ('hazard_class',
                  'abbreviation',
                  'hazard_category',
                  'ghs_code',
                  'description',
                  'hazard_scale_score',
                  'number_of_notifiers',
                  'confirmed_status')


class HazardSerializer(serializers.ModelSerializer):
    hazard_ghs_set = Hazard_GHSSerializer(many=True, read_only=True)
    class Meta:
        model = Hazard
        fields = ('total_notifications', 'sourse', 'hazard_ghs_set','cl_inventory_id')


class IngredientsSerializer(serializers.ModelSerializer):
    hazard = HazardSerializer(many=False, read_only=True)
    class Meta:
        model = Ingredients
        fields = ('id','main_name', 'hazard','e_number', 'functions')