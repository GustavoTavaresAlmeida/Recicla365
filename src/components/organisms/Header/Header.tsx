import React, { useState } from 'react';
import Navigation from '../../molecules/Navigation/Navigation';
import ThemeToggle from '../../atoms/ThemeToggle/ThemeToggle';
import Button from '../../atoms/Button/Button';
import Icon from '../../atoms/Icon/Icon';
import './Header.css';

interface User {
  id: string;
  nome: string;
  email: string;
}

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    if (window.confirm('Tem certeza que deseja sair?')) {
      onLogout();
    }
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__left">
          <div className="header__logo">
            <Icon name="recycle" size="large" color="primary" />
            <span className="header__logo-text">Recicla365</span>
          </div>
          
          <div className="header__nav-desktop">
            <Navigation />
          </div>
        </div>
        
        <div className="header__right">
          <ThemeToggle className="header__theme-toggle" />
          
          <div className="header__user">
            <Icon name="user" size="small" color="secondary" />
            <span className="header__user-name">{user.nome}</span>
          </div>
          
          <Button 
            variant="ghost" 
            size="small"
            onClick={handleLogout}
            className="header__logout"
          >
            <Icon name="logout" size="small" />
            <span className="header__logout-text">Sair</span>
          </Button>
          
          <Button
            variant="ghost"
            size="small"
            onClick={toggleMobileMenu}
            className="header__mobile-toggle"
            aria-label="Abrir menu"
          >
            <Icon name={isMobileMenuOpen ? 'close' : 'menu'} />
          </Button>
        </div>
      </div>
      
      {/* Menu mobile */}
      <div className={`header__mobile-menu ${isMobileMenuOpen ? 'header__mobile-menu--open' : ''}`}>
        <Navigation isMobile onClose={closeMobileMenu} />
        
        <div className="header__mobile-user">
          <div className="header__mobile-user-info">
            <Icon name="user" size="medium" color="primary" />
            <span>{user.nome}</span>
          </div>
          
          <Button 
            variant="ghost" 
            onClick={handleLogout}
            className="header__mobile-logout"
          >
            <Icon name="logout" size="small" />
            Sair
          </Button>
        </div>
      </div>
      
      {/* Overlay para fechar menu mobile */}
      {isMobileMenuOpen && (
        <div 
          className="header__overlay" 
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

export default Header;