# 👨‍💻 GreenTrace Developer Guide

> **Complete developer documentation for building and extending the GreenTrace platform**

## 📋 **Table of Contents**

1. [Architecture Overview](#-architecture-overview)
2. [Development Setup](#-development-setup)
3. [Frontend Development](#-frontend-development)
4. [Backend Development](#-backend-development)
5. [Smart Contract Development](#-smart-contract-development)
6. [API Development](#-api-development)
7. [Testing](#-testing)
8. [Deployment](#-deployment)

## 🏗️ **Architecture Overview**

### **System Architecture**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Blockchain    │
│   (React)       │◄──►│   (Django)      │◄──►│   (Solidity)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Browser  │    │   PostgreSQL    │    │   Avalanche     │
│   (MetaMask)    │    │   Database      │    │   Network       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **Technology Stack**
- **Frontend**: React 18 + TypeScript + Ethers.js
- **Backend**: Django 4.2 + Django REST Framework
- **Database**: PostgreSQL + Redis (caching)
- **Blockchain**: Solidity + Hardhat + Avalanche
- **Deployment**: Docker + Nginx + Gunicorn

## 🛠️ **Development Setup**

### **Prerequisites**
```bash
# Node.js 18+
node --version

# Python 3.11+
python3 --version

# Git
git --version

# MetaMask (browser extension)
# PostgreSQL 12+
# Redis 6+
```

### **Repository Setup**
```bash
git clone https://github.com/yourusername/greentrace.git
cd greentrace

# Install dependencies
npm install
cd frontend && npm install
cd ../backend && pip install -r requirements.txt
```

### **Environment Configuration**
```bash
# Frontend (.env)
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_BLOCKCHAIN_NETWORK=avalanche-fuji

# Backend (.env)
DEBUG=True
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:pass@localhost/greentrace
```

## ⚛️ **Frontend Development**

### **Component Structure**
```
src/
├── components/
│   ├── Dashboard/
│   ├── Products/
│   ├── CarbonCredits/
│   ├── Compliance/
│   └── Regulator/
├── hooks/
├── types/
├── utils/
└── contracts/
```

### **Key Components**

#### **Dashboard Component**
```typescript
import React, { useState, useEffect } from 'react';
import { useBlockchain } from '../hooks/useBlockchain';

export const Dashboard: React.FC = () => {
  const { productRegistry, carbonCredit } = useBlockchain();
  const [metrics, setMetrics] = useState<SystemMetrics>();

  useEffect(() => {
    if (productRegistry) {
      fetchSystemMetrics();
    }
  }, [productRegistry]);

  return (
    <div className="dashboard">
      {/* Dashboard content */}
    </div>
  );
};
```

#### **Blockchain Integration**
```typescript
// hooks/useBlockchain.ts
export const useBlockchain = () => {
  const [contracts, setContracts] = useState<Contracts>();
  
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      const productRegistry = new ethers.Contract(
        PRODUCT_REGISTRY_ADDRESS,
        ProductRegistryABI,
        signer
      );
      
      setContracts({ productRegistry });
    }
  };

  return { ...contracts, connectWallet };
};
```

### **State Management**
```typescript
// Using React Context for global state
const AppContext = createContext<AppContextType>();

export const AppProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [products, setProducts] = useState<Product[]>([]);
  
  return (
    <AppContext.Provider value={{ user, products, setUser, setProducts }}>
      {children}
    </AppContext.Provider>
  );
};
```

## 🐍 **Backend Development**

### **Django Project Structure**
```
backend/
├── greentrace/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── products/
├── carbon_credits/
├── users/
├── compliance/
└── api/
```

### **Models Example**
```python
# products/models.py
from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
    name = models.CharField(max_length=200)
    batch_id = models.CharField(max_length=100, unique=True)
    location = models.CharField(max_length=200)
    producer = models.CharField(max_length=200)
    description = models.TextField()
    carbon_activity = models.CharField(max_length=100)
    certification = models.CharField(max_length=100)
    blockchain_hash = models.CharField(max_length=66)
    compliance_score = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.batch_id}"
```

### **API Views**
```python
# products/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
@api_view(['POST'])
def create_product_api(request):
    try:
        data = request.data
        wallet_address = data.get('wallet_address')
        
        if not wallet_address:
            return Response({'error': 'Wallet address required'}, status=400)
        
        # Create product
        product = Product.objects.create(
            name=data['name'],
            batch_id=data['batch_id'],
            location=data['location'],
            producer=data['producer'],
            description=data['description'],
            carbon_activity=data['carbon_activity'],
            certification=data['certification'],
            blockchain_hash=data.get('blockchain_hash', '')
        )
        
        return Response({
            'success': True,
            'product_id': product.id,
            'message': 'Product created successfully'
        })
        
    except Exception as e:
        return Response({'error': str(e)}, status=500)
```

### **URL Configuration**
```python
# products/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.create_product_api, name='create_product_api'),
    path('', views.product_list_api, name='product_list_api'),
    path('<int:product_id>/', views.product_detail_api, name='product_detail_api'),
]
```

## ⛓️ **Smart Contract Development**

### **Contract Structure**
```solidity
// contracts/ProductRegistry.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ProductRegistry {
    struct Product {
        string name;
        string batchId;
        string location;
        string producer;
        string description;
        string carbonActivity;
        string certification;
        uint256 timestamp;
        address creator;
    }
    
    mapping(string => Product) public products;
    mapping(address => string[]) public userProducts;
    
    event ProductRegistered(
        string indexed batchId,
        string name,
        address indexed creator,
        uint256 timestamp
    );
    
    function registerProduct(
        string memory _name,
        string memory _batchId,
        string memory _location,
        string memory _producer,
        string memory _description,
        string memory _carbonActivity,
        string memory _certification
    ) public {
        require(bytes(_batchId).length > 0, "Batch ID cannot be empty");
        require(products[_batchId].timestamp == 0, "Product already exists");
        
        products[_batchId] = Product({
            name: _name,
            batchId: _batchId,
            location: _location,
            producer: _producer,
            description: _description,
            carbonActivity: _carbonActivity,
            certification: _certification,
            timestamp: block.timestamp,
            creator: msg.sender
        });
        
        userProducts[msg.sender].push(_batchId);
        
        emit ProductRegistered(_batchId, _name, msg.sender, block.timestamp);
    }
}
```

### **Contract Deployment**
```typescript
// scripts/deploy.ts
import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const ProductRegistry = await ethers.getContractFactory("ProductRegistry");
  const productRegistry = await ProductRegistry.deploy();
  await productRegistry.deployed();
  console.log("ProductRegistry deployed to:", productRegistry.address);

  const CarbonCredit = await ethers.getContractFactory("CarbonCredit");
  const carbonCredit = await CarbonCredit.deploy();
  await carbonCredit.deployed();
  console.log("CarbonCredit deployed to:", carbonCredit.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

### **Contract Testing**
```typescript
// test/ProductRegistry.ts
import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, ContractFactory, Signer } from "ethers";

describe("ProductRegistry", function () {
  let ProductRegistry: ContractFactory;
  let productRegistry: Contract;
  let owner: Signer;
  let addr1: Signer;

  beforeEach(async function () {
    ProductRegistry = await ethers.getContractFactory("ProductRegistry");
    [owner, addr1] = await ethers.getSigners();
    productRegistry = await ProductRegistry.deploy();
  });

  it("Should register a product", async function () {
    const tx = await productRegistry.registerProduct(
      "Test Product",
      "BATCH001",
      "Test Location",
      "Test Producer",
      "Test Description",
      "Carbon Neutral",
      "Organic"
    );
    
    await tx.wait();
    
    const product = await productRegistry.products("BATCH001");
    expect(product.name).to.equal("Test Product");
  });
});
```

## 🔌 **API Development**

### **REST API Endpoints**
```python
# API endpoints structure
/api/
├── products/
│   ├── create/          # POST - Create new product
│   ├── list/            # GET - List all products
│   └── {id}/            # GET - Get product details
├── credits/
│   ├── create/          # POST - Issue carbon credits
│   ├── list/            # GET - List all credits
│   └── {id}/            # GET - Get credit details
├── compliance/
│   ├── products/        # GET - Get compliance data
│   └── update-score/    # POST - Update compliance score
└── auth/
    ├── check/           # POST - Check wallet auth
    └── update/          # POST - Update user profile
```

### **API Response Format**
```python
# Standard API response structure
{
    "success": True,
    "data": {
        # Response data
    },
    "message": "Operation successful",
    "timestamp": "2024-12-31T10:00:00Z"
}

# Error response
{
    "success": False,
    "error": "Error message",
    "error_code": "ERROR_CODE",
    "timestamp": "2024-12-31T10:00:00Z"
}
```

### **Authentication & Permissions**
```python
# Custom permission class
from rest_framework.permissions import BasePermission

class WalletAuthenticated(BasePermission):
    def has_permission(self, request, view):
        wallet_address = request.data.get('wallet_address')
        return wallet_address is not None

# Usage in views
@permission_classes([WalletAuthenticated])
def create_product_api(request):
    # View logic
    pass
```

## 🧪 **Testing**

### **Frontend Testing**
```bash
# Run tests
cd frontend
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- ProductForm.test.tsx
```

### **Backend Testing**
```bash
# Run all tests
cd backend
python3 manage.py test

# Run specific app tests
python3 manage.py test products

# Run with coverage
coverage run --source='.' manage.py test
coverage report
```

### **Smart Contract Testing**
```bash
# Run all tests
npx hardhat test

# Run specific test file
npx hardhat test test/ProductRegistry.ts

# Run with gas reporting
REPORT_GAS=true npx hardhat test
```

### **Integration Testing**
```typescript
// test/integration.ts
describe("Full Integration Test", function () {
  it("Should create product and verify on blockchain", async function () {
    // 1. Create product via API
    const productData = {
      name: "Integration Test Product",
      batch_id: "INTEGRATION001",
      // ... other fields
    };
    
    const response = await fetch('/api/products/create/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    
    expect(response.status).to.equal(200);
    
    // 2. Verify on blockchain
    const product = await productRegistry.products("INTEGRATION001");
    expect(product.name).to.equal("Integration Test Product");
  });
});
```

## 🚀 **Deployment**

### **Frontend Build**
```bash
cd frontend
npm run build

# Build output in build/ directory
# Deploy to static hosting (Vercel, Netlify, etc.)
```

### **Backend Deployment**
```bash
cd backend

# Collect static files
python3 manage.py collectstatic

# Run migrations
python3 manage.py migrate

# Start production server
gunicorn greentrace.wsgi:application --bind 0.0.0.0:8000
```

### **Docker Deployment**
```bash
# Build and run with Docker Compose
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### **Environment Variables**
```bash
# Production environment
DEBUG=False
SECRET_KEY=your-production-secret
DATABASE_URL=postgresql://user:pass@host/db
ALLOWED_HOSTS=yourdomain.com
CORS_ALLOWED_ORIGINS=https://yourdomain.com
```

## 📚 **Additional Resources**

### **Documentation**
- **API Reference**: [docs.greentrace.com/api](https://docs.greentrace.com/api)
- **User Guide**: [docs.greentrace.com/user](https://docs.greentrace.com/user)
- **Deployment Guide**: [docs.greentrace.com/deploy](https://docs.greentrace.com/deploy)

### **Development Tools**
- **Hardhat**: [hardhat.org](https://hardhat.org)
- **Ethers.js**: [docs.ethers.io](https://docs.ethers.io)
- **Django**: [docs.djangoproject.com](https://docs.djangoproject.com)
- **React**: [reactjs.org](https://reactjs.org)

### **Community & Support**
- **GitHub**: [github.com/yourusername/greentrace](https://github.com/yourusername/greentrace)
- **Discord**: [discord.gg/greentrace](https://discord.gg/greentrace)
- **Issues**: [github.com/yourusername/greentrace/issues](https://github.com/yourusername/greentrace/issues)

---

**For developer support, contact our engineering team at dev@greentrace.com**
