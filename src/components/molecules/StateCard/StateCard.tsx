import React from 'react';
import Card from '../../atoms/Card/Card';
import './StateCard.css';

interface StateCardProps {
  state: string;
  count: number;
  onClick?: (state: string) => void;
}

const StateCard: React.FC<StateCardProps> = ({ state, count, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(state);
    }
  };

  return (
    <Card 
      className="state-card" 
      hover={!!onClick}
      onClick={handleClick}
      data-count={count}
    >
      <div className="state-card__content">
        <div className="state-card__state">
          {state}
        </div>
        <div className="state-card__count">
          {count}
        </div>
        <div className="state-card__label">
          {count === 1 ? 'ponto' : 'pontos'}
        </div>
      </div>
    </Card>
  );
};

export default StateCard;