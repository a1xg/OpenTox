from django.contrib import admin
from django.db import models
from .models import Ingredients, Safety
from django_json_widget.widgets import JSONEditorWidget


class IngredientsAdmin(admin.ModelAdmin):
    # указываем ссылку Foreign key на таблицу Safety, что бы на странице
    # внесения изменений не подгружались все существующие foreign keys
    raw_id_fields = ('safety',)
    search_fields = ('data__synonyms__eng',)
    formfield_overrides = {
        models.JSONField: {'widget': JSONEditorWidget},
    }


class SafetyAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.JSONField: {'widget': JSONEditorWidget},
    }


admin.site.register(Ingredients, IngredientsAdmin)
admin.site.register(Safety, SafetyAdmin)


