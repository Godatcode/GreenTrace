import React from 'react';

interface ColorSchemeProps {
  variant?: 'default' | 'professional' | 'eco' | 'tech' | 'warm';
  onSchemeChange: (scheme: string) => void;
}

const ColorScheme: React.FC<ColorSchemeProps> = ({ 
  variant = 'default', 
  onSchemeChange 
}) => {
  const schemes = {
    default: {
      name: 'Default',
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
      info: '#06b6d4'
    },
    professional: {
      name: 'Professional',
      primary: '#1e40af',
      secondary: '#7c3aed',
      success: '#059669',
      warning: '#d97706',
      danger: '#dc2626',
      info: '#0891b2'
    },
    eco: {
      name: 'Eco-Friendly',
      primary: '#059669',
      secondary: '#10b981',
      success: '#16a34a',
      warning: '#ca8a04',
      danger: '#dc2626',
      info: '#0891b2'
    },
    tech: {
      name: 'Tech',
      primary: '#6366f1',
      secondary: '#a855f7',
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
      info: '#06b6d4'
    },
    warm: {
      name: 'Warm',
      primary: '#ea580c',
      secondary: '#dc2626',
      success: '#16a34a',
      warning: '#ca8a04',
      danger: '#dc2626',
      info: '#0891b2'
    }
  };

  const currentScheme = schemes[variant as keyof typeof schemes];

  const handleSchemeChange = (schemeName: string) => {
    onSchemeChange(schemeName);
  };

  return (
    <div className="color-scheme-selector">
      <h3 className="scheme-title">Color Scheme</h3>
      <div className="scheme-options">
        {Object.entries(schemes).map(([key, scheme]) => (
          <button
            key={key}
            className={`scheme-option ${variant === key ? 'active' : ''}`}
            onClick={() => handleSchemeChange(key)}
            title={scheme.name}
          >
            <div className="scheme-preview">
              <div 
                className="color-dot primary" 
                style={{ backgroundColor: scheme.primary }}
              />
              <div 
                className="color-dot secondary" 
                style={{ backgroundColor: scheme.secondary }}
              />
              <div 
                className="color-dot success" 
                style={{ backgroundColor: scheme.success }}
              />
              <div 
                className="color-dot warning" 
                style={{ backgroundColor: scheme.warning }}
              />
              <div 
                className="color-dot danger" 
                style={{ backgroundColor: scheme.danger }}
              />
            </div>
            <span className="scheme-name">{scheme.name}</span>
          </button>
        ))}
      </div>
      
      <div className="current-scheme">
        <h4>Current Colors</h4>
        <div className="color-palette">
          <div className="color-item">
            <span className="color-label">Primary</span>
            <div className="color-value">
              <div 
                className="color-swatch" 
                style={{ backgroundColor: currentScheme.primary }}
              />
              <span className="color-hex">{currentScheme.primary}</span>
            </div>
          </div>
          <div className="color-item">
            <span className="color-label">Secondary</span>
            <div className="color-value">
              <div 
                className="color-swatch" 
                style={{ backgroundColor: currentScheme.secondary }}
              />
              <span className="color-hex">{currentScheme.secondary}</span>
            </div>
          </div>
          <div className="color-item">
            <span className="color-label">Success</span>
            <div className="color-value">
              <div 
                className="color-swatch" 
                style={{ backgroundColor: currentScheme.success }}
              />
              <span className="color-hex">{currentScheme.success}</span>
            </div>
          </div>
          <div className="color-item">
            <span className="color-label">Warning</span>
            <div className="color-value">
              <div 
                className="color-swatch" 
                style={{ backgroundColor: currentScheme.warning }}
              />
              <span className="color-hex">{currentScheme.warning}</span>
            </div>
          </div>
          <div className="color-item">
            <span className="color-label">Danger</span>
            <div className="color-value">
              <div 
                className="color-swatch" 
                style={{ backgroundColor: currentScheme.danger }}
              />
              <span className="color-hex">{currentScheme.danger}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorScheme;
