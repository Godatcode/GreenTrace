# 🌱 GreenTrace

**Carbon Credit & Supply Chain Transparency Platform**

A comprehensive blockchain-based platform for carbon credit management and supply chain transparency with advanced privacy controls and role-based access management.

[![Deployed on Vercel](https://img.shields.io/badge/Frontend-Vercel-00C7B7?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Deployed on Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render)](https://render.com)
[![Avalanche Fuji](https://img.shields.io/badge/Blockchain-Avalanche%20Fuji-E84142?style=for-the-badge&logo=avalanche)](https://testnet.snowtrace.io/)

## 🚀 Live Demo

- **Frontend**: [Your Vercel URL]
- **Backend API**: https://greentrace-backend-eh4d.onrender.com/
- **Smart Contracts**: [Avalanche Fuji Testnet](https://testnet.snowtrace.io/)

## ✨ Features

### 🔐 Role-Based Access Control
- **Public Users**: View public product data
- **Private Users**: Access detailed product information
- **Enterprise Users**: Full data access including IoT sensors
- **Admin/Regulators**: Complete system oversight

### 🌿 Carbon Credit Management
- Issue carbon credits
- Transfer credits between users
- Retire credits for offsetting
- Track credit lifecycle on blockchain

### 📦 Product Registry
- Register products with blockchain verification
- Track supply chain transparency
- Privacy-controlled data access
- IoT sensor integration

### 🔒 Privacy & Compliance
- eERC compliance standards
- Data encryption for sensitive fields
- Audit trails for all data access
- GDPR compliance tools

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Smart         │
│   React/TS      │◄──►│   Django API    │◄──►│   Contracts     │
│   Vercel        │    │   Render        │    │   Avalanche     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Ethers.js** for blockchain interaction
- **Modern CSS** with responsive design
- **Vercel** for deployment

### Backend
- **Django 5.0.1** with REST Framework
- **SQLite** database (PostgreSQL ready)
- **CORS** enabled for cross-origin requests
- **Render** for deployment

### Blockchain
- **Solidity 0.8.28** smart contracts
- **Avalanche Fuji** testnet
- **Hardhat** development framework
- **Ethers.js** for contract interaction

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.13+
- Git
- MetaMask wallet

### 1. Clone Repository
```bash
git clone https://github.com/Godatcode/GreenTrace.git
cd GreenTrace
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```

### 3. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 4. Smart Contracts Setup
```bash
# Install dependencies
npm install

# Setup environment
echo "AVALANCHE_FUJI_URL=https://api.avax-test.network/ext/bc/C/rpc" > .env
echo "PRIVATE_KEY=your_private_key_here" >> .env

# Deploy contracts
npx hardhat run scripts/deploy.ts --network fuji
```

## 📖 Documentation

- **[Deployment Guide](DEPLOYMENT_GUIDE.md)** - Complete deployment instructions
- **[API Reference](docs/API_REFERENCE.md)** - Backend API documentation
- **[Developer Guide](docs/DEVELOPER_GUIDE.md)** - Development setup and guidelines
- **[User Guide](docs/USER_GUIDE.md)** - End-user documentation

## 🔗 Smart Contracts

### Deployed Contracts (Avalanche Fuji)
- **ProductRegistry**: `0x78D866f9704FF874A3484C79aC9405947648588c`
- **CarbonCredit**: `0x3b7Cbb8C26d2101dBC3808Cc597BCA879001160d`

### View on Block Explorer
- [ProductRegistry Contract](https://testnet.snowtrace.io/address/0x78D866f9704FF874A3484C79aC9405947648588c)
- [CarbonCredit Contract](https://testnet.snowtrace.io/address/0x3b7Cbb8C26d2101dBC3808Cc597BCA879001160d)

## 🔧 API Endpoints

### Authentication
- `GET /api/auth/check/` - Check authentication status
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `POST /api/auth/register/` - User registration

### Products
- `GET /api/products/` - List products
- `POST /api/products/create/` - Create product
- `GET /api/products/{id}/` - Get product details
- `PUT /api/products/{id}/` - Update product

### Carbon Credits
- `GET /api/credits/` - List carbon credits
- `POST /api/credits/create/` - Issue credit
- `PUT /api/credits/{id}/transfer/` - Transfer credit
- `PUT /api/credits/{id}/retire/` - Retire credit

## 🎯 Use Cases

### For Businesses
- Track carbon footprint across supply chain
- Issue and trade carbon credits
- Ensure compliance with environmental regulations
- Build trust through transparency

### For Consumers
- Verify product sustainability claims
- Track carbon impact of purchases
- Support environmentally responsible products

### For Regulators
- Monitor carbon credit markets
- Ensure compliance and transparency
- Audit environmental claims

## 🔒 Security Features

- **Blockchain Verification**: All transactions verified on-chain
- **Role-Based Access**: Granular permission system
- **Data Encryption**: Sensitive data encrypted at rest
- **Audit Trails**: Complete transaction history
- **Privacy Controls**: GDPR and eERC compliant

## 🌍 Environmental Impact

GreenTrace enables:
- **Transparent Carbon Tracking**: Real-time visibility into carbon footprints
- **Credible Carbon Credits**: Blockchain-verified carbon offsetting
- **Supply Chain Sustainability**: End-to-end environmental monitoring
- **Regulatory Compliance**: Automated compliance reporting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Avalanche** for the blockchain infrastructure
- **Django** for the robust backend framework
- **React** for the modern frontend experience
- **Vercel** and **Render** for seamless deployment

## 📞 Support

- **Documentation**: Check the docs folder
- **Issues**: [GitHub Issues](https://github.com/Godatcode/GreenTrace/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Godatcode/GreenTrace/discussions)

---

**Built with ❤️ for a sustainable future**

*Last Updated: September 13, 2025*