import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { TipoResiduo, LocalColeta } from '../../types';
import { locaisColetaMock, tiposResiduoOptions, estadosBrasil } from '../../data/mockData';
import './EditarPontoColeta.css';

interface FormData {
  nome: string;
  descricao: string;
  tiposMaterial: TipoResiduo[];
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
  numero: string;
}

interface FormErrors {
  [key: string]: string;
}

const EditarPontoColeta: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [ponto, setPonto] = useState<LocalColeta | null>(null);
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    descricao: '',
    tiposMaterial: [],
    cep: '',
    logradouro: '',
    bairro: '',
    cidade: '',
    estado: '',
    numero: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    const carregarPonto = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const pontoEncontrado = locaisColetaMock.find(p => p.id === id);
        
        if (!pontoEncontrado) {
          navigate('/pontos-coleta');
          return;
        }

        setPonto(pontoEncontrado);
        setFormData({
          nome: pontoEncontrado.nome,
          descricao: pontoEncontrado.descricao,
          tiposMaterial: pontoEncontrado.tiposMaterial,
          cep: pontoEncontrado.endereco.cep,
          logradouro: pontoEncontrado.endereco.logradouro,
          bairro: pontoEncontrado.endereco.bairro,
          cidade: pontoEncontrado.endereco.cidade,
          estado: pontoEncontrado.endereco.estado,
          numero: pontoEncontrado.endereco.numero || ''
        });
      } catch (error) {
        console.error('Erro ao carregar ponto:', error);
        navigate('/pontos-coleta');
      } finally {
        setInitialLoading(false);
      }
    };

    if (id) {
      carregarPonto();
    } else {
      navigate('/pontos-coleta');
    }
  }, [id, navigate]);

  const buscarCEP = async (cep: string) => {
    if (cep.length === 8) {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const enderecoSimulado = {
          logradouro: 'Rua Exemplo Editada',
          bairro: 'Centro Novo',
          cidade: 'São Paulo',
          estado: 'SP'
        };
        
        setFormData(prev => ({
          ...prev,
          ...enderecoSimulado
        }));
        
        setErrors(prev => ({
          ...prev,
          cep: ''
        }));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setErrors(prev => ({
          ...prev,
          cep: 'CEP não encontrado'
        }));
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }

    if (field === 'cep' && value.replace(/\D/g, '').length === 8) {
      const cepOriginal = ponto?.endereco.cep;
      if (value.replace(/\D/g, '') !== cepOriginal) {
        buscarCEP(value.replace(/\D/g, ''));
      }
    }
  };

  const handleTipoMaterialChange = (tipo: TipoResiduo, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        tiposMaterial: [...prev.tiposMaterial, tipo]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        tiposMaterial: prev.tiposMaterial.filter(t => t !== tipo)
      }));
    }

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

    if (!formData.descricao.trim()) {
      newErrors.descricao = 'Descrição é obrigatória';
    }

    if (formData.tiposMaterial.length === 0) {
      newErrors.tiposMaterial = 'Selecione pelo menos um tipo de material';
    }

    if (!formData.cep.replace(/\D/g, '')) {
      newErrors.cep = 'CEP é obrigatório';
    } else if (formData.cep.replace(/\D/g, '').length !== 8) {
      newErrors.cep = 'CEP deve ter 8 dígitos';
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

    if (!formData.estado) {
      newErrors.estado = 'Estado é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const pontoAtualizado: LocalColeta = {
        ...ponto!,
        nome: formData.nome,
        descricao: formData.descricao,
        endereco: {
          cep: formData.cep.replace(/\D/g, ''),
          logradouro: formData.logradouro,
          bairro: formData.bairro,
          cidade: formData.cidade,
          estado: formData.estado,
          numero: formData.numero
        },
        tiposMaterial: formData.tiposMaterial,
        dataAtualizacao: new Date().toISOString()
      };

      console.log('Ponto de coleta atualizado:', pontoAtualizado);
      
      navigate('/pontos-coleta');
      
    } catch (error) {
      console.error('Erro ao atualizar ponto de coleta:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCEP = (value: string) => {
    return value
      .replace(/\D/g, '')
      .substring(0, 8)
      .replace(/(\d{5})(\d)/, '$1-$2');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (initialLoading) {
    return (
      <div className="editar-ponto-coleta">
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Carregando dados do ponto de coleta...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!ponto) {
    return (
      <div className="editar-ponto-coleta">
        <div className="container">
          <div className="error-state">
            <h1>Ponto de coleta não encontrado</h1>
            <button onClick={() => navigate('/pontos-coleta')} className="btn btn--primary">
              Voltar para listagem
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="editar-ponto-coleta">
      <div className="container">
        <header className="page-header">
          <button 
            type="button" 
            onClick={() => navigate('/pontos-coleta')}
            className="btn-back"
            aria-label="Voltar para listagem"
          >
            ← Voltar
          </button>
          <div className="header-content">
            <h1 className="page-title">Editar ponto de coleta</h1>
            <div className="page-subtitle">
              Criado em {formatDate(ponto.dataCriacao)}
              {ponto.dataAtualizacao && (
                <span> • Última edição: {formatDate(ponto.dataAtualizacao)}</span>
              )}
            </div>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="edicao-form">
          <div className="form-section">
            <h2 className="section-title">Informações básicas</h2>
            
            <div className="form-group">
              <label htmlFor="nome" className="form-label">
                Nome do ponto *
              </label>
              <input
                id="nome"
                type="text"
                className={`form-input ${errors.nome ? 'form-input--error' : ''}`}
                value={formData.nome}
                onChange={(e) => handleInputChange('nome', e.target.value)}
                placeholder="Ex: EcoPonto Central"
                aria-describedby={errors.nome ? 'nome-error' : undefined}
              />
              {errors.nome && (
                <span id="nome-error" className="form-error">
                  {errors.nome}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="descricao" className="form-label">
                Descrição *
              </label>
              <textarea
                id="descricao"
                className={`form-textarea ${errors.descricao ? 'form-textarea--error' : ''}`}
                value={formData.descricao}
                onChange={(e) => handleInputChange('descricao', e.target.value)}
                placeholder="Descreva o ponto de coleta..."
                rows={4}
                aria-describedby={errors.descricao ? 'descricao-error' : undefined}
              />
              {errors.descricao && (
                <span id="descricao-error" className="form-error">
                  {errors.descricao}
                </span>
              )}
            </div>

            <div className="form-group">
              <fieldset className="form-fieldset">
                <legend className="form-legend">Tipos de material aceitos *</legend>
                <div className="checkbox-grid">
                  {tiposResiduoOptions.map((tipo) => (
                    <label key={tipo.value} className="checkbox-label">
                      <input
                        type="checkbox"
                        className="checkbox-input"
                        checked={formData.tiposMaterial.includes(tipo.value)}
                        onChange={(e) => handleTipoMaterialChange(tipo.value, e.target.checked)}
                      />
                      <span className="checkbox-custom" style={{ '--color': tipo.color } as React.CSSProperties}>
                        <span className="checkbox-icon">✓</span>
                      </span>
                      <span className="checkbox-text">{tipo.label}</span>
                    </label>
                  ))}
                </div>
                {errors.tiposMaterial && (
                  <span className="form-error">
                    {errors.tiposMaterial}
                  </span>
                )}
              </fieldset>
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">Endereço</h2>
            
            <div className="form-row">
              <div className="form-group form-group--small">
                <label htmlFor="cep" className="form-label">
                  CEP *
                </label>
                <input
                  id="cep"
                  type="text"
                  className={`form-input ${errors.cep ? 'form-input--error' : ''}`}
                  value={formatCEP(formData.cep)}
                  onChange={(e) => handleInputChange('cep', e.target.value)}
                  placeholder="00000-000"
                  maxLength={9}
                  aria-describedby={errors.cep ? 'cep-error' : undefined}
                />
                {errors.cep && (
                  <span id="cep-error" className="form-error">
                    {errors.cep}
                  </span>
                )}
              </div>

              <div className="form-group form-group--large">
                <label htmlFor="logradouro" className="form-label">
                  Logradouro *
                </label>
                <input
                  id="logradouro"
                  type="text"
                  className={`form-input ${errors.logradouro ? 'form-input--error' : ''}`}
                  value={formData.logradouro}
                  onChange={(e) => handleInputChange('logradouro', e.target.value)}
                  placeholder="Nome da rua, avenida..."
                  disabled={loading}
                  aria-describedby={errors.logradouro ? 'logradouro-error' : undefined}
                />
                {errors.logradouro && (
                  <span id="logradouro-error" className="form-error">
                    {errors.logradouro}
                  </span>
                )}
              </div>

              <div className="form-group form-group--small">
                <label htmlFor="numero" className="form-label">
                  Número
                </label>
                <input
                  id="numero"
                  type="text"
                  className="form-input"
                  value={formData.numero}
                  onChange={(e) => handleInputChange('numero', e.target.value)}
                  placeholder="123"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="bairro" className="form-label">
                  Bairro *
                </label>
                <input
                  id="bairro"
                  type="text"
                  className={`form-input ${errors.bairro ? 'form-input--error' : ''}`}
                  value={formData.bairro}
                  onChange={(e) => handleInputChange('bairro', e.target.value)}
                  placeholder="Nome do bairro"
                  disabled={loading}
                  aria-describedby={errors.bairro ? 'bairro-error' : undefined}
                />
                {errors.bairro && (
                  <span id="bairro-error" className="form-error">
                    {errors.bairro}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="cidade" className="form-label">
                  Cidade *
                </label>
                <input
                  id="cidade"
                  type="text"
                  className={`form-input ${errors.cidade ? 'form-input--error' : ''}`}
                  value={formData.cidade}
                  onChange={(e) => handleInputChange('cidade', e.target.value)}
                  placeholder="Nome da cidade"
                  disabled={loading}
                  aria-describedby={errors.cidade ? 'cidade-error' : undefined}
                />
                {errors.cidade && (
                  <span id="cidade-error" className="form-error">
                    {errors.cidade}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="estado" className="form-label">
                  Estado *
                </label>
                <select
                  id="estado"
                  className={`form-select ${errors.estado ? 'form-select--error' : ''}`}
                  value={formData.estado}
                  onChange={(e) => handleInputChange('estado', e.target.value)}
                  disabled={loading}
                  aria-describedby={errors.estado ? 'estado-error' : undefined}
                >
                  <option value="">Selecione o estado</option>
                  {estadosBrasil.map((estado) => (
                    <option key={estado.value} value={estado.value}>
                      {estado.label}
                    </option>
                  ))}
                </select>
                {errors.estado && (
                  <span id="estado-error" className="form-error">
                    {errors.estado}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/pontos-coleta')}
              className="btn btn--outline"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn--primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="btn-spinner"></span>
                  Salvando...
                </>
              ) : (
                'Salvar alterações'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarPontoColeta;