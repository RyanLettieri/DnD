import React from 'react';

const StatDisplay = ({ icon, stat, value, bonus, onChange }) => {
  return (
    <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg mb-2">
      <span className="text-white text-lg">{icon} {stat}</span>
      <div className="flex items-center">
        <span className="text-white text-lg">{value}</span>
        <span className="text-yellow-300 text-lg ml-2">{bonus}</span>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="ml-2 w-16 p-1 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>
    </div>
  );
};

export default StatDisplay;