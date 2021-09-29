from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('about/', views.index),
    path('how-use/', views.index),
    path('how-it-works/', views.index),
    path('contacts/', views.index),
    path('ingredient/<int:pk>', views.index),
]