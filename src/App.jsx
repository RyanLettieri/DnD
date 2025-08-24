import React, { useState } from 'react';
import usePersistentState from './hooks/usePersistentState';
import './styles/enhancements.css';
import HPBar from './components/HPBar';
import Button from './components/Button';
import Card from './components/Card';
import Tabs from './components/Tabs';
import StatBox from './components/StatBox';
import ActionCard from './components/ActionCard';
import CurrencyInput from './components/CurrencyInput';
import SpellCard from './components/SpellCard';
import ElditchCannonCard from './components/ElditchCannonCard';
import CurrencyManager from './components/CurrencyManager';
import SavingThrows from './components/SavingThrows';
import ConditionsTracker from './components/ConditionsTracker';
import ProficienciesLanguages from './components/ProficienciesLanguages';
import Equipment from './components/Equipment';
import QuickActions from './components/QuickActions';
import SpellSlotTracker from './components/SpellSlotTracker';
import FeaturesTracker from './components/FeaturesTracker';
import SpellPreparation from './components/SpellPreparation';
import InfusionsTracker from './components/InfusionsTracker';
import EnhancedActions from './components/EnhancedActions';
import EnhancedNotes from './components/EnhancedNotes';
import { ARTIFICER_CANTRIPS, ARTIFICER_SPELLS, SPELL_DETAILS } from './data/spells';
import { DEFAULT_EQUIPMENT } from './data/equipment';

