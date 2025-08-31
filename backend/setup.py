#!/usr/bin/env python3
"""
Setup script for GreenTrace Django backend.
"""
import os
import subprocess
import sys

def run_command(command, description):
    """Run a command and handle errors."""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed: {e}")
        print(f"Error output: {e.stderr}")
        return False

def create_app_structure():
    """Create the Django app directory structure."""
    apps = ['users', 'products', 'carbon_credits', 'privacy', 'api']
    
    for app in apps:
        app_dir = f"{app}"
        if not os.path.exists(app_dir):
            os.makedirs(app_dir)
            print(f"📁 Created directory: {app_dir}")
        
        # Create __init__.py
        init_file = f"{app_dir}/__init__.py"
        if not os.path.exists(init_file):
            with open(init_file, 'w') as f:
                f.write(f"# {app} app\n")
            print(f"📄 Created: {init_file}")
        
        # Create models.py if it doesn't exist
        models_file = f"{app_dir}/models.py"
        if not os.path.exists(models_file):
            with open(models_file, 'w') as f:
                f.write(f"# {app} models\n")
            print(f"📄 Created: {models_file}")
        
        # Create admin.py if it doesn't exist
        admin_file = f"{app_dir}/admin.py"
        if not os.path.exists(admin_file):
            with open(admin_file, 'w') as f:
                f.write(f"# {app} admin\n")
            print(f"📄 Created: {admin_file}")
        
        # Create apps.py if it doesn't exist
        apps_file = f"{app_dir}/apps.py"
        if not os.path.exists(apps_file):
            with open(apps_file, 'w') as f:
                f.write(f"""from django.apps import AppConfig

class {app.capitalize()}Config(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = '{app}'
""")
            print(f"📄 Created: {apps_file}")

def main():
    """Main setup function."""
    print("🚀 Setting up GreenTrace Django Backend...")
    
    # Check if Python is available
    if not run_command("python --version", "Checking Python installation"):
        print("❌ Python is not available. Please install Python 3.8+")
        sys.exit(1)
    
    # Create app structure
    create_app_structure()
    
    # Install dependencies
    if not run_command("pip install -r requirements.txt", "Installing dependencies"):
        print("❌ Failed to install dependencies")
        sys.exit(1)
    
    # Create .env file if it doesn't exist
    env_file = ".env"
    if not os.path.exists(env_file):
        with open(env_file, 'w') as f:
            f.write("""DEBUG=True
SECRET_KEY=django-insecure-change-me-in-production
ALLOWED_HOSTS=localhost,127.0.0.1
""")
        print(f"📄 Created: {env_file}")
    
    # Create logs directory
    logs_dir = "logs"
    if not os.path.exists(logs_dir):
        os.makedirs(logs_dir)
        print(f"📁 Created directory: {logs_dir}")
    
    # Create static and media directories
    for dir_name in ['static', 'media', 'templates']:
        if not os.path.exists(dir_name):
            os.makedirs(dir_name)
            print(f"📁 Created directory: {dir_name}")
    
    print("\n🎉 Setup completed successfully!")
    print("\n📋 Next steps:")
    print("1. Run: python manage.py makemigrations")
    print("2. Run: python manage.py migrate")
    print("3. Run: python manage.py createsuperuser")
    print("4. Run: python manage.py runserver")
    print("\n🌐 Access the admin interface at: http://localhost:8000/admin/")

if __name__ == "__main__":
    main()
