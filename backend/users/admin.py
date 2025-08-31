"""
Admin configuration for users app.
"""
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import UserProfile


class UserProfileInline(admin.StackedInline):
    """Inline admin for UserProfile."""
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'Profile'


class UserAdmin(BaseUserAdmin):
    """Admin interface for User model with profile."""
    inlines = (UserProfileInline,)
    
    list_display = [
        'username', 'email', 'first_name', 'last_name', 
        'get_role', 'is_staff', 'is_active'
    ]
    
    list_filter = ['is_staff', 'is_superuser', 'is_active', 'groups']
    
    def get_role(self, obj):
        """Get user role from profile."""
        try:
            return obj.profile.role
        except UserProfile.DoesNotExist:
            return 'No Profile'
    get_role.short_description = 'Role'


# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    """Admin interface for UserProfile model."""
    
    list_display = [
        'user', 'role', 'organization', 'position', 
        'privacy_level', 'created_at'
    ]
    
    list_filter = ['role', 'privacy_level', 'created_at']
    
    search_fields = ['user__username', 'user__email', 'organization']
    
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('User', {
            'fields': ('user',)
        }),
        ('Role & Organization', {
            'fields': ('role', 'organization', 'position')
        }),
        ('Contact Information', {
            'fields': ('phone', 'address'),
            'classes': ('collapse',)
        }),
        ('Privacy Settings', {
            'fields': ('privacy_level',)
        }),
        ('Blockchain Integration', {
            'fields': ('wallet_address', 'blockchain_network'),
            'classes': ('collapse',)
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )
