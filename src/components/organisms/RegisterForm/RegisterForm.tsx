import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../atoms/Button';
import { Text } from '../../atoms/Text/Index';
import { FormField } from '../../molecules/FormField';
import { Card } from '../../molecules/Card';
import type { RegisterData } from '../../../types';
import './RegisterForm.css';

export interface RegisterFormProps {
  /**
   * Função chamada ao submeter o formulário
   */
  onSubmit: (data: RegisterData) => Promise<void>;
  
  /**
   * Se verdadeiro, formulário está em loading
   */
  loading?: boolean;
  
  /**
   * Mensagem de erro geral
   */
  error?: string;
}

interface FormErrors {
  nome?: string;
  email?: string;
  cpf?: string;
  sexo?: string;
  nascimento?: string;
  senha?: string;
  confirmarSenha?: string;
}

/**
 * Componente RegisterForm (Organismo)
 * 
 * Formulário completo de cadastro com validação e tratamento de erros.
 */
export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  loading = false,
  error,
}) => {
  const [formData, setFormData] = useState<RegisterData>({
    nome: '',
    email: '',
    cpf: '',
    sexo: 'M',
    nascimento: '',
    senha: '',
    confirmarSenha: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const validateCPF = (cpf: string): boolean => {
    const cleanCPF = cpf.replace(/\D/g, '');
    if (cleanCPF.length !== 11) return false;
    
    // Verificação básica de CPF
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false;
    
    return true;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.cpf.trim()) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (!validateCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido';
    }

    if (!formData.nascimento) {
      newErrors.nascimento = 'Data de nascimento é obrigatória';
    }

    if (!formData.senha) {
      newErrors.senha = 'Senha é obrigatória';
    } else if (formData.senha.length < 6) {
      newErrors.senha = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (!formData.confirmarSenha) {
      newErrors.confirmarSenha = 'Confirmação de senha é obrigatória';
    } else if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = 'Senhas não coincidem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof RegisterData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let value = event.target.value;

    // Formatação do CPF
    if (field === 'cpf') {
      value = value.replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
    }

    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Limpar erro do campo quando usuário começar a digitar
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
      // Erro será tratado pelo componente pai
    }
  };

  return (
    <div className="register-form">
      <Card variant="elevated">
        <form onSubmit={handleSubmit} className="register-form__form">
          <div className="register-form__header">
            <Text variant="h4" weight="bold" align="center">
              Criar Conta
            </Text>
            <Text variant="body2" color="secondary" align="center">
              Cadastre-se no Recicla365
            </Text>
          </div>

          {error && (
            <div className="register-form__error">
              <Text variant="body2" color="error">
                {error}
              </Text>
            </div>
          )}

          <div className="register-form__fields">
            <FormField
              id="nome"
              label="Nome Completo"
              type="text"
              placeholder="Seu nome completo"
              value={formData.nome}
              onChange={handleInputChange('nome')}
              errorMessage={errors.nome}
              required
              disabled={loading}
            />

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
              id="cpf"
              label="CPF"
              type="text"
              placeholder="000.000.000-00"
              value={formData.cpf}
              onChange={handleInputChange('cpf')}
              errorMessage={errors.cpf}
              maxLength={14}
              required
              disabled={loading}
            />

            <div className="register-form__row">
              <div className="register-form__field">
                <label htmlFor="sexo" className="register-form__label">
                  Sexo *
                </label>
                <select
                  id="sexo"
                  value={formData.sexo}
                  onChange={handleInputChange('sexo')}
                  className="register-form__select"
                  disabled={loading}
                >
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              <FormField
                id="nascimento"
                label="Data de Nascimento"
                type="date"
                value={formData.nascimento}
                onChange={handleInputChange('nascimento')}
                errorMessage={errors.nascimento}
                required
                disabled={loading}
              />
            </div>

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

            <FormField
              id="confirmarSenha"
              label="Confirmar Senha"
              type="password"
              placeholder="Confirme sua senha"
              value={formData.confirmarSenha}
              onChange={handleInputChange('confirmarSenha')}
              errorMessage={errors.confirmarSenha}
              required
              disabled={loading}
            />
          </div>

          <div className="register-form__actions">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              disabled={loading}
            >
              {loading ? 'Criando conta...' : 'Criar Conta'}
            </Button>
          </div>

          <div className="register-form__login">
            <Text variant="body2" color="secondary" align="center">
              Já tem uma conta?{' '}
              <Link to="/login" className="register-form__link">
                <Text variant="body2" color="primary" as="span">
                  Entrar
                </Text>
              </Link>
            </Text>
          </div>
        </form>
      </Card>
    </div>
  );
};