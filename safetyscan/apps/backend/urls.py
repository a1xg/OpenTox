from django.urls import path
from . import views

urlpatterns = [
    path('bootstrap', views.index, name='index'),
    path('search_by_image', views.search_by_image, name='search_by_image'),
    path('text_search', views.text_search, name='text_search'),
    path('ingredient/<int:id>', views.ingredient_cart, name='ingredient'),
    path('api/text_field', views.TextSearchAPIView.as_view()),
    path('api/image_field', views.ImageSearchAPIView.as_view()),
    path('api/ingredient/<int:pk>', views.DetailAPIView.as_view()),
    path('api/test', views.TestAPIView.as_view())
]
