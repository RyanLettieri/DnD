import React from 'react';
import Card from './Card';

const SavingThrows = ({ stats, savingThrowProficiencies, onToggleProficiency }) => {
  const abilities = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
  
  const getModifier = (score) => Math.floor((score - 10) / 2);

  return (
    <Card>
      <Card.Header>Saving Throws</Card.Header>
      <Card.Content>
        <div className="grid grid-cols-2 gap-2">
          {abilities.map(ability => {
            const mod = getModifier(stats[ability] || 10);
            const profBonus = savingThrowProficiencies[ability] ? (stats.proficiencyBonus || 2) : 0;
            const total = mod + profBonus;
            
            return (
              <div 
                key={ability}
                className="flex justify-between items-center p-2 parchment-card rounded hover:shadow-md"
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={savingThrowProficiencies[ability]}
                    onChange={() => onToggleProficiency(ability)}
                    className="w-4 h-4 accent-artificerBronze"
                  />
                  <span className="parchment-text capitalize">{ability}</span>
                </div>
                <span className="parchment-text font-bold">
                  {total >= 0 ? '+' : ''}{total}
                </span>
              </div>
            );
          })}
        </div>
      </Card.Content>
    </Card>
  );
};

export default SavingThrows;