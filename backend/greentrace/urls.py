"""
URL configuration for GreenTrace project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
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
