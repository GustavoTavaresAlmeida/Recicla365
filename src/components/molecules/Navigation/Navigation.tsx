import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../atoms/Icon/Icon';
import './Navigation.css';

interface NavigationProps {
  isMobile?: boolean;
  onClose?: () => void;
}

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

const Navigation: React.FC<NavigationProps> = ({ isMobile = false, onClose }) => {
  const location = useLocation();

  const isActive = (path: string): boolean => location.pathname === path;

  const navItems: NavItem[] = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: 'dashboard'
    },
    {
      path: '/locais',
      label: 'Locais',
      icon: 'location'
    }
  ];

  const handleLinkClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <nav className={`navigation ${isMobile ? 'navigation--mobile' : ''}`}>
      {navItems.map(item => (
        <Link 
          key={item.path}
          to={item.path} 
          className={`nav-link ${isActive(item.path) ? 'nav-link--active' : ''}`}
          onClick={handleLinkClick}
        >
          <Icon name={item.icon as any} size="small" />
          <span className="nav-link__text">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;