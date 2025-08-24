import React from 'react';
import Card from './Card';

const ProficienciesLanguages = () => {
  const proficiencies = [
    "Chef's Tools",
    "Tinker's Tools",
    "Light Armor",
    "Medium Armor",
    "Shields",
    "Simple Weapons"
  ];

  const languages = [
    "Common",
    "Aquan"
  ];

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