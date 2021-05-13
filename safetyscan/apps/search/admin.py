from django.contrib import admin
from django.db import models
from django_json_widget.widgets import JSONEditorWidget
from django.contrib.admin.views.main import ChangeList
from .models import Ingredients, Safety
import re

# TODO прикрутить форму добавления ключевого слова и языка
#  доработать удаление ключевого слова на разных языках
#  вывести в таблицу дополнительные колонки
class IngredientsAdmin(admin.ModelAdmin):
    actions = ['drop_keyword']
    raw_id_fields = ('safety',)
    search_fields = [
        'data__synonyms__eng__contains',
        'data__casNumbers__contains',
        'data__ecNumbers__contains',
        'data__eNumbers__icontains',
        'data__colourIndex__icontains',
    ]
    formfield_overrides = {
        models.JSONField: {'widget': JSONEditorWidget},
    }

    @admin.action(description='Удалить ключевое слово из выбранных ингридиентов')
    def drop_keyword(self, request, queryset):
        keyword = request.GET['q'].strip("'")
        for obj in queryset:
            obj.data['synonyms']['eng'].remove(keyword)
            obj.save()


class SafetyAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.JSONField: {'widget': JSONEditorWidget},
    }


admin.site.register(Ingredients, IngredientsAdmin)
admin.site.register(Safety, SafetyAdmin)


