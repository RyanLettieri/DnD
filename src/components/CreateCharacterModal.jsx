import React, { useEffect, useMemo, useState } from 'react';
import {
  ABILITY_KEYS,
  ABILITY_LABELS,
  DND_ALIGNMENTS,
  DND_BACKGROUND_DETAILS,
  DND_BACKGROUNDS,
  DND_CLASSES,
  DND_RACE_DETAILS,
  DND_RACES,
  STANDARD_ARRAY,
  getClassOptions
} from '../data/characterOptions';

const emptyCharacterForm = {
  name: '',
  class: 'Artificer',
  level: 1,
  race: 'Human',
  background: 'Custom',
  alignment: 'True Neutral',
  portrait: '',
  personalityTraits: '',
  ideals: '',
  bonds: '',
  flaws: '',
  backstory: '',
  abilityMethod: 'standard',
  abilities: {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10
  }
};

const steps = ['Identity', 'Class & Race', 'Abilities', 'Story'];

const readStoredBackground = (character) => {
  if (!character?.id) return {};
  try {
    const stored = localStorage.getItem(`character_${character.id}_backgroundScribe`);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    return {};
  }
};

const normalizeSelectValue = (value, options, fallback) => {
  if (!value) return fallback;
  if (options.includes(value)) return value;
  const caseMatch = options.find(option => option.toLowerCase() === String(value).toLowerCase());
  return caseMatch || fallback;
};

const createFormFromCharacter = (character) => {
  if (!character) return emptyCharacterForm;
  const storedBackground = readStoredBackground(character);
  const backgroundScribe = {
    ...character.backgroundScribe,
    ...storedBackground
  };

  return {
    ...emptyCharacterForm,
    name: character.name || character.stats?.characterName || '',
    class: character.class || character.stats?.class || 'Artificer',
    level: character.level || character.stats?.level || 1,
    race: normalizeSelectValue(character.race, DND_RACES, 'Custom Lineage'),
    background: normalizeSelectValue(character.background, DND_BACKGROUNDS, 'Custom'),
    alignment: character.alignment || 'True Neutral',
    portrait: character.portrait || '',
    personalityTraits: character.personalityTraits ?? backgroundScribe.traits ?? '',
    ideals: character.ideals ?? backgroundScribe.ideals ?? '',
    bonds: character.bonds ?? backgroundScribe.bonds ?? '',
    flaws: character.flaws ?? backgroundScribe.flaws ?? '',
    backstory: character.backstory ?? backgroundScribe.originNotes ?? '',
    abilityMethod: character.abilityMethod || 'custom',
    abilities: ABILITY_KEYS.reduce((acc, ability) => ({
      ...acc,
      [ability]: Number(character.stats?.[ability]) || 10
    }), {})
  };
};

