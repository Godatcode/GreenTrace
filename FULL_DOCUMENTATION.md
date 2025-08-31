# 🌱 GreenTrace - Complete Platform Documentation

> **Comprehensive documentation for the GreenTrace supply chain transparency platform**

## 📋 **Table of Contents**

1. [Project Overview](#project-overview)
2. [Architecture & Technology](#architecture--technology)
3. [Features & Functionality](#features--functionality)
4. [Installation & Setup](#installation--setup)
5. [User Guide](#user-guide)
6. [Developer Guide](#developer-guide)
7. [API Reference](#api-reference)
8. [Deployment Guide](#deployment-guide)
9. [Testing & Quality](#testing--quality)
10. [Troubleshooting](#troubleshooting)

---

## 🏆 **Project Overview**

**GreenTrace** is a comprehensive, production-ready platform that revolutionizes supply chain transparency through blockchain technology, real-time compliance monitoring, and carbon credit management.

### **Key Value Propositions**
- **🌍 Carbon Footprint Tracking**: Real-time monitoring of environmental impact
- **🔒 Supply Chain Transparency**: Blockchain-verified product provenance
- **⚡ Compliance Automation**: AI-driven compliance scoring and monitoring
- **🌐 Cross-Chain Interoperability**: Multi-blockchain data synchronization

### **Target Use Cases**
- **Enterprise Supply Chains**: Large-scale product tracking and compliance
- **Sustainability Reporting**: Carbon credit management and verification
- **Regulatory Compliance**: Automated compliance monitoring and reporting
- **Consumer Transparency**: Product origin and sustainability verification

---

## 🏗️ **Architecture & Technology**

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

#### **Frontend (React + TypeScript)**
- **React 18**: Modern UI framework with hooks
- **TypeScript**: Type-safe development
- **Ethers.js**: Blockchain interaction library
- **Advanced UI Components**: Professional dashboard layouts
- **Responsive Design**: Cross-device compatibility

#### **Backend (Django + Python)**
- **Django 4.2**: Robust web framework
- **Django REST Framework**: API development
- **PostgreSQL**: Production database
- **Redis**: Caching and sessions
- **User Authentication**: Role-based access control

#### **Blockchain (Solidity + Hardhat)**
- **Solidity 0.8.19**: Smart contract language
- **Hardhat**: Development environment
- **Avalanche Fuji**: Testnet deployment
- **Cross-Chain Support**: Multi-network interoperability
- **Gas Optimization**: Efficient smart contracts

---

## ✨ **Features & Functionality**

### **Core Features**

#### **1. Product Management**
- **Product Registration**: End-to-end blockchain product tracking
- **Batch Management**: Production batch identification and tracking
- **Geographic Tracking**: Location-based product verification
- **Producer Verification**: Supplier authenticity validation
- **Certification Tracking**: Quality standard verification

#### **2. Carbon Credit Management**
- **Credit Issuance**: Create new carbon credits
- **Credit Transfer**: Transfer credits between parties
- **Credit Retirement**: Permanently remove credits
- **Lifecycle Tracking**: Complete credit history
- **Environmental Impact**: Carbon offset verification

#### **3. Compliance Center**
- **Real-Time Monitoring**: Live compliance score updates
- **Risk Assessment**: Automated risk factor analysis
- **Compliance Scoring**: Algorithmic score calculation
- **Alert System**: Instant violation notifications
- **Report Generation**: Comprehensive compliance reports

#### **4. Regulator Dashboard**
- **Compliance Oversight**: Regulatory monitoring tools
- **Audit Capabilities**: Complete audit trail access
- **Score Modification**: Regulator score updates
- **Investigation Tools**: Product and batch analysis
- **Regulatory Reporting**: Official compliance documentation

#### **5. Cross-Chain Sync**
- **Multi-Blockchain Support**: Ethereum, Polygon, BSC, Avalanche
- **Data Synchronization**: Cross-network data replication
- **Proof Generation**: Cryptographic verification
- **Network Interoperability**: Seamless cross-chain operations

### **Advanced Features**

#### **Real-Time Updates**
- **Blockchain Monitoring**: Live transaction confirmations
- **Compliance Alerts**: Instant score change notifications
- **System Metrics**: Live performance monitoring
- **User Notifications**: Real-time status updates

#### **Privacy & Security**
- **Role-Based Access**: Enterprise-grade permissions
- **Data Privacy**: Configurable visibility controls
- **Audit Trails**: Complete action history
- **Blockchain Security**: Immutable transaction records

---

## 🚀 **Installation & Setup**

### **Prerequisites**
- **Node.js**: 16.x or 18.x LTS
- **Python**: 3.8+ (3.11+ recommended)
- **PostgreSQL**: 12+ (for production)
- **Redis**: 6+ (for caching)
- **MetaMask**: Browser wallet extension
- **Git**: Latest version

### **Quick Start**

#### **1. Clone Repository**
```bash
git clone https://github.com/yourusername/greentrace.git
cd greentrace
```

#### **2. Frontend Setup**
```bash
cd frontend
npm install
npm start
```

#### **3. Backend Setup**
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

# Start development server
python3 manage.py runserver
```

#### **4. Smart Contract Deployment**
```bash
# Install Hardhat dependencies
npm install

# Configure network in hardhat.config.ts
# Add your private key to .env

# Deploy contracts
npx hardhat run scripts/deploy.ts --network fuji

# Copy contract addresses to frontend/src/App.tsx
```

### **Environment Configuration**

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

---

## 📱 **User Guide**

### **Getting Started**

#### **1. Platform Access**
- **URL**: [https://greentrace.com](https://greentrace.com)
- **Browser Support**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: Responsive design for all devices

#### **2. First-Time Setup**
1. **Connect Wallet**: Click "Connect Wallet" and select MetaMask
2. **Network Configuration**: Ensure Avalanche Fuji testnet is added
3. **Account Creation**: Your wallet address becomes your user ID
4. **Profile Setup**: Complete your organization and role information

#### **3. MetaMask Setup**
1. **Install MetaMask**: [metamask.io](https://metamask.io)
2. **Add Avalanche Fuji Testnet**:
   - Network Name: `Avalanche Fuji Testnet`
   - RPC URL: `https://api.avax-test.network/ext/bc/C/rpc`
   - Chain ID: `43113`
   - Currency Symbol: `AVAX`
3. **Get Test AVAX**: Visit [faucet.avax.network](https://faucet.avax.network)

### **User Roles & Permissions**

#### **Role Hierarchy**
1. **Enterprise User**: Full product and credit management
2. **Producer**: Product registration, basic compliance
3. **Regulator**: Compliance oversight, audit capabilities
4. **Auditor**: Compliance review, reporting
5. **Viewer**: Read-only access to public data

#### **Permission Matrix**
| Feature | Enterprise | Producer | Regulator | Auditor | Viewer |
|---------|------------|----------|-----------|---------|---------|
| Add Product | ✅ | ✅ | ❌ | ❌ | ❌ |
| Issue Credits | ✅ | ❌ | ❌ | ❌ | ❌ |
| Update Compliance | ❌ | ❌ | ✅ | ✅ | ❌ |
| View All Data | ✅ | ✅ | ✅ | ✅ | ❌ |
| Export Reports | ✅ | ✅ | ✅ | ✅ | ❌ |

### **Platform Walkthrough**

#### **🌱 Add Product**
1. Connect MetaMask wallet
2. Click "Add Product"
3. Fill product details (name, batch ID, carbon activity)
4. Submit to blockchain
5. Real-time confirmation and tracking

#### **🌿 Carbon Credit Management**
1. Open Carbon Credit Manager
2. Issue new credits with blockchain verification
3. Transfer credits between parties
4. Retire credits with audit trail
5. Real-time balance updates

#### **🔒 Compliance Center**
1. Monitor real-time compliance scores
2. View automated risk assessments
3. Track compliance history
4. Generate compliance reports
5. Real-time alerts and notifications

#### **🔍 Regulator Dashboard**
1. Access advanced compliance tools
2. Update compliance scores
3. Generate audit reports
4. Monitor supply chain health
5. Export regulatory documentation

---

## 👨‍💻 **Developer Guide**

### **Development Setup**

#### **Repository Structure**
```
greentrace/
├── frontend/           # React frontend application
├── backend/            # Django backend application
├── contracts/          # Solidity smart contracts
├── docs/              # Documentation files
├── scripts/            # Deployment and utility scripts
└── test/               # Test files
```

#### **Frontend Development**
```typescript
// Component structure
src/
├── components/         # React components
├── hooks/             # Custom React hooks
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── contracts/         # Contract ABIs and addresses
```

#### **Backend Development**
```python
# Django project structure
backend/
├── greentrace/        # Main project settings
├── products/          # Product management app
├── carbon_credits/    # Carbon credit management app
├── users/             # User management app
├── compliance/        # Compliance monitoring app
└── api/               # API endpoints
```

### **Smart Contract Development**

#### **Contract Architecture**
```solidity
// ProductRegistry.sol - Product tracking contract
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
    
    function registerProduct(
        string memory _name,
        string memory _batchId,
        // ... other parameters
    ) public {
        // Product registration logic
    }
}
```

#### **Contract Deployment**
```typescript
// scripts/deploy.ts
import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  
  const ProductRegistry = await ethers.getContractFactory("ProductRegistry");
  const productRegistry = await ProductRegistry.deploy();
  
  console.log("ProductRegistry deployed to:", productRegistry.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

### **Testing**

#### **Frontend Testing**
```bash
cd frontend
npm test                    # Run all tests
npm test -- --coverage     # Run with coverage
npm test -- ProductForm.test.tsx  # Run specific test
```

#### **Backend Testing**
```bash
cd backend
python3 manage.py test     # Run all tests
python3 manage.py test products  # Run specific app tests
coverage run --source='.' manage.py test  # Run with coverage
```

#### **Smart Contract Testing**
```bash
npx hardhat test           # Run all tests
npx hardhat test test/ProductRegistry.ts  # Run specific test
REPORT_GAS=true npx hardhat test  # Run with gas reporting
```

---

## 🔌 **API Reference**

### **Base URL**
```
Development: http://localhost:8000/api/
Production: https://api.greentrace.com/api/
```

### **Authentication**
GreenTrace uses blockchain wallet addresses for authentication. All API requests require a valid wallet address in the request body.

```json
{
  "wallet_address": "0x1234...5678",
  "network": "avalanche-fuji"
}
```

### **Core Endpoints**

#### **Product Management**
- **POST** `/api/products/create/` - Create new product
- **GET** `/api/products/` - List all products
- **GET** `/api/products/{id}/` - Get product details

#### **Carbon Credits**
- **POST** `/api/credits/create/` - Issue new carbon credits
- **GET** `/api/credits/` - List all carbon credits

#### **Compliance**
- **GET** `/api/compliance/products/` - Get compliance data
- **POST** `/api/compliance/update-score/` - Update compliance score

#### **Authentication**
- **POST** `/api/auth/check/` - Check wallet authentication
- **POST** `/api/auth/update/` - Update user profile

### **API Response Format**
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation successful",
  "timestamp": "2024-12-31T10:00:00Z"
}
```

### **Error Handling**
```json
{
  "error": "Error message description",
  "error_code": "ERROR_CODE",
  "timestamp": "2024-12-31T10:00:00Z",
  "details": {
    "field": "Additional error details"
  }
}
```

---

## 🚀 **Deployment Guide**

### **Production Deployment**

#### **1. Server Preparation**
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git build-essential
sudo apt install -y python3 python3-pip python3-venv
sudo apt install -y postgresql postgresql-contrib redis-server nginx
```

#### **2. Application Deployment**
```bash
# Create application user
sudo adduser greentrace
sudo usermod -aG sudo greentrace

# Clone application
git clone https://github.com/yourusername/greentrace.git
cd greentrace

# Frontend build
cd frontend
npm install
npm run build

# Backend setup
cd ../backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install gunicorn psycopg2-binary
```

#### **3. Database Setup**
```bash
sudo -u postgres psql
CREATE DATABASE greentrace;
CREATE USER greentrace WITH PASSWORD 'your-password';
GRANT ALL PRIVILEGES ON DATABASE greentrace TO greentrace;
\q

# Run migrations
cd backend
source venv/bin/activate
python3 manage.py migrate
python3 manage.py collectstatic
```

#### **4. Service Configuration**
```bash
# Gunicorn service
sudo nano /etc/systemd/system/greentrace.service

# Nginx configuration
sudo nano /etc/nginx/sites-available/greentrace

# Start services
sudo systemctl start greentrace
sudo systemctl enable greentrace
sudo ln -s /etc/nginx/sites-available/greentrace /etc/nginx/sites-enabled/
sudo systemctl reload nginx
```

### **Docker Deployment**
```yaml
# docker-compose.yml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
  
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    depends_on:
      - db
      - redis
  
  db:
    image: postgres:13
    environment:
      - POSTGRES_DB=greentrace
      - POSTGRES_USER=greentrace
      - POSTGRES_PASSWORD=password
  
  redis:
    image: redis:6-alpine
```

### **Cloud Deployment**

#### **AWS Deployment**
- **EC2 Instance**: Ubuntu 20.04 LTS, t3.medium+
- **RDS**: PostgreSQL database service
- **ElastiCache**: Redis caching service
- **Certificate Manager**: SSL certificate management

#### **Google Cloud Platform**
- **Compute Engine**: VM instance deployment
- **Cloud SQL**: Managed PostgreSQL database
- **Cloud Build**: Automated deployment pipeline

#### **Azure Deployment**
- **App Service**: Backend application hosting
- **Static Web Apps**: Frontend hosting
- **Azure Database**: PostgreSQL service

---

## 🧪 **Testing & Quality**

### **Testing Strategy**

#### **Frontend Testing**
- **Unit Tests**: Component functionality testing
- **Integration Tests**: Component interaction testing
- **E2E Tests**: Full user workflow testing
- **Accessibility Tests**: WCAG compliance testing

#### **Backend Testing**
- **Unit Tests**: Function and method testing
- **Integration Tests**: API endpoint testing
- **Database Tests**: Data persistence testing
- **Security Tests**: Authentication and authorization testing

#### **Smart Contract Testing**
- **Unit Tests**: Contract function testing
- **Integration Tests**: Contract interaction testing
- **Security Tests**: Vulnerability assessment
- **Gas Optimization**: Performance testing

### **Quality Assurance**

#### **Code Quality**
- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting
- **TypeScript**: Type safety
- **Python Black**: Python code formatting
- **Flake8**: Python linting

#### **Performance Testing**
- **Frontend**: Bundle size analysis, loading performance
- **Backend**: API response time, database performance
- **Blockchain**: Gas optimization, transaction speed
- **System**: Overall platform performance

#### **Security Testing**
- **Smart Contract Audits**: Professional security reviews
- **Penetration Testing**: Vulnerability assessment
- **Code Review**: Security-focused code analysis
- **Dependency Scanning**: Known vulnerability detection

---

## 🔧 **Troubleshooting**

### **Common Issues**

#### **Wallet Connection Problems**
- **Network Mismatch**: Ensure correct blockchain network
- **MetaMask Issues**: Check browser extension status
- **Account Switching**: Verify correct wallet account
- **Permission Denied**: Check MetaMask permissions

#### **Transaction Failures**
- **Insufficient Gas**: Ensure adequate transaction fees
- **Network Congestion**: Wait for network confirmation
- **Contract Errors**: Verify smart contract status
- **User Rejection**: Check MetaMask transaction approval

#### **Data Loading Issues**
- **API Errors**: Check backend service status
- **Network Timeout**: Verify internet connection
- **Cache Issues**: Clear browser cache and cookies
- **Service Status**: Check platform maintenance status

### **Performance Issues**

#### **Slow Response Times**
- **System Resources**: Check CPU, memory, and disk usage
- **Database Performance**: Analyze query performance
- **Network Latency**: Check network connectivity
- **Cache Efficiency**: Verify caching configuration

#### **Real-Time Updates**
- **WebSocket Status**: Verify connection status
- **Polling Frequency**: Check update intervals
- **Data Volume**: Monitor data transfer size
- **System Resources**: Check platform performance

### **Error Resolution**

#### **Error Codes**
- `WALLET_NOT_CONNECTED`: Connect MetaMask wallet
- `NETWORK_MISMATCH`: Switch to correct blockchain
- `INSUFFICIENT_BALANCE`: Add funds to wallet
- `CONTRACT_NOT_FOUND`: Verify contract deployment
- `PERMISSION_DENIED`: Check user role permissions

#### **Resolution Steps**
1. **Identify Error**: Read error message carefully
2. **Check Prerequisites**: Verify requirements met
3. **Follow Instructions**: Execute suggested actions
4. **Contact Support**: If issue persists

---

## 📚 **Additional Resources**

### **Documentation**
- **API Reference**: [docs.greentrace.com/api](https://docs.greentrace.com/api)
- **User Guide**: [docs.greentrace.com/user](https://docs.greentrace.com/user)
- **Developer Guide**: [docs.greentrace.com/dev](https://docs.greentrace.com/dev)
- **Deployment Guide**: [docs.greentrace.com/deploy](https://docs.greentrace.com/deploy)

### **Support Channels**
- **Email Support**: support@greentrace.com
- **Developer Support**: dev@greentrace.com
- **DevOps Support**: devops@greentrace.com
- **Community Forum**: [community.greentrace.com](https://community.greentrace.com)

### **Training Resources**
- **Video Tutorials**: [youtube.com/greentrace](https://youtube.com/greentrace)
- **Webinars**: Monthly platform updates
- **User Training**: [training.greentrace.com](https://training.greentrace.com)
- **Knowledge Base**: [help.greentrace.com](https://help.greentrace.com)

### **Community & Development**
- **GitHub Repository**: [github.com/yourusername/greentrace](https://github.com/yourusername/greentrace)
- **Discord Community**: [discord.gg/greentrace](https://discord.gg/greentrace)
- **Issue Tracker**: [github.com/yourusername/greentrace/issues](https://github.com/yourusername/greentrace/issues)
- **Contributing Guidelines**: [github.com/yourusername/greentrace/blob/main/CONTRIBUTING.md](https://github.com/yourusername/greentrace/blob/main/CONTRIBUTING.md)

---

## 🏆 **Hackathon Achievements**

### **Technical Innovation**
- **First-of-its-kind**: Complete supply chain transparency platform
- **Blockchain Integration**: Real-time smart contract operations
- **Cross-Chain Technology**: Multi-blockchain interoperability
- **Production Ready**: Enterprise-grade architecture

### **Business Impact**
- **Supply Chain Transparency**: Solves real industry problems
- **Carbon Credit Management**: Addresses climate change challenges
- **Compliance Automation**: Reduces regulatory overhead
- **Scalable Solution**: Ready for global deployment

### **Code Quality**
- **Professional Architecture**: Industry-standard best practices
- **Comprehensive Testing**: Full test coverage
- **Documentation**: Complete technical documentation
- **Performance Optimized**: Production-ready performance

---

**🌱 Built with ❤️ for a sustainable future**

**For additional information, visit [greentrace.com](https://greentrace.com)**
