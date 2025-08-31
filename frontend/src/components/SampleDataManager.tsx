import React, { useState } from 'react';
import { ethers } from 'ethers';

interface SampleDataManagerProps {
  productRegistry: ethers.Contract | null;
  onClose: () => void;
}

interface SampleProduct {
  name: string;
  batchId: string;
  location: string;
  producer: string;
  description: string;
  carbonActivity: string;
  iotData: string;
  certification: string;
}

const SampleDataManager: React.FC<SampleDataManagerProps> = ({ productRegistry, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string>('');

  // Realistic sample products for agriculture and food safety
  const sampleProducts: SampleProduct[] = [
    {
      name: "Organic Valley Tomatoes",
      batchId: "ORG-TOMATO-2025-001",
      location: "California Central Valley",
      producer: "Green Acres Farm Co.",
      description: "Premium organic tomatoes grown using sustainable farming practices with zero pesticides",
      carbonActivity: "low-carbon",
      iotData: "Temperature: 22°C, Humidity: 65%, Soil pH: 6.8, Water usage: 2.3L/kg",
      certification: "organic"
    },
    {
      name: "Fair Trade Coffee Beans",
      batchId: "FT-COFFEE-2025-002",
      location: "Colombia, South America",
      producer: "Mountain View Coffee Estates",
      description: "High-altitude Arabica coffee beans sourced from certified fair trade farms",
      carbonActivity: "carbon-neutral",
      iotData: "Altitude: 1800m, Rainfall: 2000mm/year, Shade coverage: 85%, Carbon offset: 2.1kg CO2/kg",
      certification: "fair-trade"
    },
    {
      name: "Carbon-Neutral Rice",
      batchId: "CN-RICE-2025-003",
      location: "Thailand, Southeast Asia",
      producer: "Golden Fields Rice Co.",
      description: "Sustainable rice production with methane capture and renewable energy usage",
      carbonActivity: "carbon-negative",
      iotData: "Methane capture: 3.2kg CH4/ton, Solar panels: 15kW, Water efficiency: 85%",
      certification: "carbon-neutral"
    },
    {
      name: "Sustainable Wheat",
      batchId: "SW-WHEAT-2025-004",
      location: "Kansas, USA",
      producer: "Heartland Grain Farms",
      description: "Regenerative agriculture wheat with soil carbon sequestration practices",
      carbonActivity: "low-carbon",
      iotData: "Soil carbon: +0.8%/year, No-till farming: 100%, Cover crops: 3 seasons/year",
      certification: "sustainable"
    },
    {
      name: "Biodynamic Grapes",
      batchId: "BD-GRAPES-2025-005",
      location: "Bordeaux, France",
      producer: "Château Écologique",
      description: "Biodynamic wine grapes using lunar cycles and natural preparations",
      carbonActivity: "carbon-neutral",
      iotData: "Lunar phase tracking: active, Natural preparations: 8 types, Biodiversity index: 92%",
      certification: "biodynamic"
    },
    {
      name: "Vertical Farm Lettuce",
      batchId: "VF-LETTUCE-2025-006",
      location: "New York City, USA",
      producer: "Urban Greens Inc.",
      description: "Hydroponic lettuce grown in vertical farms using 95% less water",
      carbonActivity: "carbon-negative",
      iotData: "LED efficiency: 98%, Water recycling: 95%, Energy usage: 0.8kWh/kg, Local delivery: 5km",
      certification: "sustainable"
    },
    {
      name: "Regenerative Beef",
      batchId: "RG-BEEF-2025-007",
      location: "Texas, USA",
      producer: "Prairie Restoration Ranch",
      description: "Grass-fed beef from ranches practicing holistic grazing management",
      carbonActivity: "low-carbon",
      iotData: "Grass rotation: 7 days, Soil carbon: +1.2%/year, Water retention: +40%, Biodiversity: +65%",
      certification: "regenerative"
    },
    {
      name: "Aquaponics Fish",
      batchId: "AQ-FISH-2025-008",
      location: "Netherlands, Europe",
      producer: "Blue Circle Aquaculture",
      description: "Tilapia raised in closed-loop aquaponics systems with zero waste",
      carbonActivity: "carbon-neutral",
      iotData: "Water filtration: 99.9%, Feed conversion: 1.2:1, Energy efficiency: 85%, Zero discharge: 100%",
      certification: "sustainable"
    }
  ];

  const addSampleProducts = async () => {
    if (!productRegistry) {
      setStatus('❌ Please connect your wallet first!');
      return;
    }

    try {
      setLoading(true);
      setProgress(0);
      setStatus('🚀 Starting sample data population...');

      for (let i = 0; i < sampleProducts.length; i++) {
        const product = sampleProducts[i];
        setProgress(((i + 1) / sampleProducts.length) * 100);
        setStatus(`📦 Adding ${product.name}...`);

        try {
          const tx = await productRegistry.addProduct(
            product.batchId,
            product.name,
            product.carbonActivity,
            product.certification,
            product.iotData
          );
          await tx.wait();
          
          setStatus(`✅ ${product.name} added successfully! (${i + 1}/${sampleProducts.length})`);
          
          // Small delay to show progress
          await new Promise(resolve => setTimeout(resolve, 1000));
          
        } catch (error) {
          console.error(`Error adding ${product.name}:`, error);
          setStatus(`❌ Failed to add ${product.name}: ${error}`);
          break;
        }
      }

      setStatus('🎉 Sample data population completed! All products added to blockchain.');
      
    } catch (error) {
      console.error('Error in sample data population:', error);
      setStatus(`❌ Sample data population failed: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const clearStatus = () => {
    setStatus('');
    setProgress(0);
  };

  return (
    <div className="sample-data-overlay">
      <div className="sample-data">
        <div className="sample-data-header">
          <h2>🌱 Sample Data Manager</h2>
          <p>Populate your platform with realistic agriculture and food safety products</p>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <div className="sample-data-content">
          {/* Sample Products Preview */}
          <div className="section">
            <h3>📋 Sample Products Available</h3>
            <p>These realistic products will demonstrate the full capabilities of GreenTrace:</p>
            
            <div className="products-preview">
              {sampleProducts.map((product, index) => (
                <div key={index} className="product-preview-card">
                  <div className="product-preview-header">
                    <h4>{product.name}</h4>
                    <span className={`cert-badge ${product.certification}`}>
                      {product.certification.toUpperCase()}
                    </span>
                  </div>
                  <div className="product-preview-details">
                    <p><strong>Location:</strong> {product.location}</p>
                    <p><strong>Producer:</strong> {product.producer}</p>
                    <p><strong>Carbon Activity:</strong> {product.carbonActivity}</p>
                    <p><strong>Description:</strong> {product.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Section */}
          <div className="section">
            <h3>⚡ Quick Population</h3>
            <p>Add all sample products to your blockchain with one click:</p>
            
            <button 
              onClick={addSampleProducts}
              disabled={loading}
              className="populate-btn"
            >
              {loading ? '🔄 Populating...' : '🚀 Populate with Sample Data'}
            </button>
          </div>

          {/* Progress Section */}
          {loading && (
            <div className="section">
              <h3>📊 Population Progress</h3>
              <div className="progress-container">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="progress-text">{Math.round(progress)}%</span>
              </div>
            </div>
          )}

          {/* Status Section */}
          {status && (
            <div className="section">
              <h3>📈 Status Updates</h3>
              <div className={`status-display ${status.includes('❌') ? 'error' : status.includes('✅') ? 'success' : 'info'}`}>
                {status}
              </div>
              {!loading && (
                <button onClick={clearStatus} className="clear-status-btn">
                  Clear Status
                </button>
              )}
            </div>
          )}

          {/* Benefits Section */}
          <div className="section">
            <h3>💡 Why Sample Data?</h3>
            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">🎯</div>
                <h4>Demo Ready</h4>
                <p>Immediate demonstration of all platform features</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🌍</div>
                <h4>Realistic Scenarios</h4>
                <p>Shows real-world agriculture use cases</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🔍</div>
                <h4>Feature Testing</h4>
                <p>Test compliance, cross-chain sync, and more</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">📊</div>
                <h4>Data Visualization</h4>
                <p>Rich data for charts and analytics</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleDataManager;
