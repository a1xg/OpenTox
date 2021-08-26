from django.shortcuts import render

def index(request):
    print(f'frontend view...')
    return render(request, 'frontend/index.html')

