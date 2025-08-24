import React from 'react';
import Card from './Card';

const ConditionsTracker = ({ activeConditions, onToggleCondition }) => {
  const conditions = [
    'Blinded', 'Charmed', 'Deafened', 'Frightened', 'Grappled',
    'Incapacitated', 'Paralyzed', 'Petrified', 'Poisoned', 
    'Prone', 'Restrained', 'Stunned', 'Unconscious'
  ];

  return (
    <Card>
      <Card.Header>Conditions</Card.Header>
      <Card.Content>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {conditions.map(condition => (
            <div
              key={condition}
              onClick={() => onToggleCondition(condition)}
              className={`p-2 rounded cursor-pointer text-center transition-all duration-200 ${
                activeConditions.includes(condition)
                  ? 'bg-sealWax/30 parchment-text border border-sealWax/50'
                  : 'parchment-card parchment-text-light hover:shadow-md'
              }`}
            >
              {condition}
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
};

export default ConditionsTracker;