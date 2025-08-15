import React from 'react';
import Card from '../../atoms/Card/Card';
import Button from '../../atoms/Button/Button';
import Icon from '../../atoms/Icon/Icon';
import { CollectionPoint } from '../../../types/CollectionPoint';
import './CollectionPointCard.css';

interface CollectionPointCardProps {
  collectionPoint: CollectionPoint;
  onEdit?: (point: CollectionPoint) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

const CollectionPointCard: React.FC<CollectionPointCardProps> = ({ 
  collectionPoint, 
  onEdit, 
  onDelete,
  showActions = true 
}) => {
  const { id, nome, endereco, tiposMaterial, descricao } = collectionPoint;

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(collectionPoint);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete && window.confirm('Tem certeza que deseja excluir este ponto de coleta?')) {
      onDelete(id);
    }
  };

  const getMaterialIcon = (material: string): string => {
    const iconMap: Record<string, string> = {
      'Vidro': 'glass',
      'Papel': 'paper',
      'Plástico': 'plastic',
      'Metal': 'metal',
      'Orgânico': 'organic'
    };
    return iconMap[material] || 'recycle';
  };

  return (
    <Card className="collection-point-card" hover={!showActions}>
      <div className="collection-point-card__header">
        <h3 className="collection-point-card__title">{nome}</h3>
        {showActions && onEdit && onDelete && (
          <div className="collection-point-card__actions">
            <Button 
              variant="ghost" 
              size="small" 
              onClick={handleEdit}
              className="collection-point-card__action"
            >
              <Icon name="edit" size="small" />
            </Button>
            <Button 
              variant="ghost" 
              size="small" 
              onClick={handleDelete}
              className="collection-point-card__action collection-point-card__action--danger"
            >
              <Icon name="delete" size="small" />
            </Button>
          </div>
        )}
      </div>
      
      <div className="collection-point-card__content">
        <div className="collection-point-card__address">
          <Icon name="location" size="small" color="primary" />
          <span>
            {endereco.logradouro}
            {endereco.numero && `, ${endereco.numero}`}
            {endereco.bairro && ` - ${endereco.bairro}`}
          </span>
        </div>
        
        {tiposMaterial && tiposMaterial.length > 0 && (
          <div className="collection-point-card__materials">
            <span className="collection-point-card__materials-label">
              Materiais aceitos:
            </span>
            <div className="collection-point-card__materials-list">
              {tiposMaterial.map((material, index) => (
                <span key={index} className="material-tag">
                  <Icon name={getMaterialIcon(material) as any} size="small" />
                  {material}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {descricao && (
          <p className="collection-point-card__description">
            {descricao}
          </p>
        )}
      </div>
    </Card>
  );
};

export default CollectionPointCard;