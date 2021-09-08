#from django.contrib.postgres.search import SearchQuery, SearchVector, TrigramSimilarity
from django.db.models import Q, F, Prefetch
from .models import *

class DBQueries:
    # TODO доработать запросы по типу нескольких сит: все что не нашлось по
    #  точному совпадению нужно попробовать найти по триграммам
    def _get_query(self, **kwargs) -> Q:
        '''
        Cоставляем SQL запросы на базе Q объектов.
        Пока поддерживаются только точные совпадения на английском и без пробелов в начале и конце текста.
        '''
        # Комбинированный запрос по различным ключевым словам
        if kwargs.get('text_block'):
            text_block = kwargs['text_block']
            query = Q()
            if text_block.keywords:
                for word in text_block.keywords:
                    query = query | Q(main_name=word.upper())
                    query = query | Q(data__synonyms__eng__contains=[word])
            if text_block.e_numbers:
                for e in text_block.e_numbers:
                    query = query | Q(data__eNumber__contains=e)
            if text_block.colour_index:
                for ci in text_block.colour_index:
                    query = query | Q(data__colourIndex__contains=[ci])
        # запрос ингредиента по pk
        elif kwargs.get('pk'):
            query = Q(pk=kwargs['pk'])

        return query

    def _get_queryset(self, query: Q, **kwargs):
        '''
        :query: Набор Q (объектов запроса)
        '''
        # Запрос с прездагрузкой Hazard_GHS и GHS таблиц с фильтрацией неиспользуемых классов опасности
        haz_ghs_prefetch = Hazard_GHS.objects.select_related('ghs').filter(ghs__active_status=True)
        queryset = Ingredients.objects.filter(query).select_related('hazard').prefetch_related(
            Prefetch('hazard__hazard_ghs_set', queryset=haz_ghs_prefetch))

        if kwargs.get('update_statistics') == True and len(queryset) > 0:
            results_pk = queryset.values_list('pk', flat=True)
            self._update_statistics(pk_list=results_pk)

        return queryset

    def _update_statistics(self, pk_list) -> None:
        '''Обновление статистики запросов найденных элементов'''
        Ingredients.objects.filter(pk__in=pk_list).update(request_statistics=F('request_statistics') + 1)

    def search_in_db(self, **kwargs):
        '''
        :param kwargs:
            pk (int): pk ингридиента, если нужно получить 1 ингридиент.
            text_block (TextBlock): поиск нескольких ингридиентов из объекта TextBlock
            update_statistics (bool): если параметр установлен в положение True,
            то будет обновлен счетчик просмотра каждого элемента Queryset

        :return: QuerySet
        '''
        query = self._get_query(**kwargs)
        queryset = self._get_queryset(query,**kwargs)
        return queryset

