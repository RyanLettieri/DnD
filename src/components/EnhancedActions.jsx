import React, { useState } from 'react';
import Card from './Card';

const ACTIONS = {
  "Standard Actions": {
    "Attack": {
      description: "Make one melee or ranged attack with a weapon or unarmed strike.",
      type: "action",
      icon: "⚔️"
    },
    "Cast a Spell": {
      description: "Cast a spell with a casting time of 1 action.",
      type: "action",
      icon: "✨"
    },
    "Dash": {
      description: "Gain extra movement equal to your speed for this turn.",
      type: "action",
      icon: "🏃"
    },
    "Disengage": {
      description: "Your movement doesn't provoke opportunity attacks for the rest of the turn.",
      type: "action",
      icon: "🔄"
    },
    "Dodge": {
      description: "Until the start of your next turn, any attack roll made against you has disadvantage if you can see the attacker, and you make Dexterity saving throws with advantage.",
      type: "action",
      icon: "🛡️"
    },
    "Help": {
      description: "You can aid a friendly creature in attacking a creature within 5 feet of you. You feint, distract the target, or in some other way team up to make your ally's attack more effective.",
      type: "action",
      icon: "🤝"
    },
    "Hide": {
      description: "Make a Dexterity (Stealth) check in an attempt to hide.",
      type: "action",
      icon: "👻"
    },
    "Ready": {
      description: "Choose an action and a trigger. When the trigger occurs, you can take the action as a reaction.",
      type: "action",
      icon: "⏰"
    },
    "Search": {
      description: "Devote your attention to finding something. You might make a Wisdom (Perception) check or an Intelligence (Investigation) check.",
      type: "action",
      icon: "🔍"
    },
    "Use an Object": {
      description: "You normally interact with a second object during your turn for free. Use this action when you need to interact with more objects.",
      type: "action",
      icon: "📦"
    }
  },
  "Bonus Actions": {
    "Off-Hand Attack": {
      description: "When you take the Attack action and attack with a light melee weapon that you're holding in one hand, you can use a bonus action to attack with a different light melee weapon that you're holding in the other hand.",
      type: "bonus_action",
      icon: "🗡️"
    },
    "Cast a Spell (Bonus)": {
      description: "Cast a spell with a casting time of 1 bonus action.",
      type: "bonus_action",
      icon: "✨"
    }
  },
  "Reactions": {
    "Opportunity Attack": {
      description: "When a hostile creature that you can see moves out of your reach, you can use your reaction to make one melee attack against the provoking creature.",
      type: "reaction",
      icon: "⚡"
    },
    "Cast a Spell (Reaction)": {
      description: "Cast a spell with a casting time of 1 reaction.",
      type: "reaction",
      icon: "✨"
    },
    "Shield": {
      description: "An invisible barrier of magical force appears and protects you. Until the start of your next turn, you have a +5 bonus to AC, including against the triggering attack, and you take no damage from magic missile.",
      type: "reaction",
      icon: "🛡️",
      spellSpecific: "Shield"
    }
  },
  "Special Actions": {
    "Shell Defense": {
      description: "Withdraw into your shell: +4 AC, advantage on STR and CON saves, disadvantage on DEX saves, speed 0.",
      type: "action",
      icon: "🐢",
      racialSpecific: "Tortle"
    },
    "Eldritch Cannon": {
      description: "Activate your eldritch cannon as a bonus action. Choose from Flamethrower, Force Ballista, or Protector modes.",
      type: "bonus_action",
      icon: "🔫",
      classSpecific: "Artificer (Artillerist)"
    },
    "Arcane Firearm": {
      description: "When you cast an artificer spell through your arcane firearm, roll a d8 and add the number rolled to one of the spell's damage rolls.",
      type: "passive",
      icon: "🔮",
      classSpecific: "Artificer (Artillerist)"
    }
  }
};

