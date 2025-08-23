import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../atoms/Button';
import { Text } from '../../atoms/Text/Index';
import { FormField } from '../../molecules/FormField';
import { Card } from '../../molecules/Card';
import type { LoginCredentials } from '../../../types';
import './LoginForm.css';

export interface LoginFormProps {
  
  onSubmit: (credentials: LoginCredentials) => Promise<void>;
  
  loading?: boolean;
  
  error?: string;
  
  redirectAfterLogin?: boolean;
}

interface FormErrors {
  email?: string;
  senha?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  loading = false,
  error,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  redirectAfterLogin = true,
}) => {
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    senha: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória';
    } else if (formData.senha.length < 6) {
      newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof LoginCredentials) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      //
    }
  };

  return (
    <div className="login-form">
      <Card variant="elevated">
        <form onSubmit={handleSubmit} className="login-form__form">
          <div className="login-form__header">
            <Text variant="h4" weight="bold" align="center">
              Entrar
            </Text>
            <Text variant="body2" color="secondary" align="center">
              Acesse sua conta no Recicla365
            </Text>
          </div>

          {error && (
            <div className="login-form__error">
              <Text variant="body2" color="error">
                {error}
              </Text>
            </div>
          )}

          <div className="login-form__fields">
            <FormField
              id="email"
              label="Email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleInputChange('email')}
              errorMessage={errors.email}
              required
              disabled={loading}
            />

            <FormField
              id="senha"
              label="Senha"
              type="password"
              placeholder="Digite sua senha"
              value={formData.senha}
              onChange={handleInputChange('senha')}
              errorMessage={errors.senha}
              required
              disabled={loading}
            />
          </div>

          <div className="login-form__actions">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>

            <div className="login-form__links">
              <Link to="/forgot-password" className="login-form__link">
                <Text variant="body2" color="primary">
                  Esqueci minha senha
                </Text>
              </Link>
            </div>
          </div>

          <div className="login-form__register">
            <Text variant="body2" color="secondary" align="center">
              Não tem uma conta?{' '}
              <Link to="/register" className="login-form__link">
                <Text variant="body2" color="primary" as="span">
                  Cadastre-se
                </Text>
              </Link>
            </Text>
          </div>
        </form>
      </Card>
    </div>
  );
};