from django.contrib import admin
from django.db import models
from django_json_widget.widgets import JSONEditorWidget
from django.contrib.admin.views.main import ChangeList
from .models import *
import re

# TODO прикрутить форму добавления ключевого слова и языка
#  возможно поле GHS кодов нужно будет слить в один json  с классами и категориями опасности
#  доработать удаление ключевого слова на разных языках
#  написать модуль оценки опасности
#  в БД добавить поле со счетчиком запросов, написать метод обновления счетчиков при запросе.
#  поле otherNames слить с synonyms->eng

class IngredientAdmin(admin.ModelAdmin):
    actions = ('drop_keyword','concatenate_objects',)
    raw_id_fields = ('safety',)
    list_display = ('__str__','id','safety_id','pubchem_cid','cas_numbers','ec_numbers','e_number','functions','colour_index')
    search_fields = (
        'data__synonyms__eng__contains',
        'data__casNumbers__contains',
        'data__ecNumbers__contains',
        'data__eNumber__contains',
        'data__colourIndex__contains',
        'safety__id'
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


class SafetyAdmin(admin.ModelAdmin):
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


class Safety_GHSAdmin(admin.ModelAdmin):
    list_display = ('id', 'substance', 'number_of_notifiers', 'confirmed_status')

admin.site.register(Ingredient, IngredientAdmin)
admin.site.register(Safety, SafetyAdmin)
admin.site.register(GHS, GHSAdmin)
admin.site.register(Safety_GHS, Safety_GHSAdmin)

