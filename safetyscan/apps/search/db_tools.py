#from django.contrib.postgres.search import SearchQuery, SearchVector, TrigramSimilarity
from django.db.models import Q, F, Prefetch, Count
from .models import *

class DBTools:
    # TODO доработать запросы по типу нескольких сит: все что не нашлось по
    #  точному совпадению нужно попробовать найти по триграммам
    #  сделать класс более удобным для использования разных аргументов через kwargs
    def __init__(self, **kwargs):
        self.kwargs = kwargs
        if 'text_block' in self.kwargs:
            print(self.kwargs)

    def get_query(self, **kwargs) -> Q:
        '''
        Cоставляем SQL запросы на базе Q объектов.
        Пока поддерживаются только точные совпадения на английском и без пробелов в начале и конце текста.
        '''
        # Комбинированный запрос по различным ключевым словам
        if 'text_block' in kwargs:
            text_block = kwargs['text_block']
            query = Q()
            if text_block.keywords:
                for word in text_block.keywords:
                    query = query | Q(data__synonyms__eng__contains=[word])
            if text_block.e_numbers:
                for e in text_block.e_numbers:
                    query = query | Q(data__eNumber__contains=e)
            if text_block.colour_index:
                for ci in text_block.colour_index:
                    query = query | Q(data__colourIndex__contains=[ci])
        # запрос ингредиента по pk
        elif 'pk' in kwargs:
            query = Q(pk=kwargs['pk'])

        return query

    def get_queryset(self, query: Q, update_statistics: bool):
        '''
        :query: Набор Q (объектов запроса)
        :update_statistic: При активации параметра будет обновлена статистика запросов по каждому найденному компоненту.
        Обращаемся к базе и возвращаем найденное'''
        # Запрос с прездагрузкой Hazard_GHS и GHS таблиц с фильтрацией неиспользуемых классов опасности
        haz_ghs_prefetch = Hazard_GHS.objects.select_related('ghs').filter(ghs__active_status=True)
        queryset = Ingredients.objects.filter(query).select_related('hazard').prefetch_related(
            Prefetch('hazard__hazard_ghs_set', queryset=haz_ghs_prefetch))

        if update_statistics and len(queryset) > 0:
            results_pk = queryset.values_list('pk', flat=True)
            self._update_statistics(pk_list=results_pk)

        return queryset

    def _update_statistics(self, pk_list) -> None:
        Ingredients.objects.filter(pk__in=pk_list).update(request_statistics=F('request_statistics') + 1)

