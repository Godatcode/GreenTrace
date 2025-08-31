import React from 'react';

interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'loading' | 'warning' | 'error' | 'success';
  text?: string;
  size?: 'small' | 'medium' | 'large';
  showPulse?: boolean;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ 
  status, 
  text, 
  size = 'medium',
  showPulse = false 
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'online': return '🟢';
      case 'offline': return '🔴';
      case 'loading': return '🟡';
      case 'warning': return '🟠';
      case 'error': return '🔴';
      case 'success': return '🟢';
      default: return '⚪';
    }
  };

  const getStatusClass = () => {
    return `status-indicator ${status} ${size} ${showPulse ? 'pulse' : ''}`;
  };

  const getStatusText = () => {
    if (text) return text;
    
    switch (status) {
      case 'online': return 'Online';
      case 'offline': return 'Offline';
      case 'loading': return 'Loading';
      case 'warning': return 'Warning';
      case 'error': return 'Error';
      case 'success': return 'Success';
      default: return 'Unknown';
    }
  };

  return (
    <div className={getStatusClass()}>
      <div className="status-dot">
        <span className="status-icon">{getStatusIcon()}</span>
        {showPulse && <div className="pulse-ring"></div>}
      </div>
      <span className="status-text">{getStatusText()}</span>
    </div>
  );
};

export default StatusIndicator;
