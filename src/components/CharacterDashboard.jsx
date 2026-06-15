import React, { useState } from 'react';
import { Theater } from 'lucide-react';
import CharacterCard from './CharacterCard';
import CreateCharacterModal from './CreateCharacterModal';
import Card from './Card';

const CharacterDashboard = ({ characters, onSelectCharacter, onCreateCharacter, onEditCharacter, onDeleteCharacter }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState(null);

  const handleCreateCharacter = (characterData) => {
    onCreateCharacter(characterData);
  };

  const handleUpdateCharacter = (characterId, characterData) => {
    onEditCharacter(characterId, characterData);
    setEditingCharacter(null);
  };

  const handleDeleteCharacter = (character) => {
    // Basic safeguard - will enhance this later
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${character.name}"? This action cannot be undone.`
    );
    if (confirmDelete) {
      onDeleteCharacter(character.id);
    }
  };

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2" style={{
          fontFamily: 'Cinzel, serif',
          color: '#3C2415',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
          letterSpacing: '0.1em',
        }}>
          CHARACTER DASHBOARD
        </h1>
        <p className="parchment-text-light">
          Select a character to continue, or create a new adventurer
        </p>
      </div>

      {/* Create New Character Button */}
      <div className="text-center mb-8">
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3 bg-artificerBronze hover:bg-artificerBronze/90 text-white rounded-lg font-semibold text-lg transition-all button-glow"
        >
          + Create New Character
        </button>
      </div>

      {/* Character Grid */}
      {characters.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {characters.map(character => (
            <CharacterCard
              key={character.id}
              character={character}
              onSelect={onSelectCharacter}
              onEdit={(selectedCharacter) => setEditingCharacter(selectedCharacter)}
              onDelete={handleDeleteCharacter}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <Card className="max-w-2xl mx-auto">
          <Card.Content>
            <div className="text-center py-12">
              <div className="flex justify-center mb-4 text-[#8B4513]">
                <Theater size={54} strokeWidth={1.7} />
              </div>
              <h3 className="text-xl font-bold parchment-text mb-2">
                No Characters Yet
              </h3>
              <p className="parchment-text-light mb-6">
                Create your first character to begin your adventure!
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-artificerBronze hover:bg-artificerBronze/90 text-white rounded font-semibold transition-all"
              >
                Create Your First Character
              </button>
            </div>
          </Card.Content>
        </Card>
      )}

      {/* Create Character Modal */}
      <CreateCharacterModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateCharacter}
      />

      <CreateCharacterModal
        isOpen={Boolean(editingCharacter)}
        initialCharacter={editingCharacter}
        onClose={() => setEditingCharacter(null)}
        onCreate={handleCreateCharacter}
        onUpdate={handleUpdateCharacter}
      />
    </div>
  );
};

export default CharacterDashboard;
