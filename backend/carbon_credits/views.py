"""
Carbon credit views for GreenTrace.
"""
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.contrib.auth.models import User
from users.models import UserProfile
import json
from .models import CarbonCredit


@csrf_exempt
@require_http_methods(["POST"])
def create_carbon_credit_api(request):
    """API endpoint to create carbon credits from frontend."""
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
        
        # Create the carbon credit
        credit = CarbonCredit.objects.create(
            amount=data.get('amount', 0),
            unit=data.get('unit', 'tonnes'),
            description=data.get('description', ''),
            carbon_offset=data.get('carbon_offset', ''),
            created_by=user,
            blockchain_network=data.get('blockchain_network', 'avalanche-fuji'),
            status='issued'
        )
        
        return JsonResponse({
            'success': True,
            'credit_id': credit.id,
            'message': 'Carbon credit created successfully'
        })
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


def carbon_credit_list(request):
    """Display list of carbon credits."""
    credits = CarbonCredit.objects.all().order_by('-created_at')
    return render(request, 'carbon_credits/credit_list.html', {'credits': credits})
