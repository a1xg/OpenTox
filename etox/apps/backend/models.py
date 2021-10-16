from django.db import models
from django.contrib.postgres.indexes import GinIndex, BTreeIndex, GistIndex

# FIXME не работает поиск по main_name иногда не находятся синонимы в synonyms.eng, например 'advantame'

class Ingredients(models.Model):
    '''Table of ingredients'''
    id = models.BigAutoField(primary_key=True)
    main_name = models.CharField(max_length=300, blank=True, null=False)
    hazard = models.ForeignKey('Hazard', models.DO_NOTHING, blank=True, null=False)
    data = models.JSONField(blank=True, null=True, db_index=False)
    request_statistics = models.IntegerField(blank=True, null=False)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.main_name

    def hazard_id(self):
        return str(self.hazard)

    def cas_numbers(self):
        return self.data.get('casNumbers')

    def ec_numbers(self):
        return self.data.get('ecNumbers')

    def e_number(self):
        return self.data.get('eNumber')

    def pubchem_cid(self):
        return self.data.get('pubchemCID')

    def functions(self):
        return self.data.get('functions')

    def colour_index(self):
        return self.data.get('colourIndex')

    def synonyms(self):
        return self.data.get('synonyms')

    class Meta:
        managed = True
        db_table = 'ingredients'
        verbose_name = 'Ingredient'
        verbose_name_plural = 'Ingredients'
        indexes = [
            GinIndex(fields=["data"], name="enumber_gin_idx",),
            GinIndex(fields=["data"], name="colourindex_gin_idx",),
            GinIndex(fields=["data"], name="synonyms_eng_gin_idx",),
            BTreeIndex(fields=["main_name"], name="main_name_btree_idx",),
            #GinIndex(fields=["main_name"], name="trgm_main_name_gin_idx", opclasses=['gin_trgm_ops'],),
         ]


class GHS(models.Model):
    id = models.BigAutoField(primary_key=True)
    hazard_class = models.CharField(max_length=100, blank=True, null=False)
    hazard_subclass = models.CharField(max_length=100, blank=True, null=False)
    abbreviation = models.CharField(max_length=20, blank=True, null=False)
    hazard_category = models.CharField(max_length=20, blank=True, null=False)
    code = models.CharField(max_length=20, blank=True, null=False)
    description = models.TextField(blank=True, null=False)
    # user-defined hazard rating on a 10-point, ascending scale converted from 3-4 point ghs system
    hazard_scale_score = models.IntegerField(blank=True, null=False)
    active_status = models.BooleanField(default=True, null=False)
    def __str__(self):
        return f'{self.abbreviation} {self.hazard_category}'

    class Meta:
        managed = True
        db_table = 'ghs'
        verbose_name = 'GHS'
        verbose_name_plural = "GHS's"


class Hazard(models.Model):
    '''The table safety data of ingredients'''
    id = models.BigAutoField(primary_key=True)
    substance = models.JSONField(blank=True, null=False)
    cas_number = models.CharField(max_length=12, blank=True, null=True)
    ec_number = models.CharField(max_length=10, blank=True, null=True)
    cl_inventory_id = models.IntegerField(blank=True, null=False)
    total_notifications = models.IntegerField(blank=True, null=True)
    sourse = models.CharField(max_length=100, blank=True, null=True)
    ghs_data = models.ManyToManyField(GHS, through='Hazard_GHS')

    def __str__(self):
        return str(self.substance["substanceNames"][0])

    class Meta:
        managed = True
        db_table = 'hazard'
        verbose_name = 'Card of hazard'
        verbose_name_plural = 'Cards of hazard'


class Hazard_GHS(models.Model):
    id = models.BigAutoField(primary_key=True)
    hazard = models.ForeignKey(Hazard, on_delete=models.CASCADE, null=False)
    ghs = models.ForeignKey(GHS, on_delete=models.CASCADE, null=False)
    number_of_notifiers = models.IntegerField(blank=True, null=False)
    confirmed_status = models.BooleanField(default=True, null=False)

    def __str__(self):
        return str(self.id)

    class Meta:
        managed = True
        db_table = 'hazard_ghs'
        verbose_name = 'GHS notification related with ingredient'
        verbose_name_plural = "GHS notifications related with ingredients"
