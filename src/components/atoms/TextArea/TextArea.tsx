import React, { forwardRef } from 'react';
import type { TextareaHTMLAttributes } from 'react';
import './TextArea.css';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'outline' | 'filled';
  
  error?: boolean;
  
  success?: boolean;
  
  fullWidth?: boolean;
  
  helperText?: string;
  
  resizable?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  variant = 'default',
  error = false,
  success = false,
  fullWidth = false,
  helperText,
  resizable = true,
  className = '',
  disabled = false,
  ...props
}, ref) => {
  const textareaClasses = [
    'textarea',
    `textarea--${variant}`,
    error && 'textarea--error',
    success && 'textarea--success',
    fullWidth && 'textarea--full-width',
    disabled && 'textarea--disabled',
    !resizable && 'textarea--no-resize',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className="textarea-wrapper">
      <textarea
        ref={ref}
        className={textareaClasses}
        disabled={disabled}
        aria-invalid={error}
        aria-describedby={helperText ? `${props.id}-helper` : undefined}
        {...props}
      />
      
      {helperText && (
        <span 
          id={`${props.id}-helper`}
          className={`textarea__helper-text ${error ? 'textarea__helper-text--error' : ''}`}
        >
          {helperText}
        </span>
      )}
    </div>
  );
});