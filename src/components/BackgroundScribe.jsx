import React from 'react';
import Card from './Card';
import usePersistentState from '../hooks/usePersistentState';

// Background: Scribe (5e-inspired)
// - Shows fixed background info (skills, tools, languages, equipment, feature)
// - Lets the player record Traits/Ideals/Bonds/Flaws and Origin Notes
// - Persists locally via usePersistentState
const BackgroundScribe = () => {
  const [bg, setBg] = usePersistentState('backgroundScribe', {
    traits: '',
    ideals: '',
    bonds: '',
    flaws: '',
    originNotes: '',
    bonusLanguages: ['', ''], // two of choice; editable fields
  });

  const update = (field, value) => setBg(prev => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card>
        <Card.Header>Background: Scribe</Card.Header>
        <Card.Content>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="parchment-card p-4 rounded-lg">
              <h3 className="parchment-text font-semibold mb-2">Proficiencies</h3>
              <ul className="list-disc list-inside parchment-text-light text-sm space-y-1">
                <li>Skills: History, Arcana</li>
                <li>Tools: Calligrapher's supplies</li>
                <li>Languages: Two of your choice</li>
              </ul>
            </div>
            <div className="parchment-card p-4 rounded-lg">
              <h3 className="parchment-text font-semibold mb-2">Starting Equipment</h3>
              <ul className="list-disc list-inside parchment-text-light text-sm space-y-1">
                <li>Calligrapher's supplies</li>
                <li>Scroll case with reference notes</li>
                <li>Ink (bottle) and quill</li>
                <li>10 sheets of parchment</li>
                <li>Common clothes</li>
                <li>Pouch containing 10 gp</li>
              </ul>
            </div>
          </div>
          <div className="parchment-card p-4 rounded-lg mt-4">
            <h3 className="parchment-text font-semibold mb-2">Feature: Scribe's Lore</h3>
            <p className="parchment-text-light text-sm">
              Years of study grant you knowledge of libraries, archives, and the subtle art of finding information.
              You can quickly learn where to seek lore and who might possess it. While you may not always know the answers,
              you usually know where and how to obtain them.
            </p>
          </div>
        </Card.Content>
      </Card>

      {/* Languages (choices) */}
      <Card>
        <Card.Header>Background Languages</Card.Header>
        <Card.Content>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {bg.bonusLanguages.map((val, idx) => (
              <input
                key={idx}
                type="text"
                value={val}
                onChange={(e) => {
                  const arr = [...bg.bonusLanguages];
                  arr[idx] = e.target.value;
                  update('bonusLanguages', arr);
                }}
                className="parchment-card rounded p-2 parchment-text border border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none"
                placeholder={`Language choice ${idx + 1}`}
              />
            ))}
          </div>
        </Card.Content>
      </Card>

      {/* Personality & Origin */}
      <Card>
        <Card.Header>Personality Details</Card.Header>
        <Card.Content>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="parchment-text-light text-xs uppercase">Personality Traits</label>
                <textarea
                  value={bg.traits}
                  onChange={(e) => update('traits', e.target.value)}
                  className="w-full h-24 parchment-card rounded p-2 parchment-text border border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none resize-none"
                  placeholder="E.g., meticulous, curious, patient..."
                />
              </div>
              <div>
                <label className="parchment-text-light text-xs uppercase">Ideals</label>
                <textarea
                  value={bg.ideals}
                  onChange={(e) => update('ideals', e.target.value)}
                  className="w-full h-24 parchment-card rounded p-2 parchment-text border border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none resize-none"
                  placeholder="E.g., Knowledge, Truth, Preservation..."
                />
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="parchment-text-light text-xs uppercase">Bonds</label>
                <textarea
                  value={bg.bonds}
                  onChange={(e) => update('bonds', e.target.value)}
                  className="w-full h-24 parchment-card rounded p-2 parchment-text border border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none resize-none"
                  placeholder="E.g., sworn to protect a library, respect for a mentor..."
                />
              </div>
              <div>
                <label className="parchment-text-light text-xs uppercase">Flaws</label>
                <textarea
                  value={bg.flaws}
                  onChange={(e) => update('flaws', e.target.value)}
                  className="w-full h-24 parchment-card rounded p-2 parchment-text border border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none resize-none"
                  placeholder="E.g., absent-minded, pedantic, too trusting of written sources..."
                />
              </div>
            </div>
          </div>
        </Card.Content>
      </Card>

      <Card>
        <Card.Header>Origin Notes</Card.Header>
        <Card.Content>
          <textarea
            value={bg.originNotes}
            onChange={(e) => update('originNotes', e.target.value)}
            className="w-full h-40 parchment-card rounded p-3 parchment-text border border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none resize-none"
            placeholder="Background details and story of your character's origin..."
          />
        </Card.Content>
      </Card>
    </div>
  );
};

export default BackgroundScribe;
