from django.db import models
from django.contrib.postgres.indexes import GinIndex, BTreeIndex, GistIndex

class Ingredient(models.Model):
    '''Таблица ингридиентов'''
    id = models.BigAutoField(primary_key=True)
    safety = models.ForeignKey('Safety', models.DO_NOTHING, blank=True, null=True)
    data = models.JSONField(blank=True, null=True, db_index=True)
    request_statistics = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.data['mainName']

    def cas_numbers(self):
        return self.data.get('casNumbers')

    def ec_numbers(self):
        return self.data.get('ecNumbers')

    def e_number(self):
        return self.data.get('eNumber')

    def safety_id(self):
        return self.safety

    def pubchem_cid(self):
        return self.data.get('pubchemCID')

    def functions(self):
        return  self.data.get('functions')

    def colour_index(self):
        return  self.data.get('colourIndex')


    class Meta:
        managed = True
        db_table = 'ingredients'
        verbose_name = 'Ингредиент'
        verbose_name_plural = 'Ингредиенты'
        indexes = [
            GinIndex(fields=["data"], name="enumber_gin_idx",),
            GinIndex(fields=["data"], name="colourindex_gin_idx",),
            GinIndex(fields=["data"], name="synonyms_eng_gin_idx",),
            #BTreeIndex(fields=["main_name"], name="main_name_btree_idx",),
            #GinIndex(fields=["main_name"], name="trgm_main_name_gin_idx", opclasses=['gin_trgm_ops'],),
         ]

class Safety(models.Model):
    '''Таблица безопасности ингридиентов'''
    id = models.BigAutoField(primary_key=True)
    substance = models.JSONField(blank=True, null=True)
    cas_number = models.CharField(max_length=12, blank=True, null=True)
    ec_number = models.CharField(max_length=10, blank=True, null=True)
    cl_inventory_id = models.IntegerField(blank=True, null=True)
    total_notifications = models.IntegerField(blank=True, null=True)
    #hazard_statement_codes = models.JSONField(blank=True, null=True)
    #hazard_class_and_categories = models.JSONField(blank=True, null=True)
    sourse = models.CharField(max_length=100, blank=True, null=True)
    hazard_data =  models.JSONField(blank=True, null=True)

    def __str__(self):
        return str(self.substance["substanceNames"][0])

    class Meta:
        managed = True
        db_table = 'safety'
        verbose_name = 'Карточка опасности'
        verbose_name_plural = 'Карточки опасности'

class GHS(models.Model):
    id = models.BigAutoField(primary_key=True)
    hazard_class = models.CharField(max_length=100, blank=True, null=True)
    abbreviation = models.CharField(max_length=20, blank=True, null=True)
    hazard_category = models.CharField(max_length=20, blank=True, null=True)
    hazard_code = models.CharField(max_length=20, blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return str(f'{self.abbreviation} {self.hazard_category}')

    class Meta:
        managed = True
        db_table = 'ghs'
        verbose_name = 'GHS'
        verbose_name_plural = "GHS's"

# TODO создать модель safety_ghs, Сделать для нее индекс b-tree

class Safety_GHS(models.Model):
    id = models.BigAutoField(primary_key=True)
    substance = models.ForeignKey(Safety, on_delete=models.CASCADE)
    ghs = models.ForeignKey(GHS, on_delete=models.CASCADE)
    number_of_notifiers = models.IntegerField(blank=True, null=True)
    confirmed_status = models.BooleanField(default=True)
