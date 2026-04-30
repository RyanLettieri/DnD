import React, { useState } from 'react';

const SpellCard = ({ spell, details, level }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!details) {
    return (
      <div className="sheet-row-card spell-sheet-card">
        <h3 className="sheet-row-title">{spell}</h3>
        <p className="sheet-row-body">Details coming soon...</p>
      </div>
    );
  }

  return (
    <div 
      className="sheet-row-card spell-sheet-card"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="sheet-row-title">{spell}</h3>
        <span className="sheet-row-pill">
          {level === 0 ? 'Cantrip' : `Level ${level}`}
        </span>
      </div>
      
      {isExpanded && (
        <div className="mt-4 space-y-2 sheet-row-body">
          <p><span className="sheet-row-label">Casting Time:</span> {details.castingTime}</p>
          <p><span className="sheet-row-label">Range:</span> {details.range}</p>
          <p><span className="sheet-row-label">Components:</span> {details.components}</p>
          <p><span className="sheet-row-label">Duration:</span> {details.duration}</p>
          {details.damage && (
            <p><span className="sheet-row-label">Damage:</span> {details.damage}</p>
          )}
          <p className="mt-4">{details.description}</p>
        </div>
      )}
    </div>
  );
};

export default SpellCard;
