export const ABILITY_KEYS = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma'
];

export const ABILITY_LABELS = {
  strength: 'Strength',
  dexterity: 'Dexterity',
  constitution: 'Constitution',
  intelligence: 'Intelligence',
  wisdom: 'Wisdom',
  charisma: 'Charisma'
};

export const DND_RACES = [
  'Dragonborn',
  'Dwarf',
  'Elf',
  'Gnome',
  'Half-Elf',
  'Half-Orc',
  'Halfling',
  'Human',
  'Tiefling',
  'Aasimar',
  'Firbolg',
  'Genasi',
  'Gith',
  'Goblin',
  'Goliath',
  'Kenku',
  'Kobold',
  'Lizardfolk',
  'Orc',
  'Tabaxi',
  'Tortle',
  'Triton',
  'Warforged',
  'Custom Lineage'
];

export const DND_RACE_DETAILS = {
  Dragonborn: {
    description: 'Draconic ancestry with a breath weapon and damage resistance tied to that ancestry.',
    traits: ['Breath Weapon', 'Damage Resistance', 'Draconic Ancestry']
  },
  Dwarf: {
    description: 'Stout, resilient folk known for endurance, stonecraft, and martial traditions.',
    traits: ['Darkvision', 'Dwarven Resilience', 'Tool Proficiency']
  },
  Elf: {
    description: 'Graceful, long-lived people with keen senses and fey-touched ancestry.',
    traits: ['Darkvision', 'Keen Senses', 'Fey Ancestry', 'Trance']
  },
  Gnome: {
    description: 'Inventive and clever folk with a natural knack for resisting magic.',
    traits: ['Darkvision', 'Gnome Cunning', 'Small Size']
  },
  'Half-Elf': {
    description: 'Versatile people who blend human ambition with elven grace.',
    traits: ['Darkvision', 'Fey Ancestry', 'Skill Versatility']
  },
  'Half-Orc': {
    description: 'Hardy warriors with fierce endurance and intimidating presence.',
    traits: ['Darkvision', 'Relentless Endurance', 'Savage Attacks']
  },
  Halfling: {
    description: 'Small, nimble folk known for luck, courage, and quiet resilience.',
    traits: ['Lucky', 'Brave', 'Halfling Nimbleness']
  },
  Human: {
    description: 'Adaptable and ambitious people found throughout nearly every world.',
    traits: ['Versatile', 'Extra Language', 'Flexible Ability Scores']
  },
  Tiefling: {
    description: 'Mortals with infernal heritage, innate magic, and resistance to fire.',
    traits: ['Darkvision', 'Hellish Resistance', 'Infernal Legacy']
  },
  Aasimar: {
    description: 'Mortals touched by celestial power, often carrying radiant gifts.',
    traits: ['Celestial Resistance', 'Healing Hands', 'Radiant Soul']
  },
  Firbolg: {
    description: 'Gentle giant-kin with nature magic and a talent for hidden movement.',
    traits: ['Firbolg Magic', 'Hidden Step', 'Powerful Build']
  },
  Genasi: {
    description: 'Element-touched people shaped by air, earth, fire, or water ancestry.',
    traits: ['Elemental Lineage', 'Innate Magic', 'Elemental Resistance']
  },
  Gith: {
    description: 'Psionic people from ancient astral conflicts and disciplined cultures.',
    traits: ['Psionics', 'Mental Discipline', 'Astral Knowledge']
  },
  Goblin: {
    description: 'Small, quick survivors with a knack for ambush and escape.',
    traits: ['Nimble Escape', 'Fury of the Small', 'Darkvision']
  },
  Goliath: {
    description: 'Powerfully built mountain folk who endure punishment and harsh climates.',
    traits: ['Stone’s Endurance', 'Powerful Build', 'Mountain Born']
  },
  Kenku: {
    description: 'Clever birdfolk known for mimicry, stealth, and uncanny memory.',
    traits: ['Expert Forgery', 'Mimicry', 'Kenku Training']
  },
  Kobold: {
    description: 'Small draconic survivors who thrive through cunning and cooperation.',
    traits: ['Darkvision', 'Draconic Cry', 'Small Size']
  },
  Lizardfolk: {
    description: 'Reptilian survivalists with natural armor and pragmatic instincts.',
    traits: ['Natural Armor', 'Bite', 'Hold Breath']
  },
  Orc: {
    description: 'Powerful, relentless people with fierce mobility and endurance.',
    traits: ['Adrenaline Rush', 'Powerful Build', 'Darkvision']
  },
  Tabaxi: {
    description: 'Feline wanderers with quick reflexes, climbing skill, and curiosity.',
    traits: ['Feline Agility', 'Cat’s Claws', 'Cat’s Talent']
  },
  Tortle: {
    description: 'Turtle-like wanderers protected by a natural shell and patient outlook.',
    traits: ['Natural Armor', 'Shell Defense', 'Hold Breath', 'Claws']
  },
  Triton: {
    description: 'Aquatic guardians with ocean magic and adaptation to the deep.',
    traits: ['Amphibious', 'Control Air and Water', 'Cold Resistance']
  },
  Warforged: {
    description: 'Living constructs built for purpose, endurance, and adaptation.',
    traits: ['Constructed Resilience', 'Integrated Protection', 'Sentry’s Rest']
  },
  'Custom Lineage': {
    description: 'A custom ancestry framework for building a unique origin.',
    traits: ['Flexible Trait', 'Feat Option', 'Custom Origin']
  }
};

