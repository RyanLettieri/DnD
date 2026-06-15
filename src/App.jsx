import React, { useState, useEffect } from 'react';
import usePersistentState from './hooks/usePersistentState';
import CharacterDashboard from './components/CharacterDashboard';
import CharacterSheet from './components/CharacterSheet';
import { ABILITY_KEYS } from './data/characterOptions';
import { getAbilityModifier, getClassConfig, getProficiencyBonus } from './utils/characterRules';
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

const buildSavingThrows = (characterClass) => {
  const classConfig = getClassConfig(characterClass);
  return Object.keys(DEFAULT_SAVING_THROWS).reduce((acc, ability) => ({
    ...acc,
    [ability]: (classConfig.savingThrows || []).includes(ability)
  }), {});
};

const buildProficiencies = (characterClass) => {
  const classConfig = getClassConfig(characterClass);
  return Object.keys(DEFAULT_PROFICIENCIES).reduce((acc, skill) => ({
    ...acc,
    [skill]: (classConfig.defaultSkills || []).includes(skill)
  }), {});
};

const buildStats = (characterData, previousStats = {}) => {
  const classConfig = getClassConfig(characterData.class);
  const level = Math.min(20, Math.max(1, Number(characterData.level) || 1));
  const abilities = ABILITY_KEYS.reduce((acc, ability) => ({
    ...acc,
    [ability]: Number(characterData.abilities?.[ability] ?? previousStats[ability] ?? 10) || 10
  }), {});
  const conMod = getAbilityModifier(abilities.constitution);
  const maxHP = Math.max(1, Number(previousStats.MaxHP) || classConfig.hitDiceSize + conMod);
  const unarmoredAC = 10 + getAbilityModifier(abilities.dexterity);

  return {
    ...DEFAULT_STATS,
    ...previousStats,
    ...abilities,
    characterName: characterData.name,
    level,
    class: characterData.class,
    race: characterData.race,
    proficiencyBonus: getProficiencyBonus(level),
    hitDiceSize: classConfig.hitDiceSize,
    armorClass: characterData.class === 'Barbarian'
      ? 10 + getAbilityModifier(abilities.dexterity) + getAbilityModifier(abilities.constitution)
      : Number(previousStats.armorClass) || (characterData.race === 'Tortle' ? 17 : unarmoredAC),
    HP: Math.min(Number(previousStats.HP) || maxHP, maxHP),
    MaxHP: maxHP
  };
};

const buildBackgroundScribe = (characterData, previousBackground = {}) => ({
  traits: characterData.personalityTraits ?? previousBackground.traits ?? '',
  ideals: characterData.ideals ?? previousBackground.ideals ?? '',
  bonds: characterData.bonds ?? previousBackground.bonds ?? '',
  flaws: characterData.flaws ?? previousBackground.flaws ?? '',
  originNotes: characterData.backstory ?? previousBackground.originNotes ?? '',
  bonusLanguages: previousBackground.bonusLanguages || ['', '']
});

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
    const classConfig = getClassConfig(characterData.class);
    const stats = buildStats(characterData);

    const newCharacter = {
      id: characterId,
      name: characterData.name,
      class: characterData.class,
      level: stats.level,
      race: characterData.race,
      background: characterData.background,
      alignment: characterData.alignment,
      portrait: characterData.portrait || null,
      personalityTraits: characterData.personalityTraits || '',
      ideals: characterData.ideals || '',
      bonds: characterData.bonds || '',
      flaws: characterData.flaws || '',
      backstory: characterData.backstory || '',
      abilityMethod: characterData.abilityMethod || 'custom',
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      stats,
      proficiencies: buildProficiencies(characterData.class),
      savingThrows: buildSavingThrows(characterData.class),
      conditions: [],
      equipment: classConfig.equipment || DEFAULT_EQUIPMENT,
      preparedSpells: {},
      toolProficiencies: classConfig.tools || [],
      languages: ["Common"],
      backgroundScribe: buildBackgroundScribe(characterData)
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

  const editCharacter = (characterId, characterData) => {
    setCharacters(prev => {
      const existingCharacter = prev[characterId];
      if (!existingCharacter) return prev;

      const classConfig = getClassConfig(characterData.class);
      const stats = buildStats(characterData, existingCharacter.stats);
      const updatedCharacter = {
        ...existingCharacter,
        name: characterData.name,
        class: characterData.class,
        level: stats.level,
        race: characterData.race,
        background: characterData.background,
        alignment: characterData.alignment,
        portrait: characterData.portrait || null,
        personalityTraits: characterData.personalityTraits || '',
        ideals: characterData.ideals || '',
        bonds: characterData.bonds || '',
        flaws: characterData.flaws || '',
        backstory: characterData.backstory || '',
        abilityMethod: characterData.abilityMethod || existingCharacter.abilityMethod || 'custom',
        lastModified: new Date().toISOString(),
        stats,
        proficiencies: characterData.class === existingCharacter.class
          ? existingCharacter.proficiencies
          : buildProficiencies(characterData.class),
        savingThrows: characterData.class === existingCharacter.class
          ? existingCharacter.savingThrows
          : buildSavingThrows(characterData.class),
        equipment: characterData.class === existingCharacter.class
          ? existingCharacter.equipment
          : (classConfig.equipment || DEFAULT_EQUIPMENT),
        toolProficiencies: characterData.class === existingCharacter.class
          ? existingCharacter.toolProficiencies
          : (classConfig.tools || []),
        backgroundScribe: buildBackgroundScribe(characterData, existingCharacter.backgroundScribe)
      };

      return {
        ...prev,
        [characterId]: updatedCharacter
      };
    });
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
