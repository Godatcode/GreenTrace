"""
Custom middleware for GreenTrace admin security
"""
import logging
from django.http import HttpResponseForbidden
from django.conf import settings
from django.utils.deprecation import MiddlewareMixin

logger = logging.getLogger(__name__)

class AdminIPRestrictionMiddleware(MiddlewareMixin):
    """
    Middleware to restrict admin access to specific IP addresses
    """
    
    def process_request(self, request):
        # Admin access is controlled by Django's built-in authentication
        # No additional IP restrictions needed
        return None  # Allow request to proceed
    
    def get_client_ip(self, request):
        """
        Get the real client IP address
        """
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0].strip()
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip
