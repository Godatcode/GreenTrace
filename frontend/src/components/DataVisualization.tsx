import React, { useState, useMemo } from 'react';
import IconSystem from './IconSystem';

interface Product {
  id: string;
  name: string;
  batchId: string;
  certification: string;
  carbonActivity: string;
  location: string;
  producer: string;
  timestamp: number;
  complianceScore?: number;
  isCompliant?: boolean;
}

interface DataVisualizationProps {
  products: Product[];
  carbonCredits?: any[];
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

const DataVisualization: React.FC<DataVisualizationProps> = ({
  products,
  carbonCredits = []
}) => {
  const [activeChart, setActiveChart] = useState<'products' | 'compliance' | 'carbon' | 'geography'>('products');

  // Process data for different chart types
  const chartData = useMemo(() => {
    switch (activeChart) {
      case 'products':
        return getProductDistributionData(products);
      case 'compliance':
        return getComplianceData(products);
      case 'carbon':
        return getCarbonActivityData(products);
      case 'geography':
        return getGeographicData(products);
      default:
        return getProductDistributionData(products);
    }
  }, [activeChart, products]);

  // Product distribution by certification
  const getProductDistributionData = (products: Product[]): ChartData => {
    const certificationCounts = products.reduce((acc, product) => {
      const cert = product.certification || 'Uncertified';
      acc[cert] = (acc[cert] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const labels = Object.keys(certificationCounts);
    const data = Object.values(certificationCounts);
    const colors = generateColors(labels.length);

    return {
      labels,
      datasets: [{
        label: 'Products by Certification',
        data,
        backgroundColor: colors.map(c => c + '80'),
        borderColor: colors,
        borderWidth: 2
      }]
    };
  };

  // Compliance score distribution
  const getComplianceData = (products: Product[]): ChartData => {
    const complianceRanges = {
      '0-20': 0,
      '21-40': 0,
      '41-60': 0,
      '61-80': 0,
      '81-100': 0
    };

    products.forEach(product => {
      const score = product.complianceScore || 0;
      if (score <= 20) complianceRanges['0-20']++;
      else if (score <= 40) complianceRanges['21-40']++;
      else if (score <= 60) complianceRanges['41-60']++;
      else if (score <= 80) complianceRanges['61-80']++;
      else complianceRanges['81-100']++;
    });

    const labels = Object.keys(complianceRanges);
    const data = Object.values(complianceRanges);
    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#10b981'];

    return {
      labels,
      datasets: [{
        label: 'Compliance Score Distribution',
        data,
        backgroundColor: colors.map(c => c + '80'),
        borderColor: colors,
        borderWidth: 2
      }]
    };
  };

  // Carbon activity distribution
  const getCarbonActivityData = (products: Product[]): ChartData => {
    const activityCounts = products.reduce((acc, product) => {
      const activity = product.carbonActivity || 'Unknown';
      acc[activity] = (acc[activity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const labels = Object.keys(activityCounts);
    const data = Object.values(activityCounts);
    const colors = generateColors(labels.length);

    return {
      labels,
      datasets: [{
        label: 'Products by Carbon Activity',
        data,
        backgroundColor: colors.map(c => c + '80'),
        borderColor: colors,
        borderWidth: 2
      }]
    };
  };

  // Geographic distribution
  const getGeographicData = (products: Product[]): ChartData => {
    const locationCounts = products.reduce((acc, product) => {
      const location = product.location || 'Unknown';
      acc[location] = (acc[location] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const labels = Object.keys(locationCounts);
    const data = Object.values(locationCounts);
    const colors = generateColors(labels.length);

    return {
      labels,
      datasets: [{
        label: 'Products by Location',
        data,
        backgroundColor: colors.map(c => c + '80'),
        borderColor: colors,
        borderWidth: 2
      }]
    };
  };

  // Generate consistent colors for charts
  const generateColors = (count: number): string[] => {
    const baseColors = [
      '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444',
      '#06b6d4', '#84cc16', '#f97316', '#a855f7', '#ec4899'
    ];
    
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(baseColors[i % baseColors.length]);
    }
    return colors;
  };

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const totalProducts = products.length;
    const compliantProducts = products.filter(p => p.isCompliant).length;
    const avgComplianceScore = products.reduce((sum, p) => sum + (p.complianceScore || 0), 0) / totalProducts || 0;
    const uniqueLocations = new Set(products.map(p => p.location)).size;
    const uniqueProducers = new Set(products.map(p => p.producer)).size;

    return {
      totalProducts,
      compliantProducts,
      complianceRate: totalProducts > 0 ? (compliantProducts / totalProducts * 100).toFixed(1) : '0',
      avgComplianceScore: avgComplianceScore.toFixed(1),
      uniqueLocations,
      uniqueProducers
    };
  }, [products]);

  return (
    <div className="data-visualization">
      <div className="viz-header">
        <h3 className="viz-title">
          <IconSystem name="chart" size="sm" />
          Data Analytics & Insights
        </h3>
        
        {/* Chart Type Selector */}
        <div className="chart-selector">
          <button
            className={`chart-btn ${activeChart === 'products' ? 'active' : ''}`}
            onClick={() => setActiveChart('products')}
          >
            <IconSystem name="package" size="sm" />
            Products
          </button>
          <button
            className={`chart-btn ${activeChart === 'compliance' ? 'active' : ''}`}
            onClick={() => setActiveChart('compliance')}
          >
            <IconSystem name="verify" size="sm" />
            Compliance
          </button>
          <button
            className={`chart-btn ${activeChart === 'carbon' ? 'active' : ''}`}
            onClick={() => setActiveChart('carbon')}
          >
            <IconSystem name="carbon" size="sm" />
            Carbon
          </button>
          <button
            className={`chart-btn ${activeChart === 'geography' ? 'active' : ''}`}
            onClick={() => setActiveChart('geography')}
          >
            <IconSystem name="location" size="sm" />
            Geography
          </button>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="summary-stats">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <div className="stat-value">{summaryStats.totalProducts}</div>
            <div className="stat-label">Total Products</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-value">{summaryStats.complianceRate}%</div>
            <div className="stat-label">Compliance Rate</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-value">{summaryStats.avgComplianceScore}</div>
            <div className="stat-label">Avg Compliance Score</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🌍</div>
          <div className="stat-content">
            <div className="stat-value">{summaryStats.uniqueLocations}</div>
            <div className="stat-label">Unique Locations</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🏭</div>
          <div className="stat-content">
            <div className="stat-value">{summaryStats.uniqueProducers}</div>
            <div className="stat-label">Unique Producers</div>
          </div>
        </div>
      </div>

      {/* Chart Display */}
      <div className="chart-container">
        <div className="chart-header">
          <h4 className="chart-title">
            {activeChart === 'products' && 'Product Distribution by Certification'}
            {activeChart === 'compliance' && 'Compliance Score Distribution'}
            {activeChart === 'carbon' && 'Carbon Activity Distribution'}
            {activeChart === 'geography' && 'Geographic Distribution'}
          </h4>
        </div>
        
        <div className="chart-content">
          {/* Simple Chart Representation */}
          <div className="simple-chart">
            {chartData.labels.map((label, index) => (
              <div key={label} className="chart-bar">
                <div className="bar-label">{label}</div>
                <div className="bar-container">
                  <div 
                    className="bar-fill"
                    style={{
                      width: `${(chartData.datasets[0].data[index] / Math.max(...chartData.datasets[0].data)) * 100}%`,
                      backgroundColor: chartData.datasets[0].backgroundColor[index]
                    }}
                  />
                  <span className="bar-value">{chartData.datasets[0].data[index]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="data-table">
        <h4 className="table-title">Raw Data</h4>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Batch ID</th>
                <th>Certification</th>
                <th>Location</th>
                <th>Compliance Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 10).map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.batchId}</td>
                  <td>{product.certification || 'None'}</td>
                  <td>{product.location}</td>
                  <td>{product.complianceScore || 'N/A'}</td>
                  <td>
                    <span className={`status-badge ${product.isCompliant ? 'compliant' : 'non-compliant'}`}>
                      {product.isCompliant ? '✅ Compliant' : '❌ Non-Compliant'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataVisualization;
