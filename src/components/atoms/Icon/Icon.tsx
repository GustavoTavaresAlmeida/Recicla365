import React from 'react';
import './Icon.css';

type IconName = 
  | 'recycle' | 'leaf' | 'earth'
  | 'location' | 'user' | 'logout' | 'menu' | 'close' | 'home' | 'dashboard'
  | 'delete' | 'edit' | 'add' | 'save' | 'search' | 'filter'
  | 'sun' | 'moon'
  | 'check' | 'warning' | 'error' | 'info'
  | 'arrow-up' | 'arrow-down' | 'arrow-left' | 'arrow-right'
  | 'glass' | 'paper' | 'plastic' | 'metal' | 'organic';

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: IconName;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'muted';
  className?: string;
}

const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 'medium', 
  color = 'default', 
  className = '',
  ...props 
}) => {
  const iconMap: Record<IconName, string> = {
    
    recycle: '♻️',
    leaf: '🍃',
    earth: '🌍',
    
    location: '📍',
    user: '👤',
    logout: '🚪',
    menu: '☰',
    close: '✕',
    home: '🏠',
    dashboard: '📊',
    
    delete: '🗑️',
    edit: '✏️',
    add: '➕',
    save: '💾',
    search: '🔍',
    filter: '🔽',
    
    sun: '☀️',
    moon: '🌙',
    
    check: '✓',
    warning: '⚠️',
    error: '✗',
    info: 'ℹ️',
    
    'arrow-up': '↑',
    'arrow-down': '↓',
    'arrow-left': '←',
    'arrow-right': '→',
    
    glass: '🥛',
    paper: '📄',
    plastic: '🥤',
    metal: '🔩',
    organic: '🍎'
  };

  return (
    <span 
      className={`icon icon--${size} icon--${color} ${className}`}
      {...props}
    >
      {iconMap[name]}
    </span>
  );
};

export default Icon;