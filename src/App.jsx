import React, { useState, useEffect } from 'react';
import usePersistentState from './hooks/usePersistentState';
import CharacterDashboard from './components/CharacterDashboard';
import CharacterSheet from './components/CharacterSheet';
import './styles/enhancements.css';

const DEFAULT_STATS = {
  // Base Stats - ensure these are numbers
  strength: 10,
  dexterity: 10,
  constitution: 10,
  intelligence: 10,
  wisdom: 10,
  charisma: 10,
  // Character Info
  characterName: '',
  level: 1,
  class: 'Artificer',
  race: '',
  // Combat Stats
  proficiencyBonus: 2,
  armorClass: 17, // Tortle Natural Armor
  initiative: 0,
  speed: 30,
  HP: 20,
  MaxHP: 20,
  tempHP: 0,
  // Hit Dice
  hitDiceSize: 8, // default for Artificer (d8)
  hitDiceSpent: 0,
  // Currency
  currency: {
    copper: 0,
    silver: 0,
    electrum: 0,
    gold: 0,
    platinum: 0
  },
  // Spell Slots
  spellSlots: {
    1: [false, false, false],
    2: [false, false, false],
    3: [false, false, false]
  }
};

const DEFAULT_PROFICIENCIES = {
  "Acrobatics": false,
  "Animal Handling": false,
  "Arcana": false,
  "Athletics": false,
  "Deception": false,
  "History": false,
  "Insight": false,
  "Intimidation": false,
  "Investigation": false,
  "Medicine": false,
  "Nature": false,
  "Perception": false,
  "Performance": false,
  "Persuasion": false,
  "Religion": false,
  "Sleight of Hand": false,
  "Stealth": false,
  "Survival": false,
};

const DEFAULT_SAVING_THROWS = {
  strength: false,
  dexterity: false,
  constitution: true,
  intelligence: true,
  wisdom: false,
  charisma: false
};

const DEFAULT_EQUIPMENT = [
  { name: "Dagger", quantity: 1, description: "Simple melee weapon" },
  { name: "Leather Armor", quantity: 1, description: "Light armor" },
  { name: "Explorer's Pack", quantity: 1, description: "Contains various adventuring gear" }
];

