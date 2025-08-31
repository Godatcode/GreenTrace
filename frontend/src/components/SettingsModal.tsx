import React, { useState } from 'react';
import EnhancedModal from './EnhancedModal';
import ColorScheme from './ColorScheme';
import IconSystem from './IconSystem';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentColorScheme: string;
  onColorSchemeChange: (scheme: string) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentColorScheme,
  onColorSchemeChange
}) => {
  const [activeTab, setActiveTab] = useState<'appearance' | 'accessibility' | 'about'>('appearance');

  const tabs = [
    { id: 'appearance', label: 'Appearance', icon: '🎨' },
    { id: 'accessibility', label: 'Accessibility', icon: '♿' },
    { id: 'about', label: 'About', icon: 'ℹ️' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'appearance':
        return (
          <div className="settings-tab-content">
            <div className="settings-section">
              <h3 className="settings-section-title">
                <IconSystem name="palette" size="sm" />
                Color Schemes
              </h3>
              <p className="settings-section-description">
                Choose from professional color schemes that match your brand and preferences.
              </p>
              <ColorScheme 
                variant={currentColorScheme as any} 
                onSchemeChange={onColorSchemeChange}
              />
            </div>
            
            <div className="settings-section">
              <h3 className="settings-section-title">
                <IconSystem name="theme" size="sm" />
                Theme Preferences
              </h3>
              <div className="theme-options">
                <div className="theme-option">
                  <input 
                    type="radio" 
                    id="light-theme" 
                    name="theme" 
                    value="light"
                    defaultChecked
                  />
                  <label htmlFor="light-theme">
                    <IconSystem name="sun" size="md" />
                    <span>Light Theme</span>
                  </label>
                </div>
                <div className="theme-option">
                  <input 
                    type="radio" 
                    id="dark-theme" 
                    name="theme" 
                    value="dark"
                  />
                  <label htmlFor="dark-theme">
                    <IconSystem name="moon" size="md" />
                    <span>Dark Theme</span>
                  </label>
                </div>
                <div className="theme-option">
                  <input 
                    type="radio" 
                    id="auto-theme" 
                    name="theme" 
                    value="auto"
                  />
                  <label htmlFor="auto-theme">
                    <IconSystem name="settings" size="md" />
                    <span>Auto (System)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'accessibility':
        return (
          <div className="settings-tab-content">
            <div className="settings-section">
              <h3 className="settings-section-title">
                <IconSystem name="accessibility" size="sm" />
                Accessibility Features
              </h3>
              <div className="accessibility-options">
                <div className="accessibility-option">
                  <input 
                    type="checkbox" 
                    id="high-contrast" 
                    name="high-contrast"
                  />
                  <label htmlFor="high-contrast">
                    <IconSystem name="contrast" size="sm" />
                    <span>High Contrast Mode</span>
                  </label>
                </div>
                <div className="accessibility-option">
                  <input 
                    type="checkbox" 
                    id="reduced-motion" 
                    name="reduced-motion"
                  />
                  <label htmlFor="reduced-motion">
                    <IconSystem name="motion" size="sm" />
                    <span>Reduced Motion</span>
                  </label>
                </div>
                <div className="accessibility-option">
                  <input 
                    type="checkbox" 
                    id="focus-indicators" 
                    name="focus-indicators"
                    defaultChecked
                  />
                  <label htmlFor="focus-indicators">
                    <IconSystem name="focus" size="sm" />
                    <span>Enhanced Focus Indicators</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="settings-section">
              <h3 className="settings-section-title">
                <IconSystem name="text" size="sm" />
                Text Preferences
              </h3>
              <div className="text-options">
                <div className="text-option">
                  <label htmlFor="font-size">Font Size</label>
                  <select id="font-size" name="font-size" defaultValue="medium">
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="extra-large">Extra Large</option>
                  </select>
                </div>
                <div className="text-option">
                  <label htmlFor="line-height">Line Height</label>
                  <select id="line-height" name="line-height" defaultValue="normal">
                    <option value="tight">Tight</option>
                    <option value="normal">Normal</option>
                    <option value="relaxed">Relaxed</option>
                    <option value="loose">Loose</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'about':
        return (
          <div className="settings-tab-content">
            <div className="about-section">
              <div className="app-logo">
                <IconSystem name="leaf" size="xl" />
              </div>
              <h2 className="app-name">GreenTrace</h2>
              <p className="app-version">Version 1.0.0</p>
              <p className="app-description">
                Carbon Credit & Supply Chain Transparency Platform built on Avalanche
              </p>
              
              <div className="app-features">
                <h3>Key Features</h3>
                <ul>
                  <li>🌱 Sustainable Agriculture Tracking</li>
                  <li>🌿 Carbon Credit Management</li>
                  <li>⛓️ Blockchain Transparency</li>
                  <li>🔍 Supply Chain Verification</li>
                  <li>📊 Real-time Analytics</li>
                  <li>🔐 Enterprise Privacy Controls</li>
                </ul>
              </div>
              
              <div className="app-links">
                <a href="#" className="app-link">
                  <IconSystem name="document" size="sm" />
                  Documentation
                </a>
                <a href="#" className="app-link">
                  <IconSystem name="support" size="sm" />
                  Support
                </a>
                <a href="#" className="app-link">
                  <IconSystem name="github" size="sm" />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <EnhancedModal
      isOpen={isOpen}
      onClose={onClose}
      title="Settings"
      size="large"
      showCloseButton={true}
    >
      <div className="settings-container">
        {/* Tab Navigation */}
        <div className="settings-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id as any)}
            >
              <IconSystem name={tab.icon as any} size="sm" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="settings-content">
          {renderTabContent()}
        </div>
      </div>
    </EnhancedModal>
  );
};

export default SettingsModal;
