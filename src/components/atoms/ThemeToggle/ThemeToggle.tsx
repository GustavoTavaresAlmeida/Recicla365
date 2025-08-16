import React from 'react';
//import { useTheme } from '../../../hooks/useTheme';
import Icon from '../Icon/Icon';
import './ThemeToggle.css';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      className={`theme-toggle ${className}`}
      onClick={toggleTheme}
      aria-label={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
      title={`Tema atual: ${theme === 'light' ? 'claro' : 'escuro'}`}
    >
      <div className="theme-toggle__icon">
        <Icon 
          name={theme === 'light' ? 'moon' : 'sun'} 
          size="medium"
        />
      </div>
      <span className="theme-toggle__text">
        {theme === 'light' ? 'Escuro' : 'Claro'}
      </span>
    </button>
  );
};

export default ThemeToggle;