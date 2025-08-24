import React from 'react';

const StatBox = ({ label, value }) => (
  <div className="bg-white/5 p-4 rounded text-center">
    <div className="text-2xl font-bold text-white">{value}</div>
    <div className="text-tortleYellow text-sm">{label}</div>
  </div>
);

export default StatBox;