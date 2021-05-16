from django.contrib import admin
from django.db import models
from django_json_widget.widgets import JSONEditorWidget
from django.contrib.admin.views.main import ChangeList
from .models import Ingredients, Safety
import re

# TODO прикрутить форму добавления ключевого слова и языка
#  возможно поле GHS кодов нужно будет слить в один json  с классами и категориями опасности
#  доработать удаление ключевого слова на разных языках
#  написать модуль оценки опасности
#  в БД добавить поле со счетчиком запросов, написать метод обновления счетчиков при запросе.
#  поле otherNames слить с synonyms->eng


class IngredientsAdmin(admin.ModelAdmin):
    actions = ('drop_keyword','concatenate_objects',)
    raw_id_fields = ('safety',)
    list_display = ('__str__','id','safety_id','pubchem_cid','cas_numbers','ec_numbers','e_number','functions',)
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
    list_display = ('__str__', 'id', 'cas_number', 'ec_number',)
    search_fields = (
        # FIXME настроить поиск по полям кодов опасности и классов
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

admin.site.register(Ingredients, IngredientsAdmin)
admin.site.register(Safety, SafetyAdmin)