const EnhancedActions = () => {
  const [selectedCategory, setSelectedCategory] = useState("Standard Actions");
  const [showDetails, setShowDetails] = useState(null);

  const getActionIcon = (type) => {
    switch (type) {
      case 'action':
        return '⚔️';
      case 'bonus_action':
        return '⚡';
      case 'reaction':
        return '🔄';
      case 'passive':
        return '🛡️';
      default:
        return '📋';
    }
  };

  const getActionColor = (type) => {
    switch (type) {
      case 'action':
        return 'text-blue-300';
      case 'bonus_action':
        return 'text-green-300';
      case 'reaction':
        return 'text-yellow-300';
      case 'passive':
        return 'text-purple-300';
      default:
        return 'text-white';
    }
  };

  return (
    <Card>
      <Card.Header>Actions & Abilities</Card.Header>
      <Card.Content>
        <div className="space-y-6">
          {/* Action Type Tabs */}
          <div className="flex space-x-2 overflow-x-auto scrollbar-custom">
            {Object.keys(ACTIONS).map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-artificerBronze/30 parchment-text border border-artificerBronze/50'
                    : 'parchment-card parchment-text-light hover:shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Actions List */}
          <div className="space-y-3">
            {Object.entries(ACTIONS[selectedCategory]).map(([actionName, action]) => (
              <div
                key={actionName}
                className="parchment-card p-4 rounded-lg border border-artificerBronze/20 hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => setShowDetails(showDetails === actionName ? null : actionName)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <span className="text-2xl">{action.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="parchment-text font-semibold">{actionName}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${getActionColor(action.type)} bg-artificerBronze/10`}>
                          {getActionIcon(action.type)} {action.type.replace('_', ' ')}
                        </span>
                        {action.classSpecific && (
                          <span className="text-xs px-2 py-1 rounded bg-artificerBlue/20 text-white">
                            {action.classSpecific}
                          </span>
                        )}
                        {action.racialSpecific && (
                          <span className="text-xs px-2 py-1 rounded bg-artificerBronze/20 text-white">
                            {action.racialSpecific}
                          </span>
                        )}
                        {action.spellSpecific && (
                          <span className="text-xs px-2 py-1 rounded bg-artificerGold/20 text-white">
                            {action.spellSpecific}
                          </span>
                        )}
                      </div>
                      <p className="parchment-text-light text-sm leading-relaxed">
                        {action.description}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDetails(showDetails === actionName ? null : actionName);
                    }}
                    className="parchment-text hover:text-artificerBronze text-sm ml-2 font-semibold"
                  >
                    {showDetails === actionName ? 'Hide' : 'Details'}
                  </button>
                </div>
                
                {showDetails === actionName && (
                  <div className="mt-4 p-3 parchment-card rounded text-sm parchment-text-light">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="parchment-text font-semibold">Action Type:</span>
                        <div className="parchment-text-light capitalize">{action.type.replace('_', ' ')}</div>
                      </div>
                      {action.classSpecific && (
                        <div>
                          <span className="parchment-text font-semibold">Class:</span>
                          <div className="parchment-text-light">{action.classSpecific}</div>
                        </div>
                      )}
                      {action.racialSpecific && (
                        <div>
                          <span className="parchment-text font-semibold">Race:</span>
                          <div className="parchment-text-light">{action.racialSpecific}</div>
                        </div>
                      )}
                      {action.spellSpecific && (
                        <div>
                          <span className="parchment-text font-semibold">Spell:</span>
                          <div className="parchment-text-light">{action.spellSpecific}</div>
                        </div>
                      )}
                    </div>
                    <div className="mt-3">
                      <span className="parchment-text font-semibold">Description:</span>
                      <div className="parchment-text-light mt-1">{action.description}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Economy Summary */}
          <div className="parchment-card p-4 rounded-lg border border-artificerBronze/20">
            <h3 className="parchment-text font-semibold mb-3">Action Economy</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="parchment-text font-semibold text-sm">Action</div>
                <div className="parchment-text font-bold text-xl">1</div>
                <div className="parchment-text-light text-xs">Per Turn</div>
              </div>
              <div>
                <div className="parchment-text font-semibold text-sm">Bonus Action</div>
                <div className="parchment-text font-bold text-xl">1</div>
                <div className="parchment-text-light text-xs">Per Turn</div>
              </div>
              <div>
                <div className="parchment-text font-semibold text-sm">Reaction</div>
                <div className="parchment-text font-bold text-xl">1</div>
                <div className="parchment-text-light text-xs">Per Round</div>
              </div>
              <div>
                <div className="parchment-text font-semibold text-sm">Movement</div>
                <div className="parchment-text font-bold text-xl">30ft</div>
                <div className="parchment-text-light text-xs">Per Turn</div>
              </div>
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default EnhancedActions;
