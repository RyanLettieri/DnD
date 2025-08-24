import React from 'react';
import Card from './Card';

const QuickActions = ({ stats, proficiencies, savingThrowProficiencies, getModifier }) => {
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

  const getSkillModifier = (skill) => {
    const ability = SKILL_ABILITIES[skill];
    const abilityMod = getModifier(parseInt(stats[ability]) || 10);
    const profBonus = proficiencies[skill] ? Number(stats.proficiencyBonus) || 2 : 0;
    return abilityMod + profBonus;
  };

  const getSavingThrowModifier = (ability) => {
    const abilityMod = getModifier(parseInt(stats[ability]) || 10);
    const profBonus = savingThrowProficiencies[ability] ? Number(stats.proficiencyBonus) || 2 : 0;
    return abilityMod + profBonus;
  };

  const quickActions = [
    {
      category: "Common Skills",
      actions: [
        { name: "Perception", type: "skill", modifier: getSkillModifier("Perception") },
        { name: "Stealth", type: "skill", modifier: getSkillModifier("Stealth") },
        { name: "Athletics", type: "skill", modifier: getSkillModifier("Athletics") },
        { name: "Investigation", type: "skill", modifier: getSkillModifier("Investigation") },
        { name: "Insight", type: "skill", modifier: getSkillModifier("Insight") },
        { name: "Persuasion", type: "skill", modifier: getSkillModifier("Persuasion") }
      ]
    },
    {
      category: "Saving Throws",
      actions: [
        { name: "STR Save", type: "save", ability: "strength", modifier: getSavingThrowModifier("strength") },
        { name: "DEX Save", type: "save", ability: "dexterity", modifier: getSavingThrowModifier("dexterity") },
        { name: "CON Save", type: "save", ability: "constitution", modifier: getSavingThrowModifier("constitution") },
        { name: "INT Save", type: "save", ability: "intelligence", modifier: getSavingThrowModifier("intelligence") },
        { name: "WIS Save", type: "save", ability: "wisdom", modifier: getSavingThrowModifier("wisdom") },
        { name: "CHA Save", type: "save", ability: "charisma", modifier: getSavingThrowModifier("charisma") }
      ]
    },
    {
      category: "Combat",
      actions: [
        { name: "Initiative", type: "initiative", modifier: getModifier(parseInt(stats.dexterity) || 10) },
        { name: "Attack Roll", type: "attack", modifier: getModifier(parseInt(stats.strength) || 10) + (Number(stats.proficiencyBonus) || 2) },
        { name: "Spell Attack", type: "spellAttack", modifier: getModifier(parseInt(stats.intelligence) || 10) + (Number(stats.proficiencyBonus) || 2) }
      ]
    }
  ];

  const handleActionClick = (action) => {
    let message = `Roll a d20 + ${action.modifier >= 0 ? '+' : ''}${action.modifier}`;
    
    if (action.type === 'initiative') {
      message = `Roll a d20 + ${action.modifier >= 0 ? '+' : ''}${action.modifier} for Initiative`;
    } else if (action.type === 'attack') {
      message = `Roll a d20 + ${action.modifier >= 0 ? '+' : ''}${action.modifier} to hit`;
    } else if (action.type === 'spellAttack') {
      message = `Roll a d20 + ${action.modifier >= 0 ? '+' : ''}${action.modifier} for spell attack`;
    } else if (action.type === 'save') {
      message = `Roll a d20 + ${action.modifier >= 0 ? '+' : ''}${action.modifier} for ${action.name}`;
    } else {
      message = `Roll a d20 + ${action.modifier >= 0 ? '+' : ''}${action.modifier} for ${action.name} check`;
    }
    
    alert(message);
  };

  return (
    <Card>
      <Card.Header>Quick Actions</Card.Header>
      <Card.Content>
        <div className="space-y-4">
          {quickActions.map((section, index) => (
            <div key={index}>
              <h3 className="text-amber-900 font-semibold mb-2 text-lg">{section.category}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {section.actions.map((action, actionIndex) => (
                  <button
                    key={actionIndex}
                    onClick={() => handleActionClick(action)}
                    className="w-full min-h-[44px] bg-amber-100/90 hover:bg-amber-200/90 border border-amber-800/80 rounded-md transition-all duration-200 shadow-sm hover:shadow"
                  >
                    <div className="flex items-center justify-between gap-3 px-3 py-2">
                      <div className="text-amber-900 font-semibold text-sm truncate">{action.name}</div>
                      <div className="px-2 py-0.5 rounded-md bg-amber-800 text-amber-50 text-sm font-bold leading-none">
                        {action.modifier >= 0 ? '+' : ''}{action.modifier}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
};

export default QuickActions;
