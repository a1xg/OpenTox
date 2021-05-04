from django.shortcuts import render

def index(request):
    data = {
        'title': 'Главная страница',
        'values': ['some','hello','123'],
        'obj': {
            'car':'BMW',
            'age': 18,
            'hobby': 'Football'
        }
    }
    return render(request, 'safetyscan/index.html', data)

def about(request):
    return render(request, 'safetyscan/about.html')