import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import { Text } from '../../atoms/Text/Index';
import { NavigationItem } from '../../molecules/NavigationItem';
import { useTheme } from '../../../hooks/useTheme';
import type { ReactNode } from 'react';
import './Header.css';

export interface HeaderProps {
  
  isAuthenticated?: boolean;
 
  userName?: string;
  
  onLogout?: () => void;
  
  navigationItems?: Array<{
    label: string;
    href: string;
    icon?: string;
    active?: boolean;
  }>;
  
  actions?: ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  isAuthenticated = false,
  userName,
  onLogout,
  navigationItems = [],
  actions,
}) => {
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <header className="header">
      <div className="container header__container">
        <Link to="/" className="header__logo">
          <Icon name="recycle" size="lg" color="primary" />
          <Text variant="h5" weight="bold" color="primary">
            Recicla365
          </Text>
        </Link>

        <nav className="header__nav">
          {navigationItems.map((item) => (
            <NavigationItem
              key={item.href}
              variant="tab"
              label={item.label}
              href={item.href}
              icon={item.icon}
              active={item.active}
            />
          ))}
        </nav>

        <div className="header__actions">
          {actions}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            startIcon={
              <Icon 
                name={theme === 'light' ? 'moon' : 'sun'} 
                size="sm" 
              />
            }
            aria-label={`Alternar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
          >
            {theme === 'light' ? 'Escuro' : 'Claro'}
          </Button>

          {isAuthenticated ? (
            <div className="header__user">
              <Text variant="body2" color="secondary">
                Olá, {userName}
              </Text>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                startIcon={<Icon name="logout" size="sm" />}
              >
                Sair
              </Button>
            </div>
          ) : (
            <div className="header__auth">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Entrar
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">
                  Cadastrar
                </Button>
              </Link>
            </div>
          )}
        </div>

        <Button
                  variant="ghost"
                  size="sm"
                  className="header__mobile-menu"
                  startIcon={<Icon name="menu" size="md" />}
                  aria-label="Menu mobile" children={undefined}        />
      </div>
    </header>
  );
};