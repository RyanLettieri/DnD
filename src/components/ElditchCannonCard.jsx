import React, { useState } from 'react';
import usePersistentState from '../hooks/usePersistentState';

const CANNON_DETAILS = {
  'Flamethrower': {
    damage: '2d8 fire',
    range: '15-foot cone',
    save: 'DEX save',
    description: 'The cannon exhales fire in a 15-foot cone. Each creature in that area must make a Dexterity saving throw against your spell save DC, taking 2d8 fire damage on a failed save, or half as much damage on a successful one.'
  },
  'Force Ballista': {
    damage: '2d8 force',
    range: '120 feet',
    attack: 'Ranged spell attack',
    description: 'Make a ranged spell attack, originating from the cannon, at one creature or object within 120 feet of it. On a hit, the target takes 2d8 force damage, and if the target is a creature, it is pushed 5 feet away from the cannon.'
  },
  'Protector': {
    range: '10-foot radius',
    effect: 'Temporary HP',
    description: 'The cannon emits a burst of positive energy that grants itself and each creature of your choice within 10 feet of it a number of temporary hit points equal to 1d8 + your Intelligence modifier (minimum of +1).'
  }
};

const ElditchCannonCard = ({ spellSlots, onUpdateSpellSlots }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [canCreateCannon, setCanCreateCannon] = usePersistentState('eldritchCannonAvailable', true);

  const spendFirstAvailableSpellSlot = () => {
    if (!spellSlots || !onUpdateSpellSlots) return false;

    // Find the lowest-level available unused slot and mark it used
    const levels = Object.keys(spellSlots)
      .map(Number)
      .sort((a, b) => a - b);

    for (const level of levels) {
      const slots = spellSlots[level] || [];
      const index = slots.findIndex((used) => !used);
      if (index !== -1) {
        const updatedLevelSlots = [...slots];
        updatedLevelSlots[index] = true;
        onUpdateSpellSlots({
          ...spellSlots,
          [level]: updatedLevelSlots
        });
        return true;
      }
    }
    return false;
  };

  const handleCreateCannon = () => {
    if (canCreateCannon) {
      setCanCreateCannon(false);
    }
  };

  const handleCreateWithSpellSlot = () => {
    const spent = spendFirstAvailableSpellSlot();
    if (!spent) {
      alert('No available spell slots to spend. Please free up a slot.');
      return;
    }
    // Creating another cannon by expending a slot does not reset availability;
    // it lets you create despite already having created once this long rest.
    // So we keep canCreateCannon as false and simply inform the user.
    alert('Spell slot spent. You can create another Eldritch Cannon now (this also consumes your action).');
  };

  const handleLongRest = () => {
    setCanCreateCannon(true);
  };

  return (
    <div className="space-y-4">
      <div className="parchment-card p-4 rounded">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="parchment-text font-bold mb-1">Eldritch Cannon Usage</h3>
            <div className="text-sm parchment-text-light">
              Can Create Cannon: {canCreateCannon ? (
                <span className="text-green-700 font-semibold">Yes</span>
              ) : (
                <span className="text-red-700 font-semibold">No (spent this long rest)</span>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            {canCreateCannon ? (
              <button
                onClick={handleCreateCannon}
                className="px-3 py-1 rounded bg-artificerBronze/80 text-white button-glow hover:bg-artificerBronze"
                title="Create your Eldritch Cannon (uses your action)"
              >
                Create Cannon
              </button>
            ) : (
              <button
                onClick={handleCreateWithSpellSlot}
                className="px-3 py-1 rounded bg-artificerBlue/80 text-white button-glow hover:bg-artificerBlue"
                title="Create another Eldritch Cannon by expending a spell slot"
              >
                Create (Spend Slot)
              </button>
            )}
            <button
              onClick={handleLongRest}
              className="px-3 py-1 rounded bg-artificerSteel/80 text-white button-glow hover:bg-artificerSteel"
              title="Reset on Long Rest"
            >
              Long Rest
            </button>
          </div>
        </div>
        <div className="text-xs parchment-text-light mt-2">
          Per rules, you can create one cannon per long rest, or you can expend a spell slot to create another. See Artillerist feature.
        </div>
      </div>
      {Object.entries(CANNON_DETAILS).map(([type, details]) => (
        <div 
          key={type}
          className="parchment-card p-4 rounded cursor-pointer hover:shadow-lg transition-all duration-200"
          onClick={() => setIsExpanded(prev => !prev)}
        >
          <div className="flex justify-between items-center">
            <h3 className="parchment-text font-bold">{type}</h3>
            <span className="parchment-text-light">Bonus Action</span>
          </div>
          
          {isExpanded && (
            <div className="mt-4 space-y-2 parchment-text-light">
              {details.damage && <p><span className="parchment-text font-semibold">Damage:</span> {details.damage}</p>}
              <p><span className="parchment-text font-semibold">Range:</span> {details.range}</p>
              {details.save && <p><span className="parchment-text font-semibold">Save:</span> {details.save}</p>}
              {details.attack && <p><span className="parchment-text font-semibold">Attack:</span> {details.attack}</p>}
              {details.effect && <p><span className="parchment-text font-semibold">Effect:</span> {details.effect}</p>}
              <p className="mt-4 parchment-text-light">{details.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ElditchCannonCard;