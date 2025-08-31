#!/usr/bin/env python3
"""
Demonstration of GreenTrace Django backend privacy controls.
"""
import os
import sys
import django

# Add the project directory to Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'greentrace.settings')
django.setup()

from users.models import User
from products.models import Product


def demonstrate_privacy_controls():
    """
    Demonstrate how privacy controls work in the Django backend.
    """
    print("🔐 GreenTrace Privacy Controls Demonstration")
    print("=" * 50)
    
    # Create sample users with different roles
    print("\n👥 Creating sample users...")
    
    # Public user
    public_user, created = User.objects.get_or_create(
        username='public_user',
        defaults={
            'email': 'public@example.com',
            'role': User.UserRole.PUBLIC,
            'show_sensitive_data': False,
            'show_producer_details': False,
            'show_iot_data': False,
            'show_carbon_details': False,
            'show_certification_details': False,
        }
    )
    if created:
        public_user.set_password('password123')
        public_user.save()
        print("✅ Created public user")
    
    # Private user
    private_user, created = User.objects.get_or_create(
        username='private_user',
        defaults={
            'email': 'private@example.com',
            'role': User.UserRole.PRIVATE,
            'show_sensitive_data': True,
            'show_producer_details': True,
            'show_iot_data': False,
            'show_carbon_details': True,
            'show_certification_details': True,
        }
    )
    if created:
        private_user.set_password('password123')
        private_user.save()
        print("✅ Created private user")
    
    # Enterprise user
    enterprise_user, created = User.objects.get_or_create(
        username='enterprise_user',
        defaults={
            'email': 'enterprise@example.com',
            'role': User.UserRole.ENTERPRISE,
            'show_sensitive_data': True,
            'show_producer_details': True,
            'show_iot_data': True,
            'show_carbon_details': True,
            'show_certification_details': True,
        }
    )
    if created:
        enterprise_user.set_password('password123')
        enterprise_user.save()
        print("✅ Created enterprise user")
    
    # Admin user
    admin_user, created = User.objects.get_or_create(
        username='admin_user',
        defaults={
            'email': 'admin@example.com',
            'role': User.UserRole.ADMIN,
            'show_sensitive_data': True,
            'show_producer_details': True,
            'show_iot_data': True,
            'show_carbon_details': True,
            'show_certification_details': True,
        }
    )
    if created:
        admin_user.set_password('password123')
        admin_user.save()
        print("✅ Created admin user")
    
    # Create a sample product with complete data
    print("\n🌱 Creating sample product...")
    product, created = Product.objects.get_or_create(
        batch_id='DEMO-BATCH-001',
        defaults={
            'name': 'Organic Tomatoes',
            'location': 'Green Valley Farms, California',
            'producer': 'Green Valley Farms Inc.',
            'description': 'Fresh organic tomatoes grown using sustainable farming practices',
            'carbon_activity': 'Reduced tillage, cover crops, organic fertilizers, carbon sequestration',
            'iot_data': 'Temperature: 22°C, Humidity: 65%, Soil pH: 6.5, Soil moisture: 35%',
            'certification': 'organic',
            'created_by': admin_user,
            'blockchain_hash': '0x1234567890abcdef...',
        }
    )
    if created:
        print("✅ Created sample product")
    
    # Demonstrate data access for different user roles
    print("\n🔍 Demonstrating data access for different user roles:")
    print("-" * 60)
    
    users = [public_user, private_user, enterprise_user, admin_user]
    user_names = ['Public User', 'Private User', 'Enterprise User', 'Admin User']
    
    for user, user_name in zip(users, user_names):
        print(f"\n👤 {user_name} ({user.role.upper()})")
        print(f"   Privacy Settings: {user.get_privacy_settings()}")
        
        # Get data based on user permissions
        accessible_data = product.get_private_data(user)
        
        print(f"   📊 Accessible Data:")
        for key, value in accessible_data.items():
            if value:
                print(f"      • {key}: {str(value)[:50]}{'...' if len(str(value)) > 50 else ''}")
            else:
                print(f"      • {key}: [No data]")
    
    # Show how hidden data can be accessed
    print("\n🔑 How Hidden Data is Accessed:")
    print("-" * 40)
    print("1. 🌐 Public User: Can only see basic product info")
    print("2. 🔒 Private User: Can see producer details and descriptions")
    print("3. 🏢 Enterprise User: Can see IoT data and carbon details")
    print("4. 🔑 Admin User: Can see ALL data for compliance")
    
    print("\n💡 Key Benefits of Django Backend:")
    print("-" * 40)
    print("✅ Complete data storage - no information loss")
    print("✅ Role-based access control - flexible permissions")
    print("✅ Audit trails - track all data access")
    print("✅ Admin interface - easy user and data management")
    print("✅ API endpoints - integrate with React frontend")
    print("✅ Database security - encrypted sensitive data")
    print("✅ GDPR compliance - privacy controls built-in")
    
    print("\n🚀 Next Steps:")
    print("-" * 20)
    print("1. Run Django migrations: python manage.py migrate")
    print("2. Create superuser: python manage.py createsuperuser")
    print("3. Start Django server: python manage.py runserver")
    print("4. Access admin at: http://localhost:8000/admin/")
    print("5. Integrate with React frontend via API endpoints")


if __name__ == "__main__":
    try:
        demonstrate_privacy_controls()
    except Exception as e:
        print(f"❌ Error: {e}")
        print("Make sure Django is properly set up and migrations are applied.")
