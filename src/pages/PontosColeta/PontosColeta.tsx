import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LocalColeta } from '../../types';
import { locaisColetaMock, tiposResiduoOptions } from '../../data/mockData';
import './PontosColeta.css';

const PontosColeta: React.FC = () => {
  const navigate = useNavigate();
  const [pontos, setPontos] = useState<LocalColeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const carregarPontos = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPontos(locaisColetaMock);
      } catch (error) {
        console.error('Erro ao carregar pontos:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarPontos();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este ponto de coleta?')) {
      return;
    }

    setDeletingId(id);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPontos(prev => prev.filter(ponto => ponto.id !== id));
    } catch (error) {
      console.error('Erro ao deletar ponto:', error);
      alert('Erro ao excluir ponto de coleta. Tente novamente.');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getTipoMaterialColor = (tipo: string) => {
    const option = tiposResiduoOptions.find(opt => opt.value === tipo);
    return option?.color || 'var(--gray-400)';
  };

  if (loading) {
    return (
      <div className="pontos-coleta">
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Carregando pontos de coleta...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pontos-coleta">
      <div className="container">
        <header className="page-header">
          <h1 className="page-title">Seus pontos de coletas</h1>
          <button
            onClick={() => navigate('/pontos-coleta/novo')}
            className="btn btn--primary btn-novo"
          >
            <span className="btn-icon">+</span>
            Novo
          </button>
        </header>

        {pontos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📍</div>
            <h2>Nenhum ponto de coleta cadastrado</h2>
            <p>Comece adicionando seu primeiro ponto de coleta.</p>
            <button
              onClick={() => navigate('/pontos-coleta/novo')}
              className="btn btn--primary"
            >
              Cadastrar primeiro ponto
            </button>
          </div>
        ) : (
          <div className="pontos-grid">
            {pontos.map((ponto) => (
              <div key={ponto.id} className="ponto-card">
                <div className="ponto-card__header">
                  <h3 className="ponto-card__title">{ponto.nome}</h3>
                  <div className="ponto-card__actions">
                    <button
                      onClick={() => navigate(`/pontos-coleta/${ponto.id}/editar`)}
                      className="btn-action btn-action--edit"
                      title="Editar ponto"
                      aria-label={`Editar ${ponto.nome}`}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(ponto.id)}
                      className="btn-action btn-action--delete"
                      title="Excluir ponto"
                      aria-label={`Excluir ${ponto.nome}`}
                      disabled={deletingId === ponto.id}
                    >
                      {deletingId === ponto.id ? (
                        <div className="btn-spinner-small"></div>
                      ) : (
                        '🗑️'
                      )}
                    </button>
                  </div>
                </div>

                <div className="ponto-card__content">
                  <div className="ponto-card__info">
                    <div className="info-item">
                      <span className="info-icon">📍</span>
                      <span className="info-text">
                        {ponto.endereco.logradouro}
                        {ponto.endereco.numero && `, ${ponto.endereco.numero}`} - {ponto.endereco.bairro}
                      </span>
                    </div>
                    
                    <div className="info-item">
                      <span className="info-icon">📝</span>
                      <span className="info-text">{ponto.descricao}</span>
                    </div>

                    <div className="info-item">
                      <span className="info-icon">📅</span>
                      <span className="info-text">
                        Criado em {formatDate(ponto.dataCriacao)}
                      </span>
                    </div>
                  </div>

                  <div className="materiais-aceitos">
                    <h4 className="materiais-title">Materiais aceitos:</h4>
                    <div className="materiais-tags">
                      {ponto.tiposMaterial.map((tipo) => (
                        <span
                          key={tipo}
                          className="material-tag"
                          style={{ '--color': getTipoMaterialColor(tipo) } as React.CSSProperties}
                        >
                          <span className="material-dot"></span>
                          {tipo}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PontosColeta;