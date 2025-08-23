import React, { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import './Input.css';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  
  variant?: 'default' | 'outline' | 'filled';
  
  size?: 'sm' | 'md' | 'lg';
  
  error?: boolean;
  
  success?: boolean;
 
  fullWidth?: boolean;
  
  startIcon?: ReactNode;
  
  endIcon?: ReactNode;
  
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  variant = 'default',
  size = 'md',
  error = false,
  success = false,
  fullWidth = false,
  startIcon,
  endIcon,
  helperText,
  className = '',
  disabled = false,
  ...props
}, ref) => {
  const inputClasses = [
    'input',
    `input--${variant}`,
    `input--${size}`,
    error && 'input--error',
    success && 'input--success',
    fullWidth && 'input--full-width',
    disabled && 'input--disabled',
    startIcon && 'input--has-start-icon',
    endIcon && 'input--has-end-icon',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className="input-wrapper">
      <div className="input-container">
        {startIcon && (
          <span className="input__start-icon" aria-hidden="true">
            {startIcon}
          </span>
        )}
        
        <input
          ref={ref}
          className={inputClasses}
          disabled={disabled}
          aria-invalid={error}
          aria-describedby={helperText ? `${props.id}-helper` : undefined}
          {...props}
        />
        
        {endIcon && (
          <span className="input__end-icon" aria-hidden="true">
            {endIcon}
          </span>
        )}
      </div>
      
      {helperText && (
        <span 
          id={`${props.id}-helper`}
          className={`input__helper-text ${error ? 'input__helper-text--error' : ''}`}
        >
          {helperText}
        </span>
      )}
    </div>
  );
});