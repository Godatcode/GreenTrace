import React, { useState, useEffect } from 'react';

export type PrivacyLevel = 'public' | 'private' | 'enterprise';

export interface PrivacySettings {
  level: PrivacyLevel;
  showSensitiveData: boolean;
  showProducerDetails: boolean;
  showIoTData: boolean;
  showCarbonDetails: boolean;
  showCertificationDetails: boolean;
}

interface PrivacyModeToggleProps {
  onPrivacyChange: (settings: PrivacySettings) => void;
  currentSettings: PrivacySettings;
  userRole?: 'public' | 'private' | 'enterprise' | 'admin';
}

const PrivacyModeToggle: React.FC<PrivacyModeToggleProps> = ({ onPrivacyChange, currentSettings, userRole }) => {
  const [isExpanded, setIsExpanded] = useState(false); // Start collapsed by default

  // Auto-set privacy level based on Django user role
  useEffect(() => {
    if (userRole && userRole !== currentSettings.level) {
      let newSettings: PrivacySettings;

      switch (userRole) {
        case 'public':
          newSettings = {
            level: 'public',
            showSensitiveData: true,
            showProducerDetails: true,
            showIoTData: true,
            showCarbonDetails: true,
            showCertificationDetails: true
          };
          break;
        case 'private':
          newSettings = {
            level: 'private',
            showSensitiveData: false,
            showProducerDetails: false,
            showIoTData: false,
            showCarbonDetails: true,
            showCertificationDetails: true
          };
          break;
        case 'enterprise':
          newSettings = {
            level: 'enterprise',
            showSensitiveData: false,
            showProducerDetails: false,
            showIoTData: false,
            showCarbonDetails: false,
            showCertificationDetails: false
          };
          break;
        case 'admin':
          newSettings = {
            level: 'public', // Admin can see everything
            showSensitiveData: true,
            showProducerDetails: true,
            showIoTData: true,
            showCarbonDetails: true,
            showCertificationDetails: true
          };
          break;
        default:
          return;
      }
      onPrivacyChange(newSettings);
    }
  }, [userRole, currentSettings.level, onPrivacyChange]);

  const handlePrivacyLevelChange = (level: PrivacyLevel) => {
    let newSettings: PrivacySettings;
    
    switch (level) {
      case 'public':
        newSettings = {
          level,
          showSensitiveData: true,
          showProducerDetails: true,
          showIoTData: true,
          showCarbonDetails: true,
          showCertificationDetails: true
        };
        break;
      case 'private':
        newSettings = {
          level,
          showSensitiveData: false,
          showProducerDetails: false,
          showIoTData: false,
          showCarbonDetails: true,
          showCertificationDetails: true
        };
        break;
      case 'enterprise':
        newSettings = {
          level,
          showSensitiveData: false,
          showProducerDetails: false,
          showIoTData: false,
          showCarbonDetails: false,
          showCertificationDetails: false
        };
        break;
      default:
        return;
    }
    
    onPrivacyChange(newSettings);
  };

  const handleIndividualToggle = (key: keyof Omit<PrivacySettings, 'level'>) => {
    onPrivacyChange({
      ...currentSettings,
      [key]: !currentSettings[key]
    });
  };

  return (
    <div className="privacy-toggle">
      <div className="privacy-header">
        <div className="privacy-info">
          <h3>🔐 Privacy</h3>
          <p>Data visibility controls</p>
        </div>
        <button 
          className="expand-btn"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>

      {isExpanded && (
        <div className="privacy-controls">
          <div className="privacy-levels">
            <h4>Level</h4>
            <div className="level-buttons">
              <button 
                className={`level-btn ${currentSettings.level === 'public' ? 'active' : ''}`}
                onClick={() => handlePrivacyLevelChange('public')}
              >
                🌐 Public
              </button>
              <button 
                className={`level-btn ${currentSettings.level === 'private' ? 'active' : ''}`}
                onClick={() => handlePrivacyLevelChange('private')}
              >
                🔒 Private
              </button>
              <button 
                className={`level-btn ${currentSettings.level === 'enterprise' ? 'active' : ''}`}
                onClick={() => handlePrivacyLevelChange('enterprise')}
              >
                🏢 Enterprise
              </button>
            </div>
          </div>

          <div className="data-controls">
            <h4>Visibility</h4>
            <div className="toggle-grid">
              <div className="toggle-item">
                <input
                  type="checkbox"
                  id="sensitive-data"
                  checked={currentSettings.showSensitiveData}
                  onChange={() => handleIndividualToggle('showSensitiveData')}
                />
                <label htmlFor="sensitive-data" className="toggle-label">
                  Sensitive Data
                </label>
              </div>

              <div className="toggle-item">
                <input
                  type="checkbox"
                  id="producer-details"
                  checked={currentSettings.showProducerDetails}
                  onChange={() => handleIndividualToggle('showProducerDetails')}
                />
                <label htmlFor="producer-details" className="toggle-label">
                  Producer Details
                </label>
              </div>

              <div className="toggle-item">
                <input
                  type="checkbox"
                  id="iot-data"
                  checked={currentSettings.showIoTData}
                  onChange={() => handleIndividualToggle('showIoTData')}
                />
                <label htmlFor="iot-data" className="toggle-label">
                  IoT Data
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacyModeToggle;
