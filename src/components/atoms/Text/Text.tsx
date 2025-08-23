import React from 'react';
import type { ReactNode, HTMLAttributes } from 'react';
import './Text.css';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  
  children: ReactNode;
  
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'subtitle1' | 'subtitle2';
  
  color?: 'primary' | 'secondary' | 'tertiary' | 'disabled' | 'inherit' | 'error' | 'success' | 'warning';
  
  align?: 'left' | 'center' | 'right' | 'justify';
  
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  
  truncate?: boolean;
  
  as?: 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body1',
  color = 'inherit',
  align = 'left',
  weight = 'normal',
  truncate = false,
  as,
  className = '',
  ...props
}) => {
  const getDefaultElement = () => {
    if (as) return as;
    
    switch (variant) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        return variant;
      case 'body1':
      case 'body2':
        return 'p';
      default:
        return 'span';
    }
  };

  const Element = getDefaultElement();

  const textClasses = [
    'text',
    `text--${variant}`,
    `text--${color}`,
    `text--${align}`,
    `text--${weight}`,
    truncate && 'text--truncate',
    className,
  ].filter(Boolean).join(' ');

  return React.createElement(
    Element,
    { className: textClasses, ...props },
    children
  );
};