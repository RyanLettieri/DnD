import React, { useState } from 'react';

const CreateCharacterModal = ({ isOpen, onClose, onCreate }) => {
  const [characterData, setCharacterData] = useState({
    name: '',
    class: 'Artificer',
    level: 1,
    race: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!characterData.name.trim()) {
      alert('Please enter a character name');
      return;
    }
    
    // Check if selected class is implemented
    const implementedClasses = ['Artificer', 'Barbarian'];
    if (!implementedClasses.includes(characterData.class)) {
      alert(`Sorry, ${characterData.class} is not yet implemented. Please select Artificer or Barbarian for now. More classes coming soon!`);
      return;
    }
    
    onCreate(characterData);
    setCharacterData({ name: '', class: 'Artificer', level: 1, race: '' });
    onClose();
  };

  const handleInputChange = (field, value) => {
    setCharacterData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 modal-backdrop flex items-center justify-center z-50">
      <div className="parchment-card p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 parchment-text text-center">
          Create New Character
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Character Name */}
          <div>
            <label className="parchment-text-light text-sm font-semibold block mb-2">
              Character Name *
            </label>
            <input
              type="text"
              value={characterData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full p-3 rounded parchment-card border-2 border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none parchment-text"
              placeholder="Enter character name..."
              required
            />
          </div>

          {/* Class */}
          <div>
            <label className="parchment-text-light text-sm font-semibold block mb-2">
              Class
            </label>
            <select
              value={characterData.class}
              onChange={(e) => handleInputChange('class', e.target.value)}
              className="w-full p-3 rounded parchment-card border-2 border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none parchment-text"
            >
              <option value="Artificer">✅ Artificer</option>
              <option value="Barbarian">✅ Barbarian</option>
              <option value="Bard">🚧 Bard (Coming Soon)</option>
              <option value="Cleric">🚧 Cleric (Coming Soon)</option>
              <option value="Druid">🚧 Druid (Coming Soon)</option>
              <option value="Fighter">🚧 Fighter (Coming Soon)</option>
              <option value="Monk">🚧 Monk (Coming Soon)</option>
              <option value="Paladin">🚧 Paladin (Coming Soon)</option>
              <option value="Ranger">🚧 Ranger (Coming Soon)</option>
              <option value="Rogue">🚧 Rogue (Coming Soon)</option>
              <option value="Sorcerer">🚧 Sorcerer (Coming Soon)</option>
              <option value="Warlock">🚧 Warlock (Coming Soon)</option>
              <option value="Wizard">🚧 Wizard (Coming Soon)</option>
            </select>
            <div className="mt-2 text-xs parchment-text-light">
              <div className="flex items-center space-x-4">
                <span>✅ Available Now</span>
                <span>🚧 Coming Soon</span>
              </div>
            </div>
          </div>

          {/* Level */}
          <div>
            <label className="parchment-text-light text-sm font-semibold block mb-2">
              Level
            </label>
            <input
              type="number"
              min="1"
              max="20"
              value={characterData.level}
              onChange={(e) => handleInputChange('level', parseInt(e.target.value) || 1)}
              className="w-full p-3 rounded parchment-card border-2 border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none parchment-text"
            />
          </div>

          {/* Race */}
          <div>
            <label className="parchment-text-light text-sm font-semibold block mb-2">
              Race
            </label>
            <input
              type="text"
              value={characterData.race}
              onChange={(e) => handleInputChange('race', e.target.value)}
              className="w-full p-3 rounded parchment-card border-2 border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none parchment-text"
              placeholder="Enter race..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-artificerBronze hover:bg-artificerBronze/90 text-white rounded font-semibold transition-all"
            >
              Create Character
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCharacterModal;
