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
        # Only apply to admin URLs (from settings for security)
        admin_path = getattr(settings, 'ADMIN_CUSTOM_PATH', 'admin')
        if request.path.startswith(f'/{admin_path}/'):
            # Get allowed IPs from settings
            allowed_ips = getattr(settings, 'ADMIN_ALLOWED_IPS', [])
            
            # If no IPs are configured, allow all (for development)
            if not allowed_ips:
                return None
            
            # Get client IP
            client_ip = self.get_client_ip(request)
            
            # Check if IP is allowed
            if client_ip not in allowed_ips:
                logger.warning(f"Admin access denied for IP: {client_ip}")
                return HttpResponseForbidden(
                    "<h1>Access Denied</h1><p>Your IP address is not authorized to access this area.</p>"
                )
            
            logger.info(f"Admin access granted for IP: {client_ip}")
        
        return None
    
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
