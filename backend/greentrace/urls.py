"""
URL configuration for GreenTrace project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse, HttpResponse
import logging

logger = logging.getLogger(__name__)

def health_check(request):
    """Simple health check endpoint"""
    # Return a simple HTTP response
    return HttpResponse("GreenTrace Backend is working!", content_type="text/plain")

def test_endpoint(request):
    """Test endpoint for debugging"""
    return HttpResponse("Test endpoint working!", content_type="text/plain")

def favicon_view(request):
    """Handle favicon.ico requests"""
    return HttpResponse(status=204)  # No content

urlpatterns = [
    path('', health_check, name='health_check'),
    path('test/', test_endpoint, name='test_endpoint'),
    path('favicon.ico', favicon_view, name='favicon'),
    path('superadminarka/', admin.site.urls),  # Custom admin path
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
