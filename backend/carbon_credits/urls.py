"""
Carbon credit management URLs.
"""
from django.urls import path
from . import views

urlpatterns = [
    # API endpoints
    path('create/', views.create_carbon_credit_api, name='create_carbon_credit_api'),
    
    # Carbon credit views
    path('', views.carbon_credit_list, name='credit_list'),
]
