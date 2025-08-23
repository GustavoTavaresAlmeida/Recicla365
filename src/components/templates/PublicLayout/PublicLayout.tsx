import React from 'react';
import { Header } from '../../organisms/Header';
import { Footer } from '../../organisms/Footer';
import type { ReactNode } from 'react';
import './PublicLayout.css';

export interface PublicLayoutProps {
 
  children: ReactNode;
  
  showHero?: boolean;
  
  heroTitle?: string;
  
  heroSubtitle?: string;
  
  className?: string;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ 
  children,
  showHero = false,
  heroTitle,
  heroSubtitle,
  className = ''
}) => {
  const navigationItems = [
    { label: 'Início', href: '/', active: window.location.pathname === '/' },
    { label: 'Sobre', href: '/about', active: window.location.pathname === '/about' },
    { label: 'Contato', href: '/contact', active: window.location.pathname === '/contact' },
  ];

  return (
    <div className={`public-layout ${className}`}>
      <Header 
        isAuthenticated={false}
        navigationItems={navigationItems}
      />
      
      {showHero && (heroTitle || heroSubtitle) && (
        <section className="public-layout__hero">
          <div className="container">
            <div className="public-layout__hero-content">
              {heroTitle && (
                <h1 className="public-layout__hero-title">
                  {heroTitle}
                </h1>
              )}
              {heroSubtitle && (
                <p className="public-layout__hero-subtitle">
                  {heroSubtitle}
                </p>
              )}
            </div>
          </div>
        </section>
      )}
      
      <main className="public-layout__main">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};