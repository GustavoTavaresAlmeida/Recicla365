import React from 'react';
import './Label.css';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}

const Label: React.FC<LabelProps> = ({ 
  children, 
  required = false, 
  className = '',
  ...props 
}) => {
  return (
    <label 
      className={`label ${className}`}
      {...props}
    >
      {children}
      {required && <span className="label-required">*</span>}
    </label>
  );
};

export default Label;