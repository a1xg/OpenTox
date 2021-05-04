from django.urls import path, include
from . import views
urlpatterns = [
    path('', views.search_form),
    path('request/', views.search_result)
]