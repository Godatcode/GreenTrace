#!/bin/bash

# Set environment variables
export DJANGO_SETTINGS_MODULE=greentrace.settings

# Run database migrations
echo "Running database migrations..."
python manage.py migrate

# Create a superuser if it doesn't exist (for admin access)
echo "Creating admin user..."
echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.filter(username='admin').exists() or User.objects.create_superuser('admin', 'admin@greentrace.com', 'admin123')" | python manage.py shell

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Start the server with Django dev server
echo "Starting Django server..."
python manage.py runserver 0.0.0.0:$PORT
