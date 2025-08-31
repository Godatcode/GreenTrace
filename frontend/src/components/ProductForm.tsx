import React, { useState } from 'react';

interface ProductFormProps {
  onSubmit: (productData: ProductData) => void;
  onCancel: () => void;
  loading: boolean;
}

export interface ProductData {
  name: string;
  location: string;
  timestamp: number;
  carbonActivity: string;
  iotData: string;
  batchId: string;
  producer: string;
  certification: string;
  description: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState<ProductData>({
    name: '',
    batchId: '',
    location: '',
    producer: '',
    description: '',
    carbonActivity: '',
    iotData: '',
    certification: 'Organic',
    timestamp: Math.floor(Date.now() / 1000)
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateBatchId = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const newBatchId = `BATCH-${timestamp}-${random}`;
    setFormData(prev => ({ ...prev, batchId: newBatchId }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if wallet is connected
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask first!');
      return;
    }
    
    if (!window.ethereum.selectedAddress) {
      alert('Please connect your MetaMask wallet first!');
      return;
    }
    
    // Validate required fields
    const requiredFields = [];
    if (!formData.name) requiredFields.push('Product Name');
    if (!formData.batchId) requiredFields.push('Batch ID');
    if (!formData.producer) requiredFields.push('Producer');
    if (!formData.carbonActivity) requiredFields.push('Carbon Activity');
    if (!formData.certification) requiredFields.push('Certification');
    
    if (requiredFields.length > 0) {
      alert(`Please fill in all required fields: ${requiredFields.join(', ')}`);
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <div className="product-form-overlay">
      <div className="product-form">
        <div className="form-header">
          <h2>🌱 Add New Product</h2>
          <p>Register your product on the blockchain for transparency and traceability</p>
          <button onClick={onCancel} className="close-btn">×</button>
        </div>

        <form onSubmit={handleSubmit} className="product-form-content">
          <div className="form-section">
            <h3>📋 Basic Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Product Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Organic Tomatoes"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="batchId">Batch ID *</label>
                <div className="batch-id-input">
                  <input
                    type="text"
                    id="batchId"
                    name="batchId"
                    value={formData.batchId}
                    onChange={handleChange}
                    placeholder="e.g., BATCH-001"
                    required
                  />
                  <button 
                    type="button" 
                    onClick={generateBatchId}
                    className="generate-btn"
                  >
                    🔄 Generate
                  </button>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="producer">Producer/Company *</label>
                <input
                  type="text"
                  id="producer"
                  name="producer"
                  value={formData.producer}
                  onChange={handleChange}
                  placeholder="e.g., Green Valley Farms"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., California, USA"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Product Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your product, growing methods, sustainability practices..."
                rows={3}
              />
            </div>
          </div>

          <div className="form-section">
            <h3>🌿 Sustainability & Certification</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="certification">Certification *</label>
                <select
                  id="certification"
                  name="certification"
                  value={formData.certification}
                  onChange={handleChange}
                  required
                >
                  <option value="Organic">Organic</option>
                  <option value="Fair Trade">Fair Trade</option>
                  <option value="Rainforest Alliance">Rainforest Alliance</option>
                  <option value="Carbon Neutral">Carbon Neutral</option>
                  <option value="Sustainable">Sustainable</option>
                  <option value="Regenerative Organic">Regenerative Organic</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="carbonActivity">Carbon Activity *</label>
                <input
                  type="text"
                  id="carbonActivity"
                  name="carbonActivity"
                  value={formData.carbonActivity}
                  onChange={handleChange}
                  placeholder="e.g., Reduced tillage, cover crops"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="iotData">IoT Sensor Data</label>
              <textarea
                id="iotData"
                name="iotData"
                value={formData.iotData}
                onChange={handleChange}
                placeholder="Temperature, humidity, soil pH, rainfall data..."
                rows={2}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? '🔄 Adding Product...' : '✅ Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