export default function App() {
  const [characters, setCharacters] = usePersistentState('characters', {});
  const [activeCharacterId, setActiveCharacterId] = usePersistentState('activeCharacterId', null);
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' or 'character'
  
  // Debug function to clear and re-migrate
  const clearAndRemigrate = () => {
    if (window.confirm('This will clear all character data and re-migrate from old format. Continue?')) {
      // Clear all character-related localStorage
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('character_') || key === 'characters' || key === 'activeCharacterId') {
          localStorage.removeItem(key);
        }
      });
      setCharacters({});
      setActiveCharacterId(null);
      setCurrentView('dashboard');
      window.location.reload();
    }
  };

  // Data migration from old single-character format
  useEffect(() => {
    const migrateOldData = () => {
      // Check if we have old data that needs migration
      const oldStats = localStorage.getItem('stats');
      const oldProficiencies = localStorage.getItem('proficiencies');
      const oldSavingThrows = localStorage.getItem('savingThrows');
      
      console.log('Migration check:', {
        oldStats: oldStats ? 'found' : 'not found',
        oldProficiencies: oldProficiencies ? 'found' : 'not found',
        oldSavingThrows: oldSavingThrows ? 'found' : 'not found',
        charactersCount: Object.keys(characters).length
      });
      
      if (oldStats && Object.keys(characters).length === 0) {
        console.log('Migrating old character data to multi-character format...');
        
        try {
          // Create character from old data
          const stats = JSON.parse(oldStats);
          const proficiencies = oldProficiencies ? JSON.parse(oldProficiencies) : DEFAULT_PROFICIENCIES;
          const savingThrows = oldSavingThrows ? JSON.parse(oldSavingThrows) : DEFAULT_SAVING_THROWS;
          
          console.log('Parsed old data:', { stats, proficiencies, savingThrows });
          
          const characterName = stats.characterName || 'Migrated Character';
          const characterId = `character_${Date.now()}`;
          
          // Create the new character structure
          const migratedCharacter = {
            id: characterId,
            name: characterName,
            class: stats.class || 'Artificer',
            level: stats.level || 1,
            race: stats.race || '',
            portrait: '/tortle-portrait.png',
            createdAt: new Date().toISOString(),
            lastModified: new Date().toISOString(),
            stats: stats,
            proficiencies: proficiencies,
            savingThrows: savingThrows,
            conditions: [],
            equipment: DEFAULT_EQUIPMENT,
            preparedSpells: {},
            backgroundScribe: {
              traits: '',
              ideals: '',
              bonds: '',
              flaws: '',
              originNotes: '',
              bonusLanguages: ['', '']
            }
          };
          
          // Add the migrated character
          setCharacters({ [characterId]: migratedCharacter });
          setActiveCharacterId(characterId);
          
          // Clear old data (optional - keep for safety)
          // localStorage.removeItem('stats');
          // localStorage.removeItem('proficiencies');
          // localStorage.removeItem('savingThrows');
          
          console.log('Migration completed successfully!');
          
        } catch (error) {
          console.error('Migration failed:', error);
        }
      }
    };

    migrateOldData();
  }, [characters, setCharacters, setActiveCharacterId]);

  const createCharacter = (characterData) => {
    const characterId = `character_${Date.now()}`;
    const newCharacter = {
      id: characterId,
      name: characterData.name,
      class: characterData.class,
      level: characterData.level,
      race: characterData.race,
      portrait: null, // Blank for now
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      stats: { ...DEFAULT_STATS, characterName: characterData.name, level: characterData.level },
      proficiencies: DEFAULT_PROFICIENCIES,
      savingThrows: DEFAULT_SAVING_THROWS,
      conditions: [],
      equipment: DEFAULT_EQUIPMENT,
      preparedSpells: {},
      backgroundScribe: {
        traits: '',
        ideals: '',
        bonds: '',
        flaws: '',
        originNotes: '',
        bonusLanguages: ['', '']
      }
    };

    setCharacters(prev => ({ ...prev, [characterId]: newCharacter }));
    return characterId;
  };

  const selectCharacter = (characterId) => {
    setActiveCharacterId(characterId);
    setCurrentView('character');
  };

  const deleteCharacter = (characterId) => {
    if (characters[characterId]) {
      const characterName = characters[characterId].name;
      const confirmDelete = window.confirm(
        `Are you absolutely sure you want to delete "${characterName}"? This action cannot be undone.`
      );
      
      if (confirmDelete) {
        setCharacters(prev => {
          const newCharacters = { ...prev };
          delete newCharacters[characterId];
          return newCharacters;
        });
        
        // If we deleted the active character, go back to dashboard
        if (activeCharacterId === characterId) {
          setActiveCharacterId(null);
          setCurrentView('dashboard');
        }
        
        // Clean up character-specific localStorage
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith(`character_${characterId}_`)) {
            localStorage.removeItem(key);
          }
        });
      }
    }
  };

  const editCharacter = (character) => {
    // For now, we'll just log this. We can implement editing later
    console.log('Edit character:', character);
    // TODO: Open edit modal with character data
  };

  const backToDashboard = () => {
    setCurrentView('dashboard');
  };

  // Get characters array for easier rendering
  const charactersArray = Object.values(characters);

  // If no characters exist, show dashboard
  if (currentView === 'dashboard' || charactersArray.length === 0) {
    return (
      <CharacterDashboard
        characters={charactersArray}
        onSelectCharacter={selectCharacter}
        onCreateCharacter={createCharacter}
        onEditCharacter={editCharacter}
        onDeleteCharacter={deleteCharacter}
      />
    );
  }

  // Show character sheet
  if (currentView === 'character' && activeCharacterId && characters[activeCharacterId]) {
    return (
      <CharacterSheet
        characterId={activeCharacterId}
        character={characters[activeCharacterId]}
        onBackToDashboard={backToDashboard}
      />
    );
  }

  // Fallback to dashboard
  return (
    <CharacterDashboard
      characters={charactersArray}
      onSelectCharacter={selectCharacter}
      onCreateCharacter={createCharacter}
      onEditCharacter={editCharacter}
      onDeleteCharacter={deleteCharacter}
    />
  );
}
