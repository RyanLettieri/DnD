import React, { useState } from 'react';
import usePersistentState from '../hooks/usePersistentState';
import '../styles/enhancements.css';
import HPBar from './HPBar';
import HitDice from './HitDice';
import BackgroundScribe from './BackgroundScribe';
import Card from './Card';
import ActionCard from './ActionCard';
import SpellCard from './SpellCard';
import ElditchCannonCard from './ElditchCannonCard';
import CurrencyManager from './CurrencyManager';
import SavingThrows from './SavingThrows';
import ConditionsTracker from './ConditionsTracker';
import ProficienciesLanguages from './ProficienciesLanguages';
import Equipment from './Equipment';
import QuickActions from './QuickActions';
import SpellSlotTracker from './SpellSlotTracker';
import FeaturesTracker from './FeaturesTracker';
import SpellPreparation from './SpellPreparation';
import InfusionsTracker from './InfusionsTracker';
import EnhancedActions from './EnhancedActions';
import EnhancedNotes from './EnhancedNotes';
import DeathSavingThrows from './DeathSavingThrows';
import { SPELL_DETAILS } from '../data/spells';
import { DEFAULT_EQUIPMENT } from '../data/equipment';

const allSkills = [
  "Acrobatics",
  "Animal Handling",
  "Arcana",
  "Athletics",
  "Deception",
  "History",
  "Insight",
  "Intimidation",
  "Investigation",
  "Medicine",
  "Nature",
  "Perception",
  "Performance",
  "Persuasion",
  "Religion",
  "Sleight of Hand",
  "Stealth",
  "Survival",
];

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

const SKILL_ABILITIES = {
  "Acrobatics": "dexterity",
  "Animal Handling": "wisdom",
  "Arcana": "intelligence",
  "Athletics": "strength",
  "Deception": "charisma",
  "History": "intelligence",
  "Insight": "wisdom",
  "Intimidation": "charisma",
  "Investigation": "intelligence",
  "Medicine": "wisdom",
  "Nature": "intelligence",
  "Perception": "wisdom",
  "Performance": "charisma",
  "Persuasion": "charisma",
  "Religion": "intelligence",
  "Sleight of Hand": "dexterity",
  "Stealth": "dexterity",
  "Survival": "wisdom"
};

