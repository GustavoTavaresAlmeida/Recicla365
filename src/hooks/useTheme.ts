import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import type { ThemeContextData } from '../contexts/ThemeContext';

export function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);
  return context;
}