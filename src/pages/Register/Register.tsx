import { useState, type FormEvent } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts';
import { Button } from '../../components/atoms/Button';
import './Register.css';

export const Register = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated, isLoading: authLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    sexo: 'M' as 'M' | 'F' | 'Outro',
    nascimento: '',
    senha: '',
    confirmarSenha: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = 'Nome deve ter pelo menos 2 caracteres';
    }

    if (!formData.email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!formData.cpf) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(formData.cpf)) {
      newErrors.cpf = 'CPF inválido (formato: 000.000.000-00)';
    }

    if (!formData.nascimento) {
      newErrors.nascimento = 'Data de nascimento é obrigatória';
    } else {
      const hoje = new Date();
      const nascimento = new Date(formData.nascimento);
      const idade = hoje.getFullYear() - nascimento.getFullYear();
      if (idade < 16) {
        newErrors.nascimento = 'Você deve ter pelo menos 16 anos';
      }
    }

    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória';
    } else if (formData.senha.length < 6) {
      newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (!formData.confirmarSenha) {
      newErrors.confirmarSenha = 'Confirmação de senha é obrigatória';
    } else if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = 'As senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCPF = (value: string) => {
    const cpf = value.replace(/\D/g, '');
    return cpf
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      setErrors({});
      
      await register(formData);
      navigate('/dashboard');
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro no cadastro';
      setErrors({ general: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value;
    
    if (field === 'cpf') {
      formattedValue = formatCPF(value);
    }
    
    setFormData(prev => ({ ...prev, [field]: formattedValue }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (authLoading) {
    return (
      <div className="register-page">
        <div className="register-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Carregando...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <div className="register-logo">
              <div className="logo-icon">♻️</div>
              <h1>Recicla365</h1>
            </div>
            <p className="register-subtitle">Crie sua conta gratuitamente</p>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>
            {errors.general && (
              <div className="error-message error-message--general">
                {errors.general}
              </div>
            )}

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="nome" className="form-label">
                  Nome completo
                </label>
                <input
                  id="nome"
                  type="text"
                  className={`form-input ${errors.nome ? 'form-input--error' : ''}`}
                  placeholder="Seu nome completo"
                  value={formData.nome}
                  onChange={(e) => handleInputChange('nome', e.target.value)}
                  disabled={isSubmitting}
                  autoComplete="name"
                />
                {errors.nome && (
                  <span className="error-message">{errors.nome}</span>
                )}
              </div>
            </div>

            <div className="form-row">
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
            </div>

            <div className="form-row form-row--double">
              <div className="form-field">
                <label htmlFor="cpf" className="form-label">
                  CPF
                </label>
                <input
                  id="cpf"
                  type="text"
                  className={`form-input ${errors.cpf ? 'form-input--error' : ''}`}
                  placeholder="000.000.000-00"
                  value={formData.cpf}
                  onChange={(e) => handleInputChange('cpf', e.target.value)}
                  disabled={isSubmitting}
                  maxLength={14}
                />
                {errors.cpf && (
                  <span className="error-message">{errors.cpf}</span>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="sexo" className="form-label">
                  Sexo
                </label>
                <select
                  id="sexo"
                  className="form-input"
                  value={formData.sexo}
                  onChange={(e) => handleInputChange('sexo', e.target.value)}
                  disabled={isSubmitting}
                >
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="nascimento" className="form-label">
                  Data de nascimento
                </label>
                <input
                  id="nascimento"
                  type="date"
                  className={`form-input ${errors.nascimento ? 'form-input--error' : ''}`}
                  value={formData.nascimento}
                  onChange={(e) => handleInputChange('nascimento', e.target.value)}
                  disabled={isSubmitting}
                />
                {errors.nascimento && (
                  <span className="error-message">{errors.nascimento}</span>
                )}
              </div>
            </div>

            <div className="form-row form-row--double">
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
                  autoComplete="new-password"
                />
                {errors.senha && (
                  <span className="error-message">{errors.senha}</span>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="confirmarSenha" className="form-label">
                  Confirmar senha
                </label>
                <input
                  id="confirmarSenha"
                  type="password"
                  className={`form-input ${errors.confirmarSenha ? 'form-input--error' : ''}`}
                  placeholder="••••••••"
                  value={formData.confirmarSenha}
                  onChange={(e) => handleInputChange('confirmarSenha', e.target.value)}
                  disabled={isSubmitting}
                  autoComplete="new-password"
                />
                {errors.confirmarSenha && (
                  <span className="error-message">{errors.confirmarSenha}</span>
                )}
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Criando conta...' : 'Criar conta'}
            </Button>
          </form>

          <div className="register-footer">
            <p>
              Já tem uma conta?{' '}
              <Link to="/login" className="register-link">
                Fazer login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};