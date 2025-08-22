import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';

import './styles/global/global.css';

function App() {
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
              
              <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-md mt-lg">
                <div className="feature-card">
                  <h3>🌱 Sustentabilidade</h3>
                  <p>Promova a reciclagem e contribua para um planeta mais sustentável.</p>
                </div>
                
                <div className="feature-card">
                  <h3>📍 Pontos de Coleta</h3>
                  <p>Encontre e cadastre pontos de coleta próximos a você.</p>
                </div>
                
                <div className="feature-card">
                  <h3>📊 Dashboard</h3>
                  <p>Visualize estatísticas e acompanhe o progresso da reciclagem.</p>
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