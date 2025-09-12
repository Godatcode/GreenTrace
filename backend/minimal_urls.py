"""
Minimal URL configuration for testing deployment.
"""
from django.contrib import admin
from django.urls import path
from django.http import JsonResponse

def health_check(request):
    """Simple health check endpoint"""
    return JsonResponse({
        "status": "healthy", 
        "service": "GreenTrace Backend",
        "message": "Backend is working!",
        "url": request.get_full_path(),
        "method": request.method
    })

def test_endpoint(request):
    """Test endpoint for debugging"""
    return JsonResponse({
        "message": "Test endpoint working!",
        "url": request.get_full_path(),
        "method": request.method
    })

urlpatterns = [
    path('', health_check, name='health_check'),
    path('test/', test_endpoint, name='test_endpoint'),
    path('admin/', admin.site.urls),
]
