import React from 'react';

interface SkeletonLoaderProps {
  type: 'card' | 'text' | 'avatar' | 'button' | 'list';
  lines?: number;
  height?: string;
  width?: string;
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  type, 
  lines = 3, 
  height = '20px', 
  width = '100%',
  className = ''
}) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className={`skeleton-card ${className}`}>
            <div className="skeleton-avatar" />
            <div className="skeleton-content">
              <div className="skeleton-title" />
              <div className="skeleton-text" />
              <div className="skeleton-text" />
            </div>
          </div>
        );
      
      case 'text':
        return (
          <div className={`skeleton-text-container ${className}`}>
            {Array.from({ length: lines }).map((_, index) => (
              <div 
                key={index} 
                className="skeleton-text-line"
                style={{ 
                  width: index === lines - 1 ? '60%' : '100%',
                  height 
                }}
              />
            ))}
          </div>
        );
      
      case 'avatar':
        return (
          <div 
            className={`skeleton-avatar ${className}`}
            style={{ width, height }}
          />
        );
      
      case 'button':
        return (
          <div 
            className={`skeleton-button ${className}`}
            style={{ width, height }}
          />
        );
      
      case 'list':
        return (
          <div className={`skeleton-list ${className}`}>
            {Array.from({ length: lines }).map((_, index) => (
              <div key={index} className="skeleton-list-item">
                <div className="skeleton-avatar-small" />
                <div className="skeleton-content">
                  <div className="skeleton-title" />
                  <div className="skeleton-text" />
                </div>
              </div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="skeleton-loader">
      {renderSkeleton()}
    </div>
  );
};

export default SkeletonLoader;
