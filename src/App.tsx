// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './pages'

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        <Route path="/login" element={<Login />} />
       
        <Route path="*" element={
          <div style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <h1 style={{ fontSize: '2rem', color: 'var(--color-text-primary)' }}>
              404 - Página não encontrada
            </h1>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              A página que você está procurando não existe.
            </p>
          </div>
        } />
      </Routes>
    </div>
  )
}

export default App