import { useTheme } from '../hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '10px 20px',
        backgroundColor: theme === 'light' ? '#2563eb' : '#60a5fa',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        zIndex: 1000,
      }}
    >
      {theme === 'light' ? '🌙 Tema Escuro' : '☀️ Tema Claro'}
    </button>
  );
}