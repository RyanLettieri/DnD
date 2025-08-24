import React, { useState } from 'react';
import Card from './Card';

const FeaturesTracker = () => {
  const [features, setFeatures] = useState({
    // Tortle racial features
    "Natural Armor": {
      description: "Your shell provides you with a base AC of 17 (your Dexterity modifier doesn't affect this number).",
      type: "passive",
      used: false
    },
    "Shell Defense": {
      description: "You can withdraw into your shell as an action. While in your shell, you gain +4 AC, advantage on STR and CON saves, but have disadvantage on DEX saves and speed 0.",
      type: "action",
      used: false,
      cooldown: "action"
    },
    "Hold Breath": {
      description: "You can hold your breath for up to 1 hour.",
      type: "passive",
      used: false
    },
    "Claws": {
      description: "Your claws are natural weapons, which you can use to make unarmed strikes. If you hit with them, you deal slashing damage equal to 1d4 + your Strength modifier.",
      type: "passive",
      used: false
    },
    // Artificer features
    "Magical Tinkering": {
      description: "You can imbue mundane items with magical properties. You can have up to 3 infused items at a time.",
      type: "passive",
      used: false
    },
    "Spellcasting": {
      description: "You can cast artificer spells using Intelligence as your spellcasting ability.",
      type: "passive",
      used: false
    },
    "Infuse Item": {
      description: "You can infuse items with magical properties. You can have up to 2 infused items at a time.",
      type: "passive",
      used: false
    },
    "The Right Tool for the Job": {
      description: "You can create artisan's tools using your tinker's tools as an action.",
      type: "action",
      used: false,
      cooldown: "action"
    }
  });

  const toggleFeature = (featureName) => {
    setFeatures(prev => ({
      ...prev,
      [featureName]: {
        ...prev[featureName],
        used: !prev[featureName].used
      }
    }));
  };

  const resetAllFeatures = () => {
    const resetFeatures = {};
    Object.keys(features).forEach(feature => {
      resetFeatures[feature] = {
        ...features[feature],
        used: false
      };
    });
    setFeatures(resetFeatures);
  };

  const getFeatureIcon = (type) => {
    switch (type) {
      case 'action':
        return '⚡';
      case 'bonus_action':
        return '⚡⚡';
      case 'reaction':
        return '🔄';
      case 'passive':
        return '🛡️';
      default:
        return '📋';
    }
  };

  return (
    <Card>
      <Card.Header>Features & Abilities</Card.Header>
      <Card.Content>
        <div className="space-y-4">
          {/* Control Button */}
          <div className="flex justify-end">
            <button
              onClick={resetAllFeatures}
              className="bg-artificerBronze/80 hover:bg-artificerBronze text-white px-3 py-1 rounded text-sm button-glow"
            >
              Reset All
            </button>
          </div>

          {/* Features List */}
          <div className="space-y-3">
            {Object.entries(features).map(([featureName, feature]) => (
              <div
                key={featureName}
                className={`parchment-card p-4 rounded transition-all duration-200 ${
                  feature.used ? 'bg-sealWax/10 border border-sealWax/20' : 'hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg">{getFeatureIcon(feature.type)}</span>
                      <h3 className={`font-semibold ${feature.used ? 'text-sealWax' : 'parchment-text'}`}>
                        {featureName}
                      </h3>
                      {feature.cooldown && (
                        <span className="parchment-text-light text-xs bg-artificerBronze/10 px-2 py-1 rounded">
                          {feature.cooldown}
                        </span>
                      )}
                    </div>
                    <p className="parchment-text-light text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  {feature.type !== 'passive' && (
                    <button
                      onClick={() => toggleFeature(featureName)}
                      className={`ml-4 px-3 py-1 rounded text-sm font-semibold transition-all duration-200 ${
                        feature.used
                          ? 'bg-sealWax/30 text-white border border-sealWax/30'
                          : 'bg-artificerBronze/30 text-white border border-artificerBronze/30 hover:bg-artificerBronze/50'
                      }`}
                    >
                      {feature.used ? 'Used' : 'Available'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Feature Summary */}
          <div className="parchment-card p-4 rounded">
            <h3 className="parchment-text font-semibold mb-2">Feature Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="parchment-text-light">Total Features:</span>
                <div className="parchment-text font-semibold">{Object.keys(features).length}</div>
              </div>
              <div>
                <span className="parchment-text-light">Passive Features:</span>
                <div className="parchment-text font-semibold">
                  {Object.values(features).filter(f => f.type === 'passive').length}
                </div>
              </div>
              <div>
                <span className="parchment-text-light">Active Features:</span>
                <div className="parchment-text font-semibold">
                  {Object.values(features).filter(f => f.type !== 'passive').length}
                </div>
              </div>
              <div>
                <span className="parchment-text-light">Used This Turn:</span>
                <div className="parchment-text font-semibold">
                  {Object.values(features).filter(f => f.used).length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default FeaturesTracker;
