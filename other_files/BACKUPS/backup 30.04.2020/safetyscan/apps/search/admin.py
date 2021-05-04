from django.contrib import admin
from .models import Ingredients, Safety

class IngredientsAdmin(admin.ModelAdmin):
    # указываем ссылку Foreign key на таблицу Safety, что бы на странице
    # внесения изменений не подгружались все существующие foreign keys
    raw_id_fields = ('safety',)


admin.site.register(Ingredients, IngredientsAdmin)
admin.site.register(Safety)
