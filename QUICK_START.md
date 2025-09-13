# ⚡ GreenTrace - Quick Start Guide

Get up and running with GreenTrace in minutes!

## 🚀 Live URLs

- **Frontend**: [Your Vercel URL]
- **Backend**: https://greentrace-backend-eh4d.onrender.com/
- **Admin Panel**: https://greentrace-backend-eh4d.onrender.com/admin/

## 🎯 What You Can Do

### 1. **View Products** (Public)
- Browse registered products
- See basic product information
- View blockchain verification

### 2. **Manage Carbon Credits** (Authenticated)
- Issue new carbon credits
- Transfer credits between users
- Retire credits for offsetting
- Track credit history

### 3. **Register Products** (Authenticated)
- Add new products to the registry
- Set privacy levels
- Link to blockchain verification

### 4. **Admin Functions** (Admin)
- Full system oversight
- User management
- Data analytics
- Compliance monitoring

## 🔧 Local Development

### Prerequisites
- Node.js 18+
- Python 3.13+
- Git
- MetaMask wallet

### 1. Clone & Setup
```bash
git clone https://github.com/Godatcode/GreenTrace.git
cd GreenTrace
```

### 2. Frontend (React)
```bash
cd frontend
npm install
npm start
# Opens at http://localhost:3000
```

### 3. Backend (Django)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
# Runs at http://localhost:8000
```

### 4. Smart Contracts (Optional)
```bash
# Setup environment
echo "AVALANCHE_FUJI_URL=https://api.avax-test.network/ext/bc/C/rpc" > .env
echo "PRIVATE_KEY=your_private_key_here" >> .env

# Deploy contracts
npx hardhat run scripts/deploy.ts --network fuji
```

## 🔗 API Testing

### Health Check
```bash
curl https://greentrace-backend-eh4d.onrender.com/
# Response: "GreenTrace Backend is working!"
```

### Test Endpoint
```bash
curl https://greentrace-backend-eh4d.onrender.com/test/
# Response: "Test endpoint working!"
```

### API Endpoints
```bash
# Check authentication
curl https://greentrace-backend-eh4d.onrender.com/api/auth/check/

# List products
curl https://greentrace-backend-eh4d.onrender.com/api/products/

# List carbon credits
curl https://greentrace-backend-eh4d.onrender.com/api/credits/
```

## 🔐 User Roles

### 🌐 Public User
- View public product data
- No authentication required

### 🔒 Private User
- View detailed product information
- Access private data fields
- Manage own carbon credits

### 🏢 Enterprise User
- Full data access including IoT sensors
- Business partner integration
- Advanced analytics

### 🔑 Admin/Regulator
- Complete system oversight
- User management
- Compliance monitoring

## 🛠️ Troubleshooting

### Backend Not Working
```bash
# Check if backend is running
curl https://greentrace-backend-eh4d.onrender.com/

# If local backend fails
cd backend
source venv/bin/activate
pip install whitenoise==6.6.0
python manage.py runserver
```

### Frontend Issues
- Check browser console for errors
- Verify API endpoints are accessible
- Clear browser cache

### Smart Contract Issues
```bash
# Check wallet balance
npx hardhat run scripts/check-balance.ts --network fuji

# Verify deployment
npx hardhat run scripts/deploy.ts --network fuji
```

## 📱 Mobile Access

The platform is fully responsive and works on:
- Desktop browsers
- Mobile browsers
- Tablet devices
- PWA support (coming soon)

## 🔄 Updates

### Frontend Updates
- Changes auto-deploy via Vercel
- No manual intervention needed

### Backend Updates
- Changes auto-deploy via Render
- Database migrations run automatically

### Smart Contract Updates
- Requires new deployment
- Update frontend with new addresses
- Redeploy frontend

## 📊 Monitoring

### Backend Health
- **Status**: https://greentrace-backend-eh4d.onrender.com/
- **Admin**: https://greentrace-backend-eh4d.onrender.com/admin/

### Smart Contracts
- **Block Explorer**: [Snowtrace Testnet](https://testnet.snowtrace.io/)
- **ProductRegistry**: [View Contract](https://testnet.snowtrace.io/address/0x78D866f9704FF874A3484C79aC9405947648588c)
- **CarbonCredit**: [View Contract](https://testnet.snowtrace.io/address/0x3b7Cbb8C26d2101dBC3808Cc597BCA879001160d)

## 🎯 Next Steps

1. **Explore the Platform**: Visit the live URLs
2. **Test Local Development**: Follow the setup guide
3. **Read Documentation**: Check the docs folder
4. **Contribute**: Fork and submit PRs

## 📞 Need Help?

- **Documentation**: Check the docs folder
- **Issues**: [GitHub Issues](https://github.com/Godatcode/GreenTrace/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Godatcode/GreenTrace/discussions)

---

**Ready to start? Visit the live platform or follow the local setup guide above!** 🚀
