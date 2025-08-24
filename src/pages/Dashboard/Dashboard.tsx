// src/pages/Dashboard/Dashboard.tsx
import { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../../components/atoms/Button';
import { mockDashboardData, mockCollectionPoints } from '../../data';
import type { DashboardData } from '../../data';
import './Dashboard.css';

export const Dashboard = () => {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (user) {
        setIsLoadingData(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const userPoints = mockCollectionPoints.filter(point => point.usuarioId === user.id);
        
        const data: DashboardData = {
          ...mockDashboardData,
          userPoints,
          stats: {
            ...mockDashboardData.stats,
            totalPontosColeta: mockCollectionPoints.length,
          }
        };
        
        setDashboardData(data);
        setIsLoadingData(false);
      }
    };

    loadDashboardData();
  }, [user]);

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Carregando dashboard...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    logout();
  };

  const userPointsCount = dashboardData?.userPoints.length || 0;
  const totalPoints = dashboardData?.stats.totalPontosColeta || 0;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-header__content">
          <div className="dashboard-logo">
            <span className="logo-icon">♻️</span>
            <h1>Recicla365</h1>
          </div>
          
          <div className="dashboard-actions">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
            >
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-container">
          <section className="welcome-section">
            <div className="welcome-content">
              <h2>Bem-vindo, {user?.nome}!</h2>
              <p>Gerencie seus pontos de coleta e contribua para um mundo mais sustentável.</p>
            </div>
            
            <div className="welcome-stats">
              <div className="stat-card">
                <div className="stat-icon">📍</div>
                <div className="stat-content">
                  <span className="stat-number">{isLoadingData ? '...' : userPointsCount}</span>
                  <span className="stat-label">Pontos Cadastrados</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">🌍</div>
                <div className="stat-content">
                  <span className="stat-number">{isLoadingData ? '...' : totalPoints}</span>
                  <span className="stat-label">Total na Plataforma</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">♻️</div>
                <div className="stat-content">
                  <span className="stat-number">5</span>
                  <span className="stat-label">Tipos de Resíduos</span>
                </div>
              </div>
            </div>
          </section>

          <section className="quick-actions">
            <h3>Ações Rápidas</h3>
            <div className="action-cards">
              <div className="action-card">
                <div className="action-icon">➕</div>
                <h4>Cadastrar Ponto</h4>
                <p>Adicione um novo ponto de coleta em sua região</p>
                <Link to="/pontos-coleta">
                  <Button variant="primary" size="sm" fullWidth>
                    Cadastrar
                  </Button>
                </Link>
              </div>
              
              <div className="action-card">
                <div className="action-icon">🗺️</div>
                <h4>Ver Mapa</h4>
                <p>Visualize todos os pontos de coleta no mapa</p>
                <Button variant="secondary" size="sm" fullWidth>
                  Em Breve
                </Button>
              </div>
              
              <div className="action-card">
                <div className="action-icon">📋</div>
                <h4>Meus Pontos</h4>
                <p>Gerencie os pontos de coleta que você cadastrou</p>
                <Link to="/pontos-coleta">
                  <Button variant="outline" size="sm" fullWidth>
                    Ver Lista
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Mostrar pontos do usuário se houver */}
          {dashboardData?.userPoints && dashboardData.userPoints.length > 0 && (
            <section className="user-points">
              <h3>Seus Pontos de Coleta</h3>
              <div className="points-grid">
                {dashboardData.userPoints.map((point) => (
                  <div key={point.id} className="point-card">
                    <h4>{point.nome}</h4>
                    <p>{point.descricao}</p>
                    <div className="point-location">
                      📍 {point.endereco.cidade}, {point.endereco.estado}
                    </div>
                    <div className="point-types">
                      {point.tiposResiduos.map((tipo, index) => (
                        <span key={index} className={`waste-tag waste-tag--${tipo.toLowerCase()}`}>
                          {tipo}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="recent-activity">
            <h3>Atividade Recente</h3>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">🎉</div>
                <div className="activity-content">
                  <h4>Conta criada com sucesso!</h4>
                  <p>Sua conta foi criada e você já pode começar a cadastrar pontos de coleta.</p>
                  <span className="activity-time">Bem-vindo!</span>
                </div>
              </div>
              
              {userPointsCount > 0 && (
                <div className="activity-item">
                  <div className="activity-icon">📍</div>
                  <div className="activity-content">
                    <h4>Pontos cadastrados</h4>
                    <p>Você possui {userPointsCount} ponto{userPointsCount !== 1 ? 's' : ''} de coleta cadastrado{userPointsCount !== 1 ? 's' : ''}.</p>
                    <span className="activity-time">Parabéns!</span>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="waste-types">
            <h3>Tipos de Resíduos Aceitos</h3>
            <div className="waste-grid">
              <div className="waste-item waste-item--paper">
                <div className="waste-icon">📄</div>
                <span>Papel</span>
              </div>
              
              <div className="waste-item waste-item--plastic">
                <div className="waste-icon">🥤</div>
                <span>Plástico</span>
              </div>
              
              <div className="waste-item waste-item--glass">
                <div className="waste-icon">🍼</div>
                <span>Vidro</span>
              </div>
              
              <div className="waste-item waste-item--metal">
                <div className="waste-icon">🥫</div>
                <span>Metal</span>
              </div>
              
              <div className="waste-item waste-item--organic">
                <div className="waste-icon">🍃</div>
                <span>Orgânico</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};