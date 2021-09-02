from django.urls import path
from . import views

urlpatterns = [
    path('', views.index)
    #path('api/ingredient/<int:id>', views.index)
]