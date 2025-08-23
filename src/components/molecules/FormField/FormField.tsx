import React from 'react';
import { Label } from '../../atoms/Label/Label';
import { Input } from '../../atoms/Input/Input';
import { Text } from '../../atoms/Text/Text';
import type { InputProps } from '../../atoms/Input/Input';
import type { LabelProps } from '../../atoms/Label/Label';
import './FormField.css';

export interface FormFieldProps extends Omit<InputProps, 'id'> {

  id: string;
  
  label: string;
  
  labelProps?: Omit<LabelProps, 'children' | 'htmlFor'>;
  
  errorMessage?: string;
  
  helpText?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  labelProps = {},
  errorMessage,
  helpText,
  error,
  required,
  ...inputProps
}) => {
  const hasError = Boolean(error || errorMessage);
  const helperText = errorMessage || helpText;

  return (
    <div className="form-field">
      <Label 
        htmlFor={id}
        required={required}
        disabled={inputProps.disabled}
        {...labelProps}
      >
        {label}
      </Label>
      
      <Input
        id={id}
        error={hasError}
        helperText={helperText}
        required={required}
        {...inputProps}
      />
      
      {helperText && (
        <Text
          variant="caption"
          color={hasError ? 'error' : 'tertiary'}
          className="form-field__helper"
        >
          {helperText}
        </Text>
      )}
    </div>
  );
};