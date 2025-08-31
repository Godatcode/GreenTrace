import React, { useState, useEffect } from 'react';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

interface ToastNotificationsProps {
  toasts: Toast[];
  removeToast: (id: string) => void;
}

const ToastNotifications: React.FC<ToastNotificationsProps> = ({ toasts, removeToast }) => {
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
};

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Animate in
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Auto remove after duration
    const autoRemove = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onRemove(toast.id), 300);
    }, toast.duration || 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(autoRemove);
    };
  }, [toast.id, toast.duration, onRemove]);

  const handleRemove = () => {
    setIsExiting(true);
    setTimeout(() => onRemove(toast.id), 300);
  };

  const getToastIcon = () => {
    switch (toast.type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '💬';
    }
  };

  const getToastClass = () => {
    return `toast-item ${toast.type} ${isVisible ? 'visible' : ''} ${isExiting ? 'exiting' : ''}`;
  };

  return (
    <div className={getToastClass()}>
      <div className="toast-icon">
        {getToastIcon()}
      </div>
      <div className="toast-content">
        <h4 className="toast-title">{toast.title}</h4>
        <p className="toast-message">{toast.message}</p>
      </div>
      <button className="toast-close" onClick={handleRemove}>
        ×
      </button>
      <div className="toast-progress">
        <div className="progress-bar" />
      </div>
    </div>
  );
};

export default ToastNotifications;
