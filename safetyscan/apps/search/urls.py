from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('search_by_image', views.search_by_image, name='search_by_image'),
    path('text_search', views.text_search, name='text_search'),
    path('ingredient/<int:id>', views.ingredient_cart, name='ingredient'),
    path('api/', views.TestRequest.as_view()),
    path('api/v1/ingredients', views.IngredientsListView.as_view())
]
