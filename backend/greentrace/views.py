"""
Custom views for GreenTrace
"""
from django.http import HttpResponse, HttpResponseNotFound
from django.shortcuts import render

def custom_404(request, exception=None):
    """
    Custom 404 handler that doesn't expose any debug information
    """
    return HttpResponseNotFound("""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Page Not Found</title>
        <style>
            body { 
                font-family: Arial, sans-serif; 
                text-align: center; 
                padding: 50px; 
                background-color: #f5f5f5;
            }
            .error-container {
                background: white;
                padding: 40px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                max-width: 500px;
                margin: 0 auto;
            }
            h1 { color: #333; margin-bottom: 20px; }
            p { color: #666; margin-bottom: 30px; }
            .home-link {
                display: inline-block;
                background: #007bff;
                color: white;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 4px;
            }
            .home-link:hover {
                background: #0056b3;
            }
        </style>
    </head>
    <body>
        <div class="error-container">
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <a href="/" class="home-link">Go Home</a>
        </div>
    </body>
    </html>
    """)

def custom_500(request):
    """
    Custom 500 handler that doesn't expose any debug information
    """
    return HttpResponse("""
    <!DOCTYPE html>
    <html>
    <head>
        <title>Server Error</title>
        <style>
            body { 
                font-family: Arial, sans-serif; 
                text-align: center; 
                padding: 50px; 
                background-color: #f5f5f5;
            }
            .error-container {
                background: white;
                padding: 40px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                max-width: 500px;
                margin: 0 auto;
            }
            h1 { color: #333; margin-bottom: 20px; }
            p { color: #666; margin-bottom: 30px; }
            .home-link {
                display: inline-block;
                background: #007bff;
                color: white;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 4px;
            }
            .home-link:hover {
                background: #0056b3;
            }
        </style>
    </head>
    <body>
        <div class="error-container">
            <h1>500 - Server Error</h1>
            <p>Something went wrong on our end. Please try again later.</p>
            <a href="/" class="home-link">Go Home</a>
        </div>
    </body>
    </html>
    """, status=500)
