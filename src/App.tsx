import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { Button } from './components/atoms/Button';

import './styles/global/global.css';

function App() {
  const handleClick = () => {
    alert('Botão clicado!');
  };

  return (
    <ThemeProvider>
      <Router>
        <ThemeToggle />
        <div className="App">
          <header className="app-header">
            <h1>Recicla365</h1>
            <p>Sistema de Gerenciamento de Resíduos Sustentável</p>
          </header>
          
          <main className="container">
            <div className="welcome-section">
              <h2>Bem-vindo ao Recicla365!</h2>
              <p>
                Uma plataforma que facilita o gerenciamento de resíduos e o acesso a pontos 
                de coleta de materiais recicláveis. Cadastre novos pontos de coleta, 
                visualize informações sobre os materiais aceitos em cada ponto e registre 
                suas próprias contribuições para a reciclagem.
              </p>

              <div style={{ 
                marginTop: 'var(--spacing-4xl)', 
                padding: 'var(--spacing-2xl)', 
                backgroundColor: 'var(--bg-secondary)', 
                borderRadius: 'var(--border-radius-xl)',
                border: '1px solid var(--border-primary)'
              }}>
                <h3 style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--text-primary)' }}>
                  🧪 Teste do Componente Button
                </h3>
                
                <div className="grid" style={{ 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: 'var(--spacing-lg)' 
                }}>
                  <div>
                    <h4 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--text-secondary)' }}>
                      Variantes
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                      <Button variant="primary" onClick={handleClick}>
                        Primary
                      </Button>
                      <Button variant="secondary" onClick={handleClick}>
                        Secondary
                      </Button>
                      <Button variant="outline" onClick={handleClick}>
                        Outline
                      </Button>
                      <Button variant="ghost" onClick={handleClick}>
                        Ghost
                      </Button>
                      <Button variant="danger" onClick={handleClick}>
                        Danger
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--text-secondary)' }}>
                      Tamanhos
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                      <Button variant="primary" size="sm" onClick={handleClick}>
                        Small
                      </Button>
                      <Button variant="primary" size="md" onClick={handleClick}>
                        Medium
                      </Button>
                      <Button variant="primary" size="lg" onClick={handleClick}>
                        Large
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--text-secondary)' }}>
                      Estados
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                      <Button variant="primary" loading onClick={handleClick}>
                        Carregando...
                      </Button>
                      <Button variant="primary" disabled onClick={handleClick}>
                        Desabilitado
                      </Button>
                      <Button variant="primary" fullWidth onClick={handleClick}>
                        Largura Total
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--text-secondary)' }}>
                      Com Ícones
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                      <Button 
                        variant="primary" 
                        startIcon={<span>📁</span>}
                        onClick={handleClick}
                      >
                        Abrir
                      </Button>
                      <Button 
                        variant="secondary" 
                        endIcon={<span>💾</span>}
                        onClick={handleClick}
                      >
                        Salvar
                      </Button>
                      <Button 
                        variant="outline" 
                        startIcon={<span>🔍</span>}
                        endIcon={<span>🔍</span>}
                        onClick={handleClick}
                      >
                        Buscar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-md mt-lg">
                <div className="feature-card">
                  <h3>🌱 Sustentabilidade</h3>
                  <p>Promova a reciclagem e contribua para um planeta mais sustentável.</p>
                  <div style={{ marginTop: 'var(--spacing-md)' }}>
                    <Button variant="secondary" size="sm" fullWidth>
                      Saiba Mais
                    </Button>
                  </div>
                </div>
                
                <div className="feature-card">
                  <h3>📍 Pontos de Coleta</h3>
                  <p>Encontre e cadastre pontos de coleta próximos a você.</p>
                  <div style={{ marginTop: 'var(--spacing-md)' }}>
                    <Button variant="outline" size="sm" fullWidth>
                      Localizar
                    </Button>
                  </div>
                </div>
                
                <div className="feature-card">
                  <h3>📊 Dashboard</h3>
                  <p>Visualize estatísticas e acompanhe o progresso da reciclagem.</p>
                  <div style={{ marginTop: 'var(--spacing-md)' }}>
                    <Button variant="primary" size="sm" fullWidth>
                      Acessar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </main>
          
          <footer className="app-footer">
            <p>&copy; 2024 Recicla365 - Todos os direitos reservados</p>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;