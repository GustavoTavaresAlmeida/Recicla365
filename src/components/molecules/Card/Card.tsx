import React from 'react';
import type { ReactNode, HTMLAttributes } from 'react';
import { Text } from '../../atoms/Text/Text';
import './Card.css';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  
  children: ReactNode;
  
  title?: string;
  
  subtitle?: string;
  
  variant?: 'default' | 'outlined' | 'elevated';
  
  hoverable?: boolean;
  
  headerActions?: ReactNode;
  
  footerActions?: ReactNode;
  
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  variant = 'default',
  hoverable = false,
  headerActions,
  footerActions,
  noPadding = false,
  className = '',
  ...props
}) => {
  const cardClasses = [
    'card',
    `card--${variant}`,
    hoverable && 'card--hoverable',
    className,
  ].filter(Boolean).join(' ');

  const hasHeader = title || subtitle || headerActions;
  const hasFooter = footerActions;

  return (
    <div className={cardClasses} {...props}>
      {hasHeader && (
        <div className="card__header">
          <div className="card__header-content">
            {title && (
              <Text variant="h6" weight="semibold" className="card__title">
                {title}
              </Text>
            )}
            {subtitle && (
              <Text variant="body2" color="secondary" className="card__subtitle">
                {subtitle}
              </Text>
            )}
          </div>
          {headerActions && (
            <div className="card__header-actions">
              {headerActions}
            </div>
          )}
        </div>
      )}
      
      <div className={`card__content ${noPadding ? 'card__content--no-padding' : ''}`}>
        {children}
      </div>
      
      {hasFooter && (
        <div className="card__footer">
          {footerActions}
        </div>
      )}
    </div>
  );
};