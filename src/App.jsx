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

  // Listen for character data updates from CharacterSheet
  useEffect(() => {
    const handleCharacterDataUpdated = (e) => {
      const { characters: updatedCharacters } = e.detail;
      setCharacters(updatedCharacters);
    };

    window.addEventListener('characterDataUpdated', handleCharacterDataUpdated);

    return () => {
      window.removeEventListener('characterDataUpdated', handleCharacterDataUpdated);
    };
  }, [setCharacters]);
  
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
      
      if (oldStats && Object.keys(characters).length === 0) {
        console.log('Migrating old character data to multi-character format...');
        
        try {
          // Create character from old data
          const stats = JSON.parse(oldStats);
          const proficiencies = oldProficiencies ? JSON.parse(oldProficiencies) : DEFAULT_PROFICIENCIES;
          const savingThrows = oldSavingThrows ? JSON.parse(oldSavingThrows) : DEFAULT_SAVING_THROWS;
          
          const characterName = stats.characterName || 'Migrated Character';
          const characterId = `character_${Date.now()}`;
          
          // Create the new character structure
          const migratedCharacter = {
            id: characterId,
            name: characterName,
            class: stats.class || 'Artificer',
            level: stats.level || 1,
            race: stats.race || 'Tortle', // Default to Tortle for Inituga
            portrait: '/tortle-portrait.png',
            createdAt: new Date().toISOString(),
            lastModified: new Date().toISOString(),
            stats: stats,
            proficiencies: proficiencies,
            savingThrows: savingThrows,
            conditions: [],
            equipment: DEFAULT_EQUIPMENT,
            preparedSpells: {},
            toolProficiencies: ["Chef's Tools", "Tinker's Tools", "Light Armor", "Medium Armor", "Shields", "Simple Weapons"],
            languages: ["Common", "Aquan"],
            backgroundScribe: {
              traits: '',
              ideals: '',
              bonds: '',
              flaws: '',
              originNotes: '',
              bonusLanguages: ['', '']
            }
          };
          
          // Migrate all existing character-specific data from global keys
          const migrateGlobalData = (globalKey, characterKey) => {
            const data = localStorage.getItem(globalKey);
            if (data) {
              localStorage.setItem(`character_${characterId}_${characterKey}`, data);
              console.log(`Migrated ${globalKey} to character_${characterId}_${characterKey}`);
            }
          };
          
          // Migrate all the global data to character-specific keys
          migrateGlobalData('backgroundScribe', 'backgroundScribe');
          migrateGlobalData('deathSaves', 'deathSaves');
          migrateGlobalData('campaignSessions', 'campaignSessions');
          migrateGlobalData('campaignCharacters', 'campaignCharacters');
          migrateGlobalData('campaignLocations', 'campaignLocations');
          migrateGlobalData('quickNotes', 'quickNotes');
          migrateGlobalData('characterBackground', 'characterBackground');
          migrateGlobalData('collapsedSessions', 'collapsedSessions');
          migrateGlobalData('collapsedCharacters', 'collapsedCharacters');
          migrateGlobalData('collapsedLocations', 'collapsedLocations');
          migrateGlobalData('eldritchCannonAvailable', 'eldritchCannonAvailable');
          
          // Also migrate prepared spells if they exist
          const oldPreparedSpells = localStorage.getItem('preparedSpells');
          if (oldPreparedSpells) {
            try {
              const prepared = JSON.parse(oldPreparedSpells);
              migratedCharacter.preparedSpells = prepared;
              console.log('Migrated prepared spells:', prepared);
            } catch (e) {
              console.error('Failed to migrate prepared spells:', e);
            }
          }
          
          // Add the migrated character
          setCharacters({ [characterId]: migratedCharacter });
          setActiveCharacterId(characterId);
          
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
    
    // Class-specific defaults
    const getClassDefaults = (characterClass) => {
      switch (characterClass) {
        case 'Barbarian':
          return {
            ...DEFAULT_STATS,
            characterName: characterData.name,
            level: characterData.level,
            class: 'Barbarian',
            // All stats default to 10 as requested
            strength: 10,
            constitution: 10,
            dexterity: 10,
            intelligence: 10,
            wisdom: 10,
            charisma: 10,
            // Barbarians use d12 hit dice
            hitDiceSize: 12,
            // Unarmored Defense: AC = 10 + DEX + CON (will be calculated dynamically)
            armorClass: 10,
            proficiencyBonus: 2,
            HP: 12 + 0, // d12 + CON mod (10 CON = +0)
            MaxHP: 12 + 0,
            // Rage damage
            rageDamage: 2,
            ragesPerDay: Math.max(1, Math.floor(characterData.level / 2) + 2)
          };
        case 'Artificer':
        default:
          return {
            ...DEFAULT_STATS,
            characterName: characterData.name,
            level: characterData.level,
            class: characterClass
          };
      }
    };
    
    const getClassSavingThrows = (characterClass) => {
      switch (characterClass) {
        case 'Barbarian':
          return {
            strength: true,
            dexterity: false,
            constitution: true,
            intelligence: false,
            wisdom: false,
            charisma: false
          };
        case 'Artificer':
        default:
          return DEFAULT_SAVING_THROWS;
      }
    };
    
    const getClassProficiencies = (characterClass) => {
      switch (characterClass) {
        case 'Barbarian':
          return {
            ...DEFAULT_PROFICIENCIES,
            "Athletics": true, // Barbarians are proficient in Athletics
            "Survival": true  // And Survival
          };
        default:
          return DEFAULT_PROFICIENCIES;
      }
    };
    
    const getClassEquipment = (characterClass) => {
      switch (characterClass) {
        case 'Barbarian':
          return [
            { name: "Greataxe", quantity: 1, description: "Two-handed melee weapon" },
            { name: "Handaxe", quantity: 2, description: "One-handed melee weapon" },
            { name: "Explorer's Pack", quantity: 1, description: "Contains various adventuring gear" },
            { name: "Javelin", quantity: 4, description: "Thrown weapon" }
          ];
        default:
          return DEFAULT_EQUIPMENT;
      }
    };

    const getClassToolProficiencies = (characterClass) => {
      switch (characterClass) {
        case 'Barbarian':
          return []; // Barbarians don't get tool proficiencies by default
        case 'Artificer':
          return ["Tinker's Tools"];
        default:
          return [];
      }
    };

    const getClassLanguages = (characterClass) => {
      switch (characterClass) {
        case 'Barbarian':
          return ["Common"]; // Only Common by default
        case 'Artificer':
          return ["Common"]; // Only Common by default
        default:
          return ["Common"];
      }
    };
    
    const classDefaults = getClassDefaults(characterData.class);
    
    const newCharacter = {
      id: characterId,
      name: characterData.name,
      class: characterData.class,
      level: characterData.level,
      race: characterData.race,
      portrait: null, // Blank for new characters
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      stats: classDefaults,
      proficiencies: getClassProficiencies(characterData.class),
      savingThrows: getClassSavingThrows(characterData.class),
      conditions: [],
      equipment: getClassEquipment(characterData.class),
      preparedSpells: {}, // Barbarians don't have spells
      toolProficiencies: getClassToolProficiencies(characterData.class),
      languages: getClassLanguages(characterData.class),
      // Only add backgroundScribe for Artificers
      ...(characterData.class === 'Artificer' && {
        backgroundScribe: {
          traits: '',
          ideals: '',
          bonds: '',
          flaws: '',
          originNotes: '',
          bonusLanguages: ['', '']
        }
      })
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
