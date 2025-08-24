import React from 'react';
import Card from './Card';

const SpellSlotTracker = ({ spellSlots, onUpdateSpellSlots, level, intelligence, proficiencyBonus }) => {
  const getSpellSlotsForLevel = (charLevel) => {
    // Artificer spell slot progression
    const slotsByLevel = {
      1: { 1: 2 },
      2: { 1: 2 },
      3: { 1: 3 },
      4: { 1: 3 },
      5: { 1: 4, 2: 2 },
      6: { 1: 4, 2: 2 },
      7: { 1: 4, 2: 3 },
      8: { 1: 4, 2: 3 },
      9: { 1: 4, 2: 3, 3: 2 },
      10: { 1: 4, 2: 3, 3: 2 },
      11: { 1: 4, 2: 3, 3: 3 },
      12: { 1: 4, 2: 3, 3: 3 },
      13: { 1: 4, 2: 3, 3: 3, 4: 1 },
      14: { 1: 4, 2: 3, 3: 3, 4: 1 },
      15: { 1: 4, 2: 3, 3: 3, 4: 2 },
      16: { 1: 4, 2: 3, 3: 3, 4: 2 },
      17: { 1: 4, 2: 3, 3: 3, 4: 3 },
      18: { 1: 4, 2: 3, 3: 3, 4: 3 },
      19: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
      20: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 }
    };
    return slotsByLevel[charLevel] || { 1: 0 };
  };

  const availableSlots = getSpellSlotsForLevel(level);
  const maxSpellLevel = Math.max(...Object.keys(availableSlots).map(Number));

  // Spellcasting math (Artificer uses Intelligence)
  const intScore = parseInt(intelligence) || 10;
  const intMod = Math.floor((intScore - 10) / 2);
  const prof = Number(proficiencyBonus) || 2;
  const spellSaveDc = 8 + prof + intMod;
  const spellAttackBonus = prof + intMod;

  const toggleSlot = (spellLevel, slotIndex) => {
    const currentSlots = spellSlots[spellLevel] || [];
    const newSlots = [...currentSlots];
    newSlots[slotIndex] = !newSlots[slotIndex];
    
    onUpdateSpellSlots({
      ...spellSlots,
      [spellLevel]: newSlots
    });
  };

  const resetAllSlots = () => {
    const resetSlots = {};
    Object.keys(availableSlots).forEach(spellLevel => {
      resetSlots[spellLevel] = Array(availableSlots[spellLevel]).fill(false);
    });
    onUpdateSpellSlots(resetSlots);
  };

  const useAllSlots = () => {
    const usedSlots = {};
    Object.keys(availableSlots).forEach(spellLevel => {
      usedSlots[spellLevel] = Array(availableSlots[spellLevel]).fill(true);
    });
    onUpdateSpellSlots(usedSlots);
  };

  return (
    <Card>
      <Card.Header>Spell Slots</Card.Header>
      <Card.Content>
        <div className="space-y-4">
          {/* Control Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={resetAllSlots}
              className="bg-artificerBronze/20 hover:bg-artificerBronze/30 ink-text px-3 py-1 rounded text-sm button-glow artificer-border"
            >
              Reset All
            </button>
            <button
              onClick={useAllSlots}
              className="bg-red-500/20 hover:bg-red-500/30 ink-text px-3 py-1 rounded text-sm button-glow artificer-border"
            >
              Use All
            </button>
          </div>

          {/* Spell Slots by Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.keys(availableSlots).map(spellLevel => {
              const levelNum = parseInt(spellLevel);
              const maxSlots = availableSlots[levelNum];
              const currentSlots = spellSlots[levelNum] || Array(maxSlots).fill(false);
              const usedSlots = currentSlots.filter(slot => slot).length;
              
              return (
                <div key={spellLevel} className="parchment-card p-4 rounded">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="parchment-text font-bold">Level {spellLevel}</h3>
                    <span className="parchment-text-light text-sm">
                      {usedSlots}/{maxSlots} used
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: maxSlots }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => toggleSlot(levelNum, index)}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-200 cursor-pointer ${
                          currentSlots[index] ? 'bg-gray-600 border-gray-500' : 'bg-artificerBronze/20 border-artificerBronze/60 hover:bg-artificerBronze/30 glow-pulse'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

                     {/* Spellcasting Info */}
           <div className="parchment-card p-4 rounded">
             <h3 className="parchment-text font-semibold mb-2">Spellcasting Info</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
               <div>
                 <span className="parchment-text-light">Spellcasting Ability:</span>
                 <div className="parchment-text font-semibold">Intelligence</div>
               </div>
               <div>
                 <span className="parchment-text-light">Spell Save DC:</span>
                 <div className="parchment-text font-semibold">{spellSaveDc}</div>
                 <div className="parchment-text-light text-xs">= 8 + {prof} (Prof) + {intMod} (INT mod)</div>
               </div>
               <div>
                 <span className="parchment-text-light">Spell Attack Bonus:</span>
                 <div className="parchment-text font-semibold">{spellAttackBonus >= 0 ? '+' : ''}{spellAttackBonus}</div>
                 <div className="parchment-text-light text-xs">= {prof >= 0 ? '+' : ''}{prof} (Prof) {intMod >= 0 ? '+' : ''}{intMod} (INT mod)</div>
               </div>
               <div>
                 <span className="parchment-text-light">Max Spell Level:</span>
                 <div className="parchment-text font-semibold">{maxSpellLevel}</div>
               </div>
             </div>
           </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default SpellSlotTracker;
