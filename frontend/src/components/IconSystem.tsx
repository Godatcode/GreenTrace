import React from 'react';

interface IconProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
  title?: string;
}

const IconSystem: React.FC<IconProps> = ({ 
  name, 
  size = 'md', 
  color = 'currentColor',
  className = '',
  title
}) => {
  const getIcon = () => {
    switch (name) {
      // Navigation & UI
      case 'home': return '🏠';
      case 'dashboard': return '📊';
      case 'settings': return '⚙️';
      case 'profile': return '👤';
      case 'logout': return '🚪';
      case 'close': return '✕';
      case 'menu': return '☰';
      case 'search': return '🔍';
      case 'filter': return '🔧';
      case 'sort': return '↕️';
      case 'up': return '⬆️';
      case 'down': return '⬇️';
      
      // Blockchain & Finance
      case 'wallet': return '💼';
      case 'blockchain': return '⛓️';
      case 'crypto': return '₿';
      case 'transaction': return '💸';
      case 'balance': return '💰';
      case 'network': return '🌐';
      case 'sync': return '🔄';
      case 'verify': return '✅';
      
      // Agriculture & Environment
      case 'leaf': return '🍃';
      case 'tree': return '🌳';
      case 'plant': return '🌱';
      case 'seed': return '🌾';
      case 'farm': return '🚜';
      case 'soil': return '🌍';
      case 'water': return '💧';
      case 'sun': return '☀️';
      
      // Carbon & Sustainability
      case 'carbon': return '🌿';
      case 'recycle': return '♻️';
      case 'eco': return '🌱';
      case 'green': return '💚';
      case 'sustainable': return '🌍';
      case 'climate': return '🌤️';
      case 'energy': return '⚡';
      case 'wind': return '💨';
      
      // Supply Chain & Logistics
      case 'truck': return '🚛';
      case 'warehouse': return '🏭';
      case 'package': return '📦';
      case 'shipping': return '🚢';
      case 'tracking': return '📍';
      case 'route': return '🛣️';
      case 'delivery': return '📮';
      case 'inventory': return '📋';
      
      // Data & Analytics
      case 'chart': return '📈';
      case 'analytics': return '📊';
      case 'data': return '💾';
      case 'report': return '📄';
      case 'stats': return '📊';
      case 'graph': return '📉';
      case 'metrics': return '📏';
      case 'insights': return '💡';
      
      // Security & Privacy
      case 'lock': return '🔒';
      case 'shield': return '🛡️';
      case 'key': return '🔑';
      case 'security': return '🔐';
      case 'privacy': return '🤐';
      case 'encrypt': return '🔐';
      case 'secure': return '✅';
      case 'trust': return '🤝';
      
      // Status & Feedback
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      case 'loading': return '⏳';
      case 'pending': return '⏸️';
      case 'complete': return '🎯';
      case 'check': return '✓';
      
      // Actions & Controls
      case 'add': return '➕';
      case 'edit': return '✏️';
      case 'delete': return '🗑️';
      case 'save': return '💾';
      case 'download': return '⬇️';
      case 'upload': return '⬆️';
      case 'share': return '📤';
      case 'export': return '📤';
      
      // Communication
      case 'message': return '💬';
      case 'notification': return '🔔';
      case 'email': return '📧';
      case 'phone': return '📞';
      case 'chat': return '💭';
      case 'support': return '🆘';
      case 'help': return '❓';
      case 'contact': return '📞';
      
      // Additional Icons for New Components
      case 'palette': return '🎨';
      case 'theme': return '🎭';
      case 'accessibility': return '♿';
      case 'contrast': return '🌓';
      case 'motion': return '🎬';
      case 'focus': return '🎯';
      case 'text': return '📝';
      case 'document': return '📄';
      case 'github': return '🐙';
      
      // Default
      default: return '❓';
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'xs': return 'icon-xs';
      case 'sm': return 'icon-sm';
      case 'md': return 'icon-md';
      case 'lg': return 'icon-lg';
      case 'xl': return 'icon-xl';
      default: return 'icon-md';
    }
  };

  return (
    <span 
      className={`icon ${getSizeClass()} ${className}`}
      style={{ color }}
      title={title}
      role="img"
      aria-label={title || name}
    >
      {getIcon()}
    </span>
  );
};

export default IconSystem;