const allSkills = [
  "Acrobatics",
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

const DEFAULT_NOTES = {
  personalNotes: '',
  organizations: [],
  contacts: [],
  questLog: [],
  quickNotes: '',
  background: ''
};

const SKILL_ABILITIES = {
  "Acrobatics": "dexterity",
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

export default function App() {
  const [stats, setStats] = usePersistentState("stats", DEFAULT_STATS);
  const [notes, setNotes] = usePersistentState("notes", DEFAULT_NOTES);
  const [proficiencies, setProficiencies] = usePersistentState("proficiencies", {
    // Initialize all skills as not proficient
    "Acrobatics": false,
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
  const [savingThrowProficiencies, setSavingThrowProficiencies] = usePersistentState('savingThrows', {
    strength: false,
    dexterity: false,
    constitution: true,
    intelligence: true,
    wisdom: false,
    charisma: false
  });
  const [activeConditions, setActiveConditions] = usePersistentState('conditions', []);
  const [equipment, setEquipment] = usePersistentState('equipment', DEFAULT_EQUIPMENT);
  const [preparedSpells, setPreparedSpells] = usePersistentState('preparedSpells', {});
  
  // Add this useEffect to ensure spellSlots are properly initialized
  React.useEffect(() => {
    if (!stats.spellSlots) {
      setStats({
        ...stats,
        spellSlots: DEFAULT_STATS.spellSlots
      });
    }
  }, []);

  const [hpModalOpen, setHpModalOpen] = useState(false);
  const [hpAmount, setHpAmount] = useState(0);
  const [hpAction, setHpAction] = useState("damage");
  const [maxHpModalOpen, setMaxHpModalOpen] = useState(false);
  const [newMaxHp, setNewMaxHp] = useState(0);
  const [activeTab, setActiveTab] = useState('main');

  const tabs = [
    { id: 'main', label: 'Character' },
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
    const amt = hpAction === "damage" ? -hpAmount : hpAmount;
    const newHP = Math.max(0, Math.min(stats.MaxHP, stats.HP + amt));
    
    setStats(prevStats => ({
      ...prevStats,
      HP: newHP
    }));
    
    setHpModalOpen(false);
    setHpAmount(0);
    setHpAction("damage"); // Reset action
  };

  const applyMaxHpChange = () => {
    if (newMaxHp > 0) {
      setStats({
        ...stats,
        MaxHP: newMaxHp,
        HP: Math.min(stats.HP, newMaxHp) // Don't let current HP exceed new max
      });
    }
    setMaxHpModalOpen(false);
    setNewMaxHp(0);
  };

  const getModifier = (stat) => {
    const parsedStat = parseInt(stat) || 10;
    return Math.floor((parsedStat - 10) / 2);
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
              onUpdateHP={(newHP) => setStats(prev => ({...prev, HP: newHP}))}
              onDamage={() => openHpModal("damage")}
              onHeal={() => openHpModal("heal")}
              onEditMax={() => setMaxHpModalOpen(true)}
            />
          </div>
        </div>
      </div>

      <Card>
        <Card.Content>
          <div className="parchment-card p-6 rounded-lg">
            <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
              <div className="flex-shrink-0">
                <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-lg overflow-hidden shadow-lg border-4 border-amber-800">
                  <img 
                    src="/tortle-portrait.png" 
                    alt="Tortle Portrait"
                    className="w-full h-full object-cover"
                  />
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
                      onClick={() => setStats({...stats, level: Math.max(1, stats.level - 1)})}
                      className="w-10 h-10 bg-artificerBronze/20 hover:bg-artificerBronze/30 rounded-full flex items-center justify-center parchment-text font-bold button-glow text-lg"
                    >
                      -</button>
                    <div className="text-4xl font-bold parchment-text mx-4">{stats.level}</div>
                    <button 
                      onClick={() => setStats({...stats, level: Math.min(20, stats.level + 1)})}
                      className="w-10 h-10 bg-artificerBronze/20 hover:bg-artificerBronze/30 rounded-full flex items-center justify-center parchment-text font-bold button-glow text-lg"
                    >
                      +</button>
                  </div>
                  <div className="parchment-text-light text-sm mt-3 italic">
                    {stats.level === 1 && "Novice Artificer"}
                    {stats.level === 2 && "Apprentice Artificer"}
                    {stats.level === 3 && "Journeyman Artificer"}
                    {stats.level === 4 && "Skilled Artificer"}
                    {stats.level === 5 && "Expert Artificer"}
                    {stats.level >= 6 && stats.level <= 10 && "Master Artificer"}
                    {stats.level >= 11 && stats.level <= 15 && "Grand Artificer"}
                    {stats.level >= 16 && "Legendary Artificer"}
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
              onClick={() => {
                const newValue = parseInt(prompt(`Enter new value for ${ability}:`) || stats[ability]);
                if (!isNaN(newValue)) {
                  setStats({
                    ...stats,
                    [ability]: newValue
                  });
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
                  {parseInt(stats[ability]) || 10}
                </div>
                <div className="text-lg font-semibold" style={{ color: '#3C2415' }}>
                  {getModifier(parseInt(stats[ability]) || 10) >= 0 ? '+' : ''}
                  {getModifier(parseInt(stats[ability]) || 10)}
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
    <EnhancedNotes />
  );

  const renderCombatTab = () => (
    <div className="space-y-6">
      <Card>
        <Card.Header>Combat Stats</Card.Header>
        <Card.Content>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="parchment-card p-4 rounded-lg text-center">
              <div className="parchment-text-light text-sm font-semibold">Armor Class</div>
              <div className="parchment-text text-2xl font-bold">{Number(stats.armorClass) || 17}</div>
            </div>
            <div className="parchment-card p-4 rounded-lg text-center">
              <div className="parchment-text-light text-sm font-semibold">Initiative</div>
              <div className="parchment-text text-2xl font-bold">{Number(stats.initiative) || 0}</div>
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
        <Card.Header>Actions</Card.Header>
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
          />
        </Card.Content>
      </Card>
    </div>
  );

  const renderActionsTab = () => (
    <div className="space-y-6">
      <EnhancedActions />
      <QuickActions 
        stats={stats}
        proficiencies={proficiencies}
        savingThrowProficiencies={savingThrowProficiencies}
        getModifier={getModifier}
      />
    </div>
  );



  const renderSpellsTab = () => (
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

  const renderInfusionsTab = () => (
    <div className="space-y-6">
      <InfusionsTracker level={stats.level} />
    </div>
  );

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

  const renderFeaturesTab = () => (
    <div className="space-y-6">
      <FeaturesTracker />
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
      <ProficienciesLanguages />
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



  const renderTabContent = () => {
    switch (activeTab) {
      case 'main':
        return renderMainTab();
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
        {/* HP Bar - only on main tab */}
        {activeTab === 'character' && (
          <div className="mb-8">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <HPBar 
                  current={stats.HP} 
                  max={stats.MaxHP} 
                  onUpdateHP={(newHP) => setStats(prev => ({...prev, HP: newHP}))} 
                />
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => openHpModal("damage")}
                  className="bg-red-500/20 hover:bg-red-500/30 px-3 py-2 rounded ink-text font-bold button-glow artificer-border"
                >
                  Damage
                </button>
                <button 
                  onClick={() => openHpModal("heal")}
                  className="bg-green-500/20 hover:bg-green-500/30 px-3 py-2 rounded ink-text font-bold button-glow artificer-border"
                >
                  Heal
                </button>
                <button 
                  onClick={() => setMaxHpModalOpen(true)}
                  className="bg-blue-500/20 hover:bg-blue-500/30 px-3 py-2 rounded ink-text font-bold button-glow artificer-border"
                  title="Change Max HP"
                >
                  Edit HP
                </button>
              </div>
            </div>
          </div>
        )}
        
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
                onClick={() => {
                  setHpModalOpen(false);
                  setHpAmount(0);
                }}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 parchment-text border-2 rounded font-bold ${
                  hpAction === "damage" 
                    ? "border-red-500/70 bg-red-500/20 hover:bg-red-500/30" 
                    : "border-green-500/70 bg-green-500/20 hover:bg-green-500/30"
                }`}
                onClick={applyHpChange}
              >
                {hpAction === "damage" ? "Apply Damage" : "Apply Healing"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Max HP Modal */}
      {maxHpModalOpen && (
        <div className="fixed inset-0 modal-backdrop flex items-center justify-center z-50">
          <div className="parchment-card p-6 rounded-xl shadow-2xl w-80">
            <h2 className="text-xl font-bold mb-4 parchment-text">
              Change Max HP
            </h2>
            <div className="mb-4">
              <label className="parchment-text-light text-sm">Current Max HP: {stats.MaxHP}</label>
            </div>
            <input
              type="number"
              value={newMaxHp}
              onChange={(e) => setNewMaxHp(parseInt(e.target.value) || 0)}
              className="w-full p-2 rounded mb-4 bg-transparent parchment-text border-2 border-artificerBronze/50 focus:border-artificerBronze focus:outline-none"
              min="1"
              placeholder="Enter new max HP"
            />
            <div className="flex justify-end space-x-2">
              <button 
                className="px-4 py-2 parchment-text border-2 border-artificerBronze/50 rounded hover:bg-artificerBronze/20"
                onClick={() => {
                  setMaxHpModalOpen(false);
                  setNewMaxHp(0);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 parchment-text border-2 border-blue-500/70 bg-blue-500/20 hover:bg-blue-500/30 rounded font-bold"
                onClick={applyMaxHpChange}
              >
                Update Max HP
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