export const DND_BACKGROUNDS = [
  'Acolyte',
  'Charlatan',
  'Criminal',
  'Entertainer',
  'Folk Hero',
  'Guild Artisan',
  'Hermit',
  'Noble',
  'Outlander',
  'Sage',
  'Sailor',
  'Soldier',
  'Urchin',
  'Custom'
];

export const DND_BACKGROUND_DETAILS = {
  Acolyte: {
    description: 'Raised in service to a temple, faith, or religious order.',
    traits: ['Insight', 'Religion', 'Shelter of the Faithful']
  },
  Charlatan: {
    description: 'A practiced deceiver with false identities and social tricks.',
    traits: ['Deception', 'Sleight of Hand', 'False Identity']
  },
  Criminal: {
    description: 'A character with underworld contacts and experience outside the law.',
    traits: ['Deception', 'Stealth', 'Criminal Contact']
  },
  Entertainer: {
    description: 'A performer who earns attention, hospitality, and reputation.',
    traits: ['Acrobatics', 'Performance', 'By Popular Demand']
  },
  'Folk Hero': {
    description: 'A humble champion known for standing up for ordinary people.',
    traits: ['Animal Handling', 'Survival', 'Rustic Hospitality']
  },
  'Guild Artisan': {
    description: 'A trained craftsperson connected to a professional guild.',
    traits: ['Insight', 'Persuasion', 'Guild Membership']
  },
  Hermit: {
    description: 'A secluded seeker shaped by isolation, discovery, or contemplation.',
    traits: ['Medicine', 'Religion', 'Discovery']
  },
  Noble: {
    description: 'A person of title, privilege, and social expectation.',
    traits: ['History', 'Persuasion', 'Position of Privilege']
  },
  Outlander: {
    description: 'A wanderer at home in the wilds, far from settled roads.',
    traits: ['Athletics', 'Survival', 'Wanderer']
  },
  Sage: {
    description: 'A scholar trained in research, lore, and deep questions.',
    traits: ['Arcana', 'History', 'Researcher']
  },
  Sailor: {
    description: 'A traveler of ships, ports, crews, storms, and sea roads.',
    traits: ['Athletics', 'Perception', 'Ship’s Passage']
  },
  Soldier: {
    description: 'A trained combatant shaped by military life and command structures.',
    traits: ['Athletics', 'Intimidation', 'Military Rank']
  },
  Urchin: {
    description: 'A streetwise survivor shaped by city alleys and hard lessons.',
    traits: ['Sleight of Hand', 'Stealth', 'City Secrets']
  },
  Custom: {
    description: 'A custom background for a character with a unique origin.',
    traits: ['Custom Skills', 'Custom Feature', 'Player Defined']
  }
};

export const DND_ALIGNMENTS = [
  'Lawful Good',
  'Neutral Good',
  'Chaotic Good',
  'Lawful Neutral',
  'True Neutral',
  'Chaotic Neutral',
  'Lawful Evil',
  'Neutral Evil',
  'Chaotic Evil',
  'Unaligned'
];

