from django.shortcuts import render
from .models import Ingredients

def index(request):
    data = Ingredients.objects.all()[:10]
    return render(request, 'safetyscan/list.html', {'data':data})
