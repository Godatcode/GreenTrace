"""
Product models with privacy controls and blockchain integration.
"""
from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _


class Product(models.Model):
    """
    Product model with privacy controls and blockchain integration.
    """
    
    class CertificationType(models.TextChoices):
        ORGANIC = 'organic', _('Organic')
        FAIR_TRADE = 'fair-trade', _('Fair Trade')
        RAINFOREST_ALLIANCE = 'rainforest-alliance', _('Rainforest Alliance')
        CARBON_NEUTRAL = 'carbon-neutral', _('Carbon Neutral')
        SUSTAINABLE = 'sustainable', _('Sustainable')
        REGENERATIVE_ORGANIC = 'regenerative-organic', _('Regenerative Organic')
        NONE = 'none', _('None')
    
    # Basic information (always visible)
    name = models.CharField(
        max_length=200,
        help_text=_('Product name')
    )
    batch_id = models.CharField(
        max_length=100,
        unique=True,
        help_text=_('Unique batch identifier')
    )
    certification = models.CharField(
        max_length=50,
        choices=CertificationType.choices,
        default=CertificationType.NONE,
        help_text=_('Product certification type')
    )
    
    # Private information (role-based visibility)
    location = models.CharField(
        max_length=500,
        blank=True,
        help_text=_('Production location')
    )
    producer = models.CharField(
        max_length=200,
        blank=True,
        help_text=_('Producer name or organization')
    )
    description = models.TextField(
        blank=True,
        help_text=_('Detailed product description')
    )
    carbon_activity = models.TextField(
        blank=True,
        help_text=_('Carbon reduction activities and sustainable practices')
    )
    iot_data = models.TextField(
        blank=True,
        help_text=_('IoT sensor data (temperature, humidity, soil data, etc.)')
    )
    
    # Privacy settings
    is_sensitive_data_public = models.BooleanField(
        default=False,
        help_text=_('Whether sensitive data is publicly visible')
    )
    is_producer_details_public = models.BooleanField(
        default=False,
        help_text=_('Whether producer details are publicly visible')
    )
    is_iot_data_public = models.BooleanField(
        default=False,
        help_text=_('Whether IoT data is publicly visible')
    )
    is_carbon_details_public = models.BooleanField(
        default=False,
        help_text=_('Whether carbon details are publicly visible')
    )
    
    # Blockchain integration
    blockchain_hash = models.CharField(
        max_length=66,
        blank=True,
        help_text=_('Blockchain transaction hash')
    )
    blockchain_network = models.CharField(
        max_length=50,
        default='avalanche-fuji',
        help_text=_('Blockchain network used')
    )
    
    # Metadata
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='created_products'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = _('Product')
        verbose_name_plural = _('Products')
    
    def __str__(self):
        return f"{self.name} (Batch: {self.batch_id})"
    
    def get_public_data(self):
        """Get data that is always publicly visible."""
        return {
            'id': self.id,
            'name': self.name,
            'batch_id': self.batch_id,
            'certification': self.certification,
            'created_at': self.created_at,
            'blockchain_hash': self.blockchain_hash,
        }
    
    def get_private_data(self, user):
        """Get private data based on user role and permissions."""
        data = self.get_public_data()
        
        # Add private data based on user permissions
        if user.can_view_sensitive_data():
            data.update({
                'location': self.location,
                'description': self.description,
            })
        
        if user.can_view_producer_details():
            data.update({
                'producer': self.producer,
            })
        
        if user.can_view_carbon_details():
            data.update({
                'carbon_activity': self.carbon_activity,
            })
        
        if user.can_view_iot_data():
            data.update({
                'iot_data': self.iot_data,
            })
        
        return data
    
    def get_privacy_summary(self):
        """Get summary of privacy settings."""
        return {
            'sensitive_data_public': self.is_sensitive_data_public,
            'producer_details_public': self.is_producer_details_public,
            'iot_data_public': self.is_iot_data_public,
            'carbon_details_public': self.is_carbon_details_public,
        }


class ProductAuditLog(models.Model):
    """
    Audit log for product data access and modifications.
    """
    
    class ActionType(models.TextChoices):
        CREATE = 'create', _('Create')
        UPDATE = 'update', _('Update')
        VIEW = 'view', _('View')
        DELETE = 'delete', _('Delete')
        DATA_ACCESS = 'data_access', _('Data Access')
    
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name='audit_logs'
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='product_audit_logs'
    )
    action = models.CharField(
        max_length=20,
        choices=ActionType.choices
    )
    details = models.JSONField(
        default=dict,
        help_text=_('Additional details about the action')
    )
    ip_address = models.GenericIPAddressField(blank=True, null=True)
    user_agent = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-timestamp']
        verbose_name = _('Product Audit Log')
        verbose_name_plural = _('Product Audit Logs')
    
    def __str__(self):
        return f"{self.product.name} - {self.get_action_display()} by {self.user.username} at {self.timestamp}"
