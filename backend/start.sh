#!/bin/bash

# Set environment variables
export DJANGO_SETTINGS_MODULE=greentrace.settings

# Find Python executable
PYTHON_CMD=$(which python3 || which python || echo "python3")

# Run database migrations
echo "Running database migrations..."
$PYTHON_CMD manage.py migrate

# Create a superuser if it doesn't exist (for admin access)
echo "Creating admin user..."
echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.filter(username='admin').exists() or User.objects.create_superuser('admin', 'admin@greentrace.com', 'admin123')" | $PYTHON_CMD manage.py shell

# Collect static files
echo "Collecting static files..."
$PYTHON_CMD manage.py collectstatic --noinput

# Start the server with Django dev server (simpler for Railway)
echo "Starting Django server..."
$PYTHON_CMD manage.py runserver 0.0.0.0:$PORT
