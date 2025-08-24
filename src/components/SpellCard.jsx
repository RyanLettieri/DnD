import React, { useState } from 'react';

const SpellCard = ({ spell, details, level }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!details) {
    return (
      <div className="parchment-card p-4 rounded">
        <h3 className="parchment-text font-bold">{spell}</h3>
        <p className="parchment-text-light text-sm">Details coming soon...</p>
      </div>
    );
  }

  return (
    <div 
      className="spell-scroll ink-stain-corner top-right hover:shadow-lg transition-all duration-200"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="parchment-text font-bold text-lg medieval-header">{spell}</h3>
        <span className="parchment-text-light text-sm bg-artificerBronze/10 px-2 py-1 rounded">
          {level === 0 ? 'Cantrip' : `Level ${level}`}
        </span>
      </div>
      
      {isExpanded && (
        <div className="mt-4 space-y-2 parchment-text-light">
          <p><span className="parchment-text font-semibold">Casting Time:</span> {details.castingTime}</p>
          <p><span className="parchment-text font-semibold">Range:</span> {details.range}</p>
          <p><span className="parchment-text font-semibold">Components:</span> {details.components}</p>
          <p><span className="parchment-text font-semibold">Duration:</span> {details.duration}</p>
          {details.damage && (
            <p><span className="parchment-text font-semibold">Damage:</span> {details.damage}</p>
          )}
          <p className="mt-4 parchment-text-light">{details.description}</p>
        </div>
      )}
    </div>
  );
};

export default SpellCard;