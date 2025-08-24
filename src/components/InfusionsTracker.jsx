import React, { useState } from 'react';
import Card from './Card';

const INFUSIONS = {
  "Enhanced Defense": {
    description: "A creature gains a +1 bonus to AC while wearing (armor) or wielding (shield) the infused item.",
    type: "Armor/Shield",
    level: 2,
    maxUses: 1
  },
  "Enhanced Weapon": {
    description: "This magic weapon grants a +1 bonus to attack and damage rolls made with it.",
    type: "Simple/Martial Weapon",
    level: 2,
    maxUses: 1
  },
  "Repeating Shot": {
    description: "This magic weapon grants a +1 bonus to attack and damage rolls made with it when it's used to make a ranged attack, and it ignores the loading property if it has it.",
    type: "Ranged Weapon",
    level: 2,
    maxUses: 1
  },
  "Replicate Magic Item": {
    description: "You can replicate a specific magic item. Choose a magic item from the Replicable Items table.",
    type: "Various",
    level: 2,
    maxUses: 1,
    replicableItems: [
      "Alchemy Jug", "Bag of Holding", "Cap of Water Breathing", "Cloak of the Manta Ray",
      "Eyes of Charming", "Eyes of Minute Seeing", "Goggles of Night", "Helm of Comprehending Languages",
      "Immovable Rod", "Lantern of Revealing", "Pipes of Haunting", "Pipes of the Sewers",
      "Rope of Climbing", "Sending Stones", "Wand of Magic Detection", "Wand of Secrets"
    ]
  },
  "Resistant Armor": {
    description: "A creature has resistance to one of the following damage types while wearing this armor: acid, cold, fire, force, lightning, necrotic, poison, psychic, radiant, or thunder.",
    type: "Armor",
    level: 6,
    maxUses: 1
  },
  "Boots of the Winding Path": {
    description: "While wearing these boots, a creature can teleport up to 15 feet as a bonus action to an unoccupied space the creature can see.",
    type: "Boots",
    level: 6,
    maxUses: 1
  },
  "Cloak of the Bat": {
    description: "While wearing this cloak with its hood up, you can't be charmed or frightened, and any hidden creature revealed by your presence stays hidden.",
    type: "Cloak",
    level: 6,
    maxUses: 1
  },
  "Eyes of the Eagle": {
    description: "These crystal lenses fit over the eyes. While wearing them, a creature has advantage on Wisdom (Perception) checks that rely on sight.",
    type: "Goggles",
    level: 6,
    maxUses: 1
  },
  "Gloves of Thievery": {
    description: "These gloves are invisible while worn. While wearing them, you gain a +5 bonus to Dexterity (Sleight of Hand) checks and Dexterity checks made to pick locks.",
    type: "Gloves",
    level: 6,
    maxUses: 1
  },
  "Helm of Awareness": {
    description: "While wearing this helm, you gain an additional +1 bonus to AC, and you have advantage on any saving throw you make to avoid or end the stunned condition on yourself.",
    type: "Helm",
    level: 6,
    maxUses: 1
  },
  "Mind Sharpener": {
    description: "The infused item can send a jolt to the wearer to refocus their mind. The item has 4 charges. When the wearer fails a Constitution saving throw to maintain concentration on a spell, the wearer can use its reaction to expend 1 of the item's charges to succeed instead.",
    type: "Armor",
    level: 6,
    maxUses: 1
  },
  "Radiant Weapon": {
    description: "This magic weapon sheds bright light in a 5-foot radius and dim light for an additional 5 feet. When you hit a creature with an attack using this weapon, you can cause the attack to deal an extra 1d6 radiant damage to the target.",
    type: "Weapon",
    level: 6,
    maxUses: 1
  },
  "Repulsion Shield": {
    description: "A creature gains a +1 bonus to AC while wielding this shield. The shield has 4 charges. While holding it, the wielder can use a reaction immediately after being hit by a melee attack to expend 1 of the shield's charges and push the attacker up to 15 feet away.",
    type: "Shield",
    level: 6,
    maxUses: 1
  },
  "Resistant Armor": {
    description: "A creature has resistance to one of the following damage types while wearing this armor: acid, cold, fire, force, lightning, necrotic, poison, psychic, radiant, or thunder.",
    type: "Armor",
    level: 6,
    maxUses: 1
  },
  "Returning Weapon": {
    description: "This magic weapon grants a +1 bonus to attack and damage rolls made with it, and it returns to the wielder's hand immediately after it is used to make a ranged attack.",
    type: "Weapon",
    level: 6,
    maxUses: 1
  },
  "Spell-Refueling Ring": {
    description: "While wearing this ring, the wearer can recover one expended spell slot as an action. The recovered slot can be of 3rd level or lower. Once used, the ring can't be used again until the next dawn.",
    type: "Ring",
    level: 6,
    maxUses: 1
  }
};

