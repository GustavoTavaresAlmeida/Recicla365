import React, { useState } from 'react';
import { Button } from '../../atoms/Button';
import { Text } from '../../atoms/Text/Index';
import { Icon } from '../../atoms/Icon';
import { FormField } from '../../molecules/FormField';
import { Card } from '../../molecules/Card';
import type { CollectionPointData, Address, WasteType } from '../../../types';
import { wasteTypes, brazilianStates, fetchCEP } from '../../../data/mockData';
import './CollectionPointForm.css';

export interface CollectionPointFormProps {
  /**
   * Dados iniciais do ponto de coleta (para edição)
   */
  initialData?: Partial<CollectionPointData>;
  
  /**
   * Função chamada ao submeter o formulário
   */
  onSubmit: (data: CollectionPointData) => Promise<void>;
  
  /**
   * Função chamada ao cancelar
   */
  onCancel?: () => void;
  
  /**
   * Se verdadeiro, formulário está em loading
   */
  loading?: boolean;
  
  /**
   * Mensagem de erro geral
   */
  error?: string;
  
  /**
   * Modo do formulário
   */
  mode?: 'create' | 'edit';
}

interface FormErrors {
  nome?: string;
  descricao?: string;
  cep?: string;
  logradouro?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  tiposResiduos?: string;
}

/**
 * Componente CollectionPointForm (Organismo)
 * 
 * Formulário completo para cadastro/edição de pontos de coleta.
 * Inclui validação de CEP, seleção múltipla de tipos de resíduos e geolocalização.
 */
