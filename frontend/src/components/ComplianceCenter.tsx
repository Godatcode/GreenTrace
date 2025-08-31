import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

interface ComplianceCenterProps {
  productRegistry: ethers.Contract | null;
  onClose: () => void;
}

interface ProductCompliance {
  batchId: string;
  name: string;
  certification: string;
  carbonActivity: string;
  complianceScore: number;
  isCompliant: boolean;
  timestamp: number;
  lastUpdated: number;
}

interface ComplianceRule {
  id: string;
  name: string;
  description: string;
  weight: number;
  status: 'active' | 'inactive';
}

const ComplianceCenter: React.FC<ComplianceCenterProps> = ({ productRegistry, onClose }) => {
  const [products, setProducts] = useState<ProductCompliance[]>([]);
  const [complianceRules, setComplianceRules] = useState<ComplianceRule[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [complianceHistory, setComplianceHistory] = useState<any[]>([]);
  const [overallCompliance, setOverallCompliance] = useState({
    totalProducts: 0,
    compliantProducts: 0,
    averageScore: 0,
    riskLevel: 'low'
  });

  // Initialize compliance rules
  useEffect(() => {
    const rules: ComplianceRule[] = [
      {
        id: 'certification',
        name: 'Certification Validation',
        description: 'Verify product has valid organic/fair-trade/carbon-neutral certification',
        weight: 40,
        status: 'active'
      },
      {
        id: 'carbon_activity',
        name: 'Carbon Activity Assessment',
        description: 'Evaluate carbon footprint and sustainability practices',
        weight: 30,
        status: 'active'
      },
      {
        id: 'producer_verification',
        name: 'Producer Verification',
        description: 'Confirm producer credentials and history',
        weight: 20,
        status: 'active'
      },
      {
        id: 'data_completeness',
        name: 'Data Completeness',
        description: 'Ensure all required product information is provided',
        weight: 10,
        status: 'active'
      }
    ];
    setComplianceRules(rules);
  }, []);

  // Fetch products and compliance data
  useEffect(() => {
    if (productRegistry) {
      fetchComplianceData();
    }
  }, [productRegistry]);

  const fetchComplianceData = async () => {
    if (!productRegistry) return;
    
    try {
      setLoading(true);
      const count = await productRegistry.getProductCount();
      const productsData: ProductCompliance[] = [];
      
      if (count.toNumber() > 0) {
        const batchIds = await productRegistry.getAllProductBatchIds();
        
        for (const batchId of batchIds) {
          try {
            const complianceData = await productRegistry.getProductWithCompliance(batchId);
            const basicData = await productRegistry.getProduct(batchId);
            
            productsData.push({
              batchId,
              name: basicData.product,
              certification: basicData.certification,
              carbonActivity: basicData.carbonActivity,
              complianceScore: complianceData.complianceScore,
              isCompliant: complianceData.isCompliant,
              timestamp: basicData.timestamp.toNumber(),
              lastUpdated: Date.now()
            });
          } catch (error) {
            console.error(`Error fetching compliance for ${batchId}:`, error);
          }
        }
      }
      
      setProducts(productsData);
      calculateOverallCompliance(productsData);
      
    } catch (error) {
      console.error('Error fetching compliance data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateOverallCompliance = (productsData: ProductCompliance[]) => {
    const total = productsData.length;
    const compliant = productsData.filter(p => p.isCompliant).length;
    const averageScore = total > 0 ? productsData.reduce((sum, p) => sum + p.complianceScore, 0) / total : 0;
    
    let riskLevel = 'low';
    if (averageScore < 60) riskLevel = 'high';
    else if (averageScore < 80) riskLevel = 'medium';
    
    setOverallCompliance({
      totalProducts: total,
      compliantProducts: compliant,
      averageScore: Math.round(averageScore),
      riskLevel
    });
  };

  const updateComplianceScore = async (batchId: string, newScore: number) => {
    if (!productRegistry) return;
    
    try {
      setLoading(true);
      const tx = await productRegistry.updateComplianceScore(batchId, newScore);
      await tx.wait();
      
      setSyncResult(`✅ Compliance score updated for ${batchId} to ${newScore}`);
      
      // Refresh data
      setTimeout(() => {
        fetchComplianceData();
      }, 2000);
      
    } catch (error) {
      console.error('Error updating compliance score:', error);
      setSyncResult(`❌ Failed to update compliance score: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const getComplianceColor = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'danger';
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'danger';
      default: return 'info';
    }
  };

  const [syncResult, setSyncResult] = useState<string>('');

  return (
    <div className="compliance-center-overlay">
      <div className="compliance-center">
        <div className="compliance-header">
          <h2>🔒 Compliance Center</h2>
          <p>Real-time compliance monitoring and automated rule enforcement</p>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <div className="compliance-content">
          {/* Overall Compliance Summary */}
          <div className="section">
            <h3>📊 Overall Compliance Status</h3>
            <div className="compliance-summary">
              <div className="summary-card">
                <div className="summary-icon">📦</div>
                <div className="summary-info">
                  <h4>Total Products</h4>
                  <span className="summary-value">{overallCompliance.totalProducts}</span>
                </div>
              </div>
              
              <div className="summary-card">
                <div className="summary-icon">✅</div>
                <div className="summary-info">
                  <h4>Compliant</h4>
                  <span className="summary-value">{overallCompliance.compliantProducts}</span>
                </div>
              </div>
              
              <div className="summary-card">
                <div className="summary-icon">📈</div>
                <div className="summary-info">
                  <h4>Average Score</h4>
                  <span className={`summary-value ${getComplianceColor(overallCompliance.averageScore)}`}>
                    {overallCompliance.averageScore}%
                  </span>
                </div>
              </div>
              
              <div className="summary-card">
                <div className="summary-icon">⚠️</div>
                <div className="summary-info">
                  <h4>Risk Level</h4>
                  <span className={`summary-value ${getRiskLevelColor(overallCompliance.riskLevel)}`}>
                    {overallCompliance.riskLevel.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Compliance Rules */}
          <div className="section">
            <h3>📋 Active Compliance Rules</h3>
            <div className="rules-grid">
              {complianceRules.map((rule) => (
                <div key={rule.id} className={`rule-card ${rule.status}`}>
                  <div className="rule-header">
                    <h4>{rule.name}</h4>
                    <span className={`rule-status ${rule.status}`}>
                      {rule.status === 'active' ? '🟢 Active' : '🔴 Inactive'}
                    </span>
                  </div>
                  <p>{rule.description}</p>
                  <div className="rule-weight">
                    <span>Weight: {rule.weight}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Compliance Details */}
          <div className="section">
            <h3>🔍 Product Compliance Details</h3>
            <div className="product-selector">
              <select 
                value={selectedProduct} 
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="product-select"
              >
                <option value="">Select a product...</option>
                {products.map((product) => (
                  <option key={product.batchId} value={product.batchId}>
                    {product.name} - {product.batchId}
                  </option>
                ))}
              </select>
            </div>
            
            {selectedProduct && (
              <div className="product-compliance-details">
                {(() => {
                  const product = products.find(p => p.batchId === selectedProduct);
                  if (!product) return null;
                  
                  return (
                    <div className="product-detail-card">
                      <div className="product-header">
                        <h4>{product.name}</h4>
                        <span className={`compliance-badge ${getComplianceColor(product.complianceScore)}`}>
                          {product.complianceScore}%
                        </span>
                      </div>
                      
                      <div className="product-info">
                        <div className="info-row">
                          <strong>Batch ID:</strong> {product.batchId}
                        </div>
                        <div className="info-row">
                          <strong>Certification:</strong> {product.certification}
                        </div>
                        <div className="info-row">
                          <strong>Carbon Activity:</strong> {product.carbonActivity}
                        </div>
                        <div className="info-row">
                          <strong>Status:</strong> 
                          <span className={`status ${product.isCompliant ? 'compliant' : 'non-compliant'}`}>
                            {product.isCompliant ? '✅ Compliant' : '❌ Non-Compliant'}
                          </span>
                        </div>
                        <div className="info-row">
                          <strong>Last Updated:</strong> {new Date(product.lastUpdated).toLocaleString()}
                        </div>
                      </div>
                      
                      {/* Manual Score Update (for regulators) */}
                      <div className="score-update">
                        <h5>Update Compliance Score (Regulator Only)</h5>
                        <div className="score-input">
                          <input 
                            type="number" 
                            min="0" 
                            max="100" 
                            placeholder="New score (0-100)"
                            className="score-field"
                          />
                          <button 
                            onClick={() => {
                              const input = document.querySelector('.score-field') as HTMLInputElement;
                              if (input && input.value) {
                                updateComplianceScore(selectedProduct, parseInt(input.value));
                                input.value = '';
                              }
                            }}
                            disabled={loading}
                            className="update-score-btn"
                          >
                            {loading ? '🔄' : 'Update Score'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          {/* Compliance History */}
          <div className="section">
            <h3>📅 Compliance History</h3>
            <div className="history-timeline">
              {products.slice(0, 5).map((product, index) => (
                <div key={product.batchId} className="history-item">
                  <div className="history-icon">
                    {product.isCompliant ? '✅' : '❌'}
                  </div>
                  <div className="history-content">
                    <h5>{product.name}</h5>
                    <p>Compliance score: {product.complianceScore}% - {product.isCompliant ? 'Compliant' : 'Non-Compliant'}</p>
                    <span className="history-time">
                      {new Date(product.timestamp * 1000).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sync Results */}
          {syncResult && (
            <div className="section">
              <h3>📊 Update Results</h3>
              <div className={`sync-result ${syncResult.includes('✅') ? 'success' : 'error'}`}>
                {syncResult}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplianceCenter;