const InfusionsTracker = ({ level }) => {
  const [activeInfusions, setActiveInfusions] = useState({});
  const [showDetails, setShowDetails] = useState(null);

  const getMaxInfusions = () => {
    if (level >= 20) return 6;
    if (level >= 18) return 5;
    if (level >= 14) return 4;
    if (level >= 10) return 3;
    if (level >= 6) return 2;
    return 1;
  };

  const getAvailableInfusions = () => {
    return Object.entries(INFUSIONS).filter(([name, infusion]) => {
      return infusion.level <= level;
    });
  };

  const toggleInfusion = (infusionName) => {
    const currentCount = Object.keys(activeInfusions).length;
    const isActive = activeInfusions[infusionName];
    
    if (isActive) {
      // Remove infusion
      const newActive = { ...activeInfusions };
      delete newActive[infusionName];
      setActiveInfusions(newActive);
    } else if (currentCount < getMaxInfusions()) {
      // Add infusion
      setActiveInfusions({
        ...activeInfusions,
        [infusionName]: {
          active: true,
          itemName: '',
          target: '',
          notes: ''
        }
      });
    } else {
      alert(`You can only have ${getMaxInfusions()} infusions active at once. Remove one first.`);
    }
  };

  const updateInfusionDetails = (infusionName, field, value) => {
    setActiveInfusions(prev => ({
      ...prev,
      [infusionName]: {
        ...prev[infusionName],
        [field]: value
      }
    }));
  };

  const resetAllInfusions = () => {
    setActiveInfusions({});
  };

  return (
    <Card>
      <Card.Header>Infusions</Card.Header>
      <Card.Content>
        <div className="space-y-6">
          {/* Infusion Summary */}
          <div className="parchment-card p-4 rounded-lg border border-artificerBronze/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="parchment-text font-semibold text-sm">Max Infusions</div>
                <div className="parchment-text font-bold text-xl">{getMaxInfusions()}</div>
              </div>
              <div>
                <div className="parchment-text font-semibold text-sm">Active Infusions</div>
                <div className="parchment-text font-bold text-xl">{Object.keys(activeInfusions).length}</div>
              </div>
              <div>
                <div className="parchment-text font-semibold text-sm">Available</div>
                <div className="parchment-text font-bold text-xl">{getMaxInfusions() - Object.keys(activeInfusions).length}</div>
              </div>
              <div>
                <div className="parchment-text font-semibold text-sm">Total Known</div>
                <div className="parchment-text font-bold text-xl">{getAvailableInfusions().length}</div>
              </div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex justify-end">
            <button
              onClick={resetAllInfusions}
              className="bg-sealWax/80 hover:bg-sealWax text-white px-4 py-2 rounded text-sm button-glow"
            >
              Reset All Infusions
            </button>
          </div>

          {/* Active Infusions */}
          {Object.keys(activeInfusions).length > 0 && (
            <div>
              <h3 className="parchment-text font-semibold mb-3">Active Infusions</h3>
              <div className="space-y-3">
                {Object.entries(activeInfusions).map(([infusionName, details]) => (
                  <div key={infusionName} className="parchment-card border border-artificerBronze/30 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="parchment-text font-semibold">{infusionName}</h4>
                      <button
                        onClick={() => toggleInfusion(infusionName)}
                        className="text-sealWax hover:text-red-600 text-sm font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <label className="parchment-text-light text-xs">Infused Item:</label>
                        <input
                          type="text"
                          value={details.itemName}
                          onChange={(e) => updateInfusionDetails(infusionName, 'itemName', e.target.value)}
                          className="w-full bg-parchment/50 rounded p-2 parchment-text border border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none"
                          placeholder="e.g., Longsword, Chain Mail"
                        />
                      </div>
                      <div>
                        <label className="parchment-text-light text-xs">Target/Carrier:</label>
                        <input
                          type="text"
                          value={details.target}
                          onChange={(e) => updateInfusionDetails(infusionName, 'target', e.target.value)}
                          className="w-full bg-parchment/50 rounded p-2 parchment-text border border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none"
                          placeholder="e.g., Self, Ally Name"
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <label className="parchment-text-light text-xs">Notes:</label>
                      <textarea
                        value={details.notes}
                        onChange={(e) => updateInfusionDetails(infusionName, 'notes', e.target.value)}
                        className="w-full bg-parchment/50 rounded p-2 parchment-text border border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none text-sm"
                        placeholder="Additional notes about this infusion..."
                        rows="2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Available Infusions */}
          <div>
            <h3 className="parchment-text font-semibold mb-3">Available Infusions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {getAvailableInfusions().map(([name, infusion]) => {
                const isActive = activeInfusions[name];
                
                return (
                  <div
                    key={name}
                    className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-artificerBronze/20 border-artificerBronze/50'
                        : 'parchment-card border-artificerBronze/20 hover:shadow-md'
                    }`}
                    onClick={() => toggleInfusion(name)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={!!isActive}
                          readOnly
                          className="w-4 h-4 accent-artificerBronze"
                        />
                        <span className="parchment-text font-semibold">{name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="parchment-text text-xs">Lv.{infusion.level}</span>
                        <span className="parchment-text-light text-xs">{infusion.type}</span>
                      </div>
                    </div>
                    <p className="parchment-text-light text-sm leading-relaxed">
                      {infusion.description}
                    </p>
                    {infusion.replicableItems && (
                      <div className="mt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowDetails(showDetails === name ? null : name);
                          }}
                          className="parchment-text hover:text-artificerBronze text-xs font-semibold"
                        >
                          {showDetails === name ? 'Hide' : 'Show'} Replicable Items
                        </button>
                        {showDetails === name && (
                          <div className="mt-2 p-2 parchment-card rounded text-xs parchment-text-light">
                            <div className="grid grid-cols-2 gap-1">
                              {infusion.replicableItems.map(item => (
                                <div key={item} className="parchment-text-light">{item}</div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default InfusionsTracker;
