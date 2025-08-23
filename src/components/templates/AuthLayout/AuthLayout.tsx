import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../../atoms/Icon';
import { Text } from '../../atoms/Text/Index';
import type { ReactNode } from 'react';
import './AuthLayout.css';

export interface AuthLayoutProps {
 
  children: ReactNode;
  
  title?: string;
  
  subtitle?: string;
  
  backgroundImage?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title = 'Recicla365',
  subtitle = 'Sistema de Gerenciamento de Resíduos Sustentável',
  backgroundImage,
}) => {
  return (
    <div className="auth-layout">
      <div 
        className="auth-layout__side"
        style={{ 
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined 
        }}
      >
        <div className="auth-layout__brand">
          <Link to="/" className="auth-layout__logo">
            <Icon name="recycle" size="xl" color="inherit" />
            <Text variant="h3" weight="bold" color="inherit">
              {title}
            </Text>
          </Link>
          
          <Text variant="subtitle1" color="inherit" align="center">
            {subtitle}
          </Text>
          
          <div className="auth-layout__features">
            <div className="auth-layout__feature">
              <Icon name="recycle" size="md" color="inherit" />
              <Text variant="body2" color="inherit">
                Gerencie pontos de coleta
              </Text>
            </div>
            
            <div className="auth-layout__feature">
              <Icon name="location" size="md" color="inherit" />
              <Text variant="body2" color="inherit">
                Encontre locais próximos
              </Text>
            </div>
            
            <div className="auth-layout__feature">
              <Icon name="dashboard" size="md" color="inherit" />
              <Text variant="body2" color="inherit">
                Acompanhe estatísticas
              </Text>
            </div>
          </div>
        </div>
        
        <div className="auth-layout__overlay" />
      </div>

      <div className="auth-layout__content">
        <div className="auth-layout__form-container">
          {children}
        </div>
        
        <footer className="auth-layout__footer">
          <Text variant="caption" color="tertiary" align="center">
            &copy; 2024 Recicla365 - Todos os direitos reservados
          </Text>
        </footer>
      </div>
    </div>
  );
};