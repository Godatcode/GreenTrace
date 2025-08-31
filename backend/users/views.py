"""
User views for GreenTrace.
"""
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.contrib.auth.models import User
import json
from .models import UserProfile


@csrf_exempt
@require_http_methods(["POST"])
def check_wallet_auth(request):
    """Check wallet authentication and return user role."""
    try:
        data = json.loads(request.body)
        wallet_address = data.get('wallet_address')
        network = data.get('network', 'avalanche-fuji')
        
        if not wallet_address:
            return JsonResponse({'error': 'Wallet address required'}, status=400)
        
        # Try to find user by wallet address
        try:
            profile = UserProfile.objects.get(wallet_address=wallet_address)
            user_data = {
                'username': profile.user.username,
                'email': profile.user.email,
                'role': profile.role,
                'organization': profile.organization,
                'position': profile.position,
                'wallet_address': profile.wallet_address,
                'blockchain_network': profile.blockchain_network,
                'privacy_level': profile.privacy_level,
                'is_authenticated': True
            }
            return JsonResponse(user_data)
        except UserProfile.DoesNotExist:
            # Create a new user profile for this wallet address
            # In production, you'd want more validation here
            user = User.objects.create_user(
                username=f"wallet_{wallet_address[:8]}",
                email=f"{wallet_address[:8]}@wallet.local",
                password="wallet_auth_placeholder"
            )
            
            profile = UserProfile.objects.create(
                user=user,
                role='public',  # Default role
                wallet_address=wallet_address,
                blockchain_network=network
            )
            
            user_data = {
                'username': profile.user.username,
                'email': profile.user.email,
                'role': profile.role,
                'organization': profile.organization,
                'position': profile.position,
                'wallet_address': profile.wallet_address,
                'blockchain_network': profile.blockchain_network,
                'privacy_level': profile.privacy_level,
                'is_authenticated': True,
                'new_user': True
            }
            return JsonResponse(user_data)
            
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@login_required
def profile_view(request):
    """User profile view."""
    try:
        profile = request.user.profile
    except UserProfile.DoesNotExist:
        profile = None
    
    context = {
        'user': request.user,
        'profile': profile
    }
    return render(request, 'users/profile.html', context)


@csrf_exempt
@require_http_methods(["POST"])
def update_profile(request):
    """Update user profile."""
    try:
        data = json.loads(request.body)
        wallet_address = data.get('wallet_address')
        
        if not wallet_address:
            return JsonResponse({'error': 'Wallet address required'}, status=400)
        
        try:
            profile = UserProfile.objects.get(wallet_address=wallet_address)
            
            # Update profile fields
            if 'organization' in data:
                profile.organization = data['organization']
            if 'position' in data:
                profile.position = data['position']
            if 'phone' in data:
                profile.phone = data['phone']
            if 'address' in data:
                profile.address = data['address']
            
            profile.save()
            
            return JsonResponse({
                'message': 'Profile updated successfully',
                'profile': {
                    'username': profile.user.username,
                    'role': profile.role,
                    'organization': profile.organization,
                    'position': profile.position,
                    'wallet_address': profile.wallet_address
                }
            })
            
        except UserProfile.DoesNotExist:
            return JsonResponse({'error': 'User profile not found'}, status=404)
            
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