const CharacterSheet = ({ characterId, character, onBackToDashboard }) => {
  // Character-specific data storage
  const characterDataPrefix = `character_${characterId}`;
  
  const [stats, setStats] = usePersistentState(`${characterDataPrefix}_stats`, character?.stats || DEFAULT_STATS);
  const [proficiencies, setProficiencies] = usePersistentState(`${characterDataPrefix}_proficiencies`, character?.proficiencies || {
    // Initialize all skills as not proficient
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
  });
  const [savingThrowProficiencies, setSavingThrowProficiencies] = usePersistentState(`${characterDataPrefix}_savingThrows`, character?.savingThrows || {
    strength: false,
    dexterity: false,
    constitution: true,
    intelligence: true,
    wisdom: false,
    charisma: false
  });
  const [activeConditions, setActiveConditions] = usePersistentState(`${characterDataPrefix}_conditions`, character?.conditions || []);
  const [equipment, setEquipment] = usePersistentState(`${characterDataPrefix}_equipment`, character?.equipment || DEFAULT_EQUIPMENT);
  const [preparedSpells, setPreparedSpells] = usePersistentState(`${characterDataPrefix}_preparedSpells`, character?.preparedSpells || {});

  // Function to update character data in the main characters object
  const updateCharacterData = (updates) => {
    // Get current characters from localStorage
    const charactersData = localStorage.getItem('characters');
    if (charactersData) {
      const characters = JSON.parse(charactersData);
      if (characters[characterId]) {
        // Update the character data
        characters[characterId] = {
          ...characters[characterId],
          ...updates,
          lastModified: new Date().toISOString()
        };
        // Save back to localStorage
        localStorage.setItem('characters', JSON.stringify(characters));
        
        // Dispatch custom event to notify App component
        window.dispatchEvent(new CustomEvent('characterDataUpdated', {
          detail: { characterId, characters }
        }));
      }
    }
  };
  
  // Initialize with character data on first load
  React.useEffect(() => {
    if (character && character.stats) {
      // Set the data directly in localStorage
      localStorage.setItem(`${characterDataPrefix}_stats`, JSON.stringify(character.stats));
      localStorage.setItem(`${characterDataPrefix}_proficiencies`, JSON.stringify(character.proficiencies || {}));
      localStorage.setItem(`${characterDataPrefix}_savingThrows`, JSON.stringify(character.savingThrows || {}));
      localStorage.setItem(`${characterDataPrefix}_conditions`, JSON.stringify(character.conditions || []));
      localStorage.setItem(`${characterDataPrefix}_equipment`, JSON.stringify(character.equipment || DEFAULT_EQUIPMENT));
      localStorage.setItem(`${characterDataPrefix}_preparedSpells`, JSON.stringify(character.preparedSpells || {}));
      localStorage.setItem(`${characterDataPrefix}_toolProficiencies`, JSON.stringify(character.toolProficiencies || []));
      localStorage.setItem(`${characterDataPrefix}_languages`, JSON.stringify(character.languages || []));
      
      // Trigger a re-render by forcing state update
      setStats(character.stats);
      setProficiencies(character.proficiencies || {});
      setSavingThrowProficiencies(character.savingThrows || {});
      setActiveConditions(character.conditions || []);
      setEquipment(character.equipment || DEFAULT_EQUIPMENT);
      setPreparedSpells(character.preparedSpells || {});
    }
  }, [character, characterDataPrefix]);

  // Ensure spellSlots are properly initialized
  React.useEffect(() => {
    if (!stats.spellSlots) {
      setStats(prev => ({
        ...prev,
        spellSlots: DEFAULT_STATS.spellSlots
      }));
    }
  }, [stats.spellSlots]);

  // Debug: Monitor stats changes
  React.useEffect(() => {
    console.log('STATS STATE CHANGED:', stats);
  }, [stats]);

  const [hpModalOpen, setHpModalOpen] = useState(false);
  const [hpAmount, setHpAmount] = useState(0);
  const [hpAction, setHpAction] = useState("damage");
  const [maxHpModalOpen, setMaxHpModalOpen] = useState(false);
  const [newMaxHp, setNewMaxHp] = useState(0);
  const [activeTab, setActiveTab] = useState('main');

  const tabs = [
    { id: 'main', label: 'Character' },
    { id: 'background', label: 'Background' },
    { id: 'combat', label: 'Combat' },
    { id: 'actions', label: 'Actions' },
    { id: 'spells', label: 'Spells' },
    { id: 'infusions', label: 'Infusions' },
    { id: 'skills', label: 'Skills' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'features', label: 'Features' },
    { id: 'notes', label: 'Notes' }
  ];

  const toggleProficiency = (skill) =>
    setProficiencies({ ...proficiencies, [skill]: !proficiencies[skill] });

  const openHpModal = (action) => {
    setHpAction(action);
    setHpModalOpen(true);
  };

  const applyHpChange = () => {
    if (hpAction === "damage") {
      const damage = Math.max(0, Number(hpAmount) || 0);
      const currentTemp = Number(stats.tempHP) || 0;
      const tempAfter = Math.max(0, currentTemp - damage);
      const remainingDamage = Math.max(0, damage - currentTemp);
      const newHP = Math.max(0, Math.min(Number(stats.MaxHP) || 0, (Number(stats.HP) || 0) - remainingDamage));

      const newStats = {
        ...stats,
        tempHP: tempAfter,
        HP: newHP
      };
      setStats(newStats);
      updateCharacterData({ stats: newStats });
    } else {
      const heal = Math.max(0, Number(hpAmount) || 0);
      const newHP = Math.max(0, Math.min(Number(stats.MaxHP) || 0, (Number(stats.HP) || 0) + heal));
      const newStats = {
        ...stats,
        HP: newHP
      };
      setStats(newStats);
      updateCharacterData({ stats: newStats });
    }

    setHpModalOpen(false);
    setHpAmount(0);
    setHpAction("damage"); // Reset action
  };

  const applyMaxHpChange = () => {
    if (newMaxHp > 0) {
      const newStats = {
        ...stats,
        MaxHP: newMaxHp,
        HP: Math.min(stats.HP, newMaxHp) // Don't let current HP exceed new max
      };
      setStats(newStats);
      updateCharacterData({ stats: newStats });
    }
    setMaxHpModalOpen(false);
    setNewMaxHp(0);
  };

  const getModifier = (stat) => {
    const parsedStat = parseInt(stat) || 10;
    return Math.floor((parsedStat - 10) / 2);
  };

  const getLevelTitle = (level, characterClass) => {
    if (!level || !characterClass) return '';
    
    switch (characterClass) {
      case 'Barbarian':
        if (level === 1) return "Novice Barbarian";
        if (level === 2) return "Fierce Warrior";
        if (level === 3) return "Primal Berserker";
        if (level === 4) return "Rage-Fueled";
        if (level === 5) return "Totemic Warrior";
        if (level >= 6 && level <= 10) return "Path Master";
        if (level >= 11 && level <= 15) return "Primal Champion";
        if (level >= 16) return "Legendary Barbarian";
        break;
      case 'Artificer':
        if (level === 1) return "Novice Artificer";
        if (level === 2) return "Apprentice Artificer";
        if (level === 3) return "Journeyman Artificer";
        if (level === 4) return "Skilled Artificer";
        if (level === 5) return "Expert Artificer";
        if (level >= 6 && level <= 10) return "Master Artificer";
        if (level >= 11 && level <= 15) return "Grand Artificer";
        if (level >= 16) return "Legendary Artificer";
        break;
      default:
        return `Level ${level} ${characterClass}`;
    }
    return '';
  };

  const renderMainTab = () => (
    <div className="space-y-6">
      {/* HP Bar - only on main tab */}
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <HPBar 
              current={stats.HP} 
              max={stats.MaxHP} 
              onUpdateHP={(newHP) => {
              const newStats = { ...stats, HP: newHP };
              setStats(newStats);
              updateCharacterData({ stats: newStats });
            }}
              onDamage={() => openHpModal("damage")}
              onHeal={() => openHpModal("heal")}
              onEditMax={() => setMaxHpModalOpen(true)}
            />
          </div>
        </div>
      </div>
      {/* Temp HP controls */}
      <div className="mb-6">
        <div className="flex items-center justify-between parchment-card p-3 rounded-lg">
          <div className="parchment-text font-semibold">Temp HP: {Number(stats.tempHP) || 0}</div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const input = prompt('Add how many temp HP?', '1');
                if (input !== null && input.trim() !== '') {
                  const val = parseInt(input);
                  if (!isNaN(val) && val > 0) {
                    const newStats = { ...stats, tempHP: Math.max(0, (Number(stats.tempHP) || 0) + val) };
                    setStats(newStats);
                    updateCharacterData({ stats: newStats });
                  }
                }
              }}
              className="px-3 py-1.5 rounded-md text-white text-sm font-semibold transition-all"
              style={{ background: 'linear-gradient(to bottom, #0f766e, #0ea5a4, #0f766e)' }}
              title="Add Temp HP"
            >
              +Temp
            </button>
            <button
              onClick={() => {
                const currentTemp = Number(stats.tempHP) || 0;
                const input = prompt('Remove how many temp HP?', Math.min(1, currentTemp).toString());
                if (input !== null && input.trim() !== '') {
                  const val = parseInt(input);
                  if (!isNaN(val) && val > 0) {
                    const newStats = { ...stats, tempHP: Math.max(0, (Number(stats.tempHP) || 0) - val) };
                    setStats(newStats);
                    updateCharacterData({ stats: newStats });
                  }
                }
              }}
              className="px-3 py-1.5 rounded-md text-white text-sm font-semibold transition-all"
              style={{ background: 'linear-gradient(to bottom, #7f1d1d, #991b1b, #b91c1c)' }}
              title="Remove Temp HP"
            >
              -Temp
            </button>
            <button
              onClick={() => {
                const currentTemp = Number(stats.tempHP) || 0;
                const input = prompt('Set temp HP to what value?', currentTemp.toString());
                if (input !== null && input.trim() !== '') {
                  const val = parseInt(input);
                  if (!isNaN(val) && val >= 0) {
                    const newStats = { ...stats, tempHP: val };
                    setStats(newStats);
                    updateCharacterData({ stats: newStats });
                  }
                }
              }}
              className="px-3 py-1.5 rounded-md text-white text-sm font-semibold transition-all"
              style={{ background: 'linear-gradient(to bottom, #1e40af, #2563eb, #1e40af)' }}
              title="Set Temp HP"
            >
              Set Temp
            </button>
          </div>
        </div>
      </div>

      {/* Death Saving Throws - Show when HP is 0 */}
      {(Number(stats.HP) || 0) === 0 && (
        <div className="mb-6">
          <DeathSavingThrows characterDataPrefix={characterDataPrefix} />
        </div>
      )}

      {/* Hit Dice Section */}
      <Card>
        <Card.Content>
          <HitDice
            level={stats.level}
            hitDiceSize={stats.hitDiceSize || 8}
            hitDiceSpent={stats.hitDiceSpent || 0}
            conMod={getModifier(parseInt(stats.constitution) || 10)}
            onApplyHealing={(amount) => {
              const newStats = {
                ...stats,
                HP: Math.min(stats.MaxHP, (Number(stats.HP) || 0) + Math.max(0, Number(amount) || 0))
              };
              setStats(newStats);
              updateCharacterData({ stats: newStats });
            }}
            onChange={({ hitDiceSize, hitDiceSpent }) => {
              const newStats = {
                ...stats,
                hitDiceSize: hitDiceSize ?? stats.hitDiceSize,
                hitDiceSpent: hitDiceSpent ?? stats.hitDiceSpent
              };
              setStats(newStats);
              updateCharacterData({ stats: newStats });
            }}
          />
        </Card.Content>
      </Card>

      <Card>
        <Card.Content>
          <div className="parchment-card p-6 rounded-lg">
            <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
              <div className="flex-shrink-0">
                <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-lg overflow-hidden shadow-lg border-4 border-amber-800 bg-gray-700/50 flex items-center justify-center">
                  {character?.portrait ? (
                    <img 
                      src={character.portrait} 
                      alt={`${character.name} Portrait`}
                      className="w-full h-full object-cover object-center"
                      style={{ objectPosition: 'center 20%' }}
                    />
                  ) : (
                    <div className="text-center">
                      <div className="text-6xl mb-2">👤</div>
                      <div className="text-sm parchment-text-light">No Portrait</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 space-y-6 text-center lg:text-left">
                <div>
                  <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
                    <div className="w-12 h-12 bg-artificerBronze/20 rounded-full flex items-center justify-center">
                      <span className="text-xl">🐢</span>
                    </div>
                    <label className="parchment-text-light font-semibold text-sm uppercase tracking-wide">Character Name</label>
                  </div>
                  <input 
                    type="text" 
                    value={stats.characterName}
                    onChange={(e) => setStats({...stats, characterName: e.target.value})}
                    className="w-full bg-transparent rounded p-3 parchment-text text-2xl lg:text-3xl font-bold focus:outline-none border-b-2 border-artificerBronze/30 focus:border-artificerBronze/60 text-center lg:text-left"
                    placeholder="Enter your character's name..."
                  />
                </div>

                <div>
                  <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
                    <div className="w-12 h-12 bg-artificerBronze/20 rounded-full flex items-center justify-center">
                      <span className="text-xl">⚔️</span>
                    </div>
                    <label className="parchment-text-light font-semibold text-sm uppercase tracking-wide">Level</label>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start space-x-4">
                    <button 
                      onClick={() => {
                        const newLevel = Math.max(1, stats.level - 1);
                        const newStats = { ...stats, level: newLevel };
                        setStats(newStats);
                        updateCharacterData({ 
                          stats: newStats,
                          level: newLevel  // Also update top-level character level
                        });
                      }}
                      className="w-10 h-10 bg-artificerBronze/20 hover:bg-artificerBronze/30 rounded-full flex items-center justify-center parchment-text font-bold button-glow text-lg"
                    >
                      -</button>
                    <div className="text-4xl font-bold parchment-text mx-4">{stats.level}</div>
                    <button 
                      onClick={() => {
                        const newLevel = Math.min(20, stats.level + 1);
                        const newStats = { ...stats, level: newLevel };
                        setStats(newStats);
                        updateCharacterData({ 
                          stats: newStats,
                          level: newLevel  // Also update top-level character level
                        });
                      }}
                      className="w-10 h-10 bg-artificerBronze/20 hover:bg-artificerBronze/30 rounded-full flex items-center justify-center parchment-text font-bold button-glow text-lg"
                    >
                      +</button>
                  </div>
                  <div className="parchment-text-light text-sm mt-3 italic">
                    {getLevelTitle(stats.level, character?.class)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card.Content>
      </Card>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-center mb-6" style={{
          fontFamily: 'Cinzel, serif',
          color: '#3C2415',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
          letterSpacing: '0.05em'
        }}>ABILITY SCORES</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center">
          {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map(ability => (
            <div 
              key={ability}
              className="relative text-center cursor-pointer hover:scale-105 transition-all duration-200"
              style={{
                backgroundImage: 'url(/ability-container.png)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                width: '140px',
                height: '140px'
              }}
              onClick={(e) => {
                e.stopPropagation();
                console.log(`CLICKED ON ${ability}!`);
                const currentValue = parseInt(stats[ability]) || 10;
                console.log(`Current ${ability} value:`, currentValue, 'Full stats object:', stats);
                const input = prompt(`Enter new value for ${ability}:`, currentValue.toString());
                console.log(`User input for ${ability}:`, input);
                if (input !== null && input.trim() !== '') {
                  const newValue = parseInt(input);
                  console.log(`Parsed new value for ${ability}:`, newValue);
                  if (!isNaN(newValue) && newValue >= 0 && newValue <= 30) {
                    console.log(`Updating ${ability} from ${currentValue} to ${newValue}`);
                    const newStats = {
                      ...stats,
                      [ability]: newValue
                    };
                    console.log('New stats object:', newStats);
                    setStats(newStats);
                    console.log('setStats called!');
                    // Manually update character data to avoid infinite loop
                    updateCharacterData({ stats: newStats });
                    console.log('updateCharacterData called!');
                  } else {
                    alert('Please enter a valid number between 0 and 30');
                  }
                }
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                <div className="text-sm font-bold leading-tight mb-2" style={{ color: '#3C2415' }}>
                  {ability === 'constitution' ? 'CON' : 
                   ability === 'intelligence' ? 'INT' : 
                   ability === 'dexterity' ? 'DEX' : 
                   ability === 'charisma' ? 'CHA' : 
                   ability === 'strength' ? 'STR' : 
                   ability === 'wisdom' ? 'WIS' : ability}
                </div>
                <div className="text-3xl font-bold mb-2" style={{ color: '#3C2415' }}>
                  {(() => {
                    const value = parseInt(stats[ability]);
                    return isNaN(value) ? 10 : value;
                  })()}
                </div>
                <div className="text-lg font-semibold" style={{ color: '#3C2415' }}>
                  {(() => {
                    const value = parseInt(stats[ability]);
                    const cleanValue = isNaN(value) ? 10 : value;
                    const mod = getModifier(cleanValue);
                    return mod >= 0 ? '+' : '' + mod;
                  })()}
                </div>
              </div>
            </div>
            ))}
        </div>
      </div>
      
      {/* Extra spacing at bottom for ability scores */}
      <div className="h-16"></div>
    </div>
  );

  const renderNotesTab = () => (
    <EnhancedNotes characterDataPrefix={characterDataPrefix} />
  );

  const renderBackgroundTab = () => {
    const characterClass = character?.class || stats.class || 'Artificer';
    
    if (characterClass !== 'Artificer') {
      return (
        <div className="text-center parchment-text-light py-16">
          <div className="text-6xl mb-4">📜</div>
          <h3 className="text-xl font-bold mb-2">No Scribe Background</h3>
          <p className="text-sm max-w-md mx-auto">
            The Scribe background is specific to Artificer characters. {characterClass}s have different background options and features.
          </p>
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        <BackgroundScribe 
          characterDataPrefix={characterDataPrefix}
          character={character}
        />
      </div>
    );
  };

  const renderCombatTab = () => {
    const characterClass = character?.class || stats.class || 'Artificer';
    
    return (
      <div className="space-y-6">
        <Card>
          <Card.Header>Combat Stats</Card.Header>
          <Card.Content>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="parchment-card p-4 rounded-lg text-center">
                <div className="parchment-text-light text-sm font-semibold">Armor Class</div>
                <div className="parchment-text text-2xl font-bold">
                  {(() => {
                    const baseAC = Number(stats.armorClass) || 10;
                    const characterClass = character?.class || stats.class || 'Artificer';
                    
                    if (characterClass === 'Barbarian') {
                      // Unarmored Defense: 10 + DEX mod + CON mod
                      const dexMod = getModifier(parseInt(stats.dexterity) || 10);
                      const conMod = getModifier(parseInt(stats.constitution) || 10);
                      const barbarianAC = 10 + dexMod + conMod;
                      return barbarianAC;
                    }
                    
                    return baseAC;
                  })()}
                </div>
                <div className="text-xs parchment-text-light mt-1">
                  {(() => {
                    const characterClass = character?.class || stats.class || 'Artificer';
                    if (characterClass === 'Barbarian') {
                      const dexMod = getModifier(parseInt(stats.dexterity) || 10);
                      const conMod = getModifier(parseInt(stats.constitution) || 10);
                      return `10 + ${dexMod >= 0 ? '+' : ''}${dexMod} (DEX) + ${conMod >= 0 ? '+' : ''}${conMod} (CON)`;
                    }
                    return 'Base AC';
                  })()}
                </div>
              </div>
              <div className="parchment-card p-4 rounded-lg text-center">
                <div className="parchment-text-light text-sm font-semibold">Initiative</div>
                <div className="parchment-text text-2xl font-bold">
                  {(getModifier(parseInt(stats.dexterity) || 10) + (Number(stats.initiative) || 0))}
                </div>
              </div>
              <div className="parchment-card p-4 rounded-lg text-center">
                <div className="parchment-text-light text-sm font-semibold">Speed</div>
                <div className="parchment-text text-2xl font-bold">{Number(stats.speed) || 30}</div>
              </div>
              <div className="parchment-card p-4 rounded-lg text-center">
                <div className="parchment-text-light text-sm font-semibold">Prof Bonus</div>
                <div className="parchment-text text-2xl font-bold">+{Number(stats.proficiencyBonus) || 2}</div>
              </div>
            </div>
          </Card.Content>
        </Card>
        <Card>
          <Card.Header>Hit Dice</Card.Header>
          <Card.Content>
            <HitDice
              level={stats.level}
              hitDiceSize={stats.hitDiceSize || 8}
              hitDiceSpent={stats.hitDiceSpent || 0}
              conMod={getModifier(parseInt(stats.constitution) || 10)}
              onApplyHealing={(amount) =>
                setStats(prev => ({
                  ...prev,
                  HP: Math.min(prev.MaxHP, (Number(prev.HP) || 0) + Math.max(0, Number(amount) || 0))
                }))}
              onChange={({ hitDiceSize, hitDiceSpent }) =>
                setStats(prev => ({
                  ...prev,
                  hitDiceSize: hitDiceSize ?? prev.hitDiceSize,
                  hitDiceSpent: hitDiceSpent ?? prev.hitDiceSpent
                }))}
            />
          </Card.Content>
        </Card>
        
        {/* Class-specific Actions */}
        {characterClass === 'Barbarian' ? (
          <Card>
            <Card.Header>Barbarian Actions</Card.Header>
            <Card.Content>
              <div className="space-y-4">
                <ActionCard
                  title="Attack"
                  description="Make one melee or ranged attack"
                  type="action"
                />
                <ActionCard
                  title="Rage"
                  description="On your turn, you can enter a rage as a bonus action. While raging, you gain resistance to bludgeoning, piercing, and slashing damage, and you have advantage on Strength checks and Strength saving throws."
                  type="bonus_action"
                />
                <ActionCard
                  title="Dodge"
                  description="Impose disadvantage on attacks against you, advantage on DEX saves"
                  type="action"
                />
              </div>
            </Card.Content>
          </Card>
        ) : characterClass === 'Artificer' ? (
          <>
            <Card>
              <Card.Header>Artificer Actions</Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  <ActionCard
                    title="Attack"
                    description="Make one melee or ranged attack"
                    type="action"
                  />
                  <ActionCard
                    title="Shell Defense"
                    description="Withdraw into shell: +4 AC, advantage on STR and CON saves, disadvantage on DEX saves, speed 0"
                    type="action"
                  />
                  <ActionCard
                    title="Dodge"
                    description="Impose disadvantage on attacks against you, advantage on DEX saves"
                    type="action"
                  />
                </div>
              </Card.Content>
            </Card>
            <Card>
              <Card.Header>Eldritch Cannon</Card.Header>
              <Card.Content>
                <ElditchCannonCard 
                  spellSlots={stats.spellSlots}
                  onUpdateSpellSlots={(newSpellSlots) => setStats({ ...stats, spellSlots: newSpellSlots })}
                  characterDataPrefix={characterDataPrefix}
                />
              </Card.Content>
            </Card>
          </>
        ) : (
          <Card>
            <Card.Header>Actions</Card.Header>
            <Card.Content>
              <div className="space-y-4">
                <ActionCard
                  title="Attack"
                  description="Make one melee or ranged attack"
                  type="action"
                />
                <ActionCard
                  title="Dodge"
                  description="Impose disadvantage on attacks against you, advantage on DEX saves"
                  type="action"
                />
              </div>
            </Card.Content>
          </Card>
        )}
      </div>
    );
  };

  const renderActionsTab = () => (
    <div className="space-y-6">
      <EnhancedActions character={character} stats={stats} />
      <QuickActions 
        stats={stats}
        proficiencies={proficiencies}
        savingThrowProficiencies={savingThrowProficiencies}
        getModifier={getModifier}
      />
    </div>
  );

  const renderSpellsTab = () => {
    const characterClass = character?.class || stats.class || 'Artificer';
    
    // Check if this class can cast spells
    const spellcastingClasses = ['Artificer', 'Wizard', 'Cleric', 'Druid', 'Sorcerer', 'Warlock', 'Bard', 'Paladin', 'Ranger'];
    
    if (!spellcastingClasses.includes(characterClass)) {
      return (
        <div className="text-center parchment-text-light py-16">
          <div className="text-6xl mb-4">⚔️</div>
          <h3 className="text-xl font-bold mb-2">No Spellcasting</h3>
          <p className="text-sm max-w-md mx-auto">
            {characterClass}s do not have spellcasting abilities. Focus on your martial prowess and class features instead!
          </p>
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        <SpellPreparation 
          level={stats.level}
          onUpdatePreparedSpells={setPreparedSpells}
          preparedSpells={preparedSpells}
        />
        <SpellSlotTracker 
          spellSlots={stats.spellSlots}
          onUpdateSpellSlots={(newSpellSlots) => setStats({...stats, spellSlots: newSpellSlots})}
          level={stats.level}
          intelligence={stats.intelligence}
          proficiencyBonus={stats.proficiencyBonus}
        />
        <Card>
          <Card.Header>Prepared Spells</Card.Header>
          <Card.Content>
            <div className="space-y-4">
              {/* Cantrips */}
              {(preparedSpells[0] || []).length > 0 && (
                <div>
                  <h3 className="parchment-text font-semibold mb-2">Cantrips</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {preparedSpells[0].map(spell => (
                      <SpellCard key={spell} spell={spell} details={SPELL_DETAILS[spell]} level={0} />
                    ))}
                  </div>
                </div>
              )}
              {/* Leveled Spells */}
              {[1, 2, 3, 4, 5].map(level => {
                const levelSpells = preparedSpells[level] || [];
                if (levelSpells.length === 0) return null;
                
                return (
                  <div key={level}>
                    <h3 className="parchment-text font-semibold mb-2">Level {level} Spells</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {levelSpells.map(spell => (
                        <SpellCard key={spell} spell={spell} details={SPELL_DETAILS[spell]} level={level} />
                      ))}
                    </div>
                  </div>
                );
              })}
              {Object.values(preparedSpells).flat().length === 0 && (
                <div className="text-center parchment-text-light py-8">
                  <div className="text-2xl mb-2">📚</div>
                  <div>No spells prepared yet</div>
                  <div className="text-sm">Use the Spell Preparation section above to prepare your spells</div>
                </div>
              )}
            </div>
          </Card.Content>
        </Card>
      </div>
    );
  };

  const renderInventoryTab = () => {
    const handleCurrencyUpdate = (type, newAmount) => {
      setStats(prevStats => ({
        ...prevStats,
        currency: {
          ...prevStats.currency,
          [type]: newAmount
        }
      }));
    };

    return (
      <div className="space-y-6">
        <CurrencyManager 
          currency={stats.currency || DEFAULT_STATS.currency}
          onUpdate={handleCurrencyUpdate}
        />
        <Equipment 
          equipment={equipment}
          onUpdateEquipment={setEquipment}
        />
      </div>
    );
  };

  const renderInfusionsTab = () => {
    const characterClass = character?.class || stats.class || 'Artificer';
    
    if (characterClass !== 'Artificer') {
      return (
        <div className="text-center parchment-text-light py-16">
          <div className="text-6xl mb-4">🔧</div>
          <h3 className="text-xl font-bold mb-2">No Infusions</h3>
          <p className="text-sm max-w-md mx-auto">
            Only Artificers can create magical infusions. {characterClass}s have other unique class abilities instead!
          </p>
        </div>
      );
    }
    
    return (
      <div className="space-y-6">
        <InfusionsTracker level={stats.level} />
      </div>
    );
  };

  const renderSkillsTab = () => (
    <div className="space-y-6">
      <Card>
        <Card.Header>Skills & Proficiencies</Card.Header>
        <Card.Content>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allSkills.map((skill) => {
              const ability = SKILL_ABILITIES[skill];
              const abilityMod = getModifier(parseInt(stats[ability]) || 10);
              const profBonus = proficiencies[skill] ? Number(stats.proficiencyBonus) || 2 : 0;
              const totalMod = abilityMod + profBonus;
              
              return (
                <div
                  key={skill}
                  className="flex items-center justify-between p-3 parchment-card rounded hover:shadow-lg cursor-pointer transition-all duration-200"
                  onClick={() => toggleProficiency(skill)}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={proficiencies[skill]}
                      readOnly
                      className="w-4 h-4 accent-artificerBronze"
                    />
                    <span className="parchment-text">{skill}</span>
                  </div>
                  <div className="text-right">
                    <span className="parchment-text-light text-sm">{ability.toUpperCase()}</span>
                    <span className="parchment-text ml-2 font-semibold">
                      {totalMod >= 0 ? '+' : ''}{totalMod}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card.Content>
      </Card>
    </div>
  );

  const renderFeaturesTab = () => {
    const characterClass = character?.class || stats.class || 'Artificer';
    
    return (
      <div className="space-y-6">
        {/* Class-specific Features */}
        {characterClass === 'Barbarian' ? (
          <Card>
            <Card.Header>Barbarian Features</Card.Header>
            <Card.Content>
              <div className="space-y-4">
                <div className="parchment-card p-4 rounded">
                  <h4 className="parchment-text font-bold mb-2">Rage (Level 1)</h4>
                  <p className="parchment-text-light text-sm">
                    On your turn, you can enter a rage as a bonus action. While raging, you gain resistance to bludgeoning, piercing, and slashing damage, and you have advantage on Strength checks and Strength saving throws. You can rage a number of times per day equal to your Constitution modifier + 2.
                  </p>
                  <div className="mt-2 text-sm parchment-text">
                    Rages per day: {stats.ragesPerDay || Math.max(1, Math.floor((stats.level || 1) / 2) + 2)}
                  </div>
                </div>
                <div className="parchment-card p-4 rounded">
                  <h4 className="parchment-text font-bold mb-2">Unarmored Defense (Level 1)</h4>
                  <p className="parchment-text-light text-sm">
                    While you are not wearing any armor, your Armor Class equals 10 + your Dexterity modifier + your Constitution modifier.
                  </p>
                  <div className="mt-2 text-sm parchment-text">
                    Current AC: {10 + getModifier(parseInt(stats.dexterity) || 10) + getModifier(parseInt(stats.constitution) || 10)}
                  </div>
                </div>
                {(stats.level || 1) >= 2 && (
                  <div className="parchment-card p-4 rounded">
                    <h4 className="parchment-text font-bold mb-2">Danger Sense (Level 2)</h4>
                    <p className="parchment-text-light text-sm">
                      You have advantage on Dexterity saving throws against effects that you can see, such as traps and spells.
                    </p>
                  </div>
                )}
                {(stats.level || 1) >= 3 && (
                  <div className="parchment-card p-4 rounded">
                    <h4 className="parchment-text font-bold mb-2">Primal Path (Level 3)</h4>
                    <p className="parchment-text-light text-sm">
                      Choose a primal path that shapes the nature of your rage: Path of the Berserker, Path of the Totem Warrior, etc.
                    </p>
                  </div>
                )}
              </div>
            </Card.Content>
          </Card>
        ) : characterClass === 'Artificer' ? (
          <FeaturesTracker />
        ) : null}
        
        <SavingThrows 
          stats={stats} 
          savingThrowProficiencies={savingThrowProficiencies}
          onToggleProficiency={(ability) => {
            setSavingThrowProficiencies(prev => ({
              ...prev,
              [ability]: !prev[ability]
            }));
          }}
        />
        <ProficienciesLanguages characterDataPrefix={characterDataPrefix} />
        <ConditionsTracker
          activeConditions={activeConditions}
          onToggleCondition={(condition) => {
            setActiveConditions(prev => 
              prev.includes(condition) 
                ? prev.filter(c => c !== condition)
                : [...prev, condition]
            );
          }}
        />
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'main':
        return renderMainTab();
      case 'background':
        return renderBackgroundTab();
      case 'combat':
        return renderCombatTab();
      case 'actions':
        return renderActionsTab();
      case 'spells':
        return renderSpellsTab();
      case 'infusions':
        return renderInfusionsTab();
      case 'skills':
        return renderSkillsTab();
      case 'inventory':
        return renderInventoryTab();
      case 'features':
        return renderFeaturesTab();
      case 'notes':
        return renderNotesTab();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen" style={{
      backgroundImage: 'url(/framed-background.png)',
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }}>
      {/* Ornate border container */}
      <div className="min-h-screen relative" style={{
        border: '12px solid #8B4513',
        borderImage: 'linear-gradient(45deg, #654321, #8B4513, #A0522D, #8B4513, #654321) 1',
        margin: '8px',
        borderRadius: '20px',
        boxShadow: 'inset 0 0 50px rgba(139, 69, 19, 0.3), 0 0 30px rgba(0, 0, 0, 0.5)'
      }}>

      {/* Main content */}
      <div className="max-w-3xl mx-auto p-12 pt-32 pb-32">
        
        {/* Back to Dashboard Button */}
        <div className="mb-6">
          <button
            onClick={onBackToDashboard}
            className="px-4 py-2 bg-artificerBronze/80 hover:bg-artificerBronze text-white rounded font-semibold transition-all flex items-center gap-2"
          >
            ← Back to Dashboard
          </button>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{
            fontFamily: 'Cinzel, serif',
            color: '#3C2415',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
            letterSpacing: '0.1em',
            margin: '2rem 0'
          }}>CHARACTER SHEET</h1>
        </div>
        
        {/* Ornate Tab Navigation */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm uppercase tracking-wide transition-all duration-300 ${
                activeTab === tab.id
                  ? 'text-amber-100 shadow-inner'
                  : 'text-amber-100 hover:bg-amber-700/30'
              }`}
              style={{
                background: activeTab === tab.id 
                  ? 'linear-gradient(135deg, #CD853F 0%, #DAA520 50%, #CD853F 100%)'
                  : 'linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #8B4513 100%)',
                border: '2px solid #654321',
                boxShadow: activeTab === tab.id
                  ? 'inset 0 3px 6px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)'
                  : '0 3px 6px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
                fontFamily: 'Cinzel, serif'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* Simple ornate divider */}
        <div className="text-center my-8">
          <div className="w-full h-px" style={{ 
            background: 'linear-gradient(to right, transparent 0%, #8B4513 20%, #8B4513 80%, transparent 100%)' 
          }}></div>
        </div>
        
        <div className="mt-6">
          {renderTabContent()}
        </div>
      </div>

      {/* HP Modal */}
      {hpModalOpen && (
        <div className="fixed inset-0 modal-backdrop flex items-center justify-center z-50">
          <div className="parchment-card p-6 rounded-xl shadow-2xl w-80">
            <h2 className="text-xl font-bold mb-4 parchment-text">
              {hpAction === "damage" ? "Take Damage" : "Heal HP"}
            </h2>
            <input
              type="number"
              value={hpAmount}
              onChange={(e) => setHpAmount(parseInt(e.target.value) || 0)}
              className="w-full p-2 rounded mb-4 bg-transparent parchment-text border-2 border-artificerBronze/50 focus:border-artificerBronze focus:outline-none"
              min="0"
            />
            <div className="flex justify-end space-x-2">
              <button 
                className="px-4 py-2 parchment-text border-2 border-artificerBronze/50 rounded hover:bg-artificerBronze/20"
                onClick={() => setHpModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-artificerBronze text-white rounded hover:bg-artificerBronze/90"
                onClick={applyHpChange}
              >
                {hpAction === "damage" ? "Take Damage" : "Heal"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Max HP Modal */}
      {maxHpModalOpen && (
        <div className="fixed inset-0 modal-backdrop flex items-center justify-center z-50">
          <div className="parchment-card p-6 rounded-xl shadow-2xl w-80">
            <h2 className="text-xl font-bold mb-4 parchment-text">Change Max HP</h2>
            <input
              type="number"
              value={newMaxHp}
              onChange={(e) => setNewMaxHp(parseInt(e.target.value) || 0)}
              className="w-full p-2 rounded mb-4 bg-transparent parchment-text border-2 border-artificerBronze/50 focus:border-artificerBronze focus:outline-none"
              min="1"
            />
            <div className="flex justify-end space-x-2">
              <button 
                className="px-4 py-2 parchment-text border-2 border-artificerBronze/50 rounded hover:bg-artificerBronze/20"
                onClick={() => setMaxHpModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-artificerBronze text-white rounded hover:bg-artificerBronze/90"
                onClick={applyMaxHpChange}
              >
                Set Max HP
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default CharacterSheet;
