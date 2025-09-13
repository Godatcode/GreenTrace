"""
URL configuration for GreenTrace project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse, HttpResponse

def health_check(request):
    """Simple health check endpoint"""
    try:
        # Handle OPTIONS request for CORS
        if request.method == 'OPTIONS':
            response = JsonResponse({})
            response['Access-Control-Allow-Origin'] = '*'
            response['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
            response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
            return response
            
        response_data = {
            "status": "healthy", 
            "service": "GreenTrace Backend",
            "message": "Backend is working!",
            "url": request.get_full_path(),
            "method": request.method,
            "django_apps": [app.label for app in __import__('django.apps', fromlist=['apps']).apps.get_app_configs()]
        }
        
        response = JsonResponse(response_data)
        response['Access-Control-Allow-Origin'] = '*'
        return response
    except Exception as e:
        response_data = {
            "status": "error",
            "message": str(e),
            "url": request.get_full_path(),
            "method": request.method
        }
        response = JsonResponse(response_data)
        response['Access-Control-Allow-Origin'] = '*'
        return response

def test_endpoint(request):
    """Test endpoint for debugging"""
    return JsonResponse({
        "message": "Test endpoint working!",
        "url": request.get_full_path(),
        "method": request.method,
        "headers": dict(request.headers)
    })

def favicon_view(request):
    """Handle favicon.ico requests"""
    return HttpResponse(status=204)  # No content

urlpatterns = [
    path('', health_check, name='health_check'),
    path('test/', test_endpoint, name='test_endpoint'),
    path('favicon.ico', favicon_view, name='favicon'),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('api/auth/', include('users.urls')),
    path('api/products/', include('products.urls')),
    path('api/credits/', include('carbon_credits.urls')),
]

# Serve static and media files in development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Admin site customization
admin.site.site_header = "GreenTrace Admin"
admin.site.site_title = "GreenTrace Admin Portal"
admin.site.index_title = "Welcome to GreenTrace Administration"
