import React from 'react';
import Card from './Card';
import usePersistentState from '../hooks/usePersistentState';

const ProficienciesLanguages = ({ characterDataPrefix }) => {
  // Character-specific proficiencies and languages
  const [proficiencies, setProficiencies] = usePersistentState(`${characterDataPrefix}_toolProficiencies`, []);
  const [languages, setLanguages] = usePersistentState(`${characterDataPrefix}_languages`, []);

  return (
    <Card>
      <Card.Header>Proficiencies & Languages</Card.Header>
      <Card.Content>
        <div className="space-y-4">
          <div>
            <h3 className="parchment-text font-bold mb-2">Tool & Armor Proficiencies</h3>
            <div className="grid grid-cols-2 gap-2">
              {proficiencies.map(prof => (
                <div key={prof} className="parchment-card p-2 rounded parchment-text">
                  {prof}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="parchment-text font-bold mb-2">Languages</h3>
            <div className="grid grid-cols-2 gap-2">
              {languages.map(lang => (
                <div key={lang} className="parchment-card p-2 rounded parchment-text">
                  {lang}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default ProficienciesLanguages;