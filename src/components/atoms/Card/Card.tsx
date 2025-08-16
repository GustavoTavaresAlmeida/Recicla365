import React from 'react';
import './Card.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost';
  padding?: 'none' | 'small' | 'normal' | 'large';
  hover?: boolean;
  className?: string;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  variant = 'default',
  padding = 'normal',
  hover = false,
  ...props 
}) => {
  return (
    <div 
      className={`card card--${variant} card--padding-${padding} ${hover ? 'card--hover' : ''} ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;