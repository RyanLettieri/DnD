import { ABILITY_KEYS, DND_CLASSES } from '../data/characterOptions';

export const getAbilityModifier = (score) => Math.floor(((Number(score) || 10) - 10) / 2);

export const getProficiencyBonus = (level) => Math.ceil((Number(level) || 1) / 4) + 1;

export const getClassConfig = (characterClass) => DND_CLASSES[characterClass] || DND_CLASSES.Artificer;

export const canBaseClassCastSpells = (characterClass) => Boolean(getClassConfig(characterClass).spellcaster);

export const hasInfusions = (characterClass) => characterClass === 'Artificer';

export const getSpellcastingAbility = (characterClass) => {
  switch (characterClass) {
    case 'Cleric':
    case 'Druid':
    case 'Ranger':
      return 'wisdom';
    case 'Bard':
    case 'Paladin':
    case 'Sorcerer':
    case 'Warlock':
      return 'charisma';
    case 'Artificer':
    case 'Wizard':
    default:
      return 'intelligence';
  }
};

export const getDerivedStats = (stats = {}, character = {}) => {
  const characterClass = character.class || stats.class || 'Artificer';
  const race = character.race || stats.race || '';
  const level = Number(stats.level || character.level) || 1;
  const proficiencyBonus = getProficiencyBonus(level);
  const abilities = ABILITY_KEYS.reduce((acc, ability) => ({
    ...acc,
    [ability]: Number(stats[ability]) || 10
  }), {});
  const modifiers = ABILITY_KEYS.reduce((acc, ability) => ({
    ...acc,
    [ability]: getAbilityModifier(abilities[ability])
  }), {});

  const armorClass = characterClass === 'Barbarian'
    ? 10 + modifiers.dexterity + modifiers.constitution
    : Number(stats.armorClass) || (race === 'Tortle' ? 17 : 10 + modifiers.dexterity);

  const spellcastingAbility = getSpellcastingAbility(characterClass);
  const spellcastingModifier = modifiers[spellcastingAbility];

  return {
    level,
    proficiencyBonus,
    abilities,
    modifiers,
    armorClass,
    initiative: modifiers.dexterity + (Number(stats.initiative) || 0),
    passivePerception: 10 + modifiers.wisdom,
    spellcastingAbility,
    spellSaveDc: 8 + proficiencyBonus + spellcastingModifier,
    spellAttackBonus: proficiencyBonus + spellcastingModifier,
    canCastSpells: canBaseClassCastSpells(characterClass),
    hasInfusions: hasInfusions(characterClass)
  };
};

export const resetSpellSlots = (spellSlots = {}) => {
  return Object.keys(spellSlots).reduce((acc, level) => ({
    ...acc,
    [level]: Array(spellSlots[level]?.length || 0).fill(false)
  }), {});
};

export const previewRestChanges = ({ stats = {}, conditions = [], type = 'short' }) => {
  const changes = [];

  if ((Number(stats.tempHP) || 0) > 0) {
    changes.push('Temporary HP will be cleared.');
  }

  if (type === 'long') {
    if ((Number(stats.HP) || 0) < (Number(stats.MaxHP) || 0)) {
      changes.push(`HP will restore to ${Number(stats.MaxHP) || 0}.`);
    }
    if (Object.values(stats.spellSlots || {}).some(slots => slots.some(Boolean))) {
      changes.push('Used spell slots will be restored.');
    }
    if (conditions.length > 0) {
      changes.push('Active conditions can be reviewed after the rest.');
    }
  } else {
    changes.push('Hit Dice and class resources may recover depending on class features.');
  }

  if (changes.length === 0) {
    changes.push(type === 'long' ? 'No tracked long rest changes are currently needed.' : 'No tracked short rest changes are currently needed.');
  }

  return changes;
};

export const applyRest = ({ stats = {}, type = 'short' }) => {
  if (type === 'long') {
    return {
      ...stats,
      HP: Number(stats.MaxHP) || Number(stats.HP) || 0,
      tempHP: 0,
      spellSlots: resetSpellSlots(stats.spellSlots || {})
    };
  }

  return {
    ...stats,
    tempHP: 0
  };
};
