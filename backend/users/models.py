"""
User models for GreenTrace.
"""
from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _


class UserProfile(models.Model):
    """
    Extended user profile with role-based access control.
    """
    
    class UserRole(models.TextChoices):
        PUBLIC = 'public', _('Public User')
        PRIVATE = 'private', _('Private User')
        ENTERPRISE = 'enterprise', _('Enterprise Partner')
        ADMIN = 'admin', _('Administrator/Regulator')
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(
        max_length=20,
        choices=UserRole.choices,
        default=UserRole.PUBLIC,
        help_text=_('User access level')
    )
    
    # Organization details
    organization = models.CharField(max_length=200, blank=True, help_text=_('Organization name'))
    position = models.CharField(max_length=100, blank=True, help_text=_('Job position'))
    
    # Contact information
    phone = models.CharField(max_length=20, blank=True, help_text=_('Phone number'))
    address = models.TextField(blank=True, help_text=_('Address'))
    
    # Privacy preferences
    privacy_level = models.CharField(
        max_length=20,
        choices=UserRole.choices,
        default=UserRole.PUBLIC,
        help_text=_('Default privacy level')
    )
    
    # Blockchain integration
    wallet_address = models.CharField(
        max_length=42,
        blank=True,
        help_text=_('Blockchain wallet address')
    )
    blockchain_network = models.CharField(
        max_length=50,
        default='avalanche-fuji',
        help_text=_('Preferred blockchain network')
    )
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('User Profile')
        verbose_name_plural = _('User Profiles')
    
    def __str__(self):
        return f"{self.user.username} - {self.role}"
    
    def get_privacy_settings(self):
        """Get privacy settings based on user role."""
        if self.role == self.UserRole.PUBLIC:
            return {
                'show_sensitive_data': True,
                'show_producer_details': True,
                'show_iot_data': True,
                'show_carbon_details': True,
                'show_certification_details': True
            }
        elif self.role == self.UserRole.PRIVATE:
            return {
                'show_sensitive_data': False,
                'show_producer_details': False,
                'show_iot_data': False,
                'show_carbon_details': True,
                'show_certification_details': True
            }
        elif self.role == self.UserRole.ENTERPRISE:
            return {
                'show_sensitive_data': False,
                'show_producer_details': False,
                'show_iot_data': False,
                'show_carbon_details': False,
                'show_certification_details': False
            }
        else:  # ADMIN
            return {
                'show_sensitive_data': True,
                'show_producer_details': True,
                'show_iot_data': True,
                'show_carbon_details': True,
                'show_certification_details': True
            }
