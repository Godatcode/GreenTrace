# GreenTrace Django Backend

## Overview
Django backend for GreenTrace - Carbon Credit & Supply Chain Transparency Platform with advanced privacy controls and role-based access management.

## Features
- **User Authentication & Authorization** with role-based access control
- **Product Management** with privacy controls
- **Carbon Credit Registry** with verification system
- **REST API** for frontend integration
- **Admin Dashboard** for data management
- **Privacy Controls** with eERC compliance

## Architecture

### User Roles
```
🌐 PUBLIC USER
├── View public product data only
└── No sensitive information access

🔒 PRIVATE USER  
├── View public + private data
├── Producer details, descriptions
└── Basic carbon activity info

🏢 ENTERPRISE USER
├── View public + private + enterprise data
├── IoT sensor data, detailed carbon info
└── Business partner access

🔑 ADMIN/REGULATOR
└── View ALL data for compliance
```

### Data Privacy Model
- **On-Chain**: Public data (product name, batch ID, basic certification)
- **Off-Chain**: Private data (producer details, descriptions, IoT data)
- **Access Control**: Role-based visibility with audit trails

## Setup

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Environment Variables
Create `.env` file:
```env
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:pass@localhost/greentrace
REDIS_URL=redis://localhost:6379
```

### 3. Database Setup
```bash
python manage.py migrate
python manage.py createsuperuser
```

### 4. Run Development Server
```bash
python manage.py runserver
```

## API Endpoints

### Authentication
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `POST /api/auth/register/` - User registration

### Products
- `GET /api/products/` - List products (role-based access)
- `POST /api/products/` - Create product
- `GET /api/products/{id}/` - Get product details
- `PUT /api/products/{id}/` - Update product

### Carbon Credits
- `GET /api/credits/` - List carbon credits
- `POST /api/credits/` - Issue credit
- `PUT /api/credits/{id}/transfer/` - Transfer credit
- `PUT /api/credits/{id}/retire/` - Retire credit

## Models

### User Model
- Role-based permissions
- Privacy preferences
- Audit trail

### Product Model
- Basic info (name, batch ID, certification)
- Private data (producer, description, IoT data)
- Privacy settings
- Blockchain hash reference

### Carbon Credit Model
- Amount and unit
- Issuer and recipient
- Verification status
- Blockchain transaction hash

## Privacy Implementation

### Data Access Control
1. **Collection**: All data collected regardless of privacy settings
2. **Storage**: Data stored with privacy flags
3. **Access**: Role-based visibility with audit logging
4. **Compliance**: eERC standards for enterprise users

### Security Features
- JWT authentication
- Role-based permissions
- Data encryption for sensitive fields
- Audit trails for all data access
- GDPR compliance tools

## Development

### Running Tests
```bash
python manage.py test
```

### Code Quality
```bash
flake8 .
black .
isort .
```

### Database Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

## Deployment

### Production Settings
- Use PostgreSQL for production database
- Redis for caching and Celery
- Gunicorn as WSGI server
- Nginx for reverse proxy
- SSL/TLS encryption

### Environment Variables
```env
DEBUG=False
ALLOWED_HOSTS=your-domain.com
DATABASE_URL=postgresql://user:pass@prod-db/greentrace
REDIS_URL=redis://prod-redis:6379
SECRET_KEY=production-secret-key
```

## Contributing
1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Submit pull request

## License
MIT License - see LICENSE file for details
