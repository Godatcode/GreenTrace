"""
Admin configuration for products app.
"""
from django.contrib import admin
from .models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    """Admin interface for Product model."""
    
    list_display = [
        'name', 'batch_id', 'certification', 'created_by', 
        'created_at', 'is_sensitive_data_public'
    ]
    
    list_filter = [
        'certification', 'is_sensitive_data_public', 
        'is_producer_details_public', 'is_iot_data_public',
        'is_carbon_details_public', 'created_at'
    ]
    
    search_fields = ['name', 'batch_id', 'producer', 'description']
    
    readonly_fields = ['created_at', 'blockchain_hash', 'blockchain_network']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'batch_id', 'certification')
        }),
        ('Private Information', {
            'fields': ('location', 'producer', 'description', 'carbon_activity', 'iot_data'),
            'classes': ('collapse',)
        }),
        ('Privacy Settings', {
            'fields': (
                'is_sensitive_data_public', 'is_producer_details_public',
                'is_iot_data_public', 'is_carbon_details_public'
            )
        }),
        ('Blockchain Integration', {
            'fields': ('blockchain_hash', 'blockchain_network'),
            'classes': ('collapse',)
        }),
        ('Metadata', {
            'fields': ('created_by', 'created_at'),
            'classes': ('collapse',)
        })
    )
    
    def save_model(self, request, obj, form, change):
        """Set created_by if creating new product."""
        if not change:  # New product
            obj.created_by = request.user
        super().save_model(request, obj, form, change)
