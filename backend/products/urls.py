"""
Product management URLs.
"""
from django.urls import path
from . import views

urlpatterns = [
    # API endpoints
    path('api/create/', views.create_product_api, name='create_product_api'),
    
    # Product views
    path('', views.ProductListView.as_view(), name='product_list'),
    path('add/', views.ProductCreateView.as_view(), name='product_create'),
    path('<int:pk>/', views.ProductDetailView.as_view(), name='product_detail'),
    path('<int:pk>/edit/', views.ProductUpdateView.as_view(), name='product_update'),
    path('<int:pk>/delete/', views.ProductDeleteView.as_view(), name='product_delete'),
]
