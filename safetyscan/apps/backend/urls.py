from django.urls import path
from . import views

urlpatterns = [
    path('api/text_field', views.TextSearchAPIView.as_view()),
    path('api/image_field', views.ImageSearchAPIView.as_view()),
    path('api/ingredient/<int:pk>', views.DetailAPIView.as_view())
]
