import React, { useState } from 'react';
import Card from './Card';
import usePersistentState from '../hooks/usePersistentState';

const DeathSavingThrows = () => {
  const [deathSaves, setDeathSaves] = usePersistentState('deathSaves', {
    successes: 0,
    failures: 0
  });

  const addSave = (type) => {
    if (deathSaves[type] < 3) {
      setDeathSaves(prev => ({ ...prev, [type]: prev[type] + 1 }));
    }
  };

  const removeSave = (type) => {
    if (deathSaves[type] > 0) {
      setDeathSaves(prev => ({ ...prev, [type]: prev[type] - 1 }));
    }
  };

  const resetDeathSaves = () => {
    setDeathSaves({ successes: 0, failures: 0 });
  };

  const getStatus = () => {
    if (deathSaves.successes >= 3) return { text: 'Stabilized', color: 'text-green-600', bg: 'bg-green-500/20' };
    if (deathSaves.failures >= 3) return { text: 'Dead', color: 'text-red-600', bg: 'bg-red-500/20' };
    if (deathSaves.successes > 0 || deathSaves.failures > 0) return { text: 'Making Death Saves', color: 'text-yellow-600', bg: 'bg-yellow-500/20' };
    return { text: 'Conscious', color: 'text-gray-600', bg: 'bg-gray-500/20' };
  };

  const status = getStatus();

  const SaveRow = ({ type, label, icon, color }) => (
    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30">
      <span className="parchment-text font-semibold flex items-center gap-2">
        <span className={`text-xl ${color}`}>{icon}</span>
        {label}
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => removeSave(type)}
          disabled={deathSaves[type] === 0}
          className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:opacity-50 text-white flex items-center justify-center transition-all"
          title={`Remove ${label}`}
        >
          -
        </button>
        <div className="flex gap-1">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
                index < deathSaves[type]
                  ? type === 'successes'
                    ? 'bg-green-500 border-green-600 text-white'
                    : 'bg-red-500 border-red-600 text-white'
                  : 'bg-gray-700/50 border-gray-600 text-gray-500'
              }`}
            >
              {index < deathSaves[type] ? (type === 'successes' ? '×' : '÷') : ''}
            </div>
          ))}
        </div>
        <button
          onClick={() => addSave(type)}
          disabled={deathSaves[type] >= 3}
          className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:opacity-50 text-white flex items-center justify-center transition-all"
          title={`Add ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <Card>
      <Card.Header>Death Saving Throws</Card.Header>
      <Card.Content>
        <div className="space-y-4">
          {/* Status */}
          <div className={`text-center p-3 rounded-lg ${status.bg} border border-current/20`}>
            <div className={`text-lg font-bold ${status.color}`}>
              {status.text}
            </div>
          </div>

          {/* Saves */}
          <div className="space-y-3">
            <SaveRow type="successes" label="Successes" icon="×" color="text-green-500" />
            <SaveRow type="failures" label="Failures" icon="÷" color="text-red-500" />
          </div>

          {/* Actions */}
          <div className="flex gap-2 justify-center">
            <button
              onClick={resetDeathSaves}
              className="px-4 py-2 bg-artificerBronze/80 hover:bg-artificerBronze text-white rounded-lg text-sm font-semibold transition-all"
            >
              Reset Saves
            </button>
          </div>

          {/* Quick Rules */}
          <div className="text-xs parchment-text-light/70 text-center space-y-1">
            <div>DC 10 to stabilize</div>
            <div>3 successes = stable | 3 failures = dead</div>
            <div>Nat 20 = 1 HP | Nat 1 = 2 failures</div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
};

export default DeathSavingThrows;
