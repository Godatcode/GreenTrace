# 📚 GreenTrace API Reference

> **Complete API documentation for the GreenTrace supply chain transparency platform**

## 🌐 **Base URL**
```
Development: http://localhost:8000/api/
Production: https://api.greentrace.com/api/
```

## 🔐 **Authentication**

### **Wallet-Based Authentication**
GreenTrace uses blockchain wallet addresses for authentication. All API requests require a valid wallet address in the request body.

```json
{
  "wallet_address": "0x1234...5678",
  "network": "avalanche-fuji"
}
```

## 📦 **Product Management API**

### **Create Product**
**Endpoint:** `POST /api/products/create/`

**Description:** Register a new product on the blockchain and save to backend

**Request Body:**
```json
{
  "name": "Organic Coffee Beans",
  "batch_id": "BATCH001",
  "location": "Colombia",
  "producer": "Fair Trade Co-op",
  "description": "Premium organic coffee beans",
  "carbon_activity": "Carbon Neutral",
  "iot_data": "Temperature: 22°C, Humidity: 65%",
  "certification": "Organic",
  "blockchain_network": "avalanche-fuji",
  "wallet_address": "0x1234...5678"
}
```

**Response:**
```json
{
  "success": true,
  "product_id": 123,
  "message": "Product created successfully"
}
```

**Error Response:**
```json
{
  "error": "Wallet address required"
}
```

### **Get Product List**
**Endpoint:** `GET /api/products/`

**Description:** Retrieve list of all products

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `certification`: Filter by certification type
- `producer`: Filter by producer

**Response:**
```json
{
  "products": [
    {
      "id": 123,
      "name": "Organic Coffee Beans",
      "batch_id": "BATCH001",
      "location": "Colombia",
      "producer": "Fair Trade Co-op",
      "description": "Premium organic coffee beans",
      "carbon_activity": "Carbon Neutral",
      "certification": "Organic",
      "created_at": "2024-12-31T10:00:00Z",
      "blockchain_hash": "0xabc...def",
      "compliance_score": 85
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 20
}
```

### **Get Product Details**
**Endpoint:** `GET /api/products/{product_id}/`

**Description:** Retrieve detailed information about a specific product

**Response:**
```json
{
  "id": 123,
  "name": "Organic Coffee Beans",
  "batch_id": "BATCH001",
  "location": "Colombia",
  "producer": "Fair Trade Co-op",
  "description": "Premium organic coffee beans",
  "carbon_activity": "Carbon Neutral",
  "iot_data": "Temperature: 22°C, Humidity: 65%",
  "certification": "Organic",
  "created_at": "2024-12-31T10:00:00Z",
  "blockchain_hash": "0xabc...def",
  "compliance_score": 85,
  "is_compliant": true,
  "privacy_settings": {
    "is_sensitive_data_public": true,
    "is_producer_details_public": true,
    "is_iot_data_public": true,
    "is_carbon_details_public": true
  }
}
```

## 🌿 **Carbon Credit API**

### **Create Carbon Credit**
**Endpoint:** `POST /api/credits/create/`

**Description:** Issue new carbon credits

**Request Body:**
```json
{
  "amount": 100,
  "unit": "tonnes",
  "description": "Carbon credits from sustainable farming",
  "carbon_offset": "Reduced tillage, cover crops",
  "blockchain_network": "avalanche-fuji",
  "wallet_address": "0x1234...5678"
}
```

**Response:**
```json
{
  "success": true,
  "credit_id": 456,
  "message": "Carbon credit created successfully"
}
```

### **Get Carbon Credits**
**Endpoint:** `GET /api/credits/`

**Description:** Retrieve list of carbon credits

**Response:**
```json
{
  "credits": [
    {
      "id": 456,
      "amount": 100,
      "unit": "tonnes",
      "description": "Carbon credits from sustainable farming",
      "carbon_offset": "Reduced tillage, cover crops",
      "status": "issued",
      "created_at": "2024-12-31T10:00:00Z",
      "blockchain_network": "avalanche-fuji",
      "created_by": "user_123"
    }
  ],
  "total": 1
}
```

