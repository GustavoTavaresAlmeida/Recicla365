import React from 'react';
import type { ReactNode, LabelHTMLAttributes } from 'react';
import './Label.css';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  
  children: ReactNode;
  
  required?: boolean;

  size?: 'sm' | 'md' | 'lg';
  
  disabled?: boolean;
}

export const Label: React.FC<LabelProps> = ({
  children,
  required = false,
  size = 'md',
  disabled = false,
  className = '',
  ...props
}) => {
  const labelClasses = [
    'label',
    `label--${size}`,
    disabled && 'label--disabled',
    className,
  ].filter(Boolean).join(' ');

  return (
    <label className={labelClasses} {...props}>
      {children}
      {required && (
        <span className="label__required" aria-label="obrigatório">
          *
        </span>
      )}
    </label>
  );
};