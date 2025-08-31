"""
Product views for GreenTrace.
"""
from django.views.generic import ListView, CreateView, UpdateView, DeleteView, DetailView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.shortcuts import redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views.decorators.http import require_http_methods
from django.contrib.auth.models import User
from .models import Product
from users.models import UserProfile
import json


@csrf_exempt
@require_http_methods(["POST"])
def create_product_api(request):
    """API endpoint to create products from frontend."""
    try:
        data = json.loads(request.body)
        
        # Create or get user based on wallet address
        wallet_address = data.get('wallet_address')
        if not wallet_address:
            return JsonResponse({'error': 'Wallet address required'}, status=400)
        
        # Try to find existing user with this wallet address
        try:
            user_profile = UserProfile.objects.get(wallet_address=wallet_address)
            user = user_profile.user
        except UserProfile.DoesNotExist:
            # Create new user if not found
            username = f"user_{wallet_address[:8]}"
            user = User.objects.create_user(
                username=username,
                email=f"{username}@greentrace.local",
                password=None  # No password for wallet-based auth
            )
            # Create user profile
            UserProfile.objects.create(
                user=user,
                wallet_address=wallet_address,
                role='public',
                blockchain_network=data.get('blockchain_network', 'avalanche-fuji')
            )
        
        # Create the product
        product = Product.objects.create(
            name=data.get('name'),
            batch_id=data.get('batch_id'),
            location=data.get('location', ''),
            producer=data.get('producer', ''),
            description=data.get('description', ''),
            carbon_activity=data.get('carbon_activity', ''),
            iot_data=data.get('iot_data', ''),
            certification=data.get('certification', ''),
            created_by=user,
            blockchain_network=data.get('blockchain_network', 'avalanche-fuji'),
            # Set privacy defaults based on user role
            is_sensitive_data_public=True,
            is_producer_details_public=True,
            is_iot_data_public=True,
            is_carbon_details_public=True
        )
        
        return JsonResponse({
            'success': True,
            'product_id': product.id,
            'message': 'Product created successfully'
        })
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


class ProductListView(LoginRequiredMixin, ListView):
    """Display list of products with privacy controls."""
    model = Product
    template_name = 'products/product_list.html'
    context_object_name = 'products'
    
    def get_queryset(self):
        """Filter products based on user role and privacy settings."""
        queryset = Product.objects.all()
        
        # Apply privacy filters based on user role
        if not self.request.user.is_staff:
            # Regular users see only public data
            queryset = queryset.filter(
                is_sensitive_data_public=True,
                is_producer_details_public=True,
                is_iot_data_public=True,
                is_carbon_details_public=True
            )
        
        return queryset


class ProductCreateView(LoginRequiredMixin, CreateView):
    """Create new product."""
    model = Product
    template_name = 'products/product_form.html'
    fields = [
        'name', 'batch_id', 'certification', 'location', 'producer',
        'description', 'carbon_activity', 'iot_data',
        'is_sensitive_data_public', 'is_producer_details_public',
        'is_iot_data_public', 'is_carbon_details_public'
    ]
    success_url = reverse_lazy('product_list')
    
    def form_valid(self, form):
        """Set the created_by field to current user."""
        form.instance.created_by = self.request.user
        return super().form_valid(form)


class ProductDetailView(LoginRequiredMixin, DetailView):
    """Display product details with privacy controls."""
    model = Product
    template_name = 'products/product_detail.html'
    context_object_name = 'product'
    
    def get_context_data(self, **kwargs):
        """Add privacy context for template."""
        context = super().get_context_data(**kwargs)
        context['user_can_see_all'] = self.request.user.is_staff
        return context


class ProductUpdateView(LoginRequiredMixin, UpdateView):
    """Update existing product."""
    model = Product
    template_name = 'products/product_form.html'
    fields = [
        'name', 'batch_id', 'certification', 'location', 'producer',
        'description', 'carbon_activity', 'iot_data',
        'is_sensitive_data_public', 'is_producer_details_public',
        'is_iot_data_public', 'is_carbon_details_public'
    ]
    success_url = reverse_lazy('product_list')


class ProductDeleteView(LoginRequiredMixin, DeleteView):
    """Delete product."""
    model = Product
    template_name = 'products/product_confirm_delete.html'
    success_url = reverse_lazy('product_list')
