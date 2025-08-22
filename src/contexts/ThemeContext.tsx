import React, { createContext, useEffect, useState } from 'react';

import type { ReactNode } from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeContextData {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextData>({
  theme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('light');

  const getSystemTheme = (): Theme => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  };

  const getSavedTheme = (): Theme | null => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('recicla365-theme');
      return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : null;
    }
    return null;
  };

  const saveTheme = (newTheme: Theme): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('recicla365-theme', newTheme);
    }
  };

  const applyTheme = (newTheme: Theme): void => {
    if (typeof document !== 'undefined') {
      const html = document.documentElement;
      
      html.removeAttribute('data-theme');
      html.classList.remove('light', 'dark');
      
      html.setAttribute('data-theme', newTheme);
      html.classList.add(newTheme);
      
      let metaTheme = document.querySelector('meta[name="theme-color"]');
      if (!metaTheme) {
        metaTheme = document.createElement('meta');
        metaTheme.setAttribute('name', 'theme-color');
        document.head.appendChild(metaTheme);
      }
      
      const themeColor = newTheme === 'dark' ? '#1f2937' : '#ffffff';
      metaTheme.setAttribute('content', themeColor);
    }
  };

  const setTheme = (newTheme: Theme): void => {
    setThemeState(newTheme);
    applyTheme(newTheme);
    saveTheme(newTheme);
  };

  const toggleTheme = (): void => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  useEffect(() => {
    const savedTheme = getSavedTheme();
    const initialTheme = savedTheme || getSystemTheme();
    
    setThemeState(initialTheme);
    applyTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e: MediaQueryListEvent): void => {
      const savedTheme = getSavedTheme();
      if (!savedTheme) {
        const systemTheme = e.matches ? 'dark' : 'light';
        setThemeState(systemTheme);
        applyTheme(systemTheme);
        saveTheme(systemTheme);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []); 
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.add('theme-transition');
      
      const timer = setTimeout(() => {
        document.body.classList.remove('theme-transition');
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [theme]);

  const contextValue: ThemeContextData = {
    theme,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};