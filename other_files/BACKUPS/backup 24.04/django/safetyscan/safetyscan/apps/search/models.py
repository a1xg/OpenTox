from django.db import models
from django.contrib.postgres.indexes import GinIndex, BTreeIndex, GistIndex


class Ingredients(models.Model):
    '''Таблица ингридиентов'''
    data = models.JSONField(blank=True, null=True, db_index=True)
    safety = models.ForeignKey('Safety', models.DO_NOTHING, blank=True, null=True)
    main_name = models.CharField(max_length=300, blank=True, null=True, db_index=True)

    def __str__(self):
        return f'{self.main_name}'

    class Meta:
        managed = True
        db_table = 'ingredients'
        verbose_name = 'Ингредиент'
        verbose_name_plural = 'Ингредиенты'
        indexes = [
            GinIndex(fields=["data"], name="eng_synonyms_data_gin_idx",),
            BTreeIndex(fields=["main_name"], name="main_name_btree_idx",),
            GinIndex(fields=["main_name"], name="trgm_main_name_gin_idx", opclasses=['gin_trgm_ops'],),
         ]


class Safety(models.Model):
    '''Таблица безопасности ингридиентов'''
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