export const DND_CLASSES = {
  Artificer: {
    hitDiceSize: 8,
    primaryAbilities: ['intelligence'],
    savingThrows: ['constitution', 'intelligence'],
    defaultSkills: ['Arcana', 'Investigation'],
    equipment: [
      { name: "Dagger", quantity: 1, description: "Simple melee weapon" },
      { name: "Leather Armor", quantity: 1, description: "Light armor" },
      { name: "Explorer's Pack", quantity: 1, description: "Contains various adventuring gear" }
    ],
    tools: ["Tinker's Tools"],
    spellcaster: true,
    description: 'Magical inventor who blends arcane craft with practical tools.'
  },
  Barbarian: {
    hitDiceSize: 12,
    primaryAbilities: ['strength', 'constitution'],
    savingThrows: ['strength', 'constitution'],
    defaultSkills: ['Athletics', 'Survival'],
    equipment: [
      { name: "Greataxe", quantity: 1, description: "Two-handed melee weapon" },
      { name: "Handaxe", quantity: 2, description: "One-handed melee weapon" },
      { name: "Explorer's Pack", quantity: 1, description: "Contains various adventuring gear" },
      { name: "Javelin", quantity: 4, description: "Thrown weapon" }
    ],
    tools: [],
    spellcaster: false,
    description: 'Primal warrior who survives through rage and raw endurance.'
  },
  Bard: {
    hitDiceSize: 8,
    primaryAbilities: ['charisma', 'dexterity'],
    savingThrows: ['dexterity', 'charisma'],
    defaultSkills: ['Performance', 'Persuasion', 'History'],
    tools: ['Musical Instrument'],
    spellcaster: true,
    description: 'Versatile performer, spellcaster, and skill expert.'
  },
  Cleric: {
    hitDiceSize: 8,
    primaryAbilities: ['wisdom', 'constitution'],
    savingThrows: ['wisdom', 'charisma'],
    defaultSkills: ['Insight', 'Religion'],
    tools: [],
    spellcaster: true,
    description: 'Divine spellcaster empowered by faith, domain, and purpose.'
  },
  Druid: {
    hitDiceSize: 8,
    primaryAbilities: ['wisdom', 'constitution'],
    savingThrows: ['intelligence', 'wisdom'],
    defaultSkills: ['Nature', 'Survival'],
    tools: ['Herbalism Kit'],
    spellcaster: true,
    description: 'Nature-bound spellcaster tied to beasts, storms, and wild places.'
  },
  Fighter: {
    hitDiceSize: 10,
    primaryAbilities: ['strength', 'dexterity', 'constitution'],
    savingThrows: ['strength', 'constitution'],
    defaultSkills: ['Athletics', 'Perception'],
    tools: [],
    spellcaster: false,
    description: 'Weapon master with flexible combat training.'
  },
  Monk: {
    hitDiceSize: 8,
    primaryAbilities: ['dexterity', 'wisdom'],
    savingThrows: ['strength', 'dexterity'],
    defaultSkills: ['Acrobatics', 'Insight'],
    tools: ['Artisan Tool or Musical Instrument'],
    spellcaster: false,
    description: 'Disciplined martial artist who channels ki through motion.'
  },
  Paladin: {
    hitDiceSize: 10,
    primaryAbilities: ['strength', 'charisma'],
    savingThrows: ['wisdom', 'charisma'],
    defaultSkills: ['Athletics', 'Persuasion'],
    tools: [],
    spellcaster: true,
    description: 'Oathbound warrior with divine magic and heavy defenses.'
  },
  Ranger: {
    hitDiceSize: 10,
    primaryAbilities: ['dexterity', 'wisdom'],
    savingThrows: ['strength', 'dexterity'],
    defaultSkills: ['Survival', 'Perception'],
    tools: [],
    spellcaster: true,
    description: 'Wilderness hunter skilled with weapons, tracking, and magic.'
  },
  Rogue: {
    hitDiceSize: 8,
    primaryAbilities: ['dexterity', 'intelligence'],
    savingThrows: ['dexterity', 'intelligence'],
    defaultSkills: ['Stealth', 'Sleight of Hand', 'Investigation', 'Perception'],
    tools: ["Thieves' Tools"],
    spellcaster: false,
    description: 'Skillful infiltrator who relies on precision and expertise.'
  },
  Sorcerer: {
    hitDiceSize: 6,
    primaryAbilities: ['charisma', 'constitution'],
    savingThrows: ['constitution', 'charisma'],
    defaultSkills: ['Arcana', 'Persuasion'],
    tools: [],
    spellcaster: true,
    description: 'Innate spellcaster whose magic comes from bloodline or origin.'
  },
  Warlock: {
    hitDiceSize: 8,
    primaryAbilities: ['charisma', 'constitution'],
    savingThrows: ['wisdom', 'charisma'],
    defaultSkills: ['Arcana', 'Deception'],
    tools: [],
    spellcaster: true,
    description: 'Pact-bound caster empowered by an otherworldly patron.'
  },
  Wizard: {
    hitDiceSize: 6,
    primaryAbilities: ['intelligence', 'constitution'],
    savingThrows: ['intelligence', 'wisdom'],
    defaultSkills: ['Arcana', 'History'],
    tools: [],
    spellcaster: true,
    description: 'Studied arcane caster with a spellbook and vast flexibility.'
  }
};

export const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];

export const getClassOptions = () => Object.keys(DND_CLASSES);
