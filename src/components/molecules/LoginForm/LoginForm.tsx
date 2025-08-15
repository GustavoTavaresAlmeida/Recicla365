import React, { useState } from 'react';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
import './LoginForm.css';

interface LoginFormData {
  email: string;
  senha: string;
}

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  loading?: boolean;
  error?: string | null;
}

interface FormErrors {
  email?: string;
  senha?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onSubmit, 
  loading = false, 
  error = null 
}) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    senha: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro quando usuário começar a digitar
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {error && (
        <div className="login-form__error">
          {error}
        </div>
      )}
      
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="Digite seu email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />
      
      <Input
        label="Senha"
        type="password"
        name="senha"
        placeholder="Digite sua senha"
        value={formData.senha}
        onChange={handleChange}
        error={errors.senha}
        required
      />

      <Button 
        type="submit" 
        variant="primary" 
        size="large"
        disabled={loading}
        loading={loading}
        className="login-form__submit"
      >
        Entrar
      </Button>
    </form>
  );
};

export default LoginForm;