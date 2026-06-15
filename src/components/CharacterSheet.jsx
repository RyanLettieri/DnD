import React, { useState } from 'react';
import {
  Activity,
  Brain,
  BookOpen,
  Cross,
  Dumbbell,
  Eye,
  Flame,
  Footprints,
  Gauge,
  MessageCircle,
  MoveDiagonal,
  Shield,
  ShieldPlus,
  Sparkles,
  Swords,
  WandSparkles,
  Wrench,
  Zap,
  ScrollText
} from 'lucide-react';
import usePersistentState from '../hooks/usePersistentState';
import '../styles/enhancements.css';
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
import { DND_CLASSES } from '../data/characterOptions';
import { applyRest, getDerivedStats, previewRestChanges } from '../utils/characterRules';

const SheetIcon = ({ name }) => {
  const icons = {
    strength: Dumbbell,
    dexterity: MoveDiagonal,
    constitution: Shield,
    intelligence: Brain,
    wisdom: Eye,
    charisma: MessageCircle,
    armor: Shield,
    shield: Shield,
    damage: Swords,
    attack: Swords,
    heal: Cross,
    maxhp: ShieldPlus,
    initiative: Zap,
    speed: Footprints,
    cantrip: Sparkles,
    spell: BookOpen,
    infuse: WandSparkles,
    tool: Wrench,
    effect: Activity,
    rage: Flame,
    background: ScrollText,
    generic: Gauge
  };

  const Icon = icons[name] || icons.generic;
  return <Icon aria-hidden="true" size={18} strokeWidth={2.2} />;
};

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
  const [restPreview, setRestPreview] = useState(null);
  
  // States for conditions autocomplete
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // States for customizable quick actions and attacks
  const [customQuickActions, setCustomQuickActions] = usePersistentState(`${characterDataPrefix}_customQuickActions`, []);
  const [customAttacks, setCustomAttacks] = usePersistentState(`${characterDataPrefix}_customAttacks`, []);
  
  // States for quick actions autocomplete
  const [quickActionInput, setQuickActionInput] = useState('');
  const [quickActionSuggestions, setQuickActionSuggestions] = useState([]);
  const [showQuickActionSuggestions, setShowQuickActionSuggestions] = useState(false);
  
  // Common D&D 5e conditions for autocomplete
  const COMMON_CONDITIONS = [
    'Blinded', 'Charmed', 'Deafened', 'Frightened', 'Grappled', 'Incapacitated',
    'Invisible', 'Paralyzed', 'Petrified', 'Poisoned', 'Prone', 'Restrained',
    'Stunned', 'Unconscious', 'Exhaustion', 'Concentrating', 'Dominated',
    'Confused', 'Nauseated', 'Diseased', 'Cursed', 'Invisible'
  ];

  // All available actions for quick actions autocomplete
  const ALL_AVAILABLE_ACTIONS = [
    // Standard Actions
    'Attack', 'Cast a Spell', 'Dash', 'Disengage', 'Dodge', 'Help', 'Hide', 'Ready', 'Search', 'Use an Object',
    'Grapple', 'Shove', 'Improvise Weapon', 'Unarmed Strike', 'Two-Weapon Attack', 'Opportunity Attack',
    
    // Bonus Actions
    'Second Wind', 'Action Surge', 'Rage', 'Unarmored Defense', 'Reckless Attack', 'Danger Sense', 'Feral Instinct',
    'Fast Movement', 'Brutal Critical', 'Relentless Rage', 'Persistent Rage', 'Indomitable Might', 'Primal Champion',
    'Infuse Item', 'Flash of Genius', 'Shield', 'Artificer Infusion', 'Magical Tinkering', 'Spell-Storing Item',
    'Eldritch Cannon', 'Firebolt Cantrip', 'Shell Defense', 'Turtle Defense', 'Natural Armor',
    'Second Wind (Fighter)', 'Battle Master Maneuver', 'Superiority Dice', 'Action Surge (Fighter)',
    'Fighting Style', 'Second Wind (Warlock)', 'Eldritch Blast', 'Hexblade\'s Curse', 'Armor of Shadows',
    'Bardic Inspiration', 'Song of Rest', 'Font of Inspiration', 'Expertise', 'Jack of All Trades',
    'Subclass Feature', 'Metamagic', 'Sorcery Points', 'Font of Magic', 'Arcane Recovery',
    'Divine Smite', 'Lay on Hands', 'Divine Sense', 'Fighting Style (Paladin)', 'Aura of Protection',
    'Aura of Courage', 'Improved Divine Smite', 'Cleansing Touch', 'Channel Divinity', 'Sacred Oath',
    
    // Reactions
    'Opportunity Attack', 'Shield Spell', 'Counterspell', 'Feather Fall', 'Absorb Elements', 'Protection',
    'Riposte', 'Parry', 'Uncanny Dodge', 'Evasion', 'Defensive Duelist', 'Shield Master',
    'Sentinel', 'War Caster', 'Mage Slayer', 'Grappler', 'Tavern Brawler', 'Mobile',
    'Charger', 'Tavern Brawler', 'Tough', 'Resilient', 'Athlete', 'Heavily Armored',
    'Moderately Armored', 'Lightly Armored', 'Weapon Master', 'Keen Mind', 'Linguist',
    'Actor', 'Alert', 'Athlete', 'Charger', 'Crossbow Expert', 'Dual Wielder',
    'Grappler', 'Great Weapon Master', 'Healer', 'Heavy Armor Master', 'Inspiring Leader',
    'Keen Mind', 'Lightly Armored', 'Linguist', 'Lucky', 'Mage Slayer', 'Mobile',
    'Moderately Armored', 'Mounted Combatant', 'Observant', 'Polearm Master', 'Resilient',
    'Ritual Caster', 'Sentinel', 'Sharpshooter', 'Shield Master', 'Skilled', 'Skulker',
    'Spell Sniper', 'Tavern Brawler', 'Tough', 'War Caster', 'Weapon Master',
    
    // Special Actions
    'Long Rest', 'Short Rest', 'Hit Dice Recovery', 'Death Saving Throw', 'Stabilize', 'First Aid',
    'Identify Magic Item', 'Attune Magic Item', 'Use Magic Item', 'Drink Potion', 'Apply Oil',
    'Use Scroll', 'Use Wand', 'Read Magic', 'Detect Magic', 'Identify', 'Dispel Magic',
    'Break Object', 'Repair Object', 'Craft Item', 'Forge Document', 'Pick Lock', 'Disarm Trap',
    'Set Trap', 'Track', 'Survive', 'Forage', 'Hunt', 'Gather Resources',
    'Build Camp', 'Start Fire', 'Cook Meal', 'Clean Equipment', 'Maintain Armor', 'Sharpen Weapon',
    'Study', 'Research', 'Consult Expert', 'Gather Information', 'Interrogate', 'Persuade',
    'Intimidate', 'Deceive', 'Bargain', 'Perform', 'Play Instrument', 'Tell Story',
    'Pray', 'Meditate', 'Commune', 'Divination', 'Scry', 'Contact Other Plane',
    'Wild Shape', 'Beast Sense', 'Speak with Animals', 'Speak with Plants', 'Speak with Stones',
    'Elemental Communication', 'Telepathy', 'Detect Thoughts', 'Suggestion', 'Charm Person',
    'Command', 'Fear', 'Hold Person', 'Sleep', 'Magic Missile', 'Fireball',
    'Lightning Bolt', 'Cone of Cold', 'Chain Lightning', 'Teleport', 'Plane Shift',
    'Gate', 'Wish', 'Time Stop', 'True Polymorph', 'Antimagic Field', 'Force Cage',
    
    // Movement Actions
    'Climb', 'Swim', 'Fly', 'Burrow', 'Jump', 'Run', 'Sprint', 'Dash (Bonus)', 'Disengage (Bonus)',
    'Hide (Bonus)', 'Ready (Bonus)', 'Stand Up', 'Crawl', 'Squeeze', 'Escape Grapple',
    'Break Grapple', 'Maintain Grapple', 'Move Prone', 'Stand from Prone', 'Help (Bonus)',
    'Use Object (Bonus)', 'Interact with Object', 'Open Door', 'Close Door', 'Unlock Door',
    'Lock Door', 'Search Area', 'Investigate', 'Perception Check', 'Investigation Check',
    'Insight Check', 'Medicine Check', 'Nature Check', 'Religion Check', 'Arcana Check',
    'History Check', 'Performance Check', 'Persuasion Check', 'Deception Check', 'Intimidation Check',
    
    // Combat Maneuvers
    'Trip Attack', 'Disarming Attack', 'Menacing Attack', 'Pushing Attack', 'Sweeping Attack',
    'Rally', 'Feinting Attack', 'Lunging Attack', 'Precision Attack', 'Commanding Presence',
    'Grappling Strike', 'Disarming Strike', 'Tripping Attack', 'Sundering Strike', 'Menacing Strike',
    'Bait and Switch', 'Distracting Strike', 'Parry', 'Riposte', 'Lunge', 'Sweep',
    'Tumble', 'Dodge and Weave', 'Block', 'Parry and Riposte', 'Counter Attack', 'Flurry of Blows',
    'Patient Defense', 'Step of the Wind', 'Stunning Strike', 'Quivering Palm', 'Deflect Missiles',
    'Slow Fall', 'Catch Projectile', 'Arrow Catching', 'Snatch Arrows', 'Deflect Missiles (Monk)',
    'Ki Points', 'Martial Arts', 'Unarmored Movement', 'Stillness of Mind', 'Purity of Body',
    
    // Special Abilities
    'Darkvision', 'Superior Darkvision', 'Devil\'s Sight', 'Truesight', 'Blindsight', 'Tremorsense',
    'Invisibility', 'Greater Invisibility', 'Etherealness', 'Gaseous Form', 'Stone Shape', 'Passwall',
    'Telekinesis', 'Telepathic Bond', 'Rary\'s Telepathic Bond', 'Sending', 'Message', 'Whisper',
    'Comprehend Languages', 'Tongues', 'Speak with Dead', 'Speak with Animals', 'Speak with Plants',
    'Animal Friendship', 'Animal Handling', 'Calming Animals', 'Soothe Animals', 'Command Animals',
    'Beast Bond', 'Fey Ancestry', 'Fascination', 'Mirthful Runes', 'Natural Explorer',
    'Favored Enemy', 'Explorer\'s Lore', 'Wanderer', 'Dreadful Strikes', 'Paralyzing Strikes',
    'Venomous Strikes', 'Symbiotic Entity', 'Wild Companion', 'Primal Strike', 'Guardian Spirit',
    'Nature\'s Veil', 'Feral Senses', 'Walker in Dreams', 'Eyes of the Forest', 'Eyes of the Mountain',
    'Eyes of the Sea', 'Eyes of the Storm', 'Eyes of the Desert', 'Eyes of the Underdark'
  ];

  const characterClass = character?.class || stats.class || 'Artificer';
  const classConfig = DND_CLASSES[characterClass] || DND_CLASSES.Artificer;
  const tabs = [
    { id: 'main', label: 'Character' },
    { id: 'background', label: 'Background' },
    { id: 'combat', label: 'Combat' },
    { id: 'actions', label: 'Actions' },
    ...(classConfig.spellcaster ? [{ id: 'spells', label: 'Spells' }] : []),
    ...(characterClass === 'Artificer' ? [{ id: 'infusions', label: 'Infusions' }] : []),
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

  const updateTempHP = (value) => {
    const tempHP = Math.max(0, Number(value) || 0);
    const newStats = { ...stats, tempHP };
    setStats(newStats);
    updateCharacterData({ stats: newStats });
  };

  const adjustTempHP = (amount) => {
    updateTempHP((Number(stats.tempHP) || 0) + amount);
  };

  const openRestPreview = (type) => {
    setRestPreview({
      type,
      changes: previewRestChanges({ stats, conditions: activeConditions, type })
    });
  };

  const confirmRest = () => {
    if (!restPreview) return;
    const newStats = applyRest({ stats, type: restPreview.type });
    setStats(newStats);
    updateCharacterData({ stats: newStats });
    setRestPreview(null);
  };

  const getModifier = (stat) => {
    const parsedStat = parseInt(stat) || 10;
    return Math.floor((parsedStat - 10) / 2);
  };

  const derivedStats = getDerivedStats(stats, character);

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

  const renderMainTab = () => {
    const characterClass = character?.class || stats.class || 'Artificer';
    const strMod = getModifier(parseInt(stats.strength) || 10);
    const dexMod = derivedStats.initiative;
    
    return (
      <div className="character-overview min-h-screen p-4">
        {/* Three Column Grid Layout */}
        <div className="sheet-grid grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5">
          
          {/* Left Column - Narrow */}
          <div className="lg:col-span-3 space-y-5">
            
            {/* Abilities Card */}
            <div className="sheet-panel p-5">
              <h3 className="sheet-title">Ability Scores</h3>
              <div className="ability-score-list mb-4">
                {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map(ability => {
                  const value = parseInt(stats[ability]) || 10;
                  const modifier = getModifier(value);
                  const abilityName = ability === 'constitution' ? 'CON' : 
                                    ability === 'intelligence' ? 'INT' : 
                                    ability === 'dexterity' ? 'DEX' : 
                                    ability === 'charisma' ? 'CHA' : 
                                    ability === 'strength' ? 'STR' : 
                                    ability === 'wisdom' ? 'WIS' : ability;
                  
                  const abilityIcons = {
                    strength: 'strength',
                    dexterity: 'dexterity',
                    constitution: 'constitution',
                    intelligence: 'intelligence',
                    wisdom: 'wisdom',
                    charisma: 'charisma'
                  };
                  
                  return (
                    <div key={ability} className="ability-score-row">
                      <div className="sheet-icon ability-score-icon"><SheetIcon name={abilityIcons[ability]} /></div>
                      <div className="ability-score-name">{abilityName}</div>
                      <div className="ability-score-value">{value}</div>
                      <div className="ability-score-mod">
                        {modifier >= 0 ? '+' : ''}{modifier}
                      </div>
                    </div>
                  );
                })}
              </div>
              <button 
                onClick={() => setActiveTab('skills')}
                className="sheet-ghost-button w-full"
              >
                View Saves & Skills
              </button>
            </div>

            {/* Proficiencies Card */}
            <div className="sheet-panel p-5">
              <h3 className="sheet-title">Saving Throws</h3>
              <div className="save-list">
                {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map(ability => {
                  const abilityName = ability === 'constitution' ? 'CON' : 
                                    ability === 'intelligence' ? 'INT' : 
                                    ability === 'dexterity' ? 'DEX' : 
                                    ability === 'charisma' ? 'CHA' : 
                                    ability === 'strength' ? 'STR' : 
                                    ability === 'wisdom' ? 'WIS' : ability;
                  const value = parseInt(stats[ability]) || 10;
                  const modifier = getModifier(value) + (savingThrowProficiencies[ability] ? derivedStats.proficiencyBonus : 0);
                  return (
                    <div key={ability} className="save-row">
                      <span className={`save-dot ${savingThrowProficiencies[ability] ? 'is-proficient' : ''}`} />
                      <span className="save-name">{abilityName}</span>
                      <span className="save-value">{modifier >= 0 ? '+' : ''}{modifier}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Center Column - Wide */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Combat Summary */}
            <div className="sheet-panel hp-panel p-6">
              <h3 className="sheet-title centered-title">Hit Points</h3>
              
              {/* Modern 2-Column Layout */}
              <div className="flex items-center justify-between gap-8 mb-8 hp-layout">
                {/* Left: Circular HP Meter */}
                <div className="flex-shrink-0">
                  <div className="hp-orb relative w-44 h-44">
                    {/* HP Ring SVG */}
                    <svg className="w-full h-full" viewBox="0 0 176 176">
                      {/* Background ring */}
                      <circle
                        cx="88"
                        cy="88"
                        r="70"
                        stroke="#d4c8a8"
                        strokeWidth="14"
                        fill="none"
                      />
                      {/* HP fill ring */}
                      <defs>
                        <linearGradient id="hpGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#22c55e" />
                          <stop offset="50%" stopColor="#16a34a" />
                          <stop offset="100%" stopColor="#15803d" />
                        </linearGradient>
                      </defs>
                      <circle
                        cx="88"
                        cy="88"
                        r="70"
                        stroke="url(#hpGradient)"
                        strokeWidth="14"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 70}`}
                        strokeDashoffset={`${2 * Math.PI * 70 * (1 - (Math.min(100, Math.max(0, ((Number(stats.HP) || 0) / (Number(stats.MaxHP) || 1)) * 100)) / 100))}`}
                        className="transition-all duration-500 ease-out"
                        style={{
                          filter: (Number(stats.HP) || 0) < (Number(stats.MaxHP) || 1) * 0.25 ? 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.6))' : 'none'
                        }}
                        transform="rotate(-90 88 88)"
                      />
                    </svg>
                    
                    {/* HP Text Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="hp-current-value">
                        {Number(stats.HP) || 0}
                      </div>
                      <div className="hp-max-value">
                        / {Number(stats.MaxHP) || 1}
                      </div>
                      {(Number(stats.tempHP) || 0) > 0 && (
                        <div className="hp-temp-badge">+{Number(stats.tempHP) || 0} temp</div>
                      )}
                    </div>
                    
                    {/* Low HP Pulse Animation */}
                    {(Number(stats.HP) || 0) < (Number(stats.MaxHP) || 1) * 0.25 && (
                      <div className="absolute inset-4 rounded-full border-2 border-red-400 animate-pulse opacity-50" />
                    )}
                  </div>
                </div>
                
                {/* Right: Vertical Action Buttons */}
                <div className="hp-controls flex flex-col gap-3 flex-1 max-w-xs">
                  <button
                    onClick={() => openHpModal("damage")}
                    className="sheet-action-button damage-action"
                  >
                    <span className="sheet-icon action-icon"><SheetIcon name="damage" /></span>
                    <span>Damage</span>
                  </button>
                  <button
                    onClick={() => openHpModal("heal")}
                    className="sheet-action-button heal-action"
                  >
                    <span className="sheet-icon action-icon"><SheetIcon name="heal" /></span>
                    <span>Heal</span>
                  </button>
                  <button
                    onClick={() => setMaxHpModalOpen(true)}
                    className="sheet-action-button maxhp-action"
                  >
                    <span className="sheet-icon action-icon"><SheetIcon name="maxhp" /></span>
                    <span>Max HP</span>
                  </button>
                </div>
              </div>

              <div className="hp-resource-panel">
                <div className="temp-hp-control">
                  <div>
                    <div className="temp-hp-title">Temporary HP</div>
                    <div className="temp-hp-note">Damage is absorbed here first.</div>
                  </div>
                  <div className="temp-hp-stepper">
                    <button onClick={() => adjustTempHP(-5)} aria-label="Decrease temporary HP by 5">-5</button>
                    <button onClick={() => adjustTempHP(-1)} aria-label="Decrease temporary HP by 1">-</button>
                    <input
                      type="number"
                      min="0"
                      value={Number(stats.tempHP) || 0}
                      onChange={(e) => updateTempHP(e.target.value)}
                    />
                    <button onClick={() => adjustTempHP(1)} aria-label="Increase temporary HP by 1">+</button>
                    <button onClick={() => adjustTempHP(5)} aria-label="Increase temporary HP by 5">+5</button>
                  </div>
                </div>
              </div>

              {/* Combat Badges */}
              <div className="combat-stat-panel grid grid-cols-3 gap-4 mb-4">
                <div className="combat-stat">
                  <div className="combat-stat-icon">
                    <span className="sheet-icon stat-icon"><SheetIcon name="armor" /></span>
                  </div>
                  <div className="combat-stat-label">Armor Class</div>
                  <div className="combat-stat-value">
                    {derivedStats.armorClass}
                  </div>
                </div>
                
                <div className="combat-stat">
                  <div className="combat-stat-icon">
                    <span className="sheet-icon stat-icon"><SheetIcon name="initiative" /></span>
                  </div>
                  <div className="combat-stat-label">Initiative</div>
                  <div className="combat-stat-value">
                    {dexMod >= 0 ? '+' : ''}{dexMod}
                  </div>
                </div>
                
                <div className="combat-stat">
                  <div className="combat-stat-icon">
                    <span className="sheet-icon stat-icon"><SheetIcon name="speed" /></span>
                  </div>
                  <div className="combat-stat-label">Speed</div>
                  <div className="combat-stat-value">{stats.speed || 30}<span className="combat-unit"> ft.</span></div>
                </div>
              </div>

              {/* Rage Tracking (Barbarian Only) */}
              {characterClass === 'Barbarian' && (
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm font-semibold text-[#654321] mb-2">Rage</div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1">
                        <input 
                          type="number" 
                          placeholder="Current"
                          className="w-full px-2 py-1 border border-[#d4c8a8] rounded text-sm text-center"
                          defaultValue="0"
                        />
                      </div>
                      <span className="text-[#8B4513]">/</span>
                      <div className="flex-1">
                        <input 
                          type="number" 
                          placeholder="Total"
                          className="w-full px-2 py-1 border border-[#d4c8a8] rounded text-sm text-center"
                          defaultValue={Math.floor(stats.level / 2) + 2}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#654321] mb-2">Rage Damage</div>
                    <input 
                      type="number" 
                      placeholder="+2"
                      className="w-full px-2 py-1 border border-[#d4c8a8] rounded text-sm text-center"
                      defaultValue="2"
                    />
                  </div>
                </div>
              )}

              {/* Death Saving Throws - Show when HP is 0 */}
              {(Number(stats.HP) || 0) === 0 && (
                <div className="mt-4">
                  <h3 className="font-bold text-[#654321] mb-3 text-base" style={{ fontFamily: 'Cinzel, serif', textTransform: 'small-caps' }}>Death Saving Throws</h3>
                  <DeathSavingThrows characterDataPrefix={characterDataPrefix} />
                </div>
              )}

            </div>

            <div className="sheet-panel active-effects-panel p-5">
              <h3 className="sheet-title">Active Effects</h3>
              <div className="effect-list">
                {activeConditions.length > 0 ? (
                  activeConditions.slice(0, 3).map((condition) => (
                    <div className="effect-chip" key={condition}>
                      <span className="sheet-icon effect-icon"><SheetIcon name="effect" /></span>
                      <span className="effect-name">{condition}</span>
                      <span className="effect-meta">Active</span>
                      <span className="effect-duration">Tracked</span>
                    </div>
                  ))
                ) : (
                  <div className="empty-effects">No active effects</div>
                )}
              </div>
            </div>

            {/* Attacks/Spells Block */}
            <div className="sheet-panel attacks-panel p-5">
              <h3 className="sheet-title">
                {characterClass === 'Artificer' ? 'Spells/Cantrips' : 'Attacks'}
              </h3>
              <div className="attack-table mb-4">
                {(() => {
                  if (characterClass === 'Artificer') {
                    // Show prepared spells and cantrips for Artificer
                    const allPreparedSpells = [];
                    
                    // Add cantrips (level 0)
                    if (preparedSpells[0]) {
                      preparedSpells[0].forEach(spell => {
                        allPreparedSpells.push({
                          name: spell,
                          type: 'Cantrip',
                          icon: 'cantrip',
                          details: SPELL_DETAILS[spell] || {}
                        });
                      });
                    }
                    
                    // Add prepared spells (levels 1+)
                    for (let level = 1; level <= 9; level++) {
                      if (preparedSpells[level]) {
                        preparedSpells[level].forEach(spell => {
                          allPreparedSpells.push({
                            name: spell,
                            type: `Level ${level}`,
                            icon: 'spell',
                            details: SPELL_DETAILS[spell] || {}
                          });
                        });
                      }
                    }
                    
                    if (allPreparedSpells.length === 0) {
                      return (
                        <div className="text-sm text-[#8B4513] text-center py-4">No spells prepared</div>
                      );
                    }
                    
                    return allPreparedSpells.map((spell, index) => (
                      <div key={index} className="attack-row">
                        <div className="flex items-center space-x-2">
                          <span className="sheet-icon attack-icon"><SheetIcon name={spell.icon} /></span>
                          <div className="flex-1">
                            <div className="attack-name">{spell.name}</div>
                            <div className="attack-meta">{spell.type}</div>
                          </div>
                        </div>
                        <div className="attack-damage">
                          {spell.details.damage ? spell.details.damage : '—'}
                        </div>
                      </div>
                    ));
                    
                  } else if (characterClass === 'Barbarian') {
                    // Show attacks for Barbarian
                    return (
                      <>
                        <div className="flex items-center justify-between p-3 bg-[#f5e6d3] border border-[#d4c8a8] rounded">
                          <div className="flex-1">
                            <div className="font-semibold text-[#654321]">Greataxe</div>
                            <div className="text-sm text-[#8B4513]">+{strMod} | 2d12 + 3</div>
                          </div>
                          <div className="text-sm font-bold text-[#654321]">2d12 + 3</div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[#f5e6d3] border border-[#d4c8a8] rounded">
                          <div className="flex-1">
                            <div className="font-semibold text-[#654321]">Javelin</div>
                            <div className="text-sm text-[#8B4513]">+{strMod} | 1d6 + 1</div>
                          </div>
                          <div className="text-sm font-bold text-[#654321]">1d6 + 1</div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[#f5e6d3] border border-[#d4c8a8] rounded">
                          <div className="flex-1">
                            <div className="font-semibold text-[#654321]">Unarmed Strike</div>
                            <div className="text-sm text-[#8B4513]">+{strMod} | 1 + {strMod}</div>
                          </div>
                          <div className="text-sm font-bold text-[#654321]">1 + {strMod}</div>
                        </div>
                      </>
                    );
                  } else {
                    // Default attacks for other classes
                    return (
                      <>
                        <div className="flex items-center justify-between p-3 bg-[#f5e6d3] border border-[#d4c8a8] rounded">
                          <div className="flex-1">
                            <div className="font-semibold text-[#654321]">Longsword</div>
                            <div className="text-sm text-[#8B4513]">+{strMod} | 1d8 + 1</div>
                          </div>
                          <div className="text-sm font-bold text-[#654321]">1d8 + 1</div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[#f5e6d3] border border-[#d4c8a8] rounded">
                          <div className="flex-1">
                            <div className="font-semibold text-[#654321]">Shortsword</div>
                            <div className="text-sm text-[#8B4513]">+{strMod} | 1d6</div>
                          </div>
                          <div className="text-sm font-bold text-[#654321]">1d6</div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[#f5e6d3] border border-[#d4c8a8] rounded">
                          <div className="flex-1">
                            <div className="font-semibold text-[#654321]">Dagger</div>
                            <div className="text-sm text-[#8B4513]">+{dexMod} | 1d4</div>
                          </div>
                          <div className="text-sm font-bold text-[#654321]">1d4</div>
                        </div>
                      </>
                    );
                  }
                })()}
              </div>
              <button 
                onClick={() => setActiveTab(characterClass === 'Artificer' ? 'spells' : 'actions')}
                className="sheet-ghost-button w-full"
              >
                View All {characterClass === 'Artificer' ? 'Spells' : 'Attacks'}
              </button>
            </div>
          </div>

          {/* Right Column - Narrow */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Quick Actions Block */}
            <div className="sheet-panel p-5">
              <h3 className="sheet-title with-gear">Quick Actions</h3>
              <div className="space-y-2 mb-4">
                {(() => {
                  // Get all actions (default + custom)
                  const getAllActions = () => {
                    const defaultActions = [];
                    
                    if (characterClass === 'Barbarian') {
                      defaultActions.push(
                        { name: 'Rage', icon: 'rage' },
                        { name: 'Unarmored Defense', icon: 'armor' },
                        { name: 'Reckless Attack', icon: 'attack' },
                        { name: 'Danger Sense', icon: 'wisdom' }
                      );
                    } else if (characterClass === 'Artificer') {
                      defaultActions.push(
                        { name: 'Infuse Item', icon: 'infuse' },
                        { name: 'Shield', icon: 'shield' }
                      );
                    } else if (character?.name === 'Inituga' && character?.race === 'Tortle') {
                      defaultActions.push(
                        { name: 'Eldritch Cannon', icon: 'spell' },
                        { name: 'Firebolt Cantrip', icon: 'cantrip' },
                        { name: 'Shell Defense', icon: 'shield' }
                      );
                    }
                    
                    // Add custom actions with default icon
                    const customActionsWithIcons = customQuickActions.map(action => ({
                      name: action,
                      icon: 'tool'
                    }));
                    
                    return [...defaultActions, ...customActionsWithIcons];
                  };

                  const allActions = getAllActions();
                  
                  if (allActions.length === 0) {
                    return (
                      <div className="text-sm text-[#8B4513] text-center py-4">No quick actions available</div>
                    );
                  }

                  return allActions.map((action, index) => (
                    <div key={index} className="side-action-row">
                      <span className="sheet-icon side-action-icon"><SheetIcon name={action.icon} /></span>
                      <div className="flex-1">
                        <div className="side-action-name">{action.name}</div>
                      </div>
                      {customQuickActions.includes(action.name) && (
                        <button
                          onClick={() => setCustomQuickActions(prev => prev.filter(a => a !== action.name))}
                          className="remove-link"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ));
                })()}
              </div>
              
              {/* Add Custom Action Input */}
              <div className="mb-4">
                <div className="relative">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add custom quick action..."
                      className="sheet-input flex-1 min-w-0"
                      value={quickActionInput}
                      onChange={(e) => {
                        const value = e.target.value.trim();
                        setQuickActionInput(value);
                        if (value.length > 0) {
                          const filtered = ALL_AVAILABLE_ACTIONS.filter(action =>
                            action.toLowerCase().includes(value.toLowerCase())
                          );
                          setQuickActionSuggestions(filtered);
                          setShowQuickActionSuggestions(true);
                        } else {
                          setShowQuickActionSuggestions(false);
                        }
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const action = quickActionInput.trim();
                          if (action && !customQuickActions.includes(action)) {
                            setCustomQuickActions(prev => [...prev, action]);
                            setQuickActionInput('');
                            setShowQuickActionSuggestions(false);
                          }
                        }
                      }}
                      onFocus={() => {
                        if (quickActionInput.length > 0) {
                          const filtered = ALL_AVAILABLE_ACTIONS.filter(action =>
                            action.toLowerCase().includes(quickActionInput.toLowerCase())
                          );
                          setQuickActionSuggestions(filtered);
                          setShowQuickActionSuggestions(true);
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        const action = quickActionInput.trim();
                        if (action && !customQuickActions.includes(action)) {
                          setCustomQuickActions(prev => [...prev, action]);
                          setQuickActionInput('');
                          setShowQuickActionSuggestions(false);
                        }
                      }}
                      className="sheet-add-button"
                    >
                      Add
                    </button>
                  </div>
                  
                  {/* Autocomplete Dropdown */}
                  {showQuickActionSuggestions && quickActionSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#d4c8a8] rounded shadow-lg z-10 max-h-40 overflow-y-auto">
                      {quickActionSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="px-3 py-2 hover:bg-[#f5e6d3] cursor-pointer text-sm text-[#654321]"
                          onClick={() => {
                            if (!customQuickActions.includes(suggestion)) {
                              setCustomQuickActions(prev => [...prev, suggestion]);
                            }
                            setQuickActionInput('');
                            setShowQuickActionSuggestions(false);
                          }}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <button 
                onClick={() => setActiveTab('actions')}
                className="sheet-ghost-button w-full"
              >
                Manage Actions
              </button>
            </div>

            {/* Conditions Block */}
            <div className="sheet-panel p-5">
              <h3 className="sheet-title with-plus">Conditions</h3>
              
              {/* Add Condition Input */}
              <div className="mb-3">
                <div className="relative w-full">
                  <div className="flex gap-2 w-full">
                    <input
                      type="text"
                      placeholder="Enter condition name..."
                      className="sheet-input flex-1 min-w-0"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const input = e.target;
                          const condition = input.value.trim();
                          if (condition && !activeConditions.includes(condition)) {
                            setActiveConditions(prev => [...prev, condition]);
                            input.value = '';
                            setShowSuggestions(false);
                          }
                        }
                      }}
                      onChange={(e) => {
                        const value = e.target.value.trim();
                        setInputValue(value);
                        if (value.length > 0) {
                          const filtered = COMMON_CONDITIONS.filter(condition =>
                            condition.toLowerCase().includes(value.toLowerCase())
                          );
                          setSuggestions(filtered);
                          setShowSuggestions(true);
                        } else {
                          setShowSuggestions(false);
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        const input = document.querySelector('input[placeholder="Enter condition name..."]');
                        const condition = input.value.trim();
                        if (condition && !activeConditions.includes(condition)) {
                          setActiveConditions(prev => [...prev, condition]);
                          input.value = '';
                          setShowSuggestions(false);
                        }
                      }}
                      className="sheet-add-button"
                    >
                      Add
                    </button>
                  </div>
                  
                  {/* Autocomplete Dropdown */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#d4c8a8] rounded shadow-lg z-10 max-h-40 overflow-y-auto">
                      {suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="px-3 py-2 hover:bg-[#f5e6d3] cursor-pointer text-sm"
                          onClick={() => {
                            const input = document.querySelector('input[placeholder="Enter condition name..."]');
                            input.value = suggestion;
                            setShowSuggestions(false);
                          }}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Conditions List */}
              <div className="space-y-2">
                {activeConditions.length > 0 ? (
                  activeConditions.map((condition, index) => (
                    <div key={index} className="side-action-row">
                      <div className="flex-1">
                        <div className="side-action-name">{condition}</div>
                        <div className="side-action-meta">Duration: 1 minute</div>
                      </div>
                      <button
                        onClick={() => setActiveConditions(prev => 
                          prev.filter(c => c !== condition)
                        )}
                        className="text-[#8B4513] hover:text-[#654321] text-sm font-bold ml-2"
                      >
                        ×
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-[#8B4513] text-center py-4">No active conditions</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row - Full Width Features & Traits */}
        <div className="sheet-feature-strip sheet-panel p-5">
          <h3 className="font-bold text-[#654321] mb-4 text-base" style={{ fontFamily: 'Cinzel, serif', textTransform: 'small-caps' }}>Features & Traits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {(() => {
              if (characterClass === 'Barbarian') {
                return (
                  <>
                    <div className="flex items-start space-x-3 p-3 bg-[#f5e6d3] border border-[#d4c8a8] rounded">
                      <span className="sheet-icon feature-icon"><SheetIcon name="rage" /></span>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-[#654321] mb-1">Rage</div>
                        <div className="text-xs text-[#8B4513]">While raging, you gain advantage on Strength checks and saving throws, plus resistance to bludgeoning, piercing, and slashing damage.</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-[#f5e6d3] border border-[#d4c8a8] rounded">
                      <span className="sheet-icon feature-icon"><SheetIcon name="armor" /></span>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-[#654321] mb-1">Unarmored Defense</div>
                        <div className="text-xs text-[#8B4513]">Your AC equals 10 + your Dexterity modifier + your Constitution modifier when not wearing armor.</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-[#f5e6d3] border border-[#d4c8a8] rounded">
                      <span className="sheet-icon feature-icon"><SheetIcon name="attack" /></span>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-[#654321] mb-1">Reckless Attack</div>
                        <div className="text-xs text-[#8B4513]">You can choose to attack recklessly, gaining advantage on the attack roll but giving enemies advantage on attacks against you.</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-[#f5e6d3] border border-[#d4c8a8] rounded">
                      <span className="sheet-icon feature-icon"><SheetIcon name="wisdom" /></span>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-[#654321] mb-1">Danger Sense</div>
                        <div className="text-xs text-[#8B4513]">You have advantage on Dexterity saving throws against effects that you can see, such as traps and spells.</div>
                      </div>
                    </div>
                  </>
                );
              } else if (characterClass === 'Artificer') {
                return (
                  <>
                    <div className="flex items-start space-x-3 p-3 bg-[#f5e6d3] border border-[#d4c8a8] rounded">
                      <span className="sheet-icon feature-icon"><SheetIcon name="tool" /></span>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-[#654321] mb-1">Magical Tinkering</div>
                        <div className="text-xs text-[#8B4513]">You can cast the Mending cantrip at will and can detect magic within 10 feet.</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-[#f5e6d3] border border-[#d4c8a8] rounded">
                      <span className="sheet-icon feature-icon"><SheetIcon name="initiative" /></span>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-[#654321] mb-1">Flash of Genius</div>
                        <div className="text-xs text-[#8B4513]">You can create a flash of mental energy that forces creatures to make an Intelligence save or be stunned.</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-[#f5e6d3] border border-[#d4c8a8] rounded">
                      <span className="sheet-icon feature-icon"><SheetIcon name="infuse" /></span>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-[#654321] mb-1">Infuse Item</div>
                        <div className="text-xs text-[#8B4513]">You can infuse nonmagical items with magical properties, creating temporary magic items.</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-[#f5e6d3] border border-[#d4c8a8] rounded">
                      <span className="sheet-icon feature-icon"><SheetIcon name="spell" /></span>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-[#654321] mb-1">Spellcasting</div>
                        <div className="text-xs text-[#8B4513]">You can cast spells from the Artificer spell list, preparing a number of spells equal to your Intelligence modifier.</div>
                      </div>
                    </div>
                  </>
                );
              } else {
                return (
                  <div className="col-span-4 text-sm text-[#8B4513] text-center py-4">
                    No class features available
                  </div>
                );
              }
            })()}
          </div>
          <button 
            onClick={() => setActiveTab('features')}
            className="w-full px-3 py-2 bg-[#8B4513] hover:bg-[#654321] text-white rounded text-sm font-semibold transition-colors"
          >
            View All Features
          </button>
        </div>
      </div>
    );
  };

  const renderNotesTab = () => (
    <EnhancedNotes characterDataPrefix={characterDataPrefix} />
  );

  const renderBackgroundTab = () => {
    const characterClass = character?.class || stats.class || 'Artificer';
    
    if (characterClass !== 'Artificer') {
      return (
        <div className="text-center parchment-text-light py-16">
          <div className="sheet-empty-icon"><SheetIcon name="background" /></div>
          <h3 className="text-xl font-bold mb-2">No Scribe Background</h3>
          <p className="text-sm max-w-md mx-auto">
            The Scribe background is specific to Artificer characters. {characterClass}s have different background options and features.
          </p>
        </div>
      );
    }
    
    return (
      <div className="tab-page space-y-6">
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
    <div className="tab-page space-y-6">
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
    const canCastSpells = Boolean((DND_CLASSES[characterClass] || DND_CLASSES.Artificer).spellcaster);
    
    if (!canCastSpells) {
      return (
        <div className="text-center parchment-text-light py-16">
          <div className="sheet-empty-icon"><SheetIcon name="attack" /></div>
          <h3 className="text-xl font-bold mb-2">No Spellcasting</h3>
          <p className="text-sm max-w-md mx-auto">
            {characterClass}s do not have spellcasting abilities. Focus on your martial prowess and class features instead!
          </p>
        </div>
      );
    }
    
    return (
      <div className="tab-page space-y-6">
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
                  <div className="sheet-empty-icon small"><SheetIcon name="spell" /></div>
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
          <div className="sheet-empty-icon"><SheetIcon name="infuse" /></div>
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
        return classConfig.spellcaster ? renderSpellsTab() : renderMainTab();
      case 'infusions':
        return characterClass === 'Artificer' ? renderInfusionsTab() : renderMainTab();
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
    <div className="character-sheet-shell min-h-screen" style={{
      backgroundImage: 'url(/framed-background.png)',
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }}>
      {/* Ornate border container */}
      <div className="character-sheet-frame min-h-screen relative">

      {/* Full-width page layout */}
      <div className="w-full min-h-screen bg-transparent">
        
        {/* Compact Header Bar */}
        <div className="sheet-header w-full px-8 py-5">
          <div className="flex items-center justify-between w-full gap-6">
            
            {/* Left: Back Button */}
            <button
              onClick={onBackToDashboard}
              className="sheet-back-link"
            >
              ← Back to Dashboard
            </button>

            {/* Center: Character Info */}
            <div className="sheet-identity flex items-center space-x-6 flex-1 justify-center">
              {/* Character Portrait */}
              <div className="sheet-portrait w-32 h-32 rounded-full overflow-hidden">
                <img 
                  src={character?.portrait || '/default-character-portrait.png'} 
                  alt={character?.name || 'Character'} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Character Name and Details */}
              <div className="sheet-nameplate">
                <input 
                  type="text" 
                  value={stats.characterName}
                  onChange={(e) => {
                    const newStats = { ...stats, characterName: e.target.value };
                    setStats(newStats);
                    updateCharacterData({ stats: newStats });
                  }}
                  className="sheet-name-input"
                  placeholder="Character Name"
                  style={{ fontFamily: 'Cinzel, serif' }}
                />
                <div className="sheet-subtitle mt-1">
                  {character?.class} • Level {stats.level} • {character?.race || 'Race not specified'}
                </div>
                <div className="sheet-epithet">
                  {getLevelTitle(stats.level, character?.class)}
                </div>
              </div>
            </div>

            {/* Right: Rest Buttons */}
            <div className="sheet-header-actions flex items-center space-x-3">
              <div className="level-control flex items-center space-x-2 mr-3">
                <span className="text-sm font-semibold text-[#654321] mr-1">Level</span>
                <button 
                  onClick={() => {
                    const newLevel = Math.max(1, stats.level - 1);
                    const newStats = { ...stats, level: newLevel };
                    setStats(newStats);
                    updateCharacterData({ 
                      stats: newStats,
                      level: newLevel
                    });
                  }}
                  className="level-stepper"
                >−</button>
                <span className="level-value">{stats.level}</span>
                <button 
                  onClick={() => {
                    const newLevel = Math.min(20, stats.level + 1);
                    const newStats = { ...stats, level: newLevel };
                    setStats(newStats);
                    updateCharacterData({ 
                      stats: newStats,
                      level: newLevel
                    });
                  }}
                  className="level-stepper"
                >+</button>
              </div>
              <button className="rest-button short-rest" onClick={() => openRestPreview('short')}>
                Short Rest
              </button>
              <button className="rest-button long-rest" onClick={() => openRestPreview('long')}>
                Long Rest
              </button>
            </div>
          </div>
        </div>

        {/* Full-width Tab Bar */}
        <div className="sheet-tabs w-full px-10">
          <div className="flex space-x-10 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`sheet-tab px-3 py-4 text-sm font-medium transition-all whitespace-nowrap border-b-2 ${
                  activeTab === tab.id
                    ? 'text-[#654321] border-[#8B4513]'
                    : 'text-[#8B4513] border-transparent hover:text-[#654321]'
                }`}
                style={{ fontFamily: 'Cinzel, serif', textTransform: 'small-caps' }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Three-column content area */}
      <div className="sheet-content p-6">
          {renderTabContent()}
        </div>
      </div>

      {/* Rest Preview Modal */}
      {restPreview && (
        <div className="fixed inset-0 modal-backdrop flex items-center justify-center z-50">
          <div className="sheet-panel p-6 rounded-xl shadow-2xl w-full max-w-md">
            <h2 className="sheet-title">
              {restPreview.type === 'long' ? 'Long Rest Preview' : 'Short Rest Preview'}
            </h2>
            <div className="rest-preview-list">
              {restPreview.changes.map((change, index) => (
                <div key={index} className="rest-preview-row">{change}</div>
              ))}
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                className="action-button secondary"
                onClick={() => setRestPreview(null)}
              >
                Cancel
              </button>
              <button
                className="action-button primary"
                onClick={confirmRest}
              >
                Apply Rest
              </button>
            </div>
          </div>
        </div>
      )}

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
