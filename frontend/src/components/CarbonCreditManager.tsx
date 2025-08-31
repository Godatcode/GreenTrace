import React, { useState, useEffect, useMemo } from 'react';
import { ethers } from 'ethers';

interface CarbonCredit {
  id: string;
  amount: number;
  unit: string;
  issuer: string;
  recipient: string;
  status: 'issued' | 'transferred' | 'retired';
  timestamp: number;
  description: string;
  carbonOffset: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
}

interface CarbonCreditManagerProps {
  carbonCredit: ethers.Contract | null;
  onClose: () => void;
  userRole: 'public' | 'private' | 'enterprise' | 'admin';
}

const CarbonCreditManager: React.FC<CarbonCreditManagerProps> = ({ carbonCredit, onClose, userRole }) => {
  const [credits, setCredits] = useState<CarbonCredit[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'issue' | 'transfer' | 'retire'>('overview');
  
  // Form states
  const [issueForm, setIssueForm] = useState({
    amount: '',
    unit: 'tonnes',
    recipient: '',
    description: '',
    carbonOffset: ''
  });
  
  const [transferForm, setTransferForm] = useState({
    creditId: '',
    recipient: '',
    amount: ''
  });
  
  const [retireForm, setRetireForm] = useState({
    creditId: '',
    reason: '',
    amount: ''
  });

  // Mock data for demonstration - replace with actual contract calls
  const mockCredits = useMemo(() => [
    {
      id: 'CC-001',
      amount: 100,
      unit: 'tonnes',
      issuer: 'Green Valley Farms',
      recipient: 'Green Valley Farms',
      status: 'issued' as const,
      timestamp: Math.floor(Date.now() / 1000) - 86400,
      description: 'Carbon credits from sustainable farming practices',
      carbonOffset: 'Reduced tillage, cover crops, organic fertilizers',
      verificationStatus: 'verified' as const
    },
    {
      id: 'CC-002',
      amount: 50,
      unit: 'tonnes',
      issuer: 'Mountain Coffee Co-op',
      recipient: 'Eco Coffee Retailer',
      status: 'transferred' as const,
      timestamp: Math.floor(Date.now() / 1000) - 172800,
      description: 'Shade-grown coffee carbon sequestration',
      carbonOffset: 'Forest preservation, biodiversity protection',
      verificationStatus: 'verified' as const
    },
    {
      id: 'CC-003',
      amount: 75,
      unit: 'tonnes',
      issuer: 'Sustainable Grains Inc',
      recipient: 'Carbon Neutral Corp',
      status: 'retired' as const,
      timestamp: Math.floor(Date.now() / 1000) - 259200,
      description: 'No-till farming carbon credits',
      carbonOffset: 'Soil carbon sequestration, reduced emissions',
      verificationStatus: 'verified' as const
    }
  ], []);

  useEffect(() => {
    // For now, use mock data. Later this will come from the contract
    setCredits(mockCredits);
  }, [mockCredits]);

  const handleIssueCredit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!carbonCredit) {
      alert('Please connect your wallet first!');
      return;
    }
    
    try {
      setLoading(true);
      
      // This would call your contract's issue function
      // const tx = await carbonCredit.issueCredit(
      //   issueForm.amount,
      //   issueForm.unit,
      //   issueForm.recipient,
      //   issueForm.description,
      //   issueForm.carbonOffset
      // );
      // await tx.wait();
      
      // For now, simulate success
      const newCredit: CarbonCredit = {
        id: `CC-${Date.now()}`,
        amount: parseFloat(issueForm.amount),
        unit: issueForm.unit,
        issuer: 'Your Address',
        recipient: issueForm.recipient,
        status: 'issued',
        timestamp: Math.floor(Date.now() / 1000),
        description: issueForm.description,
        carbonOffset: issueForm.carbonOffset,
        verificationStatus: 'pending'
      };
      
      setCredits(prev => [newCredit, ...prev]);
      setIssueForm({
        amount: '',
        unit: 'tonnes',
        recipient: '',
        description: '',
        carbonOffset: ''
      });
      
      alert('Carbon credit issued successfully!');
      setActiveTab('overview');
      
    } catch (error) {
      console.error('Error issuing credit:', error);
      alert('Error issuing credit. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const handleTransferCredit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Simulate transfer
      const credit = credits.find(c => c.id === transferForm.creditId);
      if (credit) {
        const updatedCredits = credits.map(c => 
          c.id === transferForm.creditId 
            ? { ...c, recipient: transferForm.recipient, status: 'transferred' as const }
            : c
        );
        setCredits(updatedCredits);
        alert('Credit transferred successfully!');
        setTransferForm({ creditId: '', recipient: '', amount: '' });
        setActiveTab('overview');
      }
      
    } catch (error) {
      console.error('Error transferring credit:', error);
      alert('Error transferring credit.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetireCredit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      // Simulate retirement
      const credit = credits.find(c => c.id === retireForm.creditId);
      if (credit) {
        const updatedCredits = credits.map(c => 
          c.id === retireForm.creditId 
            ? { ...c, status: 'retired' as const }
            : c
        );
        setCredits(updatedCredits);
        alert('Credit retired successfully!');
        setRetireForm({ creditId: '', reason: '', amount: '' });
        setActiveTab('overview');
      }
      
    } catch (error) {
      console.error('Error retiring credit:', error);
      alert('Error retiring credit.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      'issued': { label: 'Issued', color: '#4CAF50' },
      'transferred': { label: 'Transferred', color: '#2196F3' },
      'retired': { label: 'Retired', color: '#9C27B0' }
    };
    
    const badge = badges[status as keyof typeof badges];
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
  };

  const getVerificationBadge = (status: string) => {
    const badges = {
      'pending': { label: 'Pending', color: '#FF9800' },
      'verified': { label: 'Verified', color: '#4CAF50' },
      'rejected': { label: 'Rejected', color: '#f44336' }
    };
    
    const badge = badges[status as keyof typeof badges];
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
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="carbon-credit-overlay">
      <div className="carbon-credit-manager">
        <div className="manager-header">
          <h2>🌿 Carbon Credit Registry</h2>
          <p>Manage carbon credits: issue, transfer, and retire</p>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <div className="tab-navigation">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'issue' ? 'active' : ''}`}
            onClick={() => setActiveTab('issue')}
          >
            Issue Credits
          </button>
          <button 
            className={`tab-btn ${activeTab === 'transfer' ? 'active' : ''}`}
            onClick={() => setActiveTab('transfer')}
          >
            Transfer Credits
          </button>
          <button 
            className={`tab-btn ${activeTab === 'retire' ? 'active' : ''}`}
            onClick={() => setActiveTab('retire')}
          >
            Retire Credits
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Total Credits</h3>
                  <p className="stat-number">{credits.length}</p>
                </div>
                <div className="stat-card">
                  <h3>Total Amount</h3>
                  <p className="stat-number">{credits.reduce((sum, c) => sum + c.amount, 0)} tonnes</p>
                </div>
                <div className="stat-card">
                  <h3>Verified</h3>
                  <p className="stat-number">{credits.filter(c => c.verificationStatus === 'verified').length}</p>
                </div>
                <div className="stat-card">
                  <h3>Retired</h3>
                  <p className="stat-number">{credits.filter(c => c.status === 'retired').length}</p>
                </div>
              </div>

              <div className="credits-table">
                <h3>Recent Carbon Credits</h3>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Amount</th>
                      <th>Issuer</th>
                      <th>Recipient</th>
                      <th>Status</th>
                      <th>Verification</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {credits.map((credit) => (
                      <tr key={credit.id}>
                        <td><code>{credit.id}</code></td>
                        <td>{credit.amount} {credit.unit}</td>
                        <td>
                          {credit.issuer}
                        </td>
                        <td>
                          {credit.recipient}
                        </td>
                        <td>{getStatusBadge(credit.status)}</td>
                        <td>{getVerificationBadge(credit.verificationStatus)}</td>
                        <td>{formatTimestamp(credit.timestamp)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'issue' && (
            <div className="issue-tab">
              <h3>Issue New Carbon Credits</h3>
              <form onSubmit={handleIssueCredit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="amount">Amount *</label>
                    <input
                      type="number"
                      id="amount"
                      value={issueForm.amount}
                      onChange={(e) => setIssueForm(prev => ({ ...prev, amount: e.target.value }))}
                      placeholder="e.g., 100"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="unit">Unit</label>
                    <select
                      id="unit"
                      value={issueForm.unit}
                      onChange={(e) => setIssueForm(prev => ({ ...prev, unit: e.target.value }))}
                    >
                      <option value="tonnes">Tonnes CO2e</option>
                      <option value="kg">Kilograms CO2e</option>
                      <option value="credits">Carbon Credits</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="recipient">Recipient Address *</label>
                  <input
                    type="text"
                    id="recipient"
                    value={issueForm.recipient}
                    onChange={(e) => setIssueForm(prev => ({ ...prev, recipient: e.target.value }))}
                    placeholder="0x..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description *</label>
                  <textarea
                    id="description"
                    value={issueForm.description}
                    onChange={(e) => setIssueForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the carbon credit project..."
                    rows={3}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="carbonOffset">Carbon Offset Method *</label>
                  <textarea
                    id="carbonOffset"
                    value={issueForm.carbonOffset}
                    onChange={(e) => setIssueForm(prev => ({ ...prev, carbonOffset: e.target.value }))}
                    placeholder="Describe how carbon was offset..."
                    rows={3}
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="button" onClick={() => setActiveTab('overview')} className="cancel-btn">
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Issuing...' : 'Issue Credits'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'transfer' && (
            <div className="transfer-tab">
              <h3>Transfer Carbon Credits</h3>
              <form onSubmit={handleTransferCredit}>
                <div className="form-group">
                  <label htmlFor="creditId">Credit ID *</label>
                  <select
                    id="creditId"
                    value={transferForm.creditId}
                    onChange={(e) => setTransferForm(prev => ({ ...prev, creditId: e.target.value }))}
                    required
                  >
                    <option value="">Select a credit to transfer</option>
                    {credits.filter(c => c.status === 'issued').map(credit => (
                      <option key={credit.id} value={credit.id}>
                        {credit.id} - {credit.amount} {credit.unit}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="recipient">New Recipient Address *</label>
                  <input
                    type="text"
                    id="recipient"
                    value={transferForm.recipient}
                    onChange={(e) => setTransferForm(prev => ({ ...prev, recipient: e.target.value }))}
                    placeholder="0x..."
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="button" onClick={() => setActiveTab('overview')} className="cancel-btn">
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Transferring...' : 'Transfer Credits'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'retire' && (
            <div className="retire-tab">
              <h3>Retire Carbon Credits</h3>
              <form onSubmit={handleRetireCredit}>
                <div className="form-group">
                  <label htmlFor="creditId">Credit ID *</label>
                  <select
                    id="creditId"
                    value={retireForm.creditId}
                    onChange={(e) => setRetireForm(prev => ({ ...prev, creditId: e.target.value }))}
                    required
                  >
                    <option value="">Select a credit to retire</option>
                    {credits.filter(c => c.status === 'issued' || c.status === 'transferred').map(credit => (
                      <option key={credit.id} value={credit.id}>
                        {credit.id} - {credit.amount} {credit.unit}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="reason">Retirement Reason *</label>
                  <textarea
                    id="reason"
                    value={retireForm.reason}
                    onChange={(e) => setRetireForm(prev => ({ ...prev, reason: e.target.value }))}
                    placeholder="Explain why these credits are being retired..."
                    rows={3}
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="button" onClick={() => setActiveTab('overview')} className="cancel-btn">
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Retiring...' : 'Retire Credits'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarbonCreditManager;
