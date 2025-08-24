import React from 'react';

const SpellList = ({ spells, setSpells }) => {
  const handleSlotChange = (index, value) => {
    const newSpells = [...spells];
    newSpells[index].slots = Math.max(0, value); // Ensure slots don't go below 0
    setSpells(newSpells);
  };

  const expendSpellSlot = (index) => {
    const newSpells = [...spells];
    if (newSpells[index].slots > 0) {
      newSpells[index].slots -= 1;
      setSpells(newSpells);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {spells.map((spell, idx) => (
        <div key={idx} className="bg-gradient-to-br from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 transition p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold text-yellow-200">{spell.name}</h3>
          <label className="font-bold text-yellow-200">Slots</label>
          <input
            type="number"
            value={spell.slots}
            onChange={(e) => handleSlotChange(idx, Number(e.target.value))}
            className="w-full p-2 rounded bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
          />
          <button
            onClick={() => expendSpellSlot(idx)}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Expend Slot
          </button>
        </div>
      ))}
    </div>
  );
};

export default SpellList;