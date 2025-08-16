import React, { useState } from 'react';
import CollectionPointCard from '../../molecules/CollectionPointCard/CollectionPointCard';
import Button from '../../atoms/Button/Button';
import Icon from '../../atoms/Icon/Icon';
import Input from '../../atoms/Input/Input';
import './CollectionPointsList.css';

interface CollectionPoint {
  id: string;
  nome: string;
  endereco: {
    logradouro: string;
    numero?: string;
    bairro: string;
    cidade: string;
    estado: string;
  };
  tiposMaterial: string[];
  descricao?: string;
}

interface CollectionPointsListProps {
  collectionPoints: CollectionPoint[];
  onEdit: (point: CollectionPoint) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  loading?: boolean;
}

const CollectionPointsList: React.FC<CollectionPointsListProps> = ({ 
  collectionPoints, 
  onEdit, 
  onDelete, 
  onAdd,
  loading = false 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMaterial, setFilterMaterial] = useState('');

  const materialTypes = ['Todos', 'Vidro', 'Papel', 'Plástico', 'Metal', 'Orgânico'];

  // Filtrar pontos baseado na busca e filtro de material
  const filteredPoints = collectionPoints.filter(point => {
    const matchesSearch = point.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         point.endereco.bairro.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         point.endereco.cidade.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMaterial = filterMaterial === '' || filterMaterial === 'Todos' ||
                           point.tiposMaterial.includes(filterMaterial);
    
    return matchesSearch && matchesMaterial;
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleMaterialFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterMaterial(e.target.value);
  };

  if (loading) {
    return (
      <div className="collection-points-list">
        <div className="collection-points-list__loading">
          <Icon name="recycle" size="large" className="icon--spinning" />
          <p>Carregando pontos de coleta...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="collection-points-list">
      <div className="collection-points-list__header">
        <div className="collection-points-list__title-section">
          <h2 className="collection-points-list__title">
            Seus pontos de coleta
          </h2>
          <span className="collection-points-list__count">
            {filteredPoints.length} de {collectionPoints.length} pontos
          </span>
        </div>
        
        <Button 
          variant="primary" 
          onClick={onAdd}
          className="collection-points-list__add-btn"
        >
          <Icon name="add" size="small" />
          <span className="collection-points-list__add-text">Novo Ponto</span>
        </Button>
      </div>

      {collectionPoints.length > 0 && (
        <div className="collection-points-list__filters">
          <div className="collection-points-list__search">
            <Input
              type="text"
              placeholder="Buscar por nome, bairro ou cidade..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="collection-points-list__search-input"
            />
          </div>
          
          <div className="collection-points-list__material-filter">
            <label className="input-label">Filtrar por material:</label>
            <select 
              value={filterMaterial} 
              onChange={handleMaterialFilter}
              className="input collection-points-list__select"
            >
              {materialTypes.map(material => (
                <option key={material} value={material === 'Todos' ? '' : material}>
                  {material}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      
      <div className="collection-points-list__content">
        {filteredPoints.length > 0 ? (
          <div className="collection-points-list__grid">
            {filteredPoints.map(point => (
              <CollectionPointCard
                key={point.id}
                collectionPoint={point}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        ) : collectionPoints.length === 0 ? (
          <div className="collection-points-list__empty">
            <Icon name="recycle" size="xlarge" color="muted" />
            <h3>Nenhum ponto de coleta cadastrado</h3>
            <p>Comece criando seu primeiro ponto de coleta para contribuir com a reciclagem.</p>
            <Button variant="primary" onClick={onAdd}>
              <Icon name="add" size="small" />
              Cadastrar primeiro ponto
            </Button>
          </div>
        ) : (
          <div className="collection-points-list__no-results">
            <Icon name="search" size="large" color="muted" />
            <h3>Nenhum resultado encontrado</h3>
            <p>Tente ajustar os filtros ou termo de busca.</p>
            <Button 
              variant="ghost" 
              onClick={() => {
                setSearchTerm('');
                setFilterMaterial('');
              }}
            >
              Limpar filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionPointsList;