import React from 'react';
import type { ReactNode, MouseEvent } from 'react';
import './Button.css';

export interface ButtonProps {
 
  children: ReactNode;
  
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  
  size?: 'sm' | 'md' | 'lg';
  
  disabled?: boolean;
  
  loading?: boolean;
  
  type?: 'button' | 'submit' | 'reset';
  
  className?: string;
  
  fullWidth?: boolean;
  
  startIcon?: ReactNode;
  
  endIcon?: ReactNode;
  
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  
  id?: string;
  
  name?: string;
  
  value?: string;
  
  'aria-label'?: string;
  
  'aria-describedby'?: string;
}
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  type = 'button',
  className = '',
  fullWidth = false,
  startIcon,
  endIcon,
  onClick,
  id,
  name,
  value,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
}) => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) {
      event.preventDefault();
      return;
    }
    
    if (onClick) {
      onClick(event);
    }
  };

  const buttonClasses = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth && 'btn--full-width',
    loading && 'btn--loading',
    disabled && 'btn--disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      id={id}
      name={name}
      value={value}
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      aria-disabled={disabled || loading}
    >
      {loading && (
        <span className="btn__loading-spinner" aria-hidden="true">
          <svg
            className="btn__spinner"
            viewBox="0 0 24 24"
            width="16"
            height="16"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeDasharray="31.416"
              strokeDashoffset="31.416"
            />
          </svg>
        </span>
      )}
      
      {startIcon && !loading && (
        <span className="btn__start-icon" aria-hidden="true">
          {startIcon}
        </span>
      )}
      
      <span className="btn__content">
        {children}
      </span>
      
      {endIcon && !loading && (
        <span className="btn__end-icon" aria-hidden="true">
          {endIcon}
        </span>
      )}
    </button>
  );
};