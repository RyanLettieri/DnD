import React from 'react';
import Card from './Card';

const SUBCLASS_FEATURES = [
  { level: 3, name: 'Culinary Constructs', detail: 'Learn four construct recipes (Guardian, Medic, Saboteur, Striker) and create an active brigade of up to three golems. Grapevine is an additional recipe concept discussed with the player; confirm whether it is part of the approved list.' },
  { level: 6, name: 'Magical Seasoning', detail: 'Spend a spell slot when commanding a golem to apply one seasoning: Spicy, Savory, or Bitter.' },
  { level: 10, name: 'Expanded Brigade', detail: 'Increase the active brigade limit to four, improve shared HP, make construct attacks magical, and command a second different golem with the same Bonus Action.' },
  { level: 14, name: 'Grand Banquet', detail: 'Once per Long Rest, activate a one-minute empowered brigade with up to five golems, shared temporary HP, increased speed, and an additional damage/temporary-HP benefit.' }
];

const BASE_CLASS_GAPS = [
  'Base-class feature names and descriptions for levels 1–20',
  'Class saving throw proficiencies',
  'Number of class skills and the permitted skill list',
  'Starting equipment and weapon proficiencies',
  'Recipe acquisition and preparation rules, including limits',
  'Spellcasting focus, ritual casting, and any component rules',
  'Any base-class resource pools and short/long-rest recovery',
  'Ability score improvement / feat progression if different from the campaign rules'
];

export default function CulinarianClassFeatures({ level = 1, subclass = '' }) {
  return (
    <div className="space-y-6">
      <Card>
        <Card.Header>Culinarian — Class Progression</Card.Header>
        <Card.Content>
          <p className="text-sm parchment-text-light mb-4">
            Confirmed foundation: d8 Hit Die, Intelligence spellcasting, full-caster spell-slot progression,
            Cook's Utensils proficiency, and light/medium armor proficiency. Unknown rules are deliberately
            left unfilled rather than guessed.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Array.from({ length: 20 }, (_, index) => {
              const classLevel = index + 1;
              const subclassFeature = SUBCLASS_FEATURES.find(feature => feature.level === classLevel);
              return (
                <div key={classLevel} className="parchment-card p-3 rounded">
                  <div className="flex items-center justify-between gap-2">
                    <strong>Level {classLevel}</strong>
                    {subclassFeature && <span className="sheet-row-pill">{subclassFeature.name}</span>}
                    {classLevel === 4 || classLevel === 8 || classLevel === 12 || classLevel === 16 || classLevel === 19
                      ? <span className="sheet-row-pill">ASI / feat? confirm</span>
                      : null}
                  </div>
                  {subclassFeature ? (
                    <p className="text-sm parchment-text-light mt-2">{subclassFeature.detail}</p>
                  ) : (
                    <p className="text-sm parchment-text-light mt-2">Base-class feature progression not yet supplied by DM.</p>
                  )}
                  {classLevel > level && <span className="text-xs parchment-text-light">Unlocks at level {classLevel}</span>}
                </div>
              );
            })}
          </div>
        </Card.Content>
      </Card>
      <Card>
        <Card.Header>DM Questions — Culinarian Rules to Confirm</Card.Header>
        <Card.Content>
          <p className="text-sm parchment-text-light mb-3">
            These are intentionally tracked as open questions. They do not prevent character creation or manual stat entry.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm parchment-text-light">
            {BASE_CLASS_GAPS.map(item => <li key={item}>{item}</li>)}
            <li>Confectioner: clarify whether Grapevine is an approved fifth construct recipe or an optional variant.</li>
            <li>Confectioner: resolve the initiative/movement timing wording for constructs.</li>
            <li>Confectioner: clarify whether an uncommanded construct Dodges automatically and how that interacts with its lack of independent actions.</li>
            <li>Confectioner: define how Guardian's reaction is refreshed and whether multiple Guardians can protect the same target.</li>
            <li>Confectioner: confirm the shared HP formula change at level 10 and how AoE damage is counted across multiple golems.</li>
            <li>Confectioner: confirm whether a successful Saboteur save still prevents reactions (current notes say yes).</li>
            <li>Confectioner: confirm the exact recipe list learned at level 3 and whether later recipes are learned.</li>
          </ul>
        </Card.Content>
      </Card>
    </div>
  );
}
