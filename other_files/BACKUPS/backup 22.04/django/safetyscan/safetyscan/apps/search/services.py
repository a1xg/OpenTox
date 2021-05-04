from django.contrib.postgres.search import SearchQuery, SearchVector, TrigramSimilarity
from .models import Safety, Ingredients
from django.db.models import Q
import re
# Примеры запросов к полям jsonb
# Запрос слова из массива JSONB Ingredients.objects.filter(data__synonyms__eng__contains='dimethyl caproamide')
# Запрос слова из поля JSONB Ingredients.objects.filter(data__inchiKey='HNXNKTMIVROLTK-UHFFFAOYSA-N')
# Запрос из реляционного поля Ingredients.objects.filter(main_name='propylparaben')
# Запрос по триграммам Ingredients.objects.filter(main_name__trigram_similar="paraben")
# TODO написать эффективные запросы в базу, для начала слова после split объединить в 1
#  запрос SQL избавившись от цикла нескольких SQL запросов
#  прикрутить препроцессинг текста и разделение на слова, Е номера и CI номера
def get_data(text):
    '''Обращаемся к базе и возвращаем найденное'''

    cleared_text = re.sub(r'(,\s?)', '|', text).lower()
    cleared_text = re.sub(r'(\s{2}|\')', '', cleared_text)
    word_list = cleared_text.split('|')

    query = Q(data__synonyms__eng__contains=[word_list[0]])
    for word in word_list[1:]:
        query |= Q(data__synonyms__eng__contains=[word])
    results = Ingredients.objects.filter(query)
    print(results)
    '''
    results = Ingredients.objects.filter(data__synonyms__eng__overlap=word_list)
    '''
    print(results)
    return results