import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../../atoms/Icon/Icon';
import { Text } from '../../atoms/Text/Text';
import type { ReactNode } from 'react';
import './NavigationItem.css';

export interface NavigationItemProps {
  
  label: string;
  
  href: string;
  
  icon?: string;
  
  customIcon?: ReactNode;
  
  active?: boolean;
  
  disabled?: boolean;
  
  onClick?: () => void;
  
  className?: string;
  
  variant?: 'default' | 'sidebar' | 'tab';
  
  badge?: string | number;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  label,
  href,
  icon,
  customIcon,
  active = false,
  disabled = false,
  onClick,
  className = '',
  variant = 'default',
  badge,
}) => {
  const itemClasses = [
    'nav-item',
    `nav-item--${variant}`,
    active && 'nav-item--active',
    disabled && 'nav-item--disabled',
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {(icon || customIcon) && (
        <span className="nav-item__icon">
          {customIcon || <Icon name={icon!} size="sm" />}
        </span>
      )}
      
      <Text 
        variant="body2" 
        className="nav-item__label"
        truncate
      >
        {label}
      </Text>
      
      {badge && (
        <span className="nav-item__badge">
          {badge}
        </span>
      )}
    </>
  );

  const handleClick = (event: React.MouseEvent) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    
    if (onClick) {
      onClick();
    }
  };

  if (disabled) {
    return (
      <span className={itemClasses} onClick={handleClick}>
        {content}
      </span>
    );
  }

  return (
    <Link 
      to={href}
      className={itemClasses}
      onClick={handleClick}
      aria-current={active ? 'page' : undefined}
    >
      {content}
    </Link>
  );
};