## 🔐 **Authentication API**

### **Check Wallet Authentication**
**Endpoint:** `POST /api/auth/check/`

**Description:** Verify wallet authentication and get user role

**Request Body:**
```json
{
  "wallet_address": "0x1234...5678",
  "network": "avalanche-fuji"
}
```

**Response:**
```json
{
  "username": "user_123",
  "email": "user@greentrace.local",
  "role": "enterprise",
  "organization": "Green Valley Farms",
  "position": "Sustainability Manager",
  "wallet_address": "0x1234...5678",
  "blockchain_network": "avalanche-fuji",
  "privacy_level": "enterprise",
  "is_authenticated": true
}
```

### **Update User Profile**
**Endpoint:** `POST /api/auth/update/`

**Description:** Update user profile information

**Request Body:**
```json
{
  "wallet_address": "0x1234...5678",
  "organization": "Updated Organization",
  "position": "Updated Position",
  "privacy_level": "enterprise"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully"
}
```

## 🔒 **Compliance API**

### **Get Compliance Data**
**Endpoint:** `GET /api/compliance/products/`

**Description:** Retrieve compliance information for all products

**Response:**
```json
{
  "overall_compliance": {
    "total_products": 10,
    "compliant_products": 8,
    "average_score": 82.5,
    "risk_level": "low"
  },
  "products": [
    {
      "batch_id": "BATCH001",
      "name": "Organic Coffee Beans",
      "compliance_score": 85,
      "is_compliant": true,
      "risk_factors": ["certification", "carbon_activity"],
      "last_updated": "2024-12-31T10:00:00Z"
    }
  ]
}
```

### **Update Compliance Score**
**Endpoint:** `POST /api/compliance/update-score/`

**Description:** Update compliance score for a specific product

**Request Body:**
```json
{
  "batch_id": "BATCH001",
  "new_score": 90,
  "reason": "Additional certification verified",
  "regulator": "0x1234...5678"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Compliance score updated successfully",
  "old_score": 85,
  "new_score": 90,
  "timestamp": "2024-12-31T10:00:00Z"
}
```

## 🌐 **Cross-Chain API**

### **Get Cross-Chain Status**
**Endpoint:** `GET /api/crosschain/status/{batch_id}/`

**Description:** Retrieve cross-chain synchronization status

**Response:**
```json
{
  "batch_id": "BATCH001",
  "networks": ["ethereum", "polygon", "bsc"],
  "verified": [true, false, false],
  "proofs": [
    "0xabc...def",
    null,
    null
  ],
  "last_sync": "2024-12-31T10:00:00Z"
}
```

### **Sync to Network**
**Endpoint:** `POST /api/crosschain/sync/`

**Description:** Synchronize product data to another blockchain network

**Request Body:**
```json
{
  "batch_id": "BATCH001",
  "target_network": "ethereum",
  "wallet_address": "0x1234...5678"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Product synced to ethereum successfully",
  "proof": "0xabc...def",
  "timestamp": "2024-12-31T10:00:00Z"
}
```

## 📊 **Analytics API**

### **Get System Metrics**
**Endpoint:** `GET /api/analytics/metrics/`

**Description:** Retrieve system performance and usage metrics

**Response:**
```json
{
  "system_metrics": {
    "total_products": 150,
    "total_credits": 2500,
    "active_users": 45,
    "transactions_today": 23,
    "compliance_rate": 87.5
  },
  "blockchain_metrics": {
    "network": "avalanche-fuji",
    "block_height": 12345678,
    "gas_price": "25 gwei",
    "last_block_time": "2024-12-31T10:00:00Z"
  },
  "performance_metrics": {
    "api_response_time": "150ms",
    "blockchain_response_time": "2.5s",
    "uptime": "99.9%"
  }
}
```

### **Get Compliance Reports**
**Endpoint:** `GET /api/analytics/reports/compliance/`

**Description:** Generate compliance reports

