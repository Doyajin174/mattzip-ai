from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('restaurant/<int:restaurant_id>/summary/', views.get_restaurant_summary, name='restaurant_summary'),
    path('restaurant/<int:restaurant_id>/collect_reviews/', views.collect_reviews, name='collect_reviews'),
]