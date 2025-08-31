"""
Admin configuration for carbon credits app.
"""
from django.contrib import admin
from .models import CarbonCredit


@admin.register(CarbonCredit)
class CarbonCreditAdmin(admin.ModelAdmin):
    """Admin interface for CarbonCredit model."""
    
    list_display = [
        'id', 'amount', 'unit', 'issuer', 'recipient', 
        'status', 'verification_status', 'created_at'
    ]
    
    list_filter = [
        'status', 'verification_status', 'unit', 'created_at'
    ]
    
    search_fields = ['id', 'issuer', 'recipient', 'description']
    
    readonly_fields = ['created_at', 'updated_at', 'blockchain_hash']
    
    fieldsets = (
        ('Credit Information', {
            'fields': ('id', 'amount', 'unit', 'description', 'carbon_offset')
        }),
        ('Parties', {
            'fields': ('issuer', 'recipient')
        }),
        ('Status', {
            'fields': ('status', 'verification_status')
        }),
        ('Blockchain Integration', {
            'fields': ('blockchain_hash', 'blockchain_network'),
            'classes': ('collapse',)
        }),
        ('Metadata', {
            'fields': ('created_by', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
        ('Transfer/Retirement', {
            'fields': ('transferred_at', 'retired_at', 'reason'),
            'classes': ('collapse',)
        })
    )
    
    def save_model(self, request, obj, form, change):
        """Set created_by if creating new credit."""
        if not change:  # New credit
            obj.created_by = request.user
        super().save_model(request, obj, form, change)