**Query Parameters:**
- `start_date`: Start date for report (YYYY-MM-DD)
- `end_date`: End date for report (YYYY-MM-DD)
- `format`: Report format (json, csv, pdf)

**Response:**
```json
{
  "report_id": "COMP_20241231_001",
  "generated_at": "2024-12-31T10:00:00Z",
  "period": {
    "start": "2024-12-01",
    "end": "2024-12-31"
  },
  "summary": {
    "total_products": 150,
    "compliant_products": 131,
    "non_compliant_products": 19,
    "average_score": 87.5
  },
  "details": [
    {
      "batch_id": "BATCH001",
      "name": "Organic Coffee Beans",
      "compliance_score": 85,
      "status": "compliant",
      "risk_factors": []
    }
  ]
}
```

## 🚨 **Error Handling**

### **Standard Error Response Format**
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

### **Common Error Codes**
- `WALLET_REQUIRED`: Wallet address is missing or invalid
- `INVALID_NETWORK`: Unsupported blockchain network
- `PRODUCT_NOT_FOUND`: Product with specified ID not found
- `INSUFFICIENT_PERMISSIONS`: User lacks required permissions
- `BLOCKCHAIN_ERROR`: Smart contract execution failed
- `VALIDATION_ERROR`: Request data validation failed

### **HTTP Status Codes**
- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

## 🔧 **Rate Limiting**

### **Rate Limit Headers**
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

### **Rate Limits**
- **Public Endpoints**: 100 requests per hour
- **Authenticated Endpoints**: 1000 requests per hour
- **Admin Endpoints**: 5000 requests per hour

## 📱 **SDK & Libraries**

### **JavaScript/TypeScript SDK**
```bash
npm install @greentrace/sdk
```

**Usage Example:**
```typescript
import { GreenTraceSDK } from '@greentrace/sdk';

const sdk = new GreenTraceSDK({
  apiUrl: 'https://api.greentrace.com',
  network: 'avalanche-fuji'
});

// Create a product
const product = await sdk.products.create({
  name: 'Organic Coffee',
  batchId: 'BATCH001',
  walletAddress: '0x1234...5678'
});
```

### **Python SDK**
```bash
pip install greentrace-sdk
```

**Usage Example:**
```python
from greentrace_sdk import GreenTraceClient

client = GreenTraceClient(
    api_url='https://api.greentrace.com',
    network='avalanche-fuji'
)

# Create a product
product = client.products.create(
    name='Organic Coffee',
    batch_id='BATCH001',
    wallet_address='0x1234...5678'
)
```

## 🔗 **Webhook Support**

### **Configure Webhooks**
**Endpoint:** `POST /api/webhooks/configure/`

**Description:** Set up webhook notifications for events

**Request Body:**
```json
{
  "url": "https://your-app.com/webhooks",
  "events": ["product.created", "compliance.updated"],
  "secret": "your-webhook-secret",
  "wallet_address": "0x1234...5678"
}
```

### **Webhook Events**
- `product.created`: New product registered
- `product.updated`: Product information updated
- `compliance.updated`: Compliance score changed
- `credit.issued`: New carbon credit issued
- `credit.transferred`: Carbon credit transferred
- `credit.retired`: Carbon credit retired

### **Webhook Payload Example**
```json
{
  "event": "product.created",
  "timestamp": "2024-12-31T10:00:00Z",
  "data": {
    "product_id": 123,
    "batch_id": "BATCH001",
    "name": "Organic Coffee Beans",
    "blockchain_hash": "0xabc...def"
  }
}
```

## 📚 **Additional Resources**

- **Interactive API Docs**: [Swagger UI](https://api.greentrace.com/docs/)
- **Postman Collection**: [Download Collection](https://api.greentrace.com/postman)
- **SDK Documentation**: [SDK Docs](https://docs.greentrace.com/sdk)
- **Code Examples**: [GitHub Examples](https://github.com/yourusername/greentrace-examples)

---

**For additional support, please contact our developer relations team at dev@greentrace.com**
