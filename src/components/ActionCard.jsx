import React from 'react';

const ActionCard = ({ title, description, type }) => (
  <div className={`parchment-card p-4 rounded hover:shadow-lg transition-all cursor-pointer ${
    type === 'bonus' ? 'border-l-4 border-artificerBronze' : ''
  }`}>
    <div className="flex justify-between items-center mb-2">
      <h3 className="parchment-text font-bold">{title}</h3>
      <span className="parchment-text-light text-sm">
        {type === 'bonus' ? 'Bonus Action' : 'Action'}
      </span>
    </div>
    <p className="parchment-text-light">{description}</p>
  </div>
);

export default ActionCard;