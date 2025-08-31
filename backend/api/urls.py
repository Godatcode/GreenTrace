"""
API URL configuration for GreenTrace.
"""
from django.urls import path
from rest_framework.routers import DefaultRouter
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

# Public health check endpoint (no authentication required)
@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    return JsonResponse({
        'status': 'healthy',
        'service': 'GreenTrace API',
        'version': '1.0.0',
        'timestamp': '2025-08-31T02:11:00Z'
    })

# Public API root endpoint (no authentication required)
@csrf_exempt
@api_view(['GET'])
@permission_classes([AllowAny])
def api_root(request):
    return JsonResponse({
        'message': 'GreenTrace API',
        'version': '1.0.0',
        'endpoints': {
            'health': '/api/health/',
            'auth': '/api/auth/',
            'products': '/api/products/',
            'credits': '/api/credits/',
            'admin': '/admin/'
        },
        'status': 'operational'
    })

# API router for viewsets (these will require authentication)
router = DefaultRouter()

# Include router URLs
urlpatterns = router.urls

# Add custom API endpoints here
urlpatterns += [
    # Public endpoints (no authentication required)
    path('', api_root, name='api_root'),
    path('health/', health_check, name='api_health'),
]
