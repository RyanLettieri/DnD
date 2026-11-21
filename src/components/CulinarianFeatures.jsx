import React, { useMemo, useState } from 'react';
import usePersistentState from '../hooks/usePersistentState';
import Card from './Card';

const RECIPES = [
  { id: 'guardian', name: 'Guardian', role: 'Protection', passive: 'Watchful Crust', passiveText: 'Allies within 5 feet have advantage on checks and saves to resist being shoved or knocked prone.', action: 'Interpose', actionText: 'Bonus Action: command this golem to protect an ally within 5 feet. The first time that ally is hit by an attack before your next turn, the golem can use its reaction to roll 1d8 and subtract it from the attack roll.' },
  { id: 'medic', name: 'Medic', role: 'Support', passive: 'Comfort Food', passiveText: 'A friendly creature within 5 feet adds your proficiency bonus to its death saving throws (once per creature per Long Rest).', action: 'Hearty Helping', actionText: 'Bonus Action: command this golem to grant an ally within 5 feet temporary hit points equal to 1d8 + your proficiency bonus for 1 minute. A creature cannot benefit again until the start of your next turn.' },
  { id: 'saboteur', name: 'Saboteur', role: 'Control', passive: 'Sticky Situation', passiveText: 'Hostile creatures within 5 feet treat the area as difficult terrain.', action: 'Spoiled Ingredients', actionText: 'Bonus Action: one creature within 5 feet makes a Strength save. On a failure, its speed is halved; whether it succeeds or fails, it cannot take reactions until the start of your next turn.' },
  { id: 'striker', name: 'Striker', role: 'Damage', passive: 'Opportunistic Crumbs', passiveText: 'When an ally hits a hostile creature within 5 feet, this golem has advantage on its next Batter Up attack against that creature before the end of your next turn.', action: 'Batter Up', actionText: 'Bonus Action: make a melee spell attack against a creature within 5 feet. Hit: 1d8 + your proficiency bonus bludgeoning damage; a Large or smaller target also makes a Strength save or is pushed 5 feet.' },
  { id: 'grapevine', name: 'Grapevine', role: 'Healing', passive: 'Fruitful Harvest', passiveText: 'This golem carries five magical grapes, each of which can be used once.', action: 'Healing Grape', actionText: 'Bonus Action: give one grape to an ally within 5 feet. The ally regains 1d6 + your Intelligence modifier hit points. Track each of the five grapes separately.' }
];

const initialBrigade = { active: [], sharedHp: 0, maxHp: 0, tempHp: 0, grapes: 5, seasoning: 'none', usedCommand: false };

