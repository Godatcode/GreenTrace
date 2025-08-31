# 📖 GreenTrace User Guide

> **Complete user guide for the GreenTrace supply chain transparency platform**

## 📋 **Table of Contents**

1. [Getting Started](#-getting-started)
2. [Platform Overview](#-platform-overview)
3. [User Roles & Permissions](#-user-roles--permissions)
4. [Product Management](#-product-management)
5. [Carbon Credit Management](#-carbon-credit-management)
6. [Compliance Center](#-compliance-center)
7. [Regulator Dashboard](#-regulator-dashboard)
8. [Advanced Features](#-advanced-features)
9. [Troubleshooting](#-troubleshooting)
10. [Best Practices](#-best-practices)

## 🚀 **Getting Started**

### **1. Platform Access**

#### **Web Application**
- **URL**: [https://greentrace.com](https://greentrace.com)
- **Browser Support**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: Responsive design for all devices

#### **First-Time Setup**
1. **Connect Wallet**: Click "Connect Wallet" and select MetaMask
2. **Network Configuration**: Ensure Avalanche Fuji testnet is added
3. **Account Creation**: Your wallet address becomes your user ID
4. **Profile Setup**: Complete your organization and role information

### **2. Wallet Configuration**

#### **MetaMask Setup**
1. **Install MetaMask**: [metamask.io](https://metamask.io)
2. **Add Avalanche Fuji Testnet**:
   - Network Name: `Avalanche Fuji Testnet`
   - RPC URL: `https://api.avax-test.network/ext/bc/C/rpc`
   - Chain ID: `43113`
   - Currency Symbol: `AVAX`
3. **Get Test AVAX**: Visit [faucet.avax.network](https://faucet.avax.network)

#### **Wallet Security**
- **Private Key**: Never share your private key
- **Backup**: Secure your seed phrase
- **Hardware Wallet**: Consider using Ledger or Trezor for production

## 🏗️ **Platform Overview**

### **Core Components**

#### **Dashboard**
- **Overview**: System metrics and recent activity
- **Quick Actions**: Common tasks and shortcuts
- **Notifications**: Real-time updates and alerts
- **Performance**: System health and status

#### **Navigation Structure**
```
├── Dashboard (Home)
├── Products
│   ├── Add Product
│   ├── Product List
│   └── Product Details
├── Carbon Credits
│   ├── Issue Credits
│   ├── Transfer Credits
│   └── Retire Credits
├── Compliance Center
│   ├── Monitoring
│   ├── Reports
│   └── Alerts
├── Regulator Dashboard
│   ├── Investigations
│   ├── Audits
│   └── Compliance Updates
└── Settings
    ├── Profile
    ├── Privacy
    └── Notifications
```

### **Real-Time Features**
- **Blockchain Updates**: Live transaction confirmations
- **Compliance Monitoring**: Instant score updates
- **System Notifications**: Real-time alerts and updates
- **Performance Metrics**: Live system health data

## 👥 **User Roles & Permissions**

### **Role Hierarchy**

#### **1. Enterprise User**
- **Permissions**: Full product and credit management
- **Access**: All platform features
- **Responsibilities**: Supply chain transparency, compliance

#### **2. Producer**
- **Permissions**: Product registration, basic compliance
- **Access**: Product management, compliance monitoring
- **Responsibilities**: Product data accuracy, certification

#### **3. Regulator**
- **Permissions**: Compliance oversight, audit capabilities
- **Access**: Regulator dashboard, compliance tools
- **Responsibilities**: Regulatory compliance, enforcement

#### **4. Auditor**
- **Permissions**: Compliance review, reporting
- **Access**: Compliance center, audit tools
- **Responsibilities**: Independent verification, reporting

#### **5. Viewer**
- **Permissions**: Read-only access to public data
- **Access**: Product search, basic compliance info
- **Responsibilities**: Data verification, transparency

### **Permission Matrix**

| Feature | Enterprise | Producer | Regulator | Auditor | Viewer |
|---------|------------|----------|-----------|---------|---------|
| Add Product | ✅ | ✅ | ❌ | ❌ | ❌ |
| Issue Credits | ✅ | ❌ | ❌ | ❌ | ❌ |
| Update Compliance | ❌ | ❌ | ✅ | ✅ | ❌ |
| View All Data | ✅ | ✅ | ✅ | ✅ | ❌ |
| Export Reports | ✅ | ✅ | ✅ | ✅ | ❌ |

## 📦 **Product Management**

### **1. Adding Products**

#### **Step-by-Step Process**
1. **Navigate**: Go to Products → Add Product
2. **Basic Information**:
   - Product Name: Descriptive, unique identifier
   - Batch ID: Production batch reference
   - Location: Geographic origin
   - Producer: Manufacturing entity
3. **Detailed Information**:
   - Description: Product characteristics
   - Carbon Activity: Environmental impact
   - IoT Data: Sensor readings (if available)
   - Certification: Quality standards
4. **Privacy Settings**:
   - Sensitive Data: Control visibility
   - Producer Details: Public/private toggle
   - IoT Data: Real-time monitoring access
5. **Submit**: Blockchain transaction confirmation

#### **Required Fields**
- ✅ Product Name
- ✅ Batch ID
- ✅ Location
- ✅ Producer
- ✅ Description
- ✅ Carbon Activity
- ✅ Certification

#### **Optional Fields**
- 📝 IoT Data
- 📝 Additional Certifications
- 📝 Sustainability Metrics
- 📝 Supply Chain Partners

### **2. Product Search & Discovery**

#### **Search Options**
- **Text Search**: Product name, description, producer
- **Filter by**: Certification, location, producer, carbon activity
- **Advanced Filters**: Date range, compliance score, risk level
- **Geographic Search**: Map-based location search

#### **Search Results**
- **Product Cards**: Visual representation with key info
- **Compliance Status**: Real-time score and risk indicators
- **Blockchain Verification**: Transaction hash and timestamp
- **Quick Actions**: View details, compliance history

### **3. Product Details**

#### **Information Display**
- **Basic Details**: Name, batch, location, producer
- **Compliance Data**: Score, status, risk factors
- **Blockchain Data**: Transaction hash, block number, timestamp
- **Sustainability Metrics**: Carbon footprint, certifications
- **Supply Chain**: Upstream and downstream partners

#### **Actions Available**
- **Update Information**: Modify product details
- **View History**: Complete audit trail
- **Export Data**: Download compliance reports
- **Share**: Generate public links

## 🌿 **Carbon Credit Management**

### **1. Issuing Carbon Credits**

#### **Credit Creation Process**
1. **Navigate**: Carbon Credits → Issue Credits
2. **Credit Details**:
   - Amount: Quantity of credits
   - Unit: Measurement unit (tonnes, kg)
   - Description: Credit purpose and methodology
   - Carbon Offset: Specific reduction activities
3. **Verification**: Blockchain transaction confirmation
4. **Backend Sync**: Django database integration

#### **Credit Types**
- **Reduction Credits**: Emissions reduction activities
- **Removal Credits**: Carbon sequestration projects
- **Avoidance Credits**: Prevented emissions
- **Innovation Credits**: New technology adoption

### **2. Transferring Credits**

#### **Transfer Process**
1. **Select Credits**: Choose credits to transfer
2. **Recipient**: Enter recipient wallet address
3. **Amount**: Specify transfer quantity
4. **Confirmation**: Blockchain transaction execution
5. **Verification**: Transfer confirmation and receipt

#### **Transfer Requirements**
- ✅ Sufficient credit balance
- ✅ Valid recipient address
- ✅ Network confirmation
- ✅ Transaction fee payment

### **3. Retiring Credits**

#### **Retirement Process**
1. **Select Credits**: Choose credits to retire
2. **Retirement Purpose**: Specify end use
3. **Documentation**: Attach supporting documents
4. **Confirmation**: Blockchain retirement transaction
5. **Certificate**: Retirement certificate generation

#### **Retirement Benefits**
- **Permanent Removal**: Credits cannot be reused
- **Environmental Impact**: Verified carbon reduction
- **Compliance**: Regulatory requirement fulfillment
- **Transparency**: Public retirement verification

## 🔒 **Compliance Center**

### **1. Compliance Monitoring**

#### **Real-Time Dashboard**
- **Overall Score**: System-wide compliance percentage
- **Risk Assessment**: High, medium, low risk indicators
- **Trend Analysis**: Compliance score changes over time
- **Alert System**: Real-time compliance notifications

#### **Compliance Metrics**
- **Product Compliance**: Individual product scores
- **Batch Compliance**: Production batch verification
- **Producer Compliance**: Supplier compliance tracking
- **System Compliance**: Platform-wide metrics

### **2. Risk Assessment**

#### **Risk Factors**
- **Certification**: Valid certification status
- **Carbon Activity**: Environmental impact verification
- **Data Quality**: Information completeness and accuracy
- **Timeliness**: Data update frequency
- **Verification**: Third-party validation status

#### **Risk Levels**
- **🟢 Low Risk**: Score 80-100, minimal concerns
- **🟡 Medium Risk**: Score 60-79, some concerns
- **🔴 High Risk**: Score 0-59, significant concerns

### **3. Compliance Reports**

#### **Report Types**
- **Individual Product**: Single product compliance
- **Batch Summary**: Production batch overview
- **Producer Report**: Supplier compliance summary
- **System Report**: Platform-wide compliance status

#### **Report Features**
- **Export Formats**: PDF, CSV, JSON
- **Customization**: Date ranges, filters, metrics
- **Scheduling**: Automated report generation
- **Sharing**: Secure report distribution

## 🔍 **Regulator Dashboard**

### **1. Compliance Oversight**

#### **Monitoring Tools**
- **Real-Time Alerts**: Instant compliance violations
- **Risk Dashboard**: High-risk product identification
- **Trend Analysis**: Compliance pattern recognition
- **Audit Trail**: Complete action history

#### **Investigation Tools**
- **Product Investigation**: Detailed compliance review
- **Batch Analysis**: Production batch verification
- **Producer Review**: Supplier compliance assessment
- **System Audit**: Platform-wide compliance review

### **2. Compliance Updates**

#### **Score Modification**
1. **Select Product**: Choose product for review
2. **Review Data**: Examine compliance information
3. **Update Score**: Modify compliance score
4. **Provide Reason**: Document score change rationale
5. **Submit Update**: Blockchain transaction execution

#### **Audit Logging**
- **Action Tracking**: All compliance changes recorded
- **Reason Documentation**: Score change justification
- **Timestamp**: Precise change timing
- **Regulator ID**: Responsible party identification

### **3. Regulatory Reporting**

#### **Report Generation**
- **Compliance Summary**: Overall compliance status
- **Violation Report**: Non-compliance details
- **Trend Analysis**: Compliance pattern changes
- **Recommendations**: Improvement suggestions

#### **Export Options**
- **PDF Reports**: Professional documentation
- **CSV Data**: Data analysis and processing
- **API Access**: Programmatic data retrieval
- **Real-Time Feeds**: Live compliance data

## 🚀 **Advanced Features**

### **1. Cross-Chain Synchronization**

#### **Multi-Blockchain Support**
- **Ethereum**: Mainnet and testnet support
- **Polygon**: Low-cost transaction processing
- **Binance Smart Chain**: Alternative network option
- **Avalanche**: Primary network with subnets

#### **Sync Process**
1. **Source Network**: Original data location
2. **Target Network**: Destination blockchain
3. **Data Verification**: Cross-chain proof generation
4. **Synchronization**: Data replication execution
5. **Verification**: Cross-chain data validation

### **2. IoT Integration**

#### **Sensor Data**
- **Temperature**: Environmental monitoring
- **Humidity**: Climate condition tracking
- **Location**: GPS coordinate verification
- **Quality**: Product condition monitoring

#### **Real-Time Monitoring**
- **Live Updates**: Continuous data streaming
- **Alert System**: Threshold violation notifications
- **Data Validation**: Sensor accuracy verification
- **Historical Analysis**: Trend pattern recognition

### **3. Advanced Analytics**

#### **Data Visualization**
- **Charts**: Compliance score trends
- **Maps**: Geographic compliance distribution
- **Graphs**: Supply chain relationships
- **Dashboards**: Custom metric displays

#### **Predictive Analytics**
- **Risk Prediction**: Future compliance issues
- **Trend Forecasting**: Compliance pattern changes
- **Anomaly Detection**: Unusual compliance behavior
- **Optimization**: Compliance improvement suggestions

## 🔧 **Troubleshooting**

### **1. Common Issues**

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

### **2. Error Messages**

#### **Common Error Codes**
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

### **3. Performance Issues**

#### **Slow Loading**
- **Browser Cache**: Clear cache and cookies
- **Network Speed**: Check internet connection
- **Device Performance**: Close unnecessary applications
- **Platform Load**: Check system status

#### **Real-Time Updates**
- **WebSocket Status**: Verify connection status
- **Polling Frequency**: Check update intervals
- **Data Volume**: Monitor data transfer size
- **System Resources**: Check platform performance

## 💡 **Best Practices**

### **1. Data Management**

#### **Product Information**
- **Accuracy**: Verify all information before submission
- **Completeness**: Fill all required fields
- **Timeliness**: Update information regularly
- **Verification**: Provide supporting documentation

#### **Privacy Settings**
- **Sensitive Data**: Control public visibility
- **Producer Details**: Balance transparency and privacy
- **IoT Data**: Consider real-time monitoring implications
- **Compliance Data**: Ensure regulatory requirements

### **2. Compliance Management**

#### **Regular Monitoring**
- **Daily Checks**: Review compliance alerts
- **Weekly Reviews**: Analyze compliance trends
- **Monthly Reports**: Generate compliance summaries
- **Quarterly Audits**: Comprehensive compliance review

#### **Risk Mitigation**
- **Early Detection**: Monitor risk indicators
- **Proactive Updates**: Address issues before escalation
- **Documentation**: Maintain complete audit trails
- **Continuous Improvement**: Learn from compliance issues

### **3. Security Practices**

#### **Wallet Security**
- **Private Key Protection**: Never share private keys
- **Hardware Wallets**: Use for production environments
- **Regular Backups**: Secure seed phrase storage
- **Multi-Signature**: Consider for enterprise accounts

#### **Account Management**
- **Role Assignment**: Assign appropriate permissions
- **Access Control**: Limit sensitive data access
- **Audit Logging**: Monitor account activities
- **Regular Reviews**: Periodic access permission review

## 📚 **Additional Resources**

### **Documentation**
- **API Reference**: [docs.greentrace.com/api](https://docs.greentrace.com/api)
- **Developer Guide**: [docs.greentrace.com/dev](https://docs.greentrace.com/dev)
- **Video Tutorials**: [youtube.com/greentrace](https://youtube.com/greentrace)
- **Knowledge Base**: [help.greentrace.com](https://help.greentrace.com)

### **Support Channels**
- **Email Support**: support@greentrace.com
- **Live Chat**: Available on platform
- **Community Forum**: [community.greentrace.com](https://community.greentrace.com)
- **Phone Support**: +1-800-GREEN-TRACE

### **Training Resources**
- **User Training**: [training.greentrace.com](https://training.greentrace.com)
- **Webinars**: Monthly platform updates
- **Certification**: User proficiency certification
- **Workshops**: Hands-on training sessions

---

**For additional support, please contact our customer success team at success@greentrace.com**
