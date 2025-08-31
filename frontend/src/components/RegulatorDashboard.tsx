import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

interface RegulatorDashboardProps {
  productRegistry: ethers.Contract | null;
  onClose: () => void;
}

interface AuditLog {
  id: string;
  action: string;
  productId: string;
  productName: string;
  oldScore?: number;
  newScore?: number;
  regulator: string;
  timestamp: number;
  reason?: string;
  complianceImpact: 'positive' | 'negative' | 'neutral';
}

interface ComplianceSnapshot {
  id: string;
  timestamp: number;
  totalProducts: number;
  compliantProducts: number;
  nonCompliantProducts: number;
  averageScore: number;
  riskLevel: string;
  topIssues: string[];
}

const RegulatorDashboard: React.FC<RegulatorDashboardProps> = ({ productRegistry, onClose }) => {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [complianceSnapshots, setComplianceSnapshots] = useState<ComplianceSnapshot[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterDate, setFilterDate] = useState<string>('');
  const [filterAction, setFilterAction] = useState<string>('');
  const [reportData, setReportData] = useState<any>(null);

  // Mock audit logs for demonstration
  useEffect(() => {
    const mockAuditLogs: AuditLog[] = [
      {
        id: '1',
        action: 'Score Update',
        productId: 'BATCH001',
        productName: 'Organic Tomatoes',
        oldScore: 75,
        newScore: 85,
        regulator: '0x1234...5678',
        timestamp: Date.now() - 3600000, // 1 hour ago
        reason: 'Additional organic certification verified',
        complianceImpact: 'positive'
      },
      {
        id: '2',
        action: 'Compliance Review',
        productId: 'BATCH002',
        productName: 'Fair Trade Coffee',
        oldScore: 90,
        newScore: 90,
        regulator: '0x1234...5678',
        timestamp: Date.now() - 7200000, // 2 hours ago
        reason: 'Regular compliance check - no changes needed',
        complianceImpact: 'neutral'
      },
      {
        id: '3',
        action: 'Violation Detected',
        productId: 'BATCH003',
        productName: 'Carbon Neutral Rice',
        oldScore: 85,
        newScore: 60,
        regulator: '0x1234...5678',
        timestamp: Date.now() - 10800000, // 3 hours ago
        reason: 'Carbon offset verification failed',
        complianceImpact: 'negative'
      }
    ];
    setAuditLogs(mockAuditLogs);
  }, []);

  // Mock compliance snapshots
  useEffect(() => {
    const mockSnapshots: ComplianceSnapshot[] = [
      {
        id: '1',
        timestamp: Date.now() - 86400000, // 1 day ago
        totalProducts: 15,
        compliantProducts: 12,
        nonCompliantProducts: 3,
        averageScore: 78,
        riskLevel: 'medium',
        topIssues: ['Carbon verification', 'Producer credentials', 'Data completeness']
      },
      {
        id: '2',
        timestamp: Date.now() - 172800000, // 2 days ago
        totalProducts: 12,
        compliantProducts: 10,
        nonCompliantProducts: 2,
        averageScore: 82,
        riskLevel: 'low',
        topIssues: ['Data completeness', 'Certification expiry']
      }
    ];
    setComplianceSnapshots(mockSnapshots);
  }, []);

  const fetchProducts = useCallback(async () => {
    if (!productRegistry) return;
    
    try {
      setLoading(true);
      const count = await productRegistry.getProductCount();
      const productsData: any[] = [];
      
      if (count.toNumber() > 0) {
        const batchIds = await productRegistry.getAllProductBatchIds();
        
        for (const batchId of batchIds) {
          try {
            const basicData = await productRegistry.getProduct(batchId);
            const complianceData = await productRegistry.getProductWithCompliance(batchId);
            
            productsData.push({
              batchId,
              name: basicData.product,
              certification: basicData.certification,
              carbonActivity: basicData.carbonActivity,
              complianceScore: complianceData.complianceScore,
              isCompliant: complianceData.isCompliant,
              timestamp: basicData.timestamp.toNumber()
            });
          } catch (error) {
            console.error(`Error fetching product ${batchId}:`, error);
          }
        }
      }
      
      setProducts(productsData);
      
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [productRegistry]);

  // Fetch products for selection
  useEffect(() => {
    if (productRegistry) {
      fetchProducts();
    }
  }, [productRegistry, fetchProducts]);

  const generateComplianceReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      totalProducts: products.length,
      complianceSummary: {
        compliant: products.filter(p => p.isCompliant).length,
        nonCompliant: products.filter(p => !p.isCompliant).length,
        averageScore: products.length > 0 ? 
          Math.round(products.reduce((sum, p) => sum + p.complianceScore, 0) / products.length) : 0
      },
      topIssues: [
        'Certification validation',
        'Carbon activity verification',
        'Producer credential checks',
        'Data completeness'
      ],
      recommendations: [
        'Implement automated certification expiry alerts',
        'Add real-time carbon offset verification',
        'Enhance producer verification process',
        'Establish data quality metrics'
      ]
    };
    
    setReportData(report);
  };

  const exportReport = () => {
    if (!reportData) return;
    
    const reportText = `
GREENTRACE COMPLIANCE REPORT
Generated: ${new Date(reportData.generatedAt).toLocaleString()}

COMPLIANCE SUMMARY:
- Total Products: ${reportData.totalProducts}
- Compliant: ${reportData.complianceSummary.compliant}
- Non-Compliant: ${reportData.complianceSummary.nonCompliant}
- Average Score: ${reportData.complianceSummary.averageScore}%

TOP ISSUES:
${reportData.topIssues.map((issue: string, index: number) => `${index + 1}. ${issue}`).join('\n')}

RECOMMENDATIONS:
${reportData.recommendations.map((rec: string, index: number) => `${index + 1}. ${rec}`).join('\n')}
    `;
    
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compliance-report-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getComplianceImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'success';
      case 'negative': return 'danger';
      case 'neutral': return 'info';
      default: return 'info';
    }
  };

  const getComplianceImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive': return '📈';
      case 'negative': return '📉';
      case 'neutral': return '➡️';
      default: return '➡️';
    }
  };

  return (
    <div className="regulator-dashboard-overlay">
      <div className="regulator-dashboard">
        <div className="regulator-header">
          <h2>🔍 Regulator Audit Dashboard</h2>
          <p>Advanced compliance monitoring and regulatory oversight tools</p>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <div className="regulator-content">
          {/* Quick Actions */}
          <div className="section">
            <h3>⚡ Quick Actions</h3>
            <div className="actions-grid">
              <button 
                onClick={generateComplianceReport}
                className="action-btn primary"
                disabled={loading}
              >
                📊 Generate Compliance Report
              </button>
              <button 
                onClick={exportReport}
                className="action-btn"
                disabled={!reportData}
              >
                📥 Export Report
              </button>
              <button 
                onClick={fetchProducts}
                className="action-btn"
                disabled={loading}
              >
                🔄 Refresh Data
              </button>
            </div>
          </div>

          {/* Compliance Report */}
          {reportData && (
            <div className="section">
              <h3>📋 Compliance Report</h3>
              <div className="report-summary">
                <div className="report-header">
                  <span>Generated: {new Date(reportData.generatedAt).toLocaleString()}</span>
                  <span className="report-status">Ready for Export</span>
                </div>
                <div className="report-metrics">
                  <div className="metric">
                    <strong>Total Products:</strong> {reportData.totalProducts}
                  </div>
                  <div className="metric">
                    <strong>Compliant:</strong> {reportData.complianceSummary.compliant}
                  </div>
                  <div className="metric">
                    <strong>Non-Compliant:</strong> {reportData.complianceSummary.nonCompliant}
                  </div>
                  <div className="metric">
                    <strong>Average Score:</strong> {reportData.complianceSummary.averageScore}%
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Audit Trail */}
          <div className="section">
            <h3>📜 Audit Trail</h3>
            <div className="audit-filters">
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="filter-input"
                placeholder="Filter by date"
              />
              <select
                value={filterAction}
                onChange={(e) => setFilterAction(e.target.value)}
                className="filter-input"
              >
                <option value="">All Actions</option>
                <option value="Score Update">Score Updates</option>
                <option value="Compliance Review">Compliance Reviews</option>
                <option value="Violation Detected">Violations</option>
              </select>
            </div>
            
            <div className="audit-logs">
              {auditLogs
                .filter(log => !filterDate || new Date(log.timestamp).toDateString() === new Date(filterDate).toDateString())
                .filter(log => !filterAction || log.action === filterAction)
                .map((log) => (
                  <div key={log.id} className={`audit-log-item ${log.complianceImpact}`}>
                    <div className="audit-icon">
                      {getComplianceImpactIcon(log.complianceImpact)}
                    </div>
                    <div className="audit-content">
                      <div className="audit-header">
                        <h5>{log.action}</h5>
                        <span className={`impact-badge ${getComplianceImpactColor(log.complianceImpact)}`}>
                          {log.complianceImpact}
                        </span>
                      </div>
                      <div className="audit-details">
                        <p><strong>Product:</strong> {log.productName} ({log.productId})</p>
                        {log.oldScore !== undefined && log.newScore !== undefined && (
                          <p><strong>Score Change:</strong> {log.oldScore} → {log.newScore}</p>
                        )}
                        <p><strong>Regulator:</strong> {log.regulator}</p>
                        <p><strong>Time:</strong> {new Date(log.timestamp).toLocaleString()}</p>
                        {log.reason && <p><strong>Reason:</strong> {log.reason}</p>}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Compliance Snapshots */}
          <div className="section">
            <h3>📸 Compliance Snapshots</h3>
            <p>Historical compliance status at key points in time</p>
            <div className="snapshots-grid">
              {complianceSnapshots.map((snapshot) => (
                <div key={snapshot.id} className="snapshot-card">
                  <div className="snapshot-header">
                    <h4>Snapshot #{snapshot.id}</h4>
                    <span className="snapshot-time">
                      {new Date(snapshot.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="snapshot-metrics">
                    <div className="snapshot-metric">
                      <span className="metric-label">Total:</span>
                      <span className="metric-value">{snapshot.totalProducts}</span>
                    </div>
                    <div className="snapshot-metric">
                      <span className="metric-label">Compliant:</span>
                      <span className="metric-value success">{snapshot.compliantProducts}</span>
                    </div>
                    <div className="snapshot-metric">
                      <span className="metric-label">Non-Compliant:</span>
                      <span className="metric-value danger">{snapshot.nonCompliantProducts}</span>
                    </div>
                    <div className="snapshot-metric">
                      <span className="metric-label">Average Score:</span>
                      <span className={`metric-value ${snapshot.averageScore >= 80 ? 'success' : snapshot.averageScore >= 60 ? 'warning' : 'danger'}`}>
                        {snapshot.averageScore}%
                      </span>
                    </div>
                    <div className="snapshot-metric">
                      <span className="metric-label">Risk Level:</span>
                      <span className={`metric-value ${snapshot.riskLevel === 'low' ? 'success' : snapshot.riskLevel === 'medium' ? 'warning' : 'danger'}`}>
                        {snapshot.riskLevel.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="snapshot-issues">
                    <h5>Top Issues:</h5>
                    <ul>
                      {snapshot.topIssues.map((issue, index) => (
                        <li key={index}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Investigation */}
          <div className="section">
            <h3>🔍 Product Investigation</h3>
            <div className="product-selector">
              <select 
                value={selectedProduct} 
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="product-select"
              >
                <option value="">Select a product for investigation...</option>
                {products.map((product) => (
                  <option key={product.batchId} value={product.batchId}>
                    {product.name} - {product.batchId} ({product.complianceScore}%)
                  </option>
                ))}
              </select>
            </div>
            
            {selectedProduct && (
              <div className="investigation-details">
                {(() => {
                  const product = products.find(p => p.batchId === selectedProduct);
                  if (!product) return null;
                  
                  return (
                    <div className="investigation-card">
                      <div className="investigation-header">
                        <h4>{product.name}</h4>
                        <span className={`compliance-badge ${product.complianceScore >= 80 ? 'success' : product.complianceScore >= 60 ? 'warning' : 'danger'}`}>
                          {product.complianceScore}%
                        </span>
                      </div>
                      
                      <div className="investigation-info">
                        <div className="info-grid">
                          <div className="info-item">
                            <strong>Batch ID:</strong> {product.batchId}
                          </div>
                          <div className="info-item">
                            <strong>Certification:</strong> {product.certification}
                          </div>
                          <div className="info-item">
                            <strong>Carbon Activity:</strong> {product.carbonActivity}
                          </div>
                          <div className="info-item">
                            <strong>Compliance Status:</strong> 
                            <span className={`status ${product.isCompliant ? 'compliant' : 'non-compliant'}`}>
                              {product.isCompliant ? '✅ Compliant' : '❌ Non-Compliant'}
                            </span>
                          </div>
                          <div className="info-item">
                            <strong>Registration Date:</strong> {new Date(product.timestamp * 1000).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="investigation-actions">
                        <h5>Regulatory Actions</h5>
                        <div className="action-buttons">
                          <button className="regulatory-btn warning">
                            ⚠️ Flag for Review
                          </button>
                          <button className="regulatory-btn danger">
                            🚨 Issue Violation
                          </button>
                          <button className="regulatory-btn info">
                            📋 Request Documentation
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegulatorDashboard;
