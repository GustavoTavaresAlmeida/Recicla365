import React from 'react';
import Map from '../Map/Map.tsx';
import StatesGrid from '../StatesGrid/StatesGrid.tsx';
import './Dashboard.css';

interface DashboardStats {
  totalPoints: number;
  totalStates: number;
  mostCommonMaterial: string;
}

interface DashboardProps {
  collectionPoints: any[];
  statesData: Array<{ state: string; count: number }>;
  stats: DashboardStats;
  loading?: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  collectionPoints, 
  statesData, 
  stats,
  loading = false 
}) => {
  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard__loading">
          <p>Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1>Dashboard</h1>
        <p>Visão geral dos pontos de coleta</p>
      </div>

      <div className="dashboard__stats">
        <div className="dashboard__stat-card">
          <h3>{stats.totalPoints}</h3>
          <p>Pontos de coleta</p>
        </div>
        <div className="dashboard__stat-card">
          <h3>{stats.totalStates}</h3>
          <p>Estados atendidos</p>
        </div>
        <div className="dashboard__stat-card">
          <h3>{stats.mostCommonMaterial}</h3>
          <p>Material mais comum</p>
        </div>
      </div>
      
      <div className="dashboard__content">
        <div className="dashboard__map-section">
          <Map collectionPoints={collectionPoints} />
        </div>
        
        <div className="dashboard__states-section">
          <StatesGrid statesData={statesData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;