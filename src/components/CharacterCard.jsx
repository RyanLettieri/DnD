import React from 'react';
import { UserRound } from 'lucide-react';

const CharacterCard = ({ character, onSelect, onEdit, onDelete }) => {
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div 
      className="parchment-card p-6 rounded-lg cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
      onClick={() => onSelect(character.id)}
    >
      {/* Character Portrait */}
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-artificerBronze/50 bg-gray-700/50 flex items-center justify-center">
          {character.portrait ? (
            <img 
              src={character.portrait} 
              alt={character.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <UserRound className="text-[#8B4513]" size={38} strokeWidth={1.8} />
          )}
        </div>
      </div>

      {/* Character Info */}
      <div className="text-center space-y-2">
        <h3 className="parchment-text text-xl font-bold">{character.name}</h3>
        <div className="parchment-text-light text-sm space-y-1">
          <div>Level {character.level} {character.class}</div>
          <div>Race: {character.race || 'Not specified'}</div>
        </div>
      </div>

      {character.conditions?.length > 0 && (
        <div className="mt-3 empty-state py-2">
          {character.conditions.length} active condition{character.conditions.length === 1 ? '' : 's'}
        </div>
      )}

      {/* Stats Preview */}
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="parchment-card p-2 rounded">
          <div className="parchment-text-light text-xs">HP</div>
          <div className="parchment-text font-bold">{character.stats?.HP || 0}/{character.stats?.MaxHP || 0}</div>
        </div>
        <div className="parchment-card p-2 rounded">
          <div className="parchment-text-light text-xs">AC</div>
          <div className="parchment-text font-bold">{character.stats?.armorClass || 10}</div>
        </div>
        <div className="parchment-card p-2 rounded">
          <div className="parchment-text-light text-xs">Speed</div>
          <div className="parchment-text font-bold">{character.stats?.speed || 30}</div>
        </div>
      </div>

      {/* Last Modified */}
      <div className="mt-4 text-center">
        <div className="parchment-text-light text-xs">
          Last played: {formatDate(character.lastModified)}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex gap-2 justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(character);
          }}
          className="action-button utility text-sm px-3 py-1"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(character);
          }}
          className="action-button danger text-sm px-3 py-1"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CharacterCard;
