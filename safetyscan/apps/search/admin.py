from django.contrib import admin
from django.db import models
from django_json_widget.widgets import JSONEditorWidget
from django.contrib.admin.views.main import ChangeList
from .models import *
import re
import json

# TODO прикрутить форму добавления ключевого слова и языка
#  доработать удаление ключевого слова на разных языках
#  написать модуль оценки опасности
#  поле otherNames слить с synonyms->eng

class IngredientsAdmin(admin.ModelAdmin):
    actions = ('drop_keyword','concatenate_objects',)
    raw_id_fields = ('hazard',)
    list_display = ('__str__','id','hazard_id','request_statistics','pubchem_cid','cas_numbers','ec_numbers','e_number','functions','colour_index')
    search_fields = (
        'data__synonyms__eng__contains',
        'data__casNumbers__contains',
        'data__ecNumbers__contains',
        'data__eNumber__contains',
        'data__colourIndex__contains',
        'hazard'
    )
    formfield_overrides = {
        models.JSONField: {'widget': JSONEditorWidget},
    }

    @admin.action(description='Удалить ключевое слово из выбранных ингридиентов')
    def drop_keyword(self, request, queryset):
        keyword = request.GET['q'].strip("'")
        for obj in queryset:
            obj.data['synonyms']['eng'].remove(keyword)
            obj.save()

    @admin.action(description='Объединить выбранные ингредиенты')
    def concatenate_objects(self, request, queryset):
        pass


class HazardAdmin(admin.ModelAdmin):
    actions = ['drop_keyword']
    formfield_overrides = {
        models.JSONField: {'widget': JSONEditorWidget},
    }
    list_display = ('__str__', 'id', 'cl_inventory_id', 'cas_number', 'ec_number')
    search_fields = (
        'substance__substanceNames__contains',
        'ec_number__contains',
        'cas_number__contains',
    )

    @admin.action(description='Удалить ключевое слово из выбранных ингридиентов')
    def drop_keyword(self, request, queryset):
        keyword = request.GET['q'].strip("'")
        for obj in queryset:
            obj.substance['substanceNames'].remove(keyword)
            obj.save()


class GHSAdmin(admin.ModelAdmin):
    list_display = ('id', 'abbreviation', 'hazard_category', 'hazard_code', 'description')


class Hazard_GHSAdmin(admin.ModelAdmin):
    raw_id_fields = ('hazard','ghs')
    list_display = ('id','hazard','ghs','number_of_notifiers', 'confirmed_status')

admin.site.register(Ingredients, IngredientsAdmin)
admin.site.register(Hazard, HazardAdmin)
admin.site.register(GHS, GHSAdmin)
admin.site.register(Hazard_GHS, Hazard_GHSAdmin)

