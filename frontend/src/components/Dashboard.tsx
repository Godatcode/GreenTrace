import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import ProductRegistryABI from '../contracts/ProductRegistry.json';
import CarbonCreditABI from '../contracts/CarbonCredit.json';
import ProductForm, { ProductData } from './ProductForm';
import { API_ENDPOINTS } from '../config/api';
import ProductList from './ProductList';
import CarbonCreditManager from './CarbonCreditManager';
import ICMMock from './ICMMock';
import ComplianceCenter from './ComplianceCenter';
import RegulatorDashboard from './RegulatorDashboard';
import SampleDataManager from './SampleDataManager';
import ToastNotifications, { Toast } from './ToastNotifications';
import LoadingSpinner from './LoadingSpinner';
// import StatusIndicator from './StatusIndicator';
import ProfileDropdown from './ProfileDropdown';

interface DashboardProps {
  contracts: {
    productRegistry: string;
    carbonCredit: string;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ contracts }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [productRegistry, setProductRegistry] = useState<ethers.Contract | null>(null);
  const [carbonCredit, setCarbonCredit] = useState<ethers.Contract | null>(null);
  const [loading, setLoading] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showProductList, setShowProductList] = useState(false);
  const [showCarbonCreditManager, setShowCarbonCreditManager] = useState(false);
  const [recentProducts, setRecentProducts] = useState<any[]>([]);
  const [blockchainLoading, setBlockchainLoading] = useState(false);
  const [showICMMock, setShowICMMock] = useState(false);
  const [showComplianceCenter, setShowComplianceCenter] = useState(false);
  const [showRegulatorDashboard, setShowRegulatorDashboard] = useState(false);
  const [showSampleDataManager, setShowSampleDataManager] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Add user role management
  const [userRole, setUserRole] = useState<'public' | 'private' | 'enterprise' | 'admin'>('public');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [djangoUser, setDjangoUser] = useState<any>(null);

  // Toast notification functions
  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const newToast: Toast = {
      ...toast,
      id: Date.now().toString()
    };
    setToasts(prev => [...prev, newToast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showSuccessToast = useCallback((title: string, message: string) => {
    addToast({ type: 'success', title, message });
  }, [addToast]);

  const showErrorToast = useCallback((title: string, message: string) => {
    addToast({ type: 'error', title, message });
  }, [addToast]);

  const showInfoToast = useCallback((title: string, message: string) => {
    addToast({ type: 'info', title, message });
  }, [addToast]);

  // Toggle dark mode
  // const toggleDarkMode = () => {
  //   setDarkMode(!darkMode);
  //   document.body.classList.toggle('dark-mode');
  // };

  // Connect to Django backend for user authentication
  const connectToDjango = useCallback(async () => {
    if (!isConnected) return;
    
    try {
      // Connect to Django backend to get user role
      const response = await fetch(API_ENDPOINTS.AUTH.CHECK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wallet_address: account,
          network: 'avalanche-fuji'
        })
      });
      
      if (response.ok) {
        const userData = await response.json();
        setDjangoUser(userData);
        setUserRole(userData.role || 'public');
        setIsAuthenticated(true);
        
        // Store authentication state in localStorage
        localStorage.setItem('greenTraceAuth', JSON.stringify({
          wallet: account,
          role: userData.role || 'public',
          authenticated: true,
          timestamp: Date.now()
        }));
      } else {
        // Default to public user if not authenticated
        setUserRole('public');
        setIsAuthenticated(false);
      }
    } catch (error) {
      setUserRole('public');
      setIsAuthenticated(false);
    }
  }, [isConnected, account]);

  // Check for existing authentication on component mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('greenTraceAuth');
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        const isExpired = Date.now() - authData.timestamp > 24 * 60 * 60 * 1000; // 24 hours
        
        if (!isExpired && authData.wallet) {
          setAccount(authData.wallet);
          setIsConnected(true);
          setUserRole(authData.role || 'public');
          setIsAuthenticated(authData.authenticated);
        }
      } catch (error) {
        // Silently handle auth parsing errors
      }
    }
  }, []);

  // Initialize contracts when wallet is connected (either from localStorage or new connection)
  useEffect(() => {
    const initializeContracts = async () => {
      if (isConnected && account && typeof window.ethereum !== 'undefined') {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          
          const productRegistryContract = new ethers.Contract(
            contracts.productRegistry,
            ProductRegistryABI.abi,
            signer
          );
          
          const carbonCreditContract = new ethers.Contract(
            contracts.carbonCredit,
            CarbonCreditABI.abi,
            signer
          );
          
          setProductRegistry(productRegistryContract);
          setCarbonCredit(carbonCreditContract);
          
        } catch (error) {
          console.error('Error initializing contracts:', error);
          showErrorToast('Contract Error', 'Failed to initialize smart contracts');
        }
      }
    };

    initializeContracts();
  }, [isConnected, account, contracts.productRegistry, contracts.carbonCredit, showErrorToast]);

  // Connect to Django when wallet connects
  useEffect(() => {
    if (isConnected && account) {
      connectToDjango();
    }
  }, [isConnected, account, connectToDjango]);

  // Connect to MetaMask
  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      showErrorToast('MetaMask Not Found', 'Please install MetaMask to use this application');
      return;
    }

    try {
      setLoading(true);
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      
      if (account) {
        setAccount(account);
        setIsConnected(true);
        
        // Initialize contracts
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        
        const productRegistryContract = new ethers.Contract(
          contracts.productRegistry,
          ProductRegistryABI.abi,
          signer
        );
        
        const carbonCreditContract = new ethers.Contract(
          contracts.carbonCredit,
          CarbonCreditABI.abi,
          signer
        );
        
        setProductRegistry(productRegistryContract);
        setCarbonCredit(carbonCreditContract);
        
        // Check network
        const network = await provider.getNetwork();
        if (network.chainId !== 43113) {
          showErrorToast('Wrong Network', 'Please switch to Avalanche Fuji Testnet (Chain ID: 43113)');
          return;
        }
        
        // Authenticate with Django backend
        try {
          const response = await fetch(API_ENDPOINTS.AUTH.CHECK, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              wallet_address: account,
              network: 'avalanche-fuji'
            })
          });

          if (response.ok) {
            const userData = await response.json();
            setUserRole(userData.role || 'public');
            setIsAuthenticated(true);
            setDjangoUser(userData);
            
            showSuccessToast('Wallet Connected', `Welcome! You are connected as a ${userData.role || 'public'} user`);
            
            // Store authentication state in localStorage
            localStorage.setItem('greenTraceAuth', JSON.stringify({
              wallet: account,
              role: userData.role || 'public',
              authenticated: true,
              timestamp: Date.now()
            }));
          } else {
            showErrorToast('Authentication Failed', 'Could not authenticate with backend');
          }
        } catch (error) {
          console.error('Django authentication error:', error);
          showErrorToast('Backend Error', 'Could not connect to backend server');
        }
        
        // Fetch recent products
        await fetchRecentProducts();
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      showErrorToast('Connection Failed', 'Failed to connect wallet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (productData: ProductData) => {
    if (!productRegistry) {
      showErrorToast('Contract Not Ready', 'Please connect your wallet first');
      return;
    }
    
    try {
      setLoading(true);
      showInfoToast('Adding Product', 'Processing your product on the blockchain...');
      
      // First, save to Django backend
      try {
        const djangoResponse = await fetch(API_ENDPOINTS.PRODUCTS.CREATE, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: productData.name,
            batch_id: productData.batchId,
            location: productData.location,
            producer: productData.producer,
            description: productData.description,
            carbon_activity: productData.carbonActivity,
            iot_data: productData.iotData,
            certification: productData.certification,
            blockchain_network: 'avalanche-fuji',
            wallet_address: account
          })
        });
        
        if (djangoResponse.ok) {
          showInfoToast('Backend Sync', 'Product saved to backend database');
        } else {
          showErrorToast('Backend Warning', 'Failed to save to backend, but continuing with blockchain');
        }
      } catch (djangoError) {
        console.error('Django backend error:', djangoError);
        showErrorToast('Backend Warning', 'Backend sync failed, but continuing with blockchain');
        // Continue with blockchain even if Django fails
      }
      
      // Then, save to blockchain
      showInfoToast('Blockchain Transaction', 'Sending transaction to Avalanche network...');
      
      const tx = await productRegistry.addProduct(
        productData.batchId,           // _batchId
        productData.name,              // _product (product name)
        productData.carbonActivity,    // _carbonActivity
        productData.certification,     // _certification (new parameter)
        productData.iotData            // _privateData (IoT data as private data)
      );
      
      showInfoToast('Transaction Sent', 'Waiting for blockchain confirmation...');
      
      await tx.wait();
      
      showSuccessToast('Product Added!', 'Your product has been successfully registered on the blockchain');
      setShowProductForm(false);
      
      // Refresh recent products to show the newly added product
      await fetchRecentProducts();
      
    } catch (error) {
      console.error('Error adding product:', error);
      showErrorToast('Transaction Failed', 'Failed to add product. Please check your wallet and try again.');
    } finally {
      setLoading(false);
    }
  };

  const viewProducts = async () => {
    
    // Check if wallet is connected using our state
    if (!isConnected || !account) {
      showErrorToast('Wallet Not Connected', 'Please connect your MetaMask wallet first!');
      return;
    }
    
    if (!productRegistry) {
      showErrorToast('Contract Not Ready', 'Please wait for contracts to initialize');
      return;
    }
    
    setShowProductList(true);
  };

  const viewCarbonCredits = async () => {
    
    // Check if wallet is connected using our state
    if (!isConnected || !account) {
      showErrorToast('Wallet Not Connected', 'Please connect your MetaMask wallet first!');
      return;
    }
    
    if (!carbonCredit) {
      showErrorToast('Contract Not Ready', 'Please wait for contracts to initialize');
      return;
    }
    
    setShowCarbonCreditManager(true);
  };

  // Fetch recent products from blockchain
  const fetchRecentProducts = useCallback(async () => {
    if (!productRegistry) return;
    
    try {
      setBlockchainLoading(true);
      const productCount = await productRegistry.getProductCount();
      
      if (productCount.toNumber() > 0) {
        const batchIds = await productRegistry.getAllProductBatchIds();
        const latestProducts = [];
        
        // Get the 3 most recent products
        const startIndex = Math.max(0, batchIds.length - 3);
        for (let i = startIndex; i < batchIds.length; i++) {
          try {
            const batchId = batchIds[i];
            const productDetails = await productRegistry.getProduct(batchId);
            
            latestProducts.push({
              name: productDetails.product,
              batchId: batchId,
              certification: productDetails.certification,
              carbonActivity: productDetails.carbonActivity,
              timestamp: productDetails.timestamp.toNumber()
            });
          } catch (error) {
            console.error(`Error fetching product ${batchIds[i]}:`, error);
          }
        }
        
        setRecentProducts(latestProducts.reverse()); // Show newest first
      } else {
        setRecentProducts([]);
      }
    } catch (error) {
      console.error('Error fetching recent products:', error);
      setRecentProducts([]);
    } finally {
      setBlockchainLoading(false);
    }
  }, [productRegistry]);

  // Fetch recent products when wallet connects
  useEffect(() => {
    if (isConnected && productRegistry) {
      fetchRecentProducts();
    }
  }, [isConnected, productRegistry, fetchRecentProducts]);

  const handleLogout = () => {
    // Clear all state
    setAccount(null);
    setIsConnected(false);
    setProductRegistry(null);
    setCarbonCredit(null);
    setUserRole('public');
    setIsAuthenticated(false);
    setDjangoUser(null);
    setRecentProducts([]);
    
    // Clear localStorage
    localStorage.removeItem('greenTraceAuth');
    
    // Show logout message
    showSuccessToast('Logged Out', 'Successfully disconnected from wallet');
  };

  const handleProfileRefresh = async () => {
    if (!account) return;
    
    try {
      // Refresh user data from Django backend
      const response = await fetch(API_ENDPOINTS.AUTH.CHECK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wallet_address: account,
          network: 'avalanche-fuji'
        })
      });

      if (response.ok) {
        const userData = await response.json();
        setUserRole(userData.role || 'public');
        setDjangoUser(userData);
        showSuccessToast('Profile Refreshed', 'User data updated successfully');
      } else {
        showErrorToast('Refresh Failed', 'Could not refresh user data');
      }
    } catch (error) {
      console.error('Profile refresh error:', error);
      showErrorToast('Refresh Failed', 'Network error while refreshing profile');
    }
  };

  return (
    <div className={`dashboard ${darkMode ? 'dark' : 'light'}`}>
      {/* Toast Notifications */}
      <ToastNotifications toasts={toasts} removeToast={removeToast} />
      
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo-section">
            <h1 className="logo">🌱 GreenTrace</h1>
            <p className="tagline">Carbon Credit & Supply Chain Transparency</p>
          </div>
          
          <div className="header-actions">
            {/* Theme Toggle Button */}
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="theme-toggle"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            
            {/* Wallet Connection Section */}
            {isConnected ? (
              <div className="wallet-info">
                {/* Profile Dropdown */}
                <ProfileDropdown
                  user={{
                    wallet: account || '',
                    role: userRole,
                    authenticated: isAuthenticated,
                    timestamp: Date.now(),
                    network: 'avalanche-fuji',
                    balance: '0.0',
                    transactionCount: 0
                  }}
                  onLogout={handleLogout}
                  onRefresh={handleProfileRefresh}
                />
              </div>
            ) : (
              <button 
                onClick={connectWallet} 
                className="connect-wallet-btn"
                disabled={loading}
              >
                {loading ? (
                  <LoadingSpinner size="small" variant="dots" />
                ) : (
                  '🔗 Connect Wallet'
                )}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Info Panel */}
      {/* Main Content */}
      <main className="dashboard-main">
        {/* Welcome Banner */}
        <div className="welcome-banner">
          <div className="banner-content">
            <h1 className="banner-title">Welcome to GreenTrace</h1>
            <p className="banner-subtitle">
              Supply chain and carbon credit management platform built on Avalanche
            </p>
            <div className="banner-stats">
              <div className="stat-card">
                <span className="stat-number">{recentProducts.length}</span>
                <span className="stat-label">Products</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{isConnected ? '1' : '0'}</span>
                <span className="stat-label">Connected</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">Avalanche</span>
                <span className="stat-label">Network</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        {isConnected && (
          <section className="quick-actions">
            <h2 className="section-title">
              <span className="title-icon">⚡</span>
              Quick Actions
            </h2>
            <div className="actions-grid">
              <div className="action-card primary">
                <div className="action-icon">+</div>
                <h4>Add Product</h4>
                <p>Register new products with blockchain verification</p>
                <button 
                  onClick={() => setShowProductForm(true)} 
                  className="action-btn primary"
                >
                  Add Product
                </button>
              </div>

              <div className="action-card">
                <div className="action-icon">🔍</div>
                <h4>Search Products</h4>
                <p>Find and verify product provenance</p>
                <button 
                  onClick={viewProducts} 
                  className="action-btn"
                >
                  Search
                </button>
              </div>

              <div className="action-card">
                <div className="action-icon">🌿</div>
                <h4>Carbon Credits</h4>
                <p>Manage carbon credit operations</p>
                <button 
                  onClick={viewCarbonCredits} 
                  className="action-btn"
                >
                  View Credits
                </button>
              </div>

              <div className="action-card">
                <div className="action-icon">🌐</div>
                <h4>Cross-Chain Sync</h4>
                <p>Inter-chain communication and data transfer</p>
                <button 
                  onClick={() => setShowICMMock(true)} 
                  className="action-btn"
                >
                  Inter-Chain
                </button>
              </div>

              <div className="action-card">
                <div className="action-icon">⚖️</div>
                <h4>Compliance Center</h4>
                <p>Monitor and manage supply chain compliance</p>
                <button 
                  onClick={() => setShowComplianceCenter(true)} 
                  className="action-btn"
                >
                  View Center
                </button>
              </div>

              <div className="action-card">
                <div className="action-icon">🔍</div>
                <h4>Regulator Dashboard</h4>
                <p>Advanced auditing and regulatory oversight</p>
                <button 
                  onClick={() => setShowRegulatorDashboard(true)} 
                  className="action-btn"
                >
                  Regulator View
                </button>
              </div>

              <div className="action-card">
                <div className="action-icon">💾</div>
                <h4>Sample Data</h4>
                <p>Manage sample data for testing</p>
                <button 
                  onClick={() => setShowSampleDataManager(true)} 
                  className="action-btn"
                >
                  Manage Samples
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Recent Products Section */}
        {isConnected && recentProducts.length > 0 && (
          <section className="recent-products">
            <h2 className="section-title">
              <span className="title-icon">📦</span>
              Recent Products
            </h2>
            <div className="products-grid">
              {recentProducts.slice(0, 6).map((product, index) => (
                <div key={index} className="product-card">
                  <div className="product-header">
                    <span className="product-batch">#{product.batchId}</span>
                    <span className="product-status online">● Online</span>
                  </div>
                  <h3 className="product-name">{product.product}</h3>
                  <div className="product-details">
                    <div className="detail-item">
                      <span className="detail-label">Certification:</span>
                      <span className="detail-value">{product.certification || 'None'}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Carbon Activity:</span>
                      <span className="detail-value">{product.carbonActivity}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Added:</span>
                      <span className="detail-value">
                        {new Date(product.timestamp * 1000).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="product-actions">
                    <button className="product-btn view-btn">👁️ View</button>
                    <button className="product-btn verify-btn">✅ Verify</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Connection Status */}
        {isConnected && (
          <section className="status-section">
            <h3>Connection Status</h3>
            <div className="status-grid">
              <div className="status-item">
                <strong>ProductRegistry:</strong>
                <span>{contracts.productRegistry}</span>
              </div>
              <div className="status-item">
                <strong>CarbonCredit:</strong>
                <span>{contracts.carbonCredit}</span>
              </div>
              <div className="status-item">
                <strong>Network:</strong>
                <span>Avalanche Fuji Testnet (Chain ID: 43113)</span>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Product Form Modal */}
      {showProductForm && (
        <ProductForm
          onSubmit={handleAddProduct}
          onCancel={() => setShowProductForm(false)}
          loading={loading}
        />
      )}

      {/* Product List Modal */}
      {showProductList && (
        <ProductList
          productRegistry={productRegistry}
          onClose={() => setShowProductList(false)}
          userRole={userRole}
        />
      )}

      {/* Carbon Credit Manager Modal */}
      {showCarbonCreditManager && (
        <CarbonCreditManager
          carbonCredit={carbonCredit}
          onClose={() => setShowCarbonCreditManager(false)}
          userRole={userRole}
        />
      )}

      {/* ICM Mock Modal */}
      {showICMMock && (
        <ICMMock
          productRegistry={productRegistry}
          onClose={() => setShowICMMock(false)}
        />
      )}

      {/* Compliance Center Modal */}
      {showComplianceCenter && (
        <ComplianceCenter
          productRegistry={productRegistry}
          onClose={() => setShowComplianceCenter(false)}
        />
      )}

      {/* Regulator Dashboard Modal */}
      {showRegulatorDashboard && (
        <RegulatorDashboard
          productRegistry={productRegistry}
          onClose={() => setShowRegulatorDashboard(false)}
        />
      )}

      {/* Sample Data Manager Modal */}
      {showSampleDataManager && (
        <SampleDataManager
          productRegistry={productRegistry}
          onClose={() => setShowSampleDataManager(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;