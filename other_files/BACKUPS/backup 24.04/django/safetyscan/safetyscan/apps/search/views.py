from django.shortcuts import render
from .models import Ingredients
from .services import TextBlocksProcessing

def search_form(request):
    data = {
        'title':'Search form'
    }

    if request.method == 'POST':
        text = request.POST.get('data')
        lang = 'eng'
        print(f'search_form {text}')
        search = TextBlocksProcessing(data={lang:text})
        results = search.getData()
        data['results'] = results
        data['result_count'] = str(len(results))

    return render(request, 'safetyscan/search_form.html', data)

def search_result(request):
    data = {
        'results': get_data(request),
        'title': 'Результат поиска'
    }

    return render(request, 'safetyscan/search_result.html', data)