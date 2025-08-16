import React, { useState } from 'react';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
import './RegisterForm.css';

interface RegisterFormData {
  nome: string;
  sexo: string;
  cpf: string;
  nascimento: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
  loading?: boolean;
  error?: string | null;
}

interface FormErrors {
  nome?: string;
  sexo?: string;
  cpf?: string;
  nascimento?: string;
  email?: string;
  senha?: string;
  confirmarSenha?: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ 
  onSubmit, 
  loading = false, 
  error = null 
}) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    nome: '',
    sexo: '',
    cpf: '',
    nascimento: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (!formData.sexo) {
      newErrors.sexo = 'Sexo é obrigatório';
    }

    if (!formData.cpf) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(formData.cpf)) {
      newErrors.cpf = 'CPF deve estar no formato 000.000.000-00';
    }

    if (!formData.nascimento) {
      newErrors.nascimento = 'Data de nascimento é obrigatória';
    }

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

    if (!formData.confirmarSenha) {
      newErrors.confirmarSenha = 'Confirmação de senha é obrigatória';
    } else if (formData.senha !== formData.confirmarSenha) {
      newErrors.confirmarSenha = 'Senhas não coincidem';
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
    <form className="register-form" onSubmit={handleSubmit}>
      {error && (
        <div className="register-form__error">
          {error}
        </div>
      )}
      
      <Input
        label="Nome Completo"
        name="nome"
        placeholder="Digite seu nome completo"
        value={formData.nome}
        onChange={handleChange}
        error={errors.nome}
        required
      />

      <div className="register-form__row">
        <div className="register-form__col">
          <label className="input-label">
            Sexo <span className="required">*</span>
          </label>
          <select 
            name="sexo" 
            value={formData.sexo} 
            onChange={handleChange}
            className={`input ${errors.sexo ? 'input--error' : ''}`}
            required
          >
            <option value="">Selecione</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
            <option value="O">Outro</option>
          </select>
          {errors.sexo && <span className="input-error">{errors.sexo}</span>}
        </div>
        
        <div className="register-form__col">
          <Input
            label="CPF"
            name="cpf"
            placeholder="000.000.000-00"
            value={formData.cpf}
            onChange={handleChange}
            error={errors.cpf}
            required
          />
        </div>
      </div>

      <Input
        label="Data de Nascimento"
        type="date"
        name="nascimento"
        value={formData.nascimento}
        onChange={handleChange}
        error={errors.nascimento}
        required
      />

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

      <Input
        label="Confirmar Senha"
        type="password"
        name="confirmarSenha"
        placeholder="Confirme sua senha"
        value={formData.confirmarSenha}
        onChange={handleChange}
        error={errors.confirmarSenha}
        required
      />

      <Button 
        type="submit" 
        variant="primary" 
        size="large"
        disabled={loading}
        loading={loading}
        className="register-form__submit"
      >
        Cadastrar
      </Button>
    </form>
  );
};

export default RegisterForm;