const CreateCharacterModal = ({ isOpen, onClose, onCreate, onUpdate, initialCharacter = null }) => {
  const isEditing = Boolean(initialCharacter);
  const [step, setStep] = useState(0);
  const [characterData, setCharacterData] = useState(emptyCharacterForm);

  useEffect(() => {
    if (isOpen) {
      setCharacterData(createFormFromCharacter(initialCharacter));
      setStep(0);
    }
  }, [initialCharacter, isOpen]);

  const selectedClass = DND_CLASSES[characterData.class] || DND_CLASSES.Artificer;
  const selectedRace = DND_RACE_DETAILS[characterData.race] || DND_RACE_DETAILS['Custom Lineage'];
  const selectedBackground = DND_BACKGROUND_DETAILS[characterData.background] || DND_BACKGROUND_DETAILS.Custom;

  const assignedStandardValues = useMemo(
    () => ABILITY_KEYS.map((ability) => Number(characterData.abilities[ability]) || 0),
    [characterData.abilities]
  );

  const unusedStandardValues = STANDARD_ARRAY.filter((score, index) => {
    const usedIndex = assignedStandardValues.findIndex((value, valueIndex) =>
      value === score && assignedStandardValues.slice(0, valueIndex).filter(v => v === score).length ===
        STANDARD_ARRAY.slice(0, index).filter(v => v === score).length
    );
    return usedIndex === -1;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!characterData.name.trim()) {
      alert('Please enter a character name.');
      setStep(0);
      return;
    }

    const payload = {
      ...characterData,
      level: Math.min(20, Math.max(1, Number(characterData.level) || 1)),
      name: characterData.name.trim()
    };

    if (isEditing) {
      const impactfulChanges = [];
      if (payload.class !== initialCharacter.class) impactfulChanges.push('class defaults, saving throws, starter skills, equipment, and tools may change');
      if (payload.race !== initialCharacter.race) impactfulChanges.push('race/lineage details and derived armor defaults may change');
      if (Number(payload.level) !== Number(initialCharacter.level)) impactfulChanges.push('level-based proficiency and resources may change');
      if (impactfulChanges.length > 0) {
        const shouldContinue = window.confirm(`This edit may update ${impactfulChanges.join('; ')}. Continue?`);
        if (!shouldContinue) return;
      }
      onUpdate(initialCharacter.id, payload);
    } else {
      onCreate(payload);
    }

    onClose();
  };

  const updateField = (field, value) => {
    setCharacterData(prev => ({ ...prev, [field]: value }));
  };

  const updateAbility = (ability, value) => {
    const parsed = Math.min(20, Math.max(1, Number(value) || 1));
    setCharacterData(prev => ({
      ...prev,
      abilityMethod: 'custom',
      abilities: {
        ...prev.abilities,
        [ability]: parsed
      }
    }));
  };

  const assignStandardArray = () => {
    const primary = selectedClass.primaryAbilities || [];
    const orderedAbilities = [
      ...primary,
      ...ABILITY_KEYS.filter(ability => !primary.includes(ability))
    ];
    const nextAbilities = { ...emptyCharacterForm.abilities };
    orderedAbilities.forEach((ability, index) => {
      nextAbilities[ability] = STANDARD_ARRAY[index] || 10;
    });
    setCharacterData(prev => ({
      ...prev,
      abilityMethod: 'standard',
      abilities: nextAbilities
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 modal-backdrop flex items-center justify-center z-50 p-4">
      <div className="character-creator sheet-panel w-full max-w-5xl max-h-[92vh] overflow-hidden">
        <div className="creator-header">
          <div>
            <h2>{isEditing ? 'Edit Character' : 'Create Character'}</h2>
            <p>Build the adventurer first, then fine tune the full sheet.</p>
          </div>
          <button type="button" onClick={onClose} className="creator-close">Close</button>
        </div>

        <div className="creator-steps">
          {steps.map((label, index) => (
            <button
              key={label}
              type="button"
              onClick={() => setStep(index)}
              className={step === index ? 'is-active' : ''}
            >
              <span>{index + 1}</span>
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="creator-body">
          {step === 0 && (
            <div className="creator-grid">
              <label className="creator-field is-wide">
                <span>Character Name *</span>
                <input
                  type="text"
                  value={characterData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="e.g. IniTuga, Nara Windstep, Brother Ash"
                  required
                />
              </label>

              <label className="creator-field">
                <span>Level</span>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={characterData.level}
                  onChange={(e) => updateField('level', Number(e.target.value) || 1)}
                />
              </label>

              <label className="creator-field">
                <span>Alignment</span>
                <select value={characterData.alignment} onChange={(e) => updateField('alignment', e.target.value)}>
                  {DND_ALIGNMENTS.map(alignment => <option key={alignment} value={alignment}>{alignment}</option>)}
                </select>
              </label>

              <label className="creator-field is-wide">
                <span>Portrait URL or Path</span>
                <input
                  type="text"
                  value={characterData.portrait}
                  onChange={(e) => updateField('portrait', e.target.value)}
                  placeholder="/tortle-portrait.png"
                />
              </label>
            </div>
          )}

          {step === 1 && (
            <div className="creator-choice-step">
              <div className="creator-choice-selectors">
                <label className="creator-field">
                  <span>Class</span>
                  <select value={characterData.class} onChange={(e) => updateField('class', e.target.value)}>
                    {getClassOptions().map(className => <option key={className} value={className}>{className}</option>)}
                  </select>
                </label>

                <label className="creator-field">
                  <span>Race / Lineage</span>
                  <select value={characterData.race} onChange={(e) => updateField('race', e.target.value)}>
                    {DND_RACES.map(race => <option key={race} value={race}>{race}</option>)}
                  </select>
                </label>

                <label className="creator-field">
                  <span>Background</span>
                  <select value={characterData.background} onChange={(e) => updateField('background', e.target.value)}>
                    {DND_BACKGROUNDS.map(background => <option key={background} value={background}>{background}</option>)}
                  </select>
                </label>
              </div>

              <div className="creator-choice-summaries">
                <div className="creator-option-summary">
                  <h3>{characterData.class}</h3>
                  <p>{selectedClass.description}</p>
                  <div>
                    <span>Hit Die d{selectedClass.hitDiceSize}</span>
                    <span>Primary: {(selectedClass.primaryAbilities || []).map(a => ABILITY_LABELS[a]).join(', ')}</span>
                    <span>Saves: {(selectedClass.savingThrows || []).map(a => ABILITY_LABELS[a]).join(', ')}</span>
                    <span>{selectedClass.spellcaster ? 'Spellcasting' : 'No base spellcasting'}</span>
                  </div>
                </div>

                <div className="creator-option-summary">
                  <h3>{characterData.race}</h3>
                  <p>{selectedRace.description}</p>
                  <div>
                    {(selectedRace.traits || []).map(trait => <span key={trait}>{trait}</span>)}
                  </div>
                </div>

                <div className="creator-option-summary">
                  <h3>{characterData.background}</h3>
                  <p>{selectedBackground.description}</p>
                  <div>
                    {(selectedBackground.traits || []).map(trait => <span key={trait}>{trait}</span>)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="creator-abilities">
              <div className="creator-ability-toolbar">
                <div>
                  <h3>Ability Scores</h3>
                  <p>Use the recommended standard array or enter custom values.</p>
                </div>
                <button type="button" onClick={assignStandardArray}>Assign Standard Array</button>
              </div>

              <div className="creator-ability-grid">
                {ABILITY_KEYS.map(ability => (
                  <label className="creator-ability-card" key={ability}>
                    <span>{ABILITY_LABELS[ability]}</span>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={characterData.abilities[ability]}
                      onChange={(e) => updateAbility(ability, e.target.value)}
                    />
                    {(selectedClass.primaryAbilities || []).includes(ability) && <em>Primary</em>}
                  </label>
                ))}
              </div>

              <div className="creator-help-text">
                Standard array: {STANDARD_ARRAY.join(', ')}
                {unusedStandardValues.length > 0 && characterData.abilityMethod === 'standard'
                  ? ` • Unused: ${unusedStandardValues.join(', ')}`
                  : ''}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="creator-grid">
              <label className="creator-field is-wide">
                <span>Personality Traits</span>
                <textarea value={characterData.personalityTraits} onChange={(e) => updateField('personalityTraits', e.target.value)} />
              </label>
              <label className="creator-field">
                <span>Ideals</span>
                <textarea value={characterData.ideals} onChange={(e) => updateField('ideals', e.target.value)} />
              </label>
              <label className="creator-field">
                <span>Bonds</span>
                <textarea value={characterData.bonds} onChange={(e) => updateField('bonds', e.target.value)} />
              </label>
              <label className="creator-field">
                <span>Flaws</span>
                <textarea value={characterData.flaws} onChange={(e) => updateField('flaws', e.target.value)} />
              </label>
              <label className="creator-field is-wide">
                <span>Backstory / Origin Notes</span>
                <textarea value={characterData.backstory} onChange={(e) => updateField('backstory', e.target.value)} />
              </label>
            </div>
          )}

          <div className="creator-footer">
            <button type="button" onClick={() => step === 0 ? onClose() : setStep(step - 1)}>
              {step === 0 ? 'Cancel' : 'Back'}
            </button>
            {step < steps.length - 1 ? (
              <button type="button" onClick={() => setStep(step + 1)} className="creator-primary">
                Continue
              </button>
            ) : (
              <button type="submit" className="creator-primary">
                {isEditing ? 'Save Character' : 'Create Character'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCharacterModal;
