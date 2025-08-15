import React from 'react';
import ThemeToggle from '../../atoms/ThemeToggle/ThemeToggle';
import './AuthTemplate.css';

interface AuthTemplateProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthTemplate: React.FC<AuthTemplateProps> = ({ children, title, subtitle }) => {
  return (
    <div className="auth-template">
      <div className="auth-container">
        <div className="auth-left">
          <div className="auth-content">
            <div className="auth-header">
              <h1>Welcome!</h1>
              <h2>{title}</h2>
              {subtitle && <p>{subtitle}</p>}
            </div>
            {children}
          </div>
        </div>
        <div className="auth-right">
          <div className="theme-toggle-wrapper">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthTemplate;