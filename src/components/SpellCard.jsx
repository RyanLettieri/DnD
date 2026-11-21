import React, { useState } from 'react';

const SpellCard = ({ spell, details, level, characterLevel }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get scaled damage for cantrips based on character level
  const getDamageForLevel = (damage, charLevel, spellLevel) => {
    if (!damage || spellLevel !== 0) return damage;

    // Cantrip damage scaling: 1-4: base, 5-8: +1 die, 9-12: +2 dice, 13-16: +3 dice, 17-20: +4 dice
    const extraDice = Math.floor((charLevel - 1) / 4);
    if (extraDice === 0) return damage;

    // Parse damage string (e.g., "1d10 fire" or "2d6 acid")
    const match = damage.match(/(\d+)d(\d+)\s*(.*)/);
    if (!match) return damage;

    const baseDice = parseInt(match[1]);
    const dieSize = parseInt(match[2]);
    const damageType = match[3];

    return `${baseDice + extraDice}d${dieSize} ${damageType}`.trim();
  };

  if (!details) {
    return (
      <div className="sheet-row-card spell-sheet-card">
        <h3 className="sheet-row-title">{spell}</h3>
        <p className="sheet-row-body">Details coming soon...</p>
      </div>
    );
  }

  const scaledDamage = getDamageForLevel(details.damage, characterLevel, level);

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
          {scaledDamage && (
            <p><span className="sheet-row-label">Damage:</span> {scaledDamage}</p>
          )}
          <p className="mt-4">{details.description}</p>
        </div>
      )}
    </div>
  );
};

export default SpellCard;
