import React, { useState } from 'react';
import { Input } from '../../atoms/Input/Input';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon/Icon';
import type { InputProps } from '../../atoms/Input/Input';
import './SearchBox.css';

export interface SearchBoxProps extends Omit<InputProps, 'startIcon' | 'endIcon'> {
  
  onSearch: (value: string) => void;
  
  onClear?: () => void;
 
  showSearchButton?: boolean;
  
  showClearButton?: boolean;
  
  searchButtonText?: string;
  
  searchOnType?: boolean;
 
  debounceMs?: number;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  onSearch,
  onClear,
  showSearchButton = false,
  showClearButton = true,
  searchButtonText = 'Buscar',
  searchOnType = false,
  debounceMs = 300,
  placeholder = 'Digite sua busca...',
  value: controlledValue,
  onChange,
  ...inputProps
}) => {
  const [internalValue, setInternalValue] = useState('');
  const [debounceTimer, setDebounceTimer] = useState<number | null>(null);

  const currentValue = controlledValue !== undefined ? String(controlledValue) : internalValue;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    
    if (onChange) {
      onChange(event);
    }

    if (searchOnType) {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      const timer = window.setTimeout(() => {
        onSearch(newValue);
      }, debounceMs);

      setDebounceTimer(timer);
    }
  };

  const handleSearch = () => {
    onSearch(currentValue);
  };

  const handleClear = () => {
    const newValue = '';
    
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    
    if (onClear) {
      onClear();
    } else {
      onSearch(newValue);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="search-box">
      <Input
        value={currentValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        startIcon={<Icon name="search" size="sm" />}
        endIcon={
          showClearButton && currentValue ? (
            <Icon 
              name="close" 
              size="sm" 
              onClick={handleClear}
              className="search-box__clear-icon"
            />
          ) : undefined
        }
        {...inputProps}
      />
      
      {showSearchButton && (
        <Button 
          variant="primary"
          onClick={handleSearch}
          disabled={!currentValue.trim()}
          className="search-box__button"
        >
          {searchButtonText}
        </Button>
      )}
    </div>
  );
};