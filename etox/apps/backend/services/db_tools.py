# from django.contrib.postgres.search import SearchQuery, SearchVector, TrigramSimilarity
from django.db.models import Q, F, Prefetch
from ..models import *

# The module builds database queries based on delimited clean text.
# Queries are written for various database fields - relational and non-relational fields.
# The module is engaged in sending requests and updating the statistics of requests.

# TODO implement inaccurate search (trigram),
#  make the search conditional: if the word is not found by exact match, then you need to try to find it by trigrams


class DBQueries:
    def _get_query(self, **kwargs) -> Q:
        """
        We compose a SQL query based on Q objects.
        So far, only exact matches in English and no spaces at the beginning and end of the text are supported.
        """
        # Combined query for different keywords.
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
        # request ingredient by pk
        elif kwargs.get('pk'):
            query = Q(pk=kwargs['pk'])

        return query

    def _get_queryset(self, query: Q, **kwargs):
        """
        :query:  collection of Q objects (query objects)
        """
        # Query with preloading of Hazard_GHS and GHS tables with filtering of unused hazard classes.
        haz_ghs_prefetch = Hazard_GHS.objects.select_related('ghs').filter(ghs__active_status=True)
        queryset = Ingredients.objects.filter(query).select_related('hazard').prefetch_related(
            Prefetch('hazard__hazard_ghs_set', queryset=haz_ghs_prefetch))

        if kwargs.get('update_statistics') == True and len(queryset) > 0:
            results_pk = queryset.values_list('pk', flat=True)
            self._update_statistics(pk_list=results_pk)

        return queryset

    def _update_statistics(self, pk_list) -> None:
        """Updating query statistics for found items"""
        Ingredients.objects.filter(pk__in=pk_list).update(request_statistics=F('request_statistics') + 1)

    def search_in_db(self, **kwargs):
        """
        :param kwargs:
            pk (int): pk of ingredient if you want get one ingredient
            text_block (TextBlock): finding multiple ingredients from a TextBlock object data
            update_statistics (bool): if param value set to True -
            Update statistics of search requests counter of ingredient in QuerySet object.

        :return: QuerySet
        """
        query = self._get_query(**kwargs)
        queryset = self._get_queryset(query, **kwargs)
        return queryset
