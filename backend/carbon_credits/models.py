"""
Carbon credit models for GreenTrace.
"""
from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _


class CarbonCredit(models.Model):
    """
    Carbon credit model for tracking issuance, transfers, and retirement.
    """
    
    class CreditStatus(models.TextChoices):
        ISSUED = 'issued', _('Issued')
        TRANSFERRED = 'transferred', _('Transferred')
        RETIRED = 'retired', _('Retired')
    
    class VerificationStatus(models.TextChoices):
        PENDING = 'pending', _('Pending')
        VERIFIED = 'verified', _('Verified')
        REJECTED = 'rejected', _('Rejected')
    
    # Basic credit information
    id = models.CharField(max_length=20, primary_key=True, help_text=_('Unique credit identifier'))
    amount = models.DecimalField(max_digits=10, decimal_places=2, help_text=_('Credit amount'))
    unit = models.CharField(max_length=20, default='tonnes', help_text=_('Credit unit (tonnes, kg, etc.)'))
    
    # Issuer and recipient
    issuer = models.CharField(max_length=200, help_text=_('Credit issuer'))
    recipient = models.CharField(max_length=200, help_text=_('Credit recipient'))
    
    # Status and verification
    status = models.CharField(
        max_length=20,
        choices=CreditStatus.choices,
        default=CreditStatus.ISSUED,
        help_text=_('Current credit status')
    )
    verification_status = models.CharField(
        max_length=20,
        choices=VerificationStatus.choices,
        default=VerificationStatus.PENDING,
        help_text=_('Verification status')
    )
    
    # Credit details
    description = models.TextField(help_text=_('Credit description and methodology'))
    carbon_offset = models.TextField(help_text=_('Carbon offset activities and verification'))
    
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
        related_name='issued_credits'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Transfer and retirement details
    transferred_at = models.DateTimeField(null=True, blank=True)
    retired_at = models.DateTimeField(null=True, blank=True)
    reason = models.TextField(blank=True, help_text=_('Reason for retirement'))
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = _('Carbon Credit')
        verbose_name_plural = _('Carbon Credits')
    
    def __str__(self):
        return f"{self.id} - {self.amount} {self.unit} ({self.status})"
    
    def save(self, *args, **kwargs):
        """Auto-generate ID if not provided."""
        if not self.id:
            # Generate ID based on timestamp and amount
            import time
            timestamp = int(time.time())
            self.id = f"CC-{timestamp:06d}"
        super().save(*args, **kwargs)
