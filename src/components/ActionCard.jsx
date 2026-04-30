import React from 'react';

const ActionCard = ({ title, description, type }) => (
  <div className={`sheet-row-card action-sheet-card ${type === 'bonus' || type === 'bonus_action' ? 'is-bonus-action' : ''}`}>
    <div className="flex justify-between items-center mb-2">
      <h3 className="sheet-row-title">{title}</h3>
      <span className="sheet-row-pill">
        {type === 'bonus' || type === 'bonus_action' ? 'Bonus Action' : 'Action'}
      </span>
    </div>
    <p className="sheet-row-body">{description}</p>
  </div>
);

export default ActionCard;
