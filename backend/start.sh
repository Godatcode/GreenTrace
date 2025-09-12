#!/bin/bash

# Run database migrations
python manage.py migrate

# Create a superuser if it doesn't exist (for admin access)
echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.filter(username='admin').exists() or User.objects.create_superuser('admin', 'admin@greentrace.com', 'admin123')" | python manage.py shell

# Start the server
python manage.py runserver 0.0.0.0:$PORT
