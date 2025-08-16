import React, { useState } from 'react';
import Input from '../../atoms/Input/Input';
import Button from '../../atoms/Button/Button';
import './CollectionPointForm.css';

interface CollectionPointFormData {
  nome: string;
  descricao: string;
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
  numero: string;
  tiposMaterial: string[];
}

interface CollectionPointFormProps {
  onSubmit: (data: CollectionPointFormData) => void;
  onCancel: () => void;
  initialData?: CollectionPointFormData | null;
  loading?: boolean;
}

interface FormErrors {
  nome?: string;
  cep?: string;
  logradouro?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  numero?: string;
  tiposMaterial?: string;
}

const CollectionPointForm: React.FC<CollectionPointFormProps> = ({ 
  onSubmit, 
  onCancel,
  initialData = null, 
  loading = false 
}) => {
  const [formData, setFormData] = useState<CollectionPointFormData>(initialData || {
    nome: '',
    descricao: '',
    cep: '',
    logradouro: '',
    bairro: '',
    cidade: '',
    estado: '',
    numero: '',
    tiposMaterial: []
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const materialTypes = ['Vidro', 'Papel', 'Plástico', 'Metal', 'Orgânico'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleMaterialChange = (material: string) => {
    setFormData(prev => ({
      ...prev,
      tiposMaterial: prev.tiposMaterial.includes(material)
        ? prev.tiposMaterial.filter(m => m !== material)
        : [...prev.tiposMaterial, material]
    }));
    
    if (errors.tiposMaterial) {
      setErrors(prev => ({
        ...prev,
        tiposMaterial: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome do ponto é obrigatório';
    }

    if (!formData.cep.trim()) {
      newErrors.cep = 'CEP é obrigatório';
    } else if (!/^\d{5}-?\d{3}$/.test(formData.cep)) {
      newErrors.cep = 'CEP deve estar no formato 00000-000';
    }

    if (!formData.logradouro.trim()) {
      newErrors.logradouro = 'Logradouro é obrigatório';
    }

    if (!formData.bairro.trim()) {
      newErrors.bairro = 'Bairro é obrigatório';
    }

    if (!formData.cidade.trim()) {
      newErrors.cidade = 'Cidade é obrigatória';
    }

    if (!formData.estado.trim()) {
      newErrors.estado = 'Estado é obrigatório';
    }

    if (!formData.numero.trim()) {
      newErrors.numero = 'Número é obrigatório';
    }

    if (formData.tiposMaterial.length === 0) {
      newErrors.tiposMaterial = 'Selecione pelo menos um tipo de material';
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
    <form className="collection-point-form" onSubmit={handleSubmit}>
      <div className="collection-point-form__section">
        <h3 className="collection-point-form__section-title">
          Informações Básicas
        </h3>
        
        <Input
          label="Nome do Ponto"
          name="nome"
          placeholder="Digite o nome do ponto de coleta"
          value={formData.nome}
          onChange={handleChange}
          error={errors.nome}
          required
        />

        <div className="collection-point-form__group">
          <label className="input-label">Descrição</label>
          <textarea
            name="descricao"
            className="input textarea"
            placeholder="Descrição do ponto de coleta (opcional)"
            value={formData.descricao}
            onChange={handleChange}
            rows={3}
          />
        </div>
      </div>

      <div className="collection-point-form__section">
        <h3 className="collection-point-form__section-title">
          Tipos de Material
        </h3>
        
        <div className="collection-point-form__group">
          <div className="material-checkboxes">
            {materialTypes.map(material => (
              <label key={material} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.tiposMaterial.includes(material)}
                  onChange={() => handleMaterialChange(material)}
                  className="checkbox-input"
                />
                <span className="checkbox-custom"></span>
                {material}
              </label>
            ))}
          </div>
          {errors.tiposMaterial && (
            <span className="input-error">{errors.tiposMaterial}</span>
          )}
        </div>
      </div>

      <div className="collection-point-form__section">
        <h3 className="collection-point-form__section-title">
          Endereço
        </h3>
        
        <div className="collection-point-form__row">
          <div className="collection-point-form__col">
            <Input
              label="CEP"
              name="cep"
              placeholder="00000-000"
              value={formData.cep}
              onChange={handleChange}
              error={errors.cep}
              required
            />
          </div>
          <div className="collection-point-form__col">
            <Input
              label="Logradouro"
              name="logradouro"
              placeholder="Rua, Avenida..."
              value={formData.logradouro}
              onChange={handleChange}
              error={errors.logradouro}
              required
            />
          </div>
          <div className="collection-point-form__col-small">
            <Input
              label="Número"
              name="numero"
              placeholder="123"
              value={formData.numero}
              onChange={handleChange}
              error={errors.numero}
              required
            />
          </div>
        </div>

        <div className="collection-point-form__row">
          <div className="collection-point-form__col">
            <Input
              label="Bairro"
              name="bairro"
              placeholder="Nome do bairro"
              value={formData.bairro}
              onChange={handleChange}
              error={errors.bairro}
              required
            />
          </div>
          <div className="collection-point-form__col">
            <Input
              label="Cidade"
              name="cidade"
              placeholder="Nome da cidade"
              value={formData.cidade}
              onChange={handleChange}
              error={errors.cidade}
              required
            />
          </div>
          <div className="collection-point-form__col">
            <Input
              label="Estado"
              name="estado"
              placeholder="UF"
              value={formData.estado}
              onChange={handleChange}
              error={errors.estado}
              required
            />
          </div>
        </div>
      </div>

      <div className="collection-point-form__actions">
        <Button 
          type="button" 
          variant="secondary" 
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button 
          type="submit" 
          variant="primary" 
          disabled={loading}
          loading={loading}
        >
          Salvar Ponto de Coleta
        </Button>
      </div>
    </form>
  );
};

export default CollectionPointForm;