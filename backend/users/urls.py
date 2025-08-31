"""
User authentication and management URLs.
"""
from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    # Authentication views
    path('login/', auth_views.LoginView.as_view(template_name='users/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    
    # User management
    path('profile/', views.profile_view, name='profile'),
    
    # API endpoints
    path('check/', views.check_wallet_auth, name='check_wallet_auth'),
    path('update/', views.update_profile, name='update_profile'),
]
