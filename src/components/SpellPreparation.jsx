import React, { useState } from 'react';
import Card from './Card';
import { ARTIFICER_CANTRIPS, ARTIFICER_SPELLS, SPELL_DETAILS } from '../data/spells';

const SpellPreparation = ({ level, onUpdatePreparedSpells, preparedSpells = {} }) => {
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [showSpellDetails, setShowSpellDetails] = useState(null);

  // Calculate spells known and prepared based on level
  const getSpellsKnown = () => {
    const cantripsKnown = Math.min(level + 1, 5); // Artificers get cantrips based on level
    const spellsKnown = Math.min(level + 1, 13); // Artificers know all spells on their list
    
    return {
      cantrips: cantripsKnown,
      spells: spellsKnown
    };
  };

  const getPreparedSpells = () => {
    return Math.min(level + 1, 13); // Artificers prepare spells equal to level + 1
  };

  const getTotalPrepared = () => {
    let total = 0;
    Object.values(preparedSpells).forEach(spellList => {
      if (Array.isArray(spellList)) {
        total += spellList.length;
      }
    });
    return total;
  };

  const toggleSpellPreparation = (spellName, spellLevel) => {
    const currentPrepared = preparedSpells[spellLevel] || [];
    const isPrepared = currentPrepared.includes(spellName);
    
    console.log(`Toggling ${spellName} (Level ${spellLevel}): Currently prepared = ${isPrepared}`);
    
    if (isPrepared) {
      // Remove from prepared
      const newPrepared = currentPrepared.filter(spell => spell !== spellName);
      const updatedPreparedSpells = {
        ...preparedSpells,
        [spellLevel]: newPrepared
      };
      // Remove empty arrays
      if (newPrepared.length === 0) {
        delete updatedPreparedSpells[spellLevel];
      }
      console.log('Removing spell, new state:', updatedPreparedSpells);
      onUpdatePreparedSpells(updatedPreparedSpells);
    } else {
      // Add to prepared (if under limit)
      const maxPrepared = getPreparedSpells();
      const currentTotal = getTotalPrepared();
      
      console.log(`Current total: ${currentTotal}, Max allowed: ${maxPrepared}`);
      
      if (currentTotal < maxPrepared) {
        const newPrepared = [...currentPrepared, spellName];
        const newState = {
          ...preparedSpells,
          [spellLevel]: newPrepared
        };
        console.log('Adding spell, new state:', newState);
        onUpdatePreparedSpells(newState);
      } else {
        alert(`You can only prepare ${maxPrepared} spells. Remove a spell first.`);
      }
    }
  };

  const isSpellPrepared = (spellName, spellLevel) => {
    return (preparedSpells[spellLevel] || []).includes(spellName);
  };

  const resetPreparedSpells = () => {
    onUpdatePreparedSpells({});
  };

  const autoPrepareSpells = () => {
    const maxPrepared = getPreparedSpells();
    const autoPrepared = {};
    let preparedCount = 0;
    
    // Start with cantrips (limit to 2 cantrips)
    if (preparedCount < maxPrepared) {
      const cantripsToPrepare = ARTIFICER_CANTRIPS.slice(0, Math.min(2, maxPrepared - preparedCount));
      if (cantripsToPrepare.length > 0) {
        autoPrepared[0] = cantripsToPrepare;
        preparedCount += cantripsToPrepare.length;
      }
    }
    
    // Add level 1 spells
    if (preparedCount < maxPrepared && level >= 1) {
      const level1ToPrepare = ARTIFICER_SPELLS[1].slice(0, Math.min(3, maxPrepared - preparedCount));
      if (level1ToPrepare.length > 0) {
        autoPrepared[1] = level1ToPrepare;
        preparedCount += level1ToPrepare.length;
      }
    }
    
    // Add higher level spells as available
    for (let i = 2; i <= Math.min(level, 5); i++) {
      if (preparedCount < maxPrepared && ARTIFICER_SPELLS[i]) {
        const spellsToPrepare = ARTIFICER_SPELLS[i].slice(0, Math.min(2, maxPrepared - preparedCount));
        if (spellsToPrepare.length > 0) {
          autoPrepared[i] = spellsToPrepare;
          preparedCount += spellsToPrepare.length;
        }
      }
    }
    
    onUpdatePreparedSpells(autoPrepared);
  };

  const getAvailableSpellsForLevel = (spellLevel) => {
    if (spellLevel === 0) {
      return ARTIFICER_CANTRIPS;
    }
    // Remove any duplicates that might exist
    const spells = ARTIFICER_SPELLS[spellLevel] || [];
    return [...new Set(spells)];
  };

  return (
    <Card>
      <Card.Header>Spell Preparation</Card.Header>
      <Card.Content>
        <div className="space-y-6">
          {/* Preparation Summary */}
          <div className="parchment-card p-4 rounded-lg border border-artificerBronze/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="parchment-text font-semibold text-sm">Cantrips Known</div>
                <div className="parchment-text font-bold text-xl">{getSpellsKnown().cantrips}</div>
              </div>
              <div>
                <div className="parchment-text font-semibold text-sm">Spells Known</div>
                <div className="parchment-text font-bold text-xl">{getSpellsKnown().spells}</div>
              </div>
              <div>
                <div className="parchment-text font-semibold text-sm">Can Prepare</div>
                <div className="parchment-text font-bold text-xl">{getPreparedSpells()}</div>
              </div>
              <div>
                <div className="parchment-text font-semibold text-sm">Currently Prepared</div>
                <div className="parchment-text font-bold text-xl">{getTotalPrepared()}</div>
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={autoPrepareSpells}
              className="bg-artificerBlue/80 hover:bg-artificerBlue text-white px-4 py-2 rounded text-sm button-glow"
            >
              Auto-Prepare
            </button>
            <button
              onClick={resetPreparedSpells}
              className="bg-sealWax/80 hover:bg-sealWax text-white px-4 py-2 rounded text-sm button-glow"
            >
              Clear All
            </button>
          </div>

          {/* Level Tabs */}
          <div className="flex space-x-2 overflow-x-auto scrollbar-custom">
            <button
              onClick={() => setSelectedLevel(0)}
              className={`px-4 py-2 rounded text-sm font-semibold transition-all duration-200 ${
                selectedLevel === 0
                  ? 'bg-artificerBronze/30 parchment-text border border-artificerBronze/50'
                  : 'parchment-card parchment-text-light hover:shadow-md'
              }`}
            >
              Cantrips
            </button>
            {[1, 2, 3, 4, 5].map(spellLevel => (
              <button
                key={spellLevel}
                onClick={() => setSelectedLevel(spellLevel)}
                className={`px-4 py-2 rounded text-sm font-semibold transition-all duration-200 ${
                  selectedLevel === spellLevel
                    ? 'bg-artificerBronze/30 parchment-text border border-artificerBronze/50'
                    : 'parchment-card parchment-text-light hover:shadow-md'
                }`}
              >
                Level {spellLevel}
              </button>
            ))}
          </div>

          {/* Spell List */}
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {getAvailableSpellsForLevel(selectedLevel).map(spell => (
                <div
                  key={spell}
                  className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                    isSpellPrepared(spell, selectedLevel)
                      ? 'bg-artificerBronze/20 border-artificerBronze/50'
                      : 'parchment-card border-artificerBronze/20 hover:shadow-md'
                  }`}
                  onClick={() => toggleSpellPreparation(spell, selectedLevel)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={isSpellPrepared(spell, selectedLevel)}
                        readOnly
                        className="w-4 h-4 accent-artificerBronze"
                      />
                      <span className="parchment-text font-semibold">{spell}</span>
                      {selectedLevel > 0 && (
                        <span className="parchment-text-light text-xs">Lv.{selectedLevel}</span>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowSpellDetails(showSpellDetails === spell ? null : spell);
                      }}
                      className="parchment-text hover:text-artificerBronze text-sm font-semibold"
                    >
                      {showSpellDetails === spell ? 'Hide' : 'Details'}
                    </button>
                  </div>
                  {showSpellDetails === spell && SPELL_DETAILS[spell] && (
                    <div className="mt-3 p-3 parchment-card rounded text-sm parchment-text-light">
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <div><span className="parchment-text font-semibold">Casting Time:</span> {SPELL_DETAILS[spell].castingTime}</div>
                        <div><span className="parchment-text font-semibold">Range:</span> {SPELL_DETAILS[spell].range}</div>
                        <div><span className="parchment-text font-semibold">Duration:</span> {SPELL_DETAILS[spell].duration}</div>
                        {SPELL_DETAILS[spell].damage && (
                          <div><span className="parchment-text font-semibold">Damage:</span> {SPELL_DETAILS[spell].damage}</div>
                        )}
                      </div>
                      <div className="parchment-text-light">{SPELL_DETAILS[spell].description}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default SpellPreparation;
