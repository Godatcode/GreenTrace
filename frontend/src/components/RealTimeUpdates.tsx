import React, { useState, useEffect, useRef, useCallback } from 'react';
import IconSystem from './IconSystem';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface RealTimeUpdate {
  id: string;
  type: 'product' | 'carbon' | 'compliance' | 'system';
  title: string;
  description: string;
  timestamp: Date;
  priority: 'low' | 'medium' | 'high';
  data?: any;
}

interface RealTimeUpdatesProps {
  onNotificationClick?: (notification: Notification) => void;
  onUpdateClick?: (update: RealTimeUpdate) => void;
}

const RealTimeUpdates: React.FC<RealTimeUpdatesProps> = ({
  onNotificationClick,
  onUpdateClick
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [realTimeUpdates, setRealTimeUpdates] = useState<RealTimeUpdate[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUpdates, setShowUpdates] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected');
  
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Simulate real-time updates for demo
  useEffect(() => {
    const simulateUpdates = () => {
      const updateTypes = ['product', 'carbon', 'compliance', 'system'] as const;
      const priorities = ['low', 'medium', 'high'] as const;
      
      const newUpdate: RealTimeUpdate = {
        id: Date.now().toString(),
        type: updateTypes[Math.floor(Math.random() * updateTypes.length)],
        title: `Real-time ${updateTypes[Math.floor(Math.random() * updateTypes.length)]} update`,
        description: `New activity detected in the system at ${new Date().toLocaleTimeString()}`,
        timestamp: new Date(),
        priority: priorities[Math.floor(Math.random() * priorities.length)]
      };

      setRealTimeUpdates(prev => [newUpdate, ...prev.slice(0, 9)]);
      setUpdateCount(prev => prev + 1);

      // Add notification for high priority updates
      if (newUpdate.priority === 'high') {
        addNotification('warning', 'High Priority Update', newUpdate.description);
      }
    };

    const interval = setInterval(simulateUpdates, 10000); // Every 10 seconds
    return () => clearInterval(interval);
  }, []);

  // Simulate WebSocket connection
  useEffect(() => {
    const simulateConnection = () => {
      setConnectionStatus('connecting');
      
      setTimeout(() => {
        setIsConnected(true);
        setConnectionStatus('connected');
        
        // Simulate connection loss after some time
        setTimeout(() => {
          setIsConnected(false);
          setConnectionStatus('disconnected');
          
          // Auto-reconnect
          setTimeout(() => {
            simulateConnection();
          }, 5000);
        }, 30000);
      }, 2000);
    };

    simulateConnection();
  }, []);

  // Add notification
  const addNotification = useCallback((type: Notification['type'], title: string, message: string, action?: Notification['action']) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      type,
      title,
      message,
      timestamp: new Date(),
      read: false,
      action
    };

    setNotifications(prev => [newNotification, ...prev.slice(0, 19)]);
    setUnreadCount(prev => prev + 1);
  }, []);

  // Mark notification as read
  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  }, []);

  // Mark all notifications as read
  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    setUnreadCount(0);
  }, []);

  // Clear notification
  const clearNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    setUnreadCount(prev => Math.max(0, prev - 1));
  }, []);

  // Clear all notifications
  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
    setUnreadCount(0);
  }, []);

  // Handle notification click
  const handleNotificationClick = useCallback((notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    onNotificationClick?.(notification);
  }, [markAsRead, onNotificationClick]);

  // Handle update click
  const handleUpdateClick = useCallback((update: RealTimeUpdate) => {
    onUpdateClick?.(update);
  }, [onUpdateClick]);

  // Get priority color
  const getPriorityColor = (priority: RealTimeUpdate['priority']) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  // Get type icon
  const getTypeIcon = (type: RealTimeUpdate['type']) => {
    switch (type) {
      case 'product': return 'package';
      case 'carbon': return 'carbon';
      case 'compliance': return 'verify';
      case 'system': return 'settings';
      default: return 'info';
    }
  };

  return (
    <div className="real-time-updates">
      {/* Connection Status */}
      <div className="connection-status">
        <div className={`status-indicator ${connectionStatus}`}>
          <div className={`status-dot ${connectionStatus}`} />
          <span className="status-text">
            {connectionStatus === 'connecting' && 'Connecting...'}
            {connectionStatus === 'connected' && 'Connected'}
            {connectionStatus === 'disconnected' && 'Disconnected'}
          </span>
        </div>
        
        {connectionStatus === 'connected' && (
          <div className="connection-info">
            <IconSystem name="wifi" size="sm" />
            <span>Real-time updates active</span>
          </div>
        )}
      </div>

      {/* Notifications Panel */}
      <div className="notifications-panel">
        <button
          className="notifications-toggle"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <IconSystem name="bell" size="sm" />
          <span className="toggle-text">Notifications</span>
          {unreadCount > 0 && (
            <span className="unread-badge">{unreadCount}</span>
          )}
        </button>

        {showNotifications && (
          <div className="notifications-dropdown">
            <div className="notifications-header">
              <h4>Notifications ({notifications.length})</h4>
              <div className="header-actions">
                <button onClick={markAllAsRead} className="action-btn">
                  Mark All Read
                </button>
                <button onClick={clearAllNotifications} className="action-btn">
                  Clear All
                </button>
              </div>
            </div>

            <div className="notifications-list">
              {notifications.length === 0 ? (
                <div className="empty-state">
                  <IconSystem name="bell" size="lg" />
                  <p>No notifications</p>
                </div>
              ) : (
                notifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="notification-icon">
                      <IconSystem name={notification.type} size="sm" />
                    </div>
                    <div className="notification-content">
                      <div className="notification-title">{notification.title}</div>
                      <div className="notification-message">{notification.message}</div>
                      <div className="notification-time">
                        {notification.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                    <div className="notification-actions">
                      {notification.action && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            notification.action!.onClick();
                          }}
                          className="action-btn small"
                        >
                          {notification.action.label}
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          clearNotification(notification.id);
                        }}
                        className="clear-btn"
                      >
                        <IconSystem name="close" size="xs" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Real-time Updates Panel */}
      <div className="updates-panel">
        <button
          className="updates-toggle"
          onClick={() => setShowUpdates(!showUpdates)}
        >
          <IconSystem name="activity" size="sm" />
          <span className="toggle-text">Live Updates</span>
          {updateCount > 0 && (
            <span className="update-badge">{updateCount}</span>
          )}
        </button>

        {showUpdates && (
          <div className="updates-dropdown">
            <div className="updates-header">
              <h4>Real-time Updates</h4>
              <span className="updates-count">{realTimeUpdates.length} updates</span>
            </div>

            <div className="updates-list">
              {realTimeUpdates.length === 0 ? (
                <div className="empty-state">
                  <IconSystem name="activity" size="lg" />
                  <p>No updates yet</p>
                </div>
              ) : (
                realTimeUpdates.map(update => (
                  <div
                    key={update.id}
                    className="update-item"
                    onClick={() => handleUpdateClick(update)}
                  >
                    <div className="update-priority" style={{ backgroundColor: getPriorityColor(update.priority) }} />
                    <div className="update-icon">
                      <IconSystem name={getTypeIcon(update.type)} size="sm" />
                    </div>
                    <div className="update-content">
                      <div className="update-title">{update.title}</div>
                      <div className="update-description">{update.description}</div>
                      <div className="update-meta">
                        <span className="update-type">{update.type}</span>
                        <span className="update-time">
                          {update.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                    <div className="update-status">
                      <span className={`priority-badge ${update.priority}`}>
                        {update.priority}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button
          onClick={() => addNotification('info', 'Test Notification', 'This is a test notification')}
          className="action-btn"
        >
          <IconSystem name="plus" size="sm" />
          Test
        </button>
        
        <button
          onClick={() => addNotification('success', 'Success!', 'Operation completed successfully', {
            label: 'View Details',
            onClick: () => console.log('View details clicked')
          })}
          className="action-btn"
        >
          <IconSystem name="check" size="sm" />
          Success
        </button>
      </div>
    </div>
  );
};

export default RealTimeUpdates;
