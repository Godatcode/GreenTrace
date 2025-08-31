"""
Privacy models for GreenTrace.
"""
from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _


class PrivacySettings(models.Model):
    """
    User privacy settings and preferences.
    """
    
    class PrivacyLevel(models.TextChoices):
        PUBLIC = 'public', _('Public')
        PRIVATE = 'private', _('Private')
        ENTERPRISE = 'enterprise', _('Enterprise')
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='privacy_settings')
    level = models.CharField(
        max_length=20,
        choices=PrivacyLevel.choices,
        default=PrivacyLevel.PUBLIC,
        help_text=_('Privacy level')
    )
    
    # Data visibility controls
    show_sensitive_data = models.BooleanField(
        default=True,
        help_text=_('Show sensitive product data')
    )
    show_producer_details = models.BooleanField(
        default=True,
        help_text=_('Show producer details')
    )
    show_iot_data = models.BooleanField(
        default=True,
        help_text=_('Show IoT sensor data')
    )
    show_carbon_details = models.BooleanField(
        default=True,
        help_text=_('Show carbon activity details')
    )
    show_certification_details = models.BooleanField(
        default=True,
        help_text=_('Show certification details')
    )
    
    # eERC compliance
    eerc_compliant = models.BooleanField(
        default=False,
        help_text=_('eERC compliance enabled')
    )
    data_retention_days = models.IntegerField(
        default=365,
        help_text=_('Data retention period in days')
    )
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = _('Privacy Settings')
        verbose_name_plural = _('Privacy Settings')
    
    def __str__(self):
        return f"{self.user.username} - {self.level}"
    
    def get_settings_dict(self):
        """Get privacy settings as a dictionary."""
        return {
            'level': self.level,
            'show_sensitive_data': self.show_sensitive_data,
            'show_producer_details': self.show_producer_details,
            'show_iot_data': self.show_iot_data,
            'show_carbon_details': self.show_carbon_details,
            'show_certification_details': self.show_certification_details,
            'eerc_compliant': self.eerc_compliant,
            'data_retention_days': self.data_retention_days
        }


class DataAccessLog(models.Model):
    """
    Log of data access for privacy compliance.
    """
    
    class AccessType(models.TextChoices):
        VIEW = 'view', _('View')
        CREATE = 'create', _('Create')
        UPDATE = 'update', _('Update')
        DELETE = 'delete', _('Delete')
    
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='data_access_logs'
    )
    access_type = models.CharField(
        max_length=20,
        choices=AccessType.choices
    )
    model_name = models.CharField(max_length=100, help_text=_('Model being accessed'))
    object_id = models.CharField(max_length=100, help_text=_('Object ID accessed'))
    field_names = models.JSONField(
        default=list,
        help_text=_('Fields accessed')
    )
    
    # Privacy context
    privacy_level = models.CharField(
        max_length=20,
        choices=PrivacySettings.PrivacyLevel.choices
    )
    data_sensitivity = models.CharField(
        max_length=20,
        help_text=_('Data sensitivity level')
    )
    
    # Metadata
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    user_agent = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-timestamp']
        verbose_name = _('Data Access Log')
        verbose_name_plural = _('Data Access Logs')
    
    def __str__(self):
        return f"{self.user.username} - {self.access_type} {self.model_name} at {self.timestamp}"