export default function CulinarianFeatures({ characterId, level = 1, proficiencyBonus = 2, intelligence = 10, spellSlots = {}, onUpdateSpellSlots = () => {} }) {
  const key = `character_${characterId}_culinarian`;
  const [state, setState] = usePersistentState(key, initialBrigade);
  const [subclass, setSubclass] = usePersistentState(`${key}_subclass`, 'Confectioner');
  const [customRecipes, setCustomRecipes] = usePersistentState(`${key}_recipes`, []);
  const [newRecipe, setNewRecipe] = useState({ name: '', level: 1, description: '' });
  const [selectedCommand, setSelectedCommand] = useState('guardian');
  const maxGolems = level >= 14 ? 5 : level >= 10 ? 4 : level >= 3 ? 3 : 0;
  const calculatedHp = level >= 10 ? 6 * level : 5 + 5 * level;
  const active = state.active || [];
  const availableRecipes = useMemo(() => RECIPES.concat(customRecipes), [customRecipes]);
  const intMod = Math.floor((Number(intelligence || 10) - 10) / 2);
  const update = (patch) => setState(prev => ({ ...prev, ...patch }));
  const createBrigade = () => update({ active: active.slice(0, maxGolems).length ? active.slice(0, maxGolems) : ['guardian', 'medic', 'saboteur'].slice(0, maxGolems), sharedHp: calculatedHp, maxHp: calculatedHp, tempHp: 0, grapes: 5, usedCommand: false });
  const toggleGolem = (id) => {
    const next = active.includes(id) ? active.filter(item => item !== id) : active.length < maxGolems ? [...active, id] : active;
    update({ active: next });
  };
  const damage = (amount) => {
    const remainingTemp = Math.max(0, Number(state.tempHp || 0) - Number(amount || 0));
    const spill = Math.max(0, Number(amount || 0) - Number(state.tempHp || 0));
    update({ tempHp: remainingTemp, sharedHp: Math.max(0, Number(state.sharedHp || 0) - spill), active: spill >= Number(state.sharedHp || 0) ? [] : active });
  };
  const spendSeasoning = () => {
    if (state.seasoning === 'none') return;
    const slotLevel = Number(state.seasoning);
    const slots = spellSlots[slotLevel] || [];
    const index = slots.findIndex(used => !used);
    if (index < 0) return;
    onUpdateSpellSlots({ ...spellSlots, [slotLevel]: slots.map((used, i) => i === index ? true : used) });
  };
  const addRecipe = () => {
    if (!newRecipe.name.trim()) return;
    setCustomRecipes(prev => [...prev, { id: `custom-${Date.now()}`, name: newRecipe.name.trim(), role: 'Custom', passive: 'Custom Feature', passiveText: 'Player-defined recipe feature.', action: 'Custom Recipe', actionText: newRecipe.description.trim() || 'Player-defined recipe effect.', level: Number(newRecipe.level) || 1 }]);
    setNewRecipe({ name: '', level: 1, description: '' });
  };

  return (
    <div className="space-y-6">
      <Card>
        <Card.Header>Culinarian — Recipe Book</Card.Header>
        <Card.Content>
          <p className="text-sm parchment-text-light mb-3">Your recipes are the class’s spell-like abilities. Add your DM-approved recipes here; this list is separate from the Artificer spell catalogue.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
            <input className="sheet-input" placeholder="Recipe name" value={newRecipe.name} onChange={e => setNewRecipe({ ...newRecipe, name: e.target.value })} />
            <select className="sheet-input" value={newRecipe.level} onChange={e => setNewRecipe({ ...newRecipe, level: e.target.value })}>{Array.from({ length: 10 }, (_, i) => <option key={i} value={i}>{i === 0 ? 'Cantrip' : `Level ${i}`}</option>)}</select>
            <input className="sheet-input" placeholder="Effect / notes" value={newRecipe.description} onChange={e => setNewRecipe({ ...newRecipe, description: e.target.value })} />
          </div>
          <button className="action-button" onClick={addRecipe}>Add recipe</button>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {customRecipes.map(recipe => <div key={recipe.id} className="parchment-card p-3 rounded"><strong>{recipe.name}</strong><span className="ml-2 text-xs">Level {recipe.level}</span><p className="text-sm mt-1">{recipe.actionText}</p><button className="action-button danger mt-2" onClick={() => setCustomRecipes(prev => prev.filter(item => item.id !== recipe.id))}>Remove</button></div>)}
            {customRecipes.length === 0 && <p className="text-sm parchment-text-light">No custom recipes yet.</p>}
          </div>
        </Card.Content>
      </Card>

      <Card>
        <Card.Header>Subclass — Confectioner</Card.Header>
        <Card.Content>
          <p className="text-sm parchment-text-light mb-3">Animated food constructs form a brigade. All active golems share one hit point pool, but occupy separate spaces.</p>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <label className="text-sm">Subclass <select className="sheet-input ml-2" value={subclass} onChange={e => setSubclass(e.target.value)}><option>Confectioner</option><option>Unselected</option></select></label>
            <span className="text-sm">Active limit: {maxGolems}</span>
            <span className="text-sm">Shared HP: {state.sharedHp}/{state.maxHp}</span>
            <button className="action-button" onClick={createBrigade} disabled={maxGolems === 0}>Create / restore brigade</button>
          </div>
          {maxGolems === 0 ? <p className="text-sm">Culinary Constructs unlock at Culinarian level 3.</p> : <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {RECIPES.map(recipe => <label key={recipe.id} className="parchment-card p-3 rounded flex gap-2 items-start"><input type="checkbox" checked={active.includes(recipe.id)} onChange={() => toggleGolem(recipe.id)} /><span><strong>{recipe.name}</strong><span className="block text-xs">{recipe.role}</span></span></label>)}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
              <label className="text-sm">Damage to shared pool<input className="sheet-input mt-1" type="number" min="0" onChange={e => setState(prev => ({ ...prev, pendingDamage: e.target.value }))} value={state.pendingDamage || ''} /></label>
              <button className="action-button danger self-end" onClick={() => { damage(Number(state.pendingDamage || 0)); update({ pendingDamage: '' }); }}>Apply damage</button>
              <label className="text-sm">Temporary HP<input className="sheet-input mt-1" type="number" min="0" value={state.tempHp || 0} onChange={e => update({ tempHp: Math.max(0, Number(e.target.value) || 0) })} /></label>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="text-sm">Commanded recipe<select className="sheet-input mt-1" value={selectedCommand} onChange={e => setSelectedCommand(e.target.value)}>{RECIPES.filter(recipe => active.includes(recipe.id)).map(recipe => <option key={recipe.id} value={recipe.id}>{recipe.name} — {recipe.action}</option>)}</select></label>
              <label className="text-sm">Seasoning spell slot<select className="sheet-input mt-1" value={state.seasoning || 'none'} onChange={e => update({ seasoning: e.target.value })}><option value="none">No seasoning</option>{[1,2,3,4,5,6,7,8,9].map(n => <option key={n} value={n}>Level {n}</option>)}</select></label>
            </div>
            <p className="text-sm parchment-text-light mt-3">{availableRecipes.find(recipe => recipe.id === selectedCommand)?.actionText || 'Select an active golem recipe.'}</p>
            <button className="action-button mt-2" disabled={!active.includes(selectedCommand) || state.usedCommand} onClick={() => { spendSeasoning(); update({ usedCommand: true }); }}>Mark Bonus Action command used</button>
            <button className="action-button secondary mt-2 ml-2" onClick={() => update({ usedCommand: false })}>New turn</button>
            {level >= 6 && <p className="text-sm mt-3">Magical Seasoning unlocked: choose a slot and apply Spicy (+1d6 damage per slot level), Savory (+1d6 temporary HP per slot level), or Bitter (failed-save target has disadvantage on its next attack). This tracker marks the slot spent; apply the effect at the table.</p>}
            {level >= 10 && <p className="text-sm mt-2">Expanded Brigade: up to four golems; when you command one, you may command a second different golem with the same Bonus Action.</p>}
            {level >= 14 && <p className="text-sm mt-2">Grand Banquet: once per Long Rest, activate for 1 minute; up to five golems, shared temporary HP equal to your Culinarian level, +10 ft speed, and +PB damage or temporary HP once per turn.</p>}
            {active.includes('grapevine') && <div className="mt-4 flex items-center gap-3"><strong>Grapevine grapes: {state.grapes ?? 5}/5</strong><button className="action-button" disabled={(state.grapes ?? 5) <= 0} onClick={() => update({ grapes: Math.max(0, (state.grapes ?? 5) - 1) })}>Use healing grape (1d6 + {intMod} HP)</button><button className="action-button secondary" onClick={() => update({ grapes: 5 })}>Restore grapes</button></div>}
          </>}
        </Card.Content>
      </Card>
    </div>
  );
}
