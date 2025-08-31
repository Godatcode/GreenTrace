"""
Carbon credit management URLs.
"""
from django.urls import path
from . import views

urlpatterns = [
    # Carbon credit views
    path('', views.CarbonCreditListView.as_view(), name='credit_list'),
    path('issue/', views.CarbonCreditIssueView.as_view(), name='credit_issue'),
    path('<int:pk>/', views.CarbonCreditDetailView.as_view(), name='credit_detail'),
    path('<int:pk>/transfer/', views.CarbonCreditTransferView.as_view(), name='credit_transfer'),
    path('<int:pk>/retire/', views.CarbonCreditRetireView.as_view(), name='credit_retire'),
]
