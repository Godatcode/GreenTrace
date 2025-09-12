#!/usr/bin/env python
import os
import sys
import subprocess

def main():
    # Set environment variables
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'greentrace.settings')
    
    # Run database migrations
    print("Running database migrations...")
    subprocess.run([sys.executable, 'manage.py', 'migrate'], check=True)
    
    # Create a superuser if it doesn't exist
    print("Creating admin user...")
    create_admin_cmd = """
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@greentrace.com', 'admin123')
    print('Admin user created')
else:
    print('Admin user already exists')
"""
    subprocess.run([sys.executable, 'manage.py', 'shell', '-c', create_admin_cmd], check=True)
    
    # Collect static files
    print("Collecting static files...")
    subprocess.run([sys.executable, 'manage.py', 'collectstatic', '--noinput'], check=True)
    
    # Start the server
    print("Starting Django server...")
    port = os.environ.get('PORT', '8000')
    subprocess.run([sys.executable, 'manage.py', 'runserver', f'0.0.0.0:{port}'], check=True)

if __name__ == '__main__':
    main()
