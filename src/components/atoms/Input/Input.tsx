import React from 'react';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  required = false,
  className = '',
  id,
  name,
  ...props 
}) => {
  const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`input-group ${className}`}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        className={`input ${error ? 'input--error' : ''}`}
        {...props}
      />
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};

export default Input;