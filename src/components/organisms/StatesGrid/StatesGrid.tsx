import React from 'react';
import StateCard from '../../molecules/StateCard/StateCard';
import './StatesGrid.css';

interface StateData {
  state: string;
  count: number;
}

interface StatesGridProps {
  statesData: StateData[];
  onStateClick?: (state: string) => void;
}

const StatesGrid: React.FC<StatesGridProps> = ({ statesData, onStateClick }) => {
  return (
    <div className="states-grid">
      <h3>Distribuição de pontos de coletas por estado</h3>
      <div className="states-grid__container">
        {statesData.map(({ state, count }) => (
          <StateCard 
            key={state} 
            state={state} 
            count={count}
            onClick={onStateClick}
          />
        ))}
      </div>
    </div>
  );
};

export default StatesGrid;