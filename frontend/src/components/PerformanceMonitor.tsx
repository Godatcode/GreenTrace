import React, { useState } from 'react';
import usePerformance from '../hooks/usePerformance';
import IconSystem from './IconSystem';

interface PerformanceMonitorProps {
  isVisible?: boolean;
  onToggle?: () => void;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  isVisible = true,
  onToggle
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { metrics, getPerformanceWarnings, getPerformanceScore } = usePerformance({
    enableLogging: false
  });

  const warnings = getPerformanceWarnings();
  const score = getPerformanceScore();

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'var(--accent-success)';
    if (score >= 60) return 'var(--accent-warning)';
    return 'var(--accent-danger)';
  };

  const getMetricStatus = (value: number, threshold: number, type: 'warning' | 'error') => {
    if (type === 'error' && value > threshold) return 'error';
    if (type === 'warning' && value > threshold) return 'warning';
    return 'normal';
  };

  if (!isVisible) return null;

  return (
    <div className="performance-monitor">
      <div className="performance-header">
        <h3 className="performance-title">
          <IconSystem name="chart" size="sm" />
          Performance
        </h3>
        <div 
          className="performance-score"
          style={{ backgroundColor: getScoreColor(score) }}
        >
          {score}
        </div>
      </div>

      <div className="performance-metrics">
        <div className="metric-item">
          <span className="metric-label">FPS</span>
          <span 
            className={`metric-value ${getMetricStatus(metrics.fps, 30, 'warning')}`}
          >
            {metrics.fps}
          </span>
        </div>
        
        <div className="metric-item">
          <span className="metric-label">Memory</span>
          <span 
            className={`metric-value ${getMetricStatus(metrics.memoryUsage, 100, 'error')}`}
          >
            {metrics.memoryUsage}MB
          </span>
        </div>
        
        <div className="metric-item">
          <span className="metric-label">Render</span>
          <span 
            className={`metric-value ${getMetricStatus(metrics.renderTime, 16, 'warning')}`}
          >
            {metrics.renderTime.toFixed(1)}ms
          </span>
        </div>
        
        <div className="metric-item">
          <span className="metric-label">Load</span>
          <span 
            className={`metric-value ${getMetricStatus(metrics.loadTime, 1000, 'warning')}`}
          >
            {metrics.loadTime.toFixed(0)}ms
          </span>
        </div>
        
        <div className="metric-item">
          <span className="metric-label">Network</span>
          <span 
            className={`metric-value ${getMetricStatus(metrics.networkLatency, 200, 'warning')}`}
          >
            {metrics.networkLatency.toFixed(0)}ms
          </span>
        </div>
      </div>

      {warnings.length > 0 && (
        <div className="performance-warnings">
          <h4>Warnings</h4>
          {warnings.map((warning, index) => (
            <div key={index} className="warning-item">
              {warning}
            </div>
          ))}
        </div>
      )}

      <div className="performance-actions">
        <button
          className="performance-toggle-btn"
          onClick={() => setIsExpanded(!isExpanded)}
          title={isExpanded ? 'Collapse' : 'Expand'}
        >
          <IconSystem 
            name={isExpanded ? 'up' : 'down'} 
            size="sm" 
          />
        </button>
        
        {onToggle && (
          <button
            className="performance-hide-btn"
            onClick={onToggle}
            title="Hide Monitor"
          >
            <IconSystem name="close" size="sm" />
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="performance-details">
          <div className="performance-chart">
            <h4>Performance Trends</h4>
            <div className="chart-placeholder">
              <IconSystem name="chart" size="lg" />
              <p>Real-time performance charts coming soon...</p>
            </div>
          </div>
          
          <div className="performance-recommendations">
            <h4>Optimization Tips</h4>
            <ul>
              {score < 80 && (
                <li>Consider reducing component complexity</li>
              )}
              {metrics.fps < 60 && (
                <li>Optimize animations and transitions</li>
              )}
              {metrics.memoryUsage > 50 && (
                <li>Check for memory leaks in components</li>
              )}
              {metrics.renderTime > 16 && (
                <li>Use React.memo for expensive components</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceMonitor;
