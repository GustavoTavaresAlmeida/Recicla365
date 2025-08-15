import React from 'react';
import Header from '../../organisms/Header/Header.tsx';
import './DashboardTemplate.css';

interface User {
  id: string;
  nome: string;
  email: string;
}

interface DashboardTemplateProps {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
}

const DashboardTemplate: React.FC<DashboardTemplateProps> = ({ 
  children, 
  user, 
  onLogout 
}) => {
  return (
    <div className="dashboard-template">
      <Header user={user} onLogout={onLogout} />
      <main className="main-content">
        <div className="content-container">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardTemplate;