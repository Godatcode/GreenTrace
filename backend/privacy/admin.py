"""
Admin configuration for privacy app.
"""
from django.contrib import admin
from .models import PrivacySettings, DataAccessLog


@admin.register(PrivacySettings)
class PrivacySettingsAdmin(admin.ModelAdmin):
    """Admin interface for PrivacySettings model."""
    
    list_display = [
        'user', 'level', 'eerc_compliant', 'data_retention_days', 'updated_at'
    ]
    
    list_filter = ['level', 'eerc_compliant', 'updated_at']
    
    search_fields = ['user__username', 'user__email']
    
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('User', {
            'fields': ('user',)
        }),
        ('Privacy Level', {
            'fields': ('level',)
        }),
        ('Data Visibility Controls', {
            'fields': (
                'show_sensitive_data', 'show_producer_details',
                'show_iot_data', 'show_carbon_details', 'show_certification_details'
            )
        }),
        ('eERC Compliance', {
            'fields': ('eerc_compliant', 'data_retention_days')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )


@admin.register(DataAccessLog)
class DataAccessLogAdmin(admin.ModelAdmin):
    """Admin interface for DataAccessLog model."""
    
    list_display = [
        'user', 'access_type', 'model_name', 'object_id', 
        'privacy_level', 'timestamp'
    ]
    
    list_filter = [
        'access_type', 'privacy_level', 'timestamp', 'data_sensitivity'
    ]
    
    search_fields = [
        'user__username', 'model_name', 'object_id', 'ip_address'
    ]
    
    readonly_fields = ['timestamp', 'ip_address', 'user_agent']
    
    fieldsets = (
        ('Access Details', {
            'fields': ('user', 'access_type', 'model_name', 'object_id')
        }),
        ('Data Accessed', {
            'fields': ('field_names', 'data_sensitivity')
        }),
        ('Privacy Context', {
            'fields': ('privacy_level',)
        }),
        ('Technical Details', {
            'fields': ('ip_address', 'user_agent', 'timestamp'),
            'classes': ('collapse',)
        })
    )
    
    def has_add_permission(self, request):
        """Access logs should not be manually created."""
        return False
    
    def has_change_permission(self, request, obj=None):
        """Access logs should not be modified."""
        return False
