import React, { useState, useEffect, useMemo } from 'react';
import { ethers } from 'ethers';

interface Product {
  id: number;
  name: string;
  batchId: string;
  location: string;
  producer: string;
  description: string;
  carbonActivity: string;
  iotData: string;
  certification: string;
  timestamp: number;
}

interface ProductListProps {
  productRegistry: ethers.Contract | null;
  onClose: () => void;
  userRole: 'public' | 'private' | 'enterprise' | 'admin';
}

const ProductList: React.FC<ProductListProps> = ({ productRegistry, onClose, userRole }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCertification, setFilterCertification] = useState('all');
  const [loading, setLoading] = useState(true); // Added loading state
  
  // Mock data for demonstration - replace with actual contract calls
  const mockProducts = useMemo(() => [
    {
      id: 1,
      name: "Organic Tomatoes",
      batchId: "BATCH-001",
      location: "Green Valley Farms, California",
      producer: "Green Valley Farms",
      description: "Fresh organic tomatoes grown sustainably",
      carbonActivity: "Reduced tillage, cover crops, organic fertilizers",
      iotData: "Temperature: 22°C, Humidity: 65%, Soil pH: 6.5",
      certification: "Organic",
      timestamp: Math.floor(Date.now() / 1000) - 86400
    },
    {
      id: 2,
      name: "Shade-Grown Coffee",
      batchId: "BATCH-002",
      location: "Mountain Coffee Co-op, Costa Rica",
      producer: "Mountain Coffee Co-op",
      description: "Premium coffee grown under forest canopy",
      carbonActivity: "Forest preservation, biodiversity protection",
      iotData: "Temperature: 18°C, Humidity: 80%, Rainfall: 2000mm/year",
      certification: "Rainforest Alliance",
      timestamp: Math.floor(Date.now() / 1000) - 172800
    },
    {
      id: 3,
      name: "Sustainable Wheat",
      batchId: "BATCH-003",
      location: "Sustainable Grains Inc, Kansas",
      producer: "Sustainable Grains Inc",
      description: "No-till wheat with carbon sequestration",
      carbonActivity: "No-till farming, soil carbon sequestration",
      iotData: "Soil carbon: 2.8%, Moisture: 35%, Organic matter: 4.2%",
      certification: "Regenerative Organic",
      timestamp: Math.floor(Date.now() / 1000) - 259200
    }
  ], []);

  useEffect(() => {
    // Fetch real data from blockchain contract
    const fetchProducts = async () => {
      if (productRegistry) {
        try {
          setLoading(true);
          
          // Get total product count
          const productCount = await productRegistry.getProductCount();
          console.log('Total products on blockchain:', productCount.toString());
          
          if (productCount.toNumber() > 0) {
            // Get all product batch IDs
            const batchIds = await productRegistry.getAllProductBatchIds();
            console.log('Product batch IDs:', batchIds);
            
            // Fetch details for each product
            const realProducts: Product[] = [];
            for (let i = 0; i < batchIds.length; i++) {
              try {
                const batchId = batchIds[i];
                const productDetails = await productRegistry.getProduct(batchId);
                
                // Create product object from blockchain data
                const product: Product = {
                  id: i + 1,
                  name: productDetails.product,
                  batchId: batchId,
                  location: 'Blockchain Data', // Not stored on-chain
                  producer: productDetails.producer,
                  description: 'Data from blockchain', // Not stored on-chain
                  carbonActivity: productDetails.carbonActivity,
                  iotData: 'Use viewPrivateData() to access', // Stored as private data
                  certification: productDetails.certification,
                  timestamp: productDetails.timestamp.toNumber()
                };
                
                console.log('Product details from blockchain:', {
                  batchId,
                  productDetails,
                  processedProduct: product
                });
                
                realProducts.push(product);
              } catch (error) {
                console.error(`Error fetching product ${batchIds[i]}:`, error);
              }
            }
            
            if (realProducts.length > 0) {
              setProducts(realProducts);
              console.log('Real blockchain products loaded:', realProducts);
            } else {
              // Fallback to mock data if no real products found
              setProducts(mockProducts);
              console.log('No real products found, using mock data');
            }
          } else {
            // No products on blockchain, use mock data
            setProducts(mockProducts);
            console.log('No products on blockchain, using mock data');
          }
        } catch (error) {
          console.error('Error fetching blockchain products:', error);
          // Fallback to mock data
          setProducts(mockProducts);
        } finally {
          setLoading(false);
        }
      } else {
        // No contract connection, use mock data
        setProducts(mockProducts);
      }
    };
    
    fetchProducts();
  }, [productRegistry, mockProducts]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.producer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCertification = filterCertification === 'all' || 
                                product.certification.toLowerCase() === filterCertification.toLowerCase();
    
    return matchesSearch && matchesCertification;
  });

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getCertificationBadge = (certification: string) => {
    console.log('Certification value received:', certification, 'Type:', typeof certification, 'Length:', certification?.length);
    
    const badges = {
      'Organic': { label: 'Organic', color: '#4CAF50' },
      'Fair Trade': { label: 'Fair Trade', color: '#FF9800' },
      'Rainforest Alliance': { label: 'Rainforest Alliance', color: '#2196F3' },
      'Carbon Neutral': { label: 'Carbon Neutral', color: '#9C27B0' },
      'Sustainable': { label: 'Sustainable', color: '#607D8B' },
      'Regenerative Organic': { label: 'Regenerative Organic', color: '#FFC107' },
      'none': { label: 'None', color: '#9E9E9E' }
    };
    
    // Check if certification exists and is not empty
    if (!certification || certification.trim() === '') {
      return (
        <span style={{
          backgroundColor: badges.none.color,
          color: 'white',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          {badges.none.label}
        </span>
      );
    }
    
    // Try to find exact match first
    if (badges[certification as keyof typeof badges]) {
      const badge = badges[certification as keyof typeof badges];
      return (
        <span style={{
          backgroundColor: badge.color,
          color: 'white',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          {badge.label}
        </span>
      );
    }
    
    // If no exact match, try case-insensitive match
    const lowerCertification = certification.toLowerCase();
    for (const [key, badge] of Object.entries(badges)) {
      if (key.toLowerCase() === lowerCertification) {
        return (
          <span style={{
            backgroundColor: badge.color,
            color: 'white',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
            {badge.label}
          </span>
        );
      }
    }
    
    // If still no match, show the actual value with a default color
    return (
      <span style={{
        backgroundColor: '#9C27B0',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 'bold'
      }}>
        {certification}
      </span>
    );
  };

  return (
    <div className="product-list-overlay">
      <div className="product-list">
        <div className="list-header">
          <h2>🌱 Product Registry</h2>
          <p>View all products stored on the blockchain</p>
          <div className="user-role-indicator">
            <span className={`role-badge ${userRole}`}>
              {userRole.toUpperCase()} ACCESS
            </span>
          </div>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <div className="filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search products, locations, producers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="certification-filter">
            <select
              value={filterCertification}
              onChange={(e) => setFilterCertification(e.target.value)}
            >
              <option value="all">All Certifications</option>
              <option value="Organic">Organic</option>
              <option value="Fair Trade">Fair Trade</option>
              <option value="Rainforest Alliance">Rainforest Alliance</option>
              <option value="Carbon Neutral">Carbon Neutral</option>
              <option value="Sustainable">Sustainable</option>
              <option value="Regenerative Organic">Regenerative Organic</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>

        <div className="product-table">
          {loading ? (
            <div className="loading-state">
              <p>Loading products from blockchain...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="no-products">
              <p>No products found matching your criteria.</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Batch ID</th>
                  <th>Producer</th>
                  <th>Location</th>
                  <th>Certification</th>
                  <th>Registered</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="product-info">
                        <strong>{product.name}</strong>
                      </div>
                    </td>
                    <td><code>{product.batchId}</code></td>
                    <td>
                      {product.producer}
                    </td>
                    <td>
                      {product.location}
                    </td>
                    <td>
                      {getCertificationBadge(product.certification)}
                    </td>
                    <td>{formatTimestamp(product.timestamp)}</td>
                    <td>
                      <button className="view-details-btn">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="list-footer">
          <p>Showing {filteredProducts.length} of {products.length} products</p>
          <button onClick={onClose} className="close-btn-large">Close</button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
