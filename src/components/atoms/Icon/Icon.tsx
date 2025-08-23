import React from 'react';
import './Icon.css';

export interface IconProps {
  
  name: string;
 
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'inherit';
  
  className?: string;
  
  onClick?: () => void;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  color = 'inherit',
  className = '',
  onClick
}) => {
  const iconClasses = [
    'icon',
    `icon--${size}`,
    `icon--${color}`,
    onClick && 'icon--clickable',
    className,
  ].filter(Boolean).join(' ');

  const getIconSVG = () => {
    switch (name) {
      case 'home':
        return <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>;
      case 'user':
        return <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>;
      case 'search':
        return <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>;
      case 'location':
        return <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>;
      case 'recycle':
        return <path d="M5.77 15.5l-1.46-2.54C3.53 11.43 4.69 10 6.27 10H9l-2-3.5L9.19 4 12 8.5v7H6.27c-.8 0-1.25-.91-.5-1.5zM18.23 8.5l1.46 2.54c.78 1.53-.38 2.96-1.96 2.96H15l2 3.5L14.81 20 12 15.5v-7h5.73c.8 0 1.25.91.5 1.5z"/>;
      case 'dashboard':
        return <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>;
      case 'trash':
        return <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>;
      case 'edit':
        return <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>;
      case 'save':
        return <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>;
      case 'close':
        return <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>;
      default:
        return <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>;
    }
  };

  return (
    <svg 
      className={iconClasses}
      viewBox="0 0 24 24"
      fill="currentColor"
      onClick={onClick}
      role={onClick ? 'button' : 'img'}
      aria-hidden={!onClick}
    >
      {getIconSVG()}
    </svg>
  );
};