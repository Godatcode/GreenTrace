import React, { useState, useRef, useEffect } from 'react';
import StatusIndicator from './StatusIndicator';
import LoadingSpinner from './LoadingSpinner';

interface ProfileDropdownProps {
  user: {
    wallet: string;
    role: string;
    authenticated: boolean;
    timestamp: number;
    network?: string;
    balance?: string;
    transactionCount?: number;
  };
  onLogout: () => void;
  onRefresh: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user, onLogout, onRefresh }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setIsRefreshing(false);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'public': return '🌐';
      case 'private': return '🔒';
      case 'enterprise': return '🏢';
      case 'admin': return '🔑';
      default: return '👤';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'public': return 'var(--accent-success)';
      case 'private': return 'var(--accent-warning)';
      case 'enterprise': return 'var(--accent-secondary)';
      case 'admin': return 'var(--accent-danger)';
      default: return 'var(--accent-primary)';
    }
  };

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button
        className="profile-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="profile-avatar">
          <span className="avatar-icon">{getRoleIcon(user.role)}</span>
          <StatusIndicator 
            status="online" 
            size="small"
            showPulse={true}
          />
        </div>
        <div className="profile-info">
          <span className="profile-role">{user.role}</span>
          <span className="profile-address">{formatAddress(user.wallet)}</span>
        </div>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="profile-menu">
          <div className="profile-header">
            <div className="profile-avatar-large">
              <span className="avatar-icon-large">{getRoleIcon(user.role)}</span>
            </div>
            <div className="profile-details">
              <h3 className="profile-name">{user.role.charAt(0).toUpperCase() + user.role.slice(1)} User</h3>
              <p className="profile-wallet">{formatAddress(user.wallet)}</p>
              <div className="profile-status">
                <StatusIndicator 
                  status="online" 
                  text="Connected" 
                  size="small"
                />
              </div>
            </div>
          </div>

          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-label">Network</span>
              <span className="stat-value">{user.network || 'Avalanche Fuji'}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Connected Since</span>
              <span className="stat-value">{formatTimestamp(user.timestamp)}</span>
            </div>
            {user.balance && (
              <div className="stat-item">
                <span className="stat-label">Balance</span>
                <span className="stat-value">{user.balance} AVAX</span>
              </div>
            )}
            {user.transactionCount !== undefined && (
              <div className="stat-item">
                <span className="stat-label">Transactions</span>
                <span className="stat-value">{user.transactionCount}</span>
              </div>
            )}
          </div>

          <div className="profile-actions">
            <button 
              className="profile-action-btn refresh-btn"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              {isRefreshing ? (
                <LoadingSpinner size="small" variant="dots" />
              ) : (
                '🔄'
              )}
              Refresh Profile
            </button>
            
            <button 
              className="profile-action-btn settings-btn"
              onClick={() => {
                setIsOpen(false);
                // TODO: Open settings modal
              }}
            >
              ⚙️ Settings
            </button>
            
            <button 
              className="profile-action-btn logout-btn"
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
            >
              🚪 Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
