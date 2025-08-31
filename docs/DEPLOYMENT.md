# 🚀 GreenTrace Deployment Guide

> **Complete deployment guide for production and development environments**

## 📋 **Table of Contents**

1. [Prerequisites](#-prerequisites)
2. [Development Environment](#-development-environment)
3. [Production Deployment](#-production-deployment)
4. [Docker Deployment](#-docker-deployment)
5. [Cloud Deployment](#-cloud-deployment)
6. [Monitoring & Maintenance](#-monitoring--maintenance)
7. [Troubleshooting](#-troubleshooting)

## 🔧 **Prerequisites**

### **System Requirements**
- **OS**: Ubuntu 20.04+ / CentOS 8+ / macOS 12+
- **CPU**: 2+ cores (4+ recommended for production)
- **RAM**: 4GB+ (8GB+ recommended for production)
- **Storage**: 20GB+ available space
- **Network**: Stable internet connection

### **Software Requirements**
- **Node.js**: 16.x or 18.x LTS
- **Python**: 3.8+ (3.11+ recommended)
- **PostgreSQL**: 12+ (for production)
- **Redis**: 6+ (for caching and sessions)
- **Nginx**: 1.18+ (for production)
- **Git**: Latest version

### **Blockchain Requirements**
- **MetaMask**: For wallet integration
- **Avalanche Fuji**: Testnet for development
- **Avalanche Mainnet**: For production (optional)
- **Test AVAX**: For development testing

## 🛠️ **Development Environment**

### **1. Local Development Setup**

#### **Clone Repository**
```bash
git clone https://github.com/yourusername/greentrace.git
cd greentrace
```

#### **Frontend Setup**
```bash
cd frontend
npm install
npm start
```

#### **Backend Setup**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Set up environment variables
cp env.example .env
# Edit .env with your configuration

# Run migrations
python3 manage.py migrate

# Create superuser
python3 manage.py createsuperuser

# Start development server
python3 manage.py runserver
```

#### **Smart Contract Deployment**
```bash
# Install Hardhat dependencies
npm install

# Configure network in hardhat.config.ts
# Add your private key to .env

# Deploy contracts
npx hardhat run scripts/deploy.ts --network fuji

# Copy contract addresses to frontend/src/App.tsx
```

### **2. Environment Configuration**

#### **Frontend Environment (.env)**
```bash
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_BLOCKCHAIN_NETWORK=avalanche-fuji
REACT_APP_PRODUCT_REGISTRY_ADDRESS=0x...
REACT_APP_CARBON_CREDIT_ADDRESS=0x...
```

#### **Backend Environment (.env)**
```bash
DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
BLOCKCHAIN_NETWORK=avalanche-fuji
```

## 🚀 **Production Deployment**

### **1. Server Preparation**

#### **Update System**
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git build-essential
```

#### **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### **Install Python**
```bash
sudo apt install -y python3 python3-pip python3-venv
sudo apt install -y python3-dev libpq-dev
```

#### **Install PostgreSQL**
```bash
sudo apt install -y postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### **Install Redis**
```bash
sudo apt install -y redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

#### **Install Nginx**
```bash
sudo apt install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### **2. Application Deployment**

#### **Create Application User**
```bash
sudo adduser greentrace
sudo usermod -aG sudo greentrace
sudo su - greentrace
```

#### **Clone Application**
```bash
git clone https://github.com/yourusername/greentrace.git
cd greentrace
```

#### **Frontend Build**
```bash
cd frontend
npm install
npm run build
```

#### **Backend Setup**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install gunicorn psycopg2-binary

# Set up environment variables
cp env.example .env
# Edit .env for production
```

#### **Production Environment (.env)**
```bash
DEBUG=False
SECRET_KEY=your-production-secret-key
DATABASE_URL=postgresql://greentrace:password@localhost/greentrace
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
CORS_ALLOWED_ORIGINS=https://yourdomain.com
BLOCKCHAIN_NETWORK=avalanche-mainnet
```

### **3. Database Setup**

#### **PostgreSQL Configuration**
```bash
sudo -u postgres psql
CREATE DATABASE greentrace;
CREATE USER greentrace WITH PASSWORD 'your-password';
GRANT ALL PRIVILEGES ON DATABASE greentrace TO greentrace;
\q
```

#### **Run Migrations**
```bash
cd backend
source venv/bin/activate
python3 manage.py migrate
python3 manage.py collectstatic
```

### **4. Gunicorn Configuration**

#### **Create Gunicorn Service**
```bash
sudo nano /etc/systemd/system/greentrace.service
```

**Service Configuration:**
```ini
[Unit]
Description=GreenTrace Gunicorn daemon
After=network.target

[Service]
User=greentrace
Group=www-data
WorkingDirectory=/home/greentrace/greentrace/backend
Environment="PATH=/home/greentrace/greentrace/backend/venv/bin"
ExecStart=/home/greentrace/greentrace/backend/venv/bin/gunicorn --workers 3 --bind unix:/home/greentrace/greentrace/backend/greentrace.sock greentrace.wsgi:application

[Install]
WantedBy=multi-user.target
```

#### **Start Gunicorn Service**
```bash
sudo systemctl start greentrace
sudo systemctl enable greentrace
sudo systemctl status greentrace
```

### **5. Nginx Configuration**

#### **Create Nginx Site Configuration**
```bash
sudo nano /etc/nginx/sites-available/greentrace
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Frontend
    location / {
        root /home/greentrace/greentrace/frontend/build;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://unix:/home/greentrace/greentrace/backend/greentrace.sock;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Admin interface
    location /admin/ {
        proxy_pass http://unix:/home/greentrace/greentrace/backend/greentrace.sock;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Static files
    location /static/ {
        alias /home/greentrace/greentrace/backend/static/;
    }
}
```

#### **Enable Site**
```bash
sudo ln -s /etc/nginx/sites-available/greentrace /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### **6. SSL Certificate (Let's Encrypt)**

#### **Install Certbot**
```bash
sudo apt install -y certbot python3-certbot-nginx
```

#### **Obtain SSL Certificate**
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## 🐳 **Docker Deployment**

### **1. Docker Compose Setup**

#### **Create docker-compose.yml**
```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:8000/api
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DEBUG=False
      - DATABASE_URL=postgresql://greentrace:password@db/greentrace
    depends_on:
      - db
      - redis
    volumes:
      - ./backend:/app
      - static_volume:/app/static

  db:
    image: postgres:13
    environment:
      - POSTGRES_DB=greentrace
      - POSTGRES_USER=greentrace
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:6-alpine
    ports:
      - "6379:6379"

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend

volumes:
  postgres_data:
  static_volume:
```

#### **Frontend Dockerfile**
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
```

#### **Backend Dockerfile**
```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
RUN python manage.py collectstatic --noinput

EXPOSE 8000
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "greentrace.wsgi:application"]
```

#### **Deploy with Docker**
```bash
# Build and start services
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## ☁️ **Cloud Deployment**

### **1. AWS Deployment**

#### **EC2 Instance Setup**
```bash
# Launch EC2 instance (t3.medium or larger)
# Ubuntu 20.04 LTS
# Security Group: HTTP(80), HTTPS(443), SSH(22)
```

#### **Install Dependencies**
```bash
sudo apt update
sudo apt install -y python3 python3-pip python3-venv nginx postgresql redis-server
```

#### **Deploy Application**
```bash
# Follow the production deployment steps above
# Use AWS RDS for PostgreSQL
# Use AWS ElastiCache for Redis
# Use AWS Certificate Manager for SSL
```

#### **Auto Scaling Group**
```bash
# Create Launch Template
# Configure Auto Scaling Group
# Set up CloudWatch monitoring
```

### **2. Google Cloud Platform**

#### **Compute Engine Setup**
```bash
# Create VM instance
# Ubuntu 20.04 LTS
# Allow HTTP/HTTPS traffic
```

#### **Cloud SQL Setup**
```bash
# Create PostgreSQL instance
# Configure connection
# Update DATABASE_URL in .env
```

#### **Deploy with Cloud Build**
```bash
# Create cloudbuild.yaml
# Set up Cloud Build trigger
# Configure automatic deployment
```

### **3. Azure Deployment**

#### **App Service Setup**
```bash
# Create App Service Plan
# Deploy backend to App Service
# Configure environment variables
```

#### **Static Web Apps**
```bash
# Deploy frontend to Static Web Apps
# Configure API routing
# Set up custom domain
```

## 📊 **Monitoring & Maintenance**

### **1. System Monitoring**

#### **Install Monitoring Tools**
```bash
sudo apt install -y htop iotop nethogs
sudo apt install -y prometheus node-exporter
```

#### **Log Management**
```bash
# Configure log rotation
sudo nano /etc/logrotate.d/greentrace

# Monitor logs
sudo journalctl -u greentrace -f
sudo tail -f /var/log/nginx/access.log
```

### **2. Database Maintenance**

#### **PostgreSQL Maintenance**
```bash
# Connect to database
sudo -u postgres psql greentrace

# Analyze tables
ANALYZE;

# Vacuum database
VACUUM FULL;

# Check database size
SELECT pg_size_pretty(pg_database_size('greentrace'));
```

#### **Backup Strategy**
```bash
# Create backup script
#!/bin/bash
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)
sudo -u postgres pg_dump greentrace > $BACKUP_DIR/greentrace_$DATE.sql

# Add to crontab
0 2 * * * /path/to/backup-script.sh
```

### **3. Performance Optimization**

#### **Nginx Optimization**
```nginx
# Add to nginx.conf
gzip on;
gzip_types text/plain text/css application/json application/javascript;
client_max_body_size 10M;
```

#### **Django Optimization**
```python
# settings.py
DEBUG = False
ALLOWED_HOSTS = ['yourdomain.com']
STATIC_ROOT = '/path/to/static/'
MEDIA_ROOT = '/path/to/media/'

# Database optimization
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'greentrace',
        'USER': 'greentrace',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '5432',
        'CONN_MAX_AGE': 600,
        'OPTIONS': {
            'MAX_CONNS': 20,
        }
    }
}
```

## 🔧 **Troubleshooting**

### **1. Common Issues**

#### **Gunicorn Won't Start**
```bash
# Check service status
sudo systemctl status greentrace

# Check logs
sudo journalctl -u greentrace -f

# Check permissions
sudo chown -R greentrace:www-data /home/greentrace/greentrace
```

#### **Nginx Configuration Error**
```bash
# Test configuration
sudo nginx -t

# Check error logs
sudo tail -f /var/log/nginx/error.log
```

#### **Database Connection Issues**
```bash
# Test PostgreSQL connection
sudo -u postgres psql -d greentrace

# Check PostgreSQL status
sudo systemctl status postgresql
```

### **2. Performance Issues**

#### **Slow Response Times**
```bash
# Check system resources
htop
iotop
nethogs

# Check database performance
sudo -u postgres psql greentrace
EXPLAIN ANALYZE SELECT * FROM products;
```

#### **Memory Issues**
```bash
# Check memory usage
free -h
sudo systemctl status greentrace

# Restart services if needed
sudo systemctl restart greentrace
sudo systemctl restart nginx
```

### **3. Security Issues**

#### **SSL Certificate Problems**
```bash
# Check certificate status
sudo certbot certificates

# Renew certificate
sudo certbot renew

# Check SSL configuration
sudo nginx -t
```

#### **Firewall Configuration**
```bash
# Check UFW status
sudo ufw status

# Allow necessary ports
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 22
```

## 📚 **Additional Resources**

- **Official Documentation**: [docs.greentrace.com](https://docs.greentrace.com)
- **GitHub Repository**: [github.com/yourusername/greentrace](https://github.com/yourusername/greentrace)
- **Community Support**: [discord.gg/greentrace](https://discord.gg/greentrace)
- **Issue Tracker**: [github.com/yourusername/greentrace/issues](https://github.com/yourusername/greentrace/issues)

---

**For deployment support, contact our DevOps team at devops@greentrace.com**
