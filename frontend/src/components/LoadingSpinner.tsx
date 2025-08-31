import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  variant?: 'default' | 'pulse' | 'dots' | 'bars';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  text = 'Loading...', 
  variant = 'default' 
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'small': return 'spinner-small';
      case 'large': return 'spinner-large';
      default: return 'spinner-medium';
    }
  };

  const getVariantClass = () => {
    switch (variant) {
      case 'pulse': return 'spinner-pulse';
      case 'dots': return 'spinner-dots';
      case 'bars': return 'spinner-bars';
      default: return 'spinner-default';
    }
  };

  return (
    <div className={`loading-spinner ${getSizeClass()} ${getVariantClass()}`}>
      <div className="spinner-animation">
        {variant === 'default' && (
          <div className="spinner-ring">
            <div className="spinner-segment"></div>
            <div className="spinner-segment"></div>
            <div className="spinner-segment"></div>
            <div className="spinner-segment"></div>
          </div>
        )}
        
        {variant === 'pulse' && (
          <div className="spinner-pulse-animation">
            <div className="pulse-dot"></div>
            <div className="pulse-dot"></div>
            <div className="pulse-dot"></div>
          </div>
        )}
        
        {variant === 'dots' && (
          <div className="spinner-dots-animation">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}
        
        {variant === 'bars' && (
          <div className="spinner-bars-animation">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        )}
      </div>
      
      {text && (
        <div className="spinner-text">
          <span>{text}</span>
          <div className="text-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;