export const CollectionPointForm: React.FC<CollectionPointFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
  error,
  mode = 'create',
}) => {
  const [formData, setFormData] = useState<CollectionPointData>({
    nome: initialData?.nome || '',
    descricao: initialData?.descricao || '',
    endereco: {
      cep: initialData?.endereco?.cep || '',
      logradouro: initialData?.endereco?.logradouro || '',
      bairro: initialData?.endereco?.bairro || '',
      cidade: initialData?.endereco?.cidade || '',
      estado: initialData?.endereco?.estado || '',
      numero: initialData?.endereco?.numero || '',
      latitude: initialData?.endereco?.latitude,
      longitude: initialData?.endereco?.longitude,
    },
    tiposResiduos: initialData?.tiposResiduos || [],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loadingCEP, setLoadingCEP] = useState(false);
  const [cepMessage, setCepMessage] = useState('');

  // Validação do formulário
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome do ponto é obrigatório';
    }

    if (!formData.descricao.trim()) {
      newErrors.descricao = 'Descrição é obrigatória';
    }

    if (!formData.endereco.cep.trim()) {
      newErrors.cep = 'CEP é obrigatório';
    } else if (!/^\d{5}-?\d{3}$/.test(formData.endereco.cep.replace(/\D/g, ''))) {
      newErrors.cep = 'CEP inválido';
    }

    if (!formData.endereco.logradouro.trim()) {
      newErrors.logradouro = 'Logradouro é obrigatório';
    }

    if (!formData.endereco.numero.trim()) {
      newErrors.numero = 'Número é obrigatório';
    }

    if (!formData.endereco.bairro.trim()) {
      newErrors.bairro = 'Bairro é obrigatório';
    }

    if (!formData.endereco.cidade.trim()) {
      newErrors.cidade = 'Cidade é obrigatória';
    }

    if (!formData.endereco.estado) {
      newErrors.estado = 'Estado é obrigatório';
    }

    if (formData.tiposResiduos.length === 0) {
      newErrors.tiposResiduos = 'Selecione pelo menos um tipo de resíduo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Buscar dados do CEP
  const handleCEPBlur = async () => {
    const cep = formData.endereco.cep.replace(/\D/g, '');
    if (cep.length === 8) {
      setLoadingCEP(true);
      setCepMessage('');
      
      try {
        const cepData = await fetchCEP(cep);
        setFormData(prev => ({
          ...prev,
          endereco: {
            ...prev.endereco,
            logradouro: cepData.logradouro,
            bairro: cepData.bairro,
            cidade: cepData.localidade,
            estado: cepData.uf,
          }
        }));
        setCepMessage('CEP encontrado com sucesso!');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setCepMessage('CEP não encontrado');
      } finally {
        setLoadingCEP(false);
      }
    }
  };

  // Formatação do CEP
  const formatCEP = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 8) {
      return cleaned.replace(/^(\d{5})(\d)/, '$1-$2');
    }
    return cleaned.slice(0, 8).replace(/^(\d{5})(\d)/, '$1-$2');
  };

  // Manipulação de campos de texto
  const handleTextChange = (field: keyof CollectionPointData | string) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    let value = event.target.value;

    if (field === 'endereco.cep') {
      value = formatCEP(value);
    }

    if (field.startsWith('endereco.')) {
      const addressField = field.split('.')[1] as keyof Address;
      setFormData(prev => ({
        ...prev,
        endereco: {
          ...prev.endereco,
          [addressField]: value,
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value,
      }));
    }

    // Limpar erro do campo
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  // Manipulação dos tipos de resíduos
  const handleWasteTypeToggle = (wasteType: WasteType) => {
    setFormData(prev => {
      const isSelected = prev.tiposResiduos.includes(wasteType);
      const newTypes = isSelected
        ? prev.tiposResiduos.filter(type => type !== wasteType)
        : [...prev.tiposResiduos, wasteType];
      
      return {
        ...prev,
        tiposResiduos: newTypes,
      };
    });

    // Limpar erro dos tipos de resíduos
    if (errors.tiposResiduos) {
      setErrors(prev => ({
        ...prev,
        tiposResiduos: undefined,
      }));
    }
  };

  // Submissão do formulário
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

  const title = mode === 'create' ? 'Cadastrar Ponto de Coleta' : 'Editar Ponto de Coleta';
  const submitText = mode === 'create' ? 'Cadastrar Ponto' : 'Salvar Alterações';

  return (
    <div className="collection-point-form">
      <Card variant="elevated">
        <form onSubmit={handleSubmit} className="collection-point-form__form">
          {/* Header */}
          <div className="collection-point-form__header">
            <Text variant="h4" weight="bold">
              {title}
            </Text>
            <Text variant="body2" color="secondary">
              {mode === 'create' 
                ? 'Adicione um novo ponto de coleta à plataforma'
                : 'Edite as informações do ponto de coleta'
              }
            </Text>
          </div>

          {/* Erro geral */}
          {error && (
            <div className="collection-point-form__error">
              <Text variant="body2" color="error">
                {error}
              </Text>
            </div>
          )}

          {/* Informações básicas */}
          <div className="collection-point-form__section">
            <Text variant="h6" weight="semibold" className="collection-point-form__section-title">
              Informações Básicas
            </Text>
            
            <div className="collection-point-form__fields">
              <FormField
                id="nome"
                label="Nome do Ponto"
                placeholder="Ex: EcoPonto Centro"
                value={formData.nome}
                onChange={handleTextChange('nome')}
                errorMessage={errors.nome}
                required
                disabled={loading}
              />

              <div className="collection-point-form__textarea-field">
                <label htmlFor="descricao" className="collection-point-form__label">
                  Descrição *
                </label>
                <textarea
                  id="descricao"
                  placeholder="Descreva o ponto de coleta..."
                  value={formData.descricao}
                  onChange={handleTextChange('descricao')}
                  disabled={loading}
                  className="collection-point-form__textarea"
                  rows={3}
                />
                {errors.descricao && (
                  <Text variant="caption" color="error" className="collection-point-form__error-text">
                    {errors.descricao}
                  </Text>
                )}
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div className="collection-point-form__section">
            <Text variant="h6" weight="semibold" className="collection-point-form__section-title">
              Endereço
            </Text>
            
            <div className="collection-point-form__fields">
              <div className="collection-point-form__cep-field">
                <FormField
                  id="cep"
                  label="CEP"
                  placeholder="00000-000"
                  value={formData.endereco.cep}
                  onChange={handleTextChange('endereco.cep')}
                  onBlur={handleCEPBlur}
                  errorMessage={errors.cep}
                  maxLength={9}
                  required
                  disabled={loading}
                  endIcon={loadingCEP ? <Icon name="search" size="sm" /> : undefined}
                />
                {cepMessage && (
                  <Text 
                    variant="caption" 
                    color={cepMessage.includes('sucesso') ? 'success' : 'error'}
                    className="collection-point-form__cep-message"
                  >
                    {cepMessage}
                  </Text>
                )}
              </div>

              <div className="collection-point-form__row">
                <FormField
                  id="logradouro"
                  label="Logradouro"
                  placeholder="Rua, Avenida..."
                  value={formData.endereco.logradouro}
                  onChange={handleTextChange('endereco.logradouro')}
                  errorMessage={errors.logradouro}
                  required
                  disabled={loading}
                />
                
                <FormField
                  id="numero"
                  label="Número"
                  placeholder="123"
                  value={formData.endereco.numero}
                  onChange={handleTextChange('endereco.numero')}
                  errorMessage={errors.numero}
                  required
                  disabled={loading}
                  className="collection-point-form__number-field"
                />
              </div>

              <div className="collection-point-form__row">
                <FormField
                  id="bairro"
                  label="Bairro"
                  placeholder="Nome do bairro"
                  value={formData.endereco.bairro}
                  onChange={handleTextChange('endereco.bairro')}
                  errorMessage={errors.bairro}
                  required
                  disabled={loading}
                />
                
                <FormField
                  id="cidade"
                  label="Cidade"
                  placeholder="Nome da cidade"
                  value={formData.endereco.cidade}
                  onChange={handleTextChange('endereco.cidade')}
                  errorMessage={errors.cidade}
                  required
                  disabled={loading}
                />
              </div>

              <div className="collection-point-form__state-field">
                <label htmlFor="estado" className="collection-point-form__label">
                  Estado *
                </label>
                <select
                  id="estado"
                  value={formData.endereco.estado}
                  onChange={handleTextChange('endereco.estado')}
                  className="collection-point-form__select"
                  disabled={loading}
                >
                  <option value="">Selecione um estado</option>
                  {brazilianStates.map(state => (
                    <option key={state.value} value={state.value}>
                      {state.label}
                    </option>
                  ))}
                </select>
                {errors.estado && (
                  <Text variant="caption" color="error" className="collection-point-form__error-text">
                    {errors.estado}
                  </Text>
                )}
              </div>
            </div>
          </div>

          {/* Tipos de Resíduos */}
          <div className="collection-point-form__section">
            <Text variant="h6" weight="semibold" className="collection-point-form__section-title">
              Tipos de Resíduos Aceitos *
            </Text>
            
            <div className="collection-point-form__waste-types">
              {wasteTypes.map(waste => (
                <label 
                  key={waste.value}
                  className={`collection-point-form__waste-option ${
                    formData.tiposResiduos.includes(waste.value as WasteType) 
                      ? 'collection-point-form__waste-option--selected' 
                      : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.tiposResiduos.includes(waste.value as WasteType)}
                    onChange={() => handleWasteTypeToggle(waste.value as WasteType)}
                    disabled={loading}
                    className="collection-point-form__waste-checkbox"
                  />
                  <span className="collection-point-form__waste-icon">
                    {waste.icon}
                  </span>
                  <Text variant="body2" weight="medium">
                    {waste.label}
                  </Text>
                </label>
              ))}
            </div>
            
            {errors.tiposResiduos && (
              <Text variant="caption" color="error" className="collection-point-form__error-text">
                {errors.tiposResiduos}
              </Text>
            )}
          </div>

          {/* Ações */}
          <div className="collection-point-form__actions">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={loading}
                className="collection-point-form__cancel-button"
              >
                Cancelar
              </Button>
            )}
            
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              disabled={loading}
              startIcon={<Icon name="save" size="sm" />}
            >
              {loading ? 'Salvando...' : submitText}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};