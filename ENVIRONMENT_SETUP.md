# 🔧 GreenTrace - Environment Setup Guide

This guide explains how to set up environment variables for all components of the GreenTrace project.

## 📁 Environment Files Structure

```
GreenTrace/
├── .env                          # Root environment (Smart Contracts)
├── env.example.root             # Root environment template
├── backend/
│   ├── .env                     # Backend environment
│   └── env.example              # Backend environment template
└── frontend/
    ├── .env                     # Frontend environment
    └── env.example              # Frontend environment template
```

## 🚀 Quick Setup

### 1. Root Environment (Smart Contracts)
```bash
# Copy the template
cp env.example.root .env

# Edit with your values
nano .env
```

### 2. Backend Environment
```bash
cd backend
cp env.example .env
nano .env
```

### 3. Frontend Environment
```bash
cd frontend
cp env.example .env
nano .env
```

## 📋 Environment Variables by Component

### 🔗 Smart Contracts (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `AVALANCHE_FUJI_URL` | Avalanche Fuji RPC URL | `https://api.avax-test.network/ext/bc/C/rpc` |
| `PRIVATE_KEY` | Your wallet private key | `0x1234...` |
| `SEPOLIA_RPC_URL` | Sepolia RPC URL (optional) | `https://sepolia.infura.io/v3/...` |
| `SEPOLIA_PRIVATE_KEY` | Sepolia private key (optional) | `0x1234...` |

### 🖥️ Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `SECRET_KEY` | Django secret key | `your-super-secret-key` |
| `DEBUG` | Debug mode | `True` (dev) / `False` (prod) |
| `ALLOWED_HOSTS` | Allowed hosts | `localhost,127.0.0.1,*.onrender.com` |
| `CORS_ALLOWED_ORIGINS` | CORS origins | `http://localhost:3000,https://your-app.vercel.app` |
| `STATIC_URL` | Static files URL | `/static/` |
| `MEDIA_URL` | Media files URL | `/media/` |

### 🌐 Frontend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `https://greentrace-backend-eh4d.onrender.com` |
| `REACT_APP_PRODUCT_REGISTRY_ADDRESS` | Contract address | `0x78D866f9704FF874A3484C79aC9405947648588c` |
| `REACT_APP_CARBON_CREDIT_ADDRESS` | Contract address | `0x3b7Cbb8C26d2101dBC3808Cc597BCA879001160d` |
| `REACT_APP_CHAIN_ID` | Blockchain chain ID | `43113` |
| `REACT_APP_NETWORK_NAME` | Network name | `Avalanche Fuji C-Chain` |

## 🔐 Security Best Practices

### ✅ Do's
- Use strong, unique secret keys
- Keep private keys secure
- Use different keys for dev/prod
- Never commit .env files
- Rotate keys regularly

### ❌ Don'ts
- Never share private keys
- Don't use weak passwords
- Don't commit .env files
- Don't use production keys in development
- Don't hardcode sensitive data

## 🛠️ Development Setup

### 1. Generate Django Secret Key
```python
# In Python shell
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
```

### 2. Get Wallet Private Key
1. Open MetaMask
2. Click account menu → Account Details
3. Export Private Key
4. Enter password
5. Copy the key

### 3. Get Testnet AVAX
1. Go to [Avalanche Faucet](https://faucet.avax.network/)
2. Enter your wallet address
3. Complete captcha
4. Wait for AVAX

## 🚀 Production Setup

### Render (Backend)
Set these in Render dashboard:
```
SECRET_KEY=your-production-secret-key
DEBUG=False
ALLOWED_HOSTS=*.onrender.com,localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

### Vercel (Frontend)
Set these in Vercel dashboard:
```
REACT_APP_API_URL=https://greentrace-backend-eh4d.onrender.com
REACT_APP_PRODUCT_REGISTRY_ADDRESS=0x78D866f9704FF874A3484C79aC9405947648588c
REACT_APP_CARBON_CREDIT_ADDRESS=0x3b7Cbb8C26d2101dBC3808Cc597BCA879001160d
```

## 🔄 Environment Switching

### Development
```bash
# Backend
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Frontend
REACT_APP_API_URL=http://localhost:8000
```

### Production
```bash
# Backend
DEBUG=False
ALLOWED_HOSTS=*.onrender.com,localhost,127.0.0.1

# Frontend
REACT_APP_API_URL=https://greentrace-backend-eh4d.onrender.com
```

## 🐛 Troubleshooting

### Common Issues

1. **Backend won't start**
   - Check SECRET_KEY is set
   - Verify DEBUG value
   - Check ALLOWED_HOSTS

2. **Frontend can't connect to backend**
   - Verify REACT_APP_API_URL
   - Check CORS settings
   - Ensure backend is running

3. **Smart contracts deployment fails**
   - Check PRIVATE_KEY is correct
   - Verify you have testnet AVAX
   - Check RPC URL

### Debug Commands

```bash
# Check backend health
curl https://greentrace-backend-eh4d.onrender.com/

# Check wallet balance
npx hardhat run scripts/check-balance.ts --network fuji

# Test frontend API connection
curl -H "Origin: http://localhost:3000" https://greentrace-backend-eh4d.onrender.com/
```

## 📝 Environment File Templates

### Root (.env)
```bash
AVALANCHE_FUJI_URL=https://api.avax-test.network/ext/bc/C/rpc
PRIVATE_KEY=your_private_key_here
```

### Backend (.env)
```bash
SECRET_KEY=your-super-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1,*.onrender.com
CORS_ALLOWED_ORIGINS=http://localhost:3000,https://your-frontend.vercel.app
```

### Frontend (.env)
```bash
REACT_APP_API_URL=https://greentrace-backend-eh4d.onrender.com
REACT_APP_PRODUCT_REGISTRY_ADDRESS=0x78D866f9704FF874A3484C79aC9405947648588c
REACT_APP_CARBON_CREDIT_ADDRESS=0x3b7Cbb8C26d2101dBC3808Cc597BCA879001160d
```

## 🔗 Related Documentation

- [Deployment Guide](DEPLOYMENT_GUIDE.md)
- [Quick Start Guide](QUICK_START.md)
- [API Reference](docs/API_REFERENCE.md)

---

**Remember**: Never commit .env files to version control! Always use the .env.example files as templates.
