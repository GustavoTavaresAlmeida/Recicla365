import { useState, type FormEvent } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/atoms/Button';
import './Login.css';

export const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória';
    } else if (formData.senha.length < 6) {
      newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      setErrors({});
      
      await login(formData);
      navigate('/dashboard');
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro no login';
      setErrors({ general: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (authLoading) {
    return (
      <div className="login-page">
        <div className="login-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Carregando...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <div className="logo-icon">♻️</div>
              <h1>Recicla365</h1>
            </div>
            <p className="login-subtitle">Faça login para continuar</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {errors.general && (
              <div className="error-message error-message--general">
                {errors.general}
              </div>
            )}

            <div className="form-field">
              <label htmlFor="email" className="form-label">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={isSubmitting}
                autoComplete="email"
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="senha" className="form-label">
                Senha
              </label>
              <input
                id="senha"
                type="password"
                className={`form-input ${errors.senha ? 'form-input--error' : ''}`}
                placeholder="••••••••"
                value={formData.senha}
                onChange={(e) => handleInputChange('senha', e.target.value)}
                disabled={isSubmitting}
                autoComplete="current-password"
              />
              {errors.senha && (
                <span className="error-message">{errors.senha}</span>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="login-footer">
            <p>
              Não tem uma conta?{' '}
              <Link to="/register" className="login-link">
                Criar conta
              </Link>
            </p>
          </div>

          <div className="test-credentials">
            <h3>Credenciais para teste:</h3>
            <p><strong>E-mail:</strong> joao@email.com</p>
            <p><strong>Senha:</strong> senha123</p>
          </div>
        </div>
      </div>
    </div>
  );
};