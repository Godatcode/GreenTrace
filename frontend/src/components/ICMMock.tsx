import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

interface ICMMockProps {
  productRegistry: ethers.Contract | null;
  onClose: () => void;
}

interface CrossChainStatus {
  networks: string[];
  verified: boolean[];
}

const ICMMock: React.FC<ICMMockProps> = ({ productRegistry, onClose }) => {
  const [selectedBatchId, setSelectedBatchId] = useState<string>('');
  const [availableProducts, setAvailableProducts] = useState<string[]>([]);
  const [crossChainStatus, setCrossChainStatus] = useState<CrossChainStatus | null>(null);
  const [crossChainProofs, setCrossChainProofs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [syncResult, setSyncResult] = useState<string>('');

  // Mock cross-chain networks
  const networks = ['ethereum', 'polygon', 'bsc'];

  useEffect(() => {
    if (productRegistry) {
      fetchAvailableProducts();
    }
  }, [productRegistry]);

  const fetchAvailableProducts = async () => {
    if (!productRegistry) return;
    
    try {
      const count = await productRegistry.getProductCount();
      if (count.toNumber() > 0) {
        const batchIds = await productRegistry.getAllProductBatchIds();
        setAvailableProducts(batchIds);
        if (batchIds.length > 0) {
          setSelectedBatchId(batchIds[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCrossChainStatus = async () => {
    if (!selectedBatchId || !productRegistry) return;
    
    try {
      setLoading(true);
      const [networks, verified] = await productRegistry.getCrossChainStatus(selectedBatchId);
      setCrossChainStatus({ networks, verified });
      
      const proofs = await productRegistry.getCrossChainProofs(selectedBatchId);
      setCrossChainProofs(proofs);
    } catch (error) {
      console.error('Error fetching cross-chain status:', error);
    } finally {
      setLoading(false);
    }
  };

  const syncToNetwork = async (network: string) => {
    if (!selectedBatchId || !productRegistry) return;
    
    try {
      setLoading(true);
      const tx = await productRegistry.syncToOtherChain(selectedBatchId, network);
      await tx.wait();
      
      setSyncResult(`✅ Successfully synced to ${network}! Proof generated.`);
      
      // Refresh status
      setTimeout(() => {
        fetchCrossChainStatus();
      }, 2000);
      
    } catch (error) {
      console.error('Error syncing to network:', error);
      setSyncResult(`❌ Failed to sync to ${network}: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const syncToAllNetworks = async () => {
    if (!selectedBatchId || !productRegistry) return;
    
    try {
      setLoading(true);
      setSyncResult('🔄 Syncing to all networks...');
      
      for (const network of networks) {
        try {
          const tx = await productRegistry.syncToOtherChain(selectedBatchId, network);
          await tx.wait();
          console.log(`Synced to ${network}`);
        } catch (error) {
          console.error(`Failed to sync to ${network}:`, error);
        }
      }
      
      setSyncResult('✅ Synced to all networks!');
      
      // Refresh status
      setTimeout(() => {
        fetchCrossChainStatus();
      }, 2000);
      
    } catch (error) {
      console.error('Error in bulk sync:', error);
      setSyncResult('❌ Bulk sync failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedBatchId) {
      fetchCrossChainStatus();
    }
  }, [selectedBatchId]);

  return (
    <div className="icm-mock-overlay">
      <div className="icm-mock">
        <div className="icm-header">
          <h2>🌐 Cross-Chain Sync (ICM Mock)</h2>
          <p>Simulate Avalanche's Inter-Chain Messaging for multi-blockchain data verification</p>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <div className="icm-content">
          {/* Product Selection */}
          <div className="section">
            <h3>📦 Select Product for Cross-Chain Sync</h3>
            <select 
              value={selectedBatchId} 
              onChange={(e) => setSelectedBatchId(e.target.value)}
              className="product-select"
            >
              {availableProducts.map((batchId) => (
                <option key={batchId} value={batchId}>
                  {batchId}
                </option>
              ))}
            </select>
          </div>

          {/* Cross-Chain Status */}
          {crossChainStatus && (
            <div className="section">
              <h3>🔗 Cross-Chain Verification Status</h3>
              <div className="network-grid">
                {crossChainStatus.networks.map((network, index) => (
                  <div key={network} className={`network-card ${crossChainStatus.verified[index] ? 'verified' : 'pending'}`}>
                    <div className="network-icon">
                      {network === 'ethereum' ? '🔵' : network === 'polygon' ? '🟣' : '🟡'}
                    </div>
                    <div className="network-info">
                      <h4>{network.toUpperCase()}</h4>
                      <span className={`status ${crossChainStatus.verified[index] ? 'verified' : 'pending'}`}>
                        {crossChainStatus.verified[index] ? '✅ Verified' : '⏳ Pending'}
                      </span>
                    </div>
                    {!crossChainStatus.verified[index] && (
                      <button 
                        onClick={() => syncToNetwork(network)}
                        disabled={loading}
                        className="sync-btn"
                      >
                        {loading ? '🔄' : 'Sync'}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bulk Sync */}
          <div className="section">
            <h3>🚀 Bulk Cross-Chain Sync</h3>
            <p>Sync product data to all supported blockchain networks simultaneously</p>
            <button 
              onClick={syncToAllNetworks}
              disabled={loading || !selectedBatchId}
              className="bulk-sync-btn"
            >
              {loading ? '🔄 Syncing All Networks...' : '🌐 Sync to All Networks'}
            </button>
          </div>

          {/* Cross-Chain Proofs */}
          {crossChainProofs.length > 0 && (
            <div className="section">
              <h3>🔐 Cross-Chain Proofs</h3>
              <p>Cryptographic proofs of cross-chain data synchronization</p>
              <div className="proofs-list">
                {crossChainProofs.map((proof, index) => (
                  <div key={index} className="proof-item">
                    <code>{proof}</code>
                    <span className="proof-badge">✓ Verified</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sync Results */}
          {syncResult && (
            <div className="section">
              <h3>📊 Sync Results</h3>
              <div className={`sync-result ${syncResult.includes('✅') ? 'success' : syncResult.includes('❌') ? 'error' : 'info'}`}>
                {syncResult}
              </div>
            </div>
          )}

          {/* ICM Information */}
          <div className="section">
            <h3>ℹ️ About Inter-Chain Messaging (ICM)</h3>
            <div className="info-grid">
              <div className="info-card">
                <h4>🔗 Cross-Chain Communication</h4>
                <p>Avalanche's ICM enables seamless data sharing between different blockchain networks</p>
              </div>
              <div className="info-card">
                <h4>🔐 Proof Generation</h4>
                <p>Cryptographic proofs verify data authenticity across multiple chains</p>
              </div>
              <div className="info-card">
                <h4>⚡ Fast Finality</h4>
                <p>Near-instant cross-chain data synchronization with Avalanche's speed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ICMMock;
