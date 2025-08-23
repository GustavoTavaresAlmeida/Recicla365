import React from 'react';
import { Header } from '../../organisms/Header';
import { Footer } from '../../organisms/Footer';
import type { ReactNode } from 'react';
import './DashboardLayout.css';

export interface DashboardLayoutProps {
 
  children: ReactNode;
  
  showSidebar?: boolean;
  
  pageTitle?: string;
  
  breadcrumbs?: Array<{
    label: string;
    href?: string;
  }>;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children,
  showSidebar = false,
  pageTitle,
  breadcrumbs = []
}) => {
  const navigationItems = [
    { label: 'Dashboard', href: '/dashboard', icon: 'dashboard', active: window.location.pathname === '/dashboard' },
    { label: 'Pontos de Coleta', href: '/collection-points', icon: 'location', active: window.location.pathname === '/collection-points' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  return (
    <div className="dashboard-layout">
      <Header 
        isAuthenticated={true}
        userName={user?.name || 'Usuário'}
        onLogout={handleLogout}
        navigationItems={navigationItems}
      />
      
      <div className="dashboard-layout__body">
        {showSidebar && (
          <aside className="dashboard-layout__sidebar">
            <nav className="dashboard-layout__nav">
              <h3 className="dashboard-layout__nav-title">Menu</h3>
              <ul className="dashboard-layout__nav-list">
                {navigationItems.map((item) => (
                  <li key={item.href} className="dashboard-layout__nav-item">
                    <a 
                      href={item.href}
                      className={`dashboard-layout__nav-link ${
                        item.active ? 'dashboard-layout__nav-link--active' : ''
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}
        
        <main className="dashboard-layout__main">
          {(pageTitle || breadcrumbs.length > 0) && (
            <div className="dashboard-layout__header">
              <div className="container">
                {breadcrumbs.length > 0 && (
                  <nav className="dashboard-layout__breadcrumbs">
                    {breadcrumbs.map((crumb, index) => (
                      <span key={index} className="dashboard-layout__breadcrumb">
                        {crumb.href ? (
                          <a href={crumb.href}>{crumb.label}</a>
                        ) : (
                          crumb.label
                        )}
                        {index < breadcrumbs.length - 1 && ' / '}
                      </span>
                    ))}
                  </nav>
                )}
                
                {pageTitle && (
                  <h1 className="dashboard-layout__page-title">
                    {pageTitle}
                  </h1>
                )}
              </div>
            </div>
          )}
          
          <div className="dashboard-layout__content">
            <div className="container">
              {children}
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};