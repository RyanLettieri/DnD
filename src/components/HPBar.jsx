import React from 'react';

const HPBar = ({ current, max, onUpdateHP, onDamage, onHeal, onEditMax }) => {
  const percentage = (current / max) * 100;
  
  
  return (
    <div className="flex flex-col items-center p-2 bg-amber-900 bg-opacity-30 rounded-lg">
      <div className="flex items-center w-full justify-between mb-2">
        <div className="text-amber-100 font-bold text-xl">HP</div>
      </div>
      <div className="w-full flex items-center gap-2">
        {/* Bar */}
        <div className="relative flex-1" style={{ height: '40px' }}>
          <div className="absolute inset-0 bg-amber-900 bg-opacity-30 rounded overflow-hidden">
            <div
              className="h-full transition-all duration-500 ease-out"
              style={{
                width: `${percentage}%`,
                background: 'linear-gradient(to right, #4ade80, #22c55e, #16a34a)',
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.25)'
              }}
            >
              <div
                className="absolute inset-0 flex items-center justify-center font-extrabold"
                style={{
                  color: '#ffffff',
                  fontSize: '1rem',
                  textShadow: '0 0 4px rgba(0,0,0,0.9), 0 0 8px rgba(0,0,0,0.6), 1px 1px 0 rgba(0,0,0,0.8)'
                }}
              >
                {current}/{max}
              </div>
            </div>
          </div>
        </div>
        {/* Right-side button group */}
        <div className="flex items-center space-x-2">
          <button
            onClick={onDamage}
            className="px-3 py-1.5 rounded-md text-white text-sm font-semibold transition-all"
            style={{
              background: 'linear-gradient(to bottom, #7f1d1d, #991b1b, #b91c1c)',
              textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.3)'
            }}
            title="Damage"
          >
            Damage
          </button>
          <button
            onClick={onHeal}
            className="px-3 py-1.5 rounded-md text-white text-sm font-semibold transition-all"
            style={{
              background: 'linear-gradient(to bottom, #14532d, #166534, #15803d)',
              textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.3)'
            }}
            title="Heal"
          >
            Heal
          </button>
          <button
            onClick={onEditMax}
            className="px-3 py-1.5 rounded-md text-white text-sm font-semibold transition-all"
            style={{
              background: 'linear-gradient(to bottom, #713f12, #854d0e, #9a5b0a)',
              textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.3)'
            }}
            title="Edit Max HP"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default HPBar;