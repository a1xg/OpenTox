from django.db import models
from django.contrib.postgres.indexes import GinIndex, BTreeIndex, GistIndex
from django import forms

class Ingredients(models.Model):
    '''
    # Примеры запросов к полям jsonb
    # Запрос слова из массива JSONB Ingredients.objects.filter(data__synonyms__eng__contains='dimethyl caproamide')
    # Запрос слова из поля JSONB Ingredients.objects.filter(data__inchiKey='HNXNKTMIVROLTK-UHFFFAOYSA-N')
    # Запрос из реляционного поля Ingredients.objects.filter(main_name='propylparaben')
    # Запрос по триграммам Ingredients.objects.filter(main_name__trigram_similar="paraben")
    '''
    data = models.JSONField(blank=True, null=True, db_index=True)
    safety = models.ForeignKey('Safety', models.DO_NOTHING, blank=True, null=True)
    main_name = models.CharField(max_length=300, blank=True, null=True, db_index=True)

    def __str__(self):
        return self.main_name

    class Meta:
        managed = True
        db_table = 'ingredients'
        verbose_name = 'Ингредиент'
        verbose_name_plural = 'Ингредиенты'


class Safety(models.Model):
    cas_number = models.CharField(max_length=12, blank=True, null=True)
    cl_inventory_id = models.IntegerField(blank=True, null=True)
    ec_number = models.CharField(max_length=10, blank=True, null=True)
    sourse = models.CharField(max_length=20, blank=True, null=True)
    substance = models.JSONField(blank=True, null=True)
    total_notifications = models.IntegerField(blank=True, null=True)
    ghs_class = models.JSONField(blank=True, null=True)
    nfpa_osha_class = models.JSONField(blank=True, null=True)
    id = models.BigAutoField(primary_key=True)

    def __str__(self):
        return str(self.substance['substanceNames'][0])

    class Meta:
        managed = True
        db_table = 'safety'
        verbose_name = 'Карточка опасности'
        verbose_name_plural = 'Карточки опасности'

