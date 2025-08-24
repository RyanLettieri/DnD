import React from 'react';
import { allSkills } from '../constants/gameData'; // Assuming skills are defined in gameData.js

const SkillList = ({ proficiencies, toggleProficiency }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {allSkills.map((skill) => (
        <div
          key={skill}
          className={`cursor-pointer transition ${
            proficiencies[skill]
              ? "bg-gradient-to-br from-green-500 to-green-400 hover:from-green-600 hover:to-green-500"
              : "bg-gradient-to-br from-gray-400 to-gray-300 hover:from-gray-500 hover:to-gray-400"
          }`}
          onClick={() => toggleProficiency(skill)}
        >
          <div className="p-4 rounded-lg">
            <span className="font-bold text-white">{skill}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillList;