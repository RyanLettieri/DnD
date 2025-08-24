import React, { useState } from 'react';
import Card from './Card';

const CurrencyManager = ({ currency, onUpdate }) => {
  const [customAmounts, setCustomAmounts] = useState({});
  const currencyTypes = ['copper', 'silver', 'gold', 'platinum']; // removed electrum

  const handleChange = (type, delta) => {
    const currentAmount = currency[type] || 0;
    const newAmount = Math.max(0, currentAmount + delta);
    onUpdate(type, newAmount);
  };

  const handleCustomChange = (type) => {
    const amount = parseInt(customAmounts[type]) || 0;
    if (amount > 0) {
      handleChange(type, amount);
      setCustomAmounts(prev => ({ ...prev, [type]: '' }));
    }
  };

  const handleCustomDecrease = (type) => {
    const amount = parseInt(customAmounts[type]) || 0;
    if (amount > 0) {
      handleChange(type, -amount);
      setCustomAmounts(prev => ({ ...prev, [type]: '' }));
    }
  };

  const getCoinIcon = (type) => {
    const icons = {
      copper: '🟫',
      silver: '⚪',
      gold: '🟡',
      platinum: '⚫'
    };
    return icons[type] || '';
  };

  const renderCurrencyType = (type) => (
    <div key={type} className="bg-amber-100/90 border-2 border-amber-800 rounded-lg p-4 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{getCoinIcon(type)}</span>
          <span className="text-amber-900 font-bold capitalize text-lg">{type}</span>
        </div>
        <span className="text-3xl font-bold text-amber-900">{currency[type] || 0}</span>
      </div>

      {/* Quick adjust buttons */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          onClick={() => handleChange(type, 1)}
          className="bg-green-600 hover:bg-green-700 text-white rounded p-2 font-semibold shadow-sm"
        >
          +1
        </button>
        <button
          onClick={() => handleChange(type, -1)}
          className="bg-red-600 hover:bg-red-700 text-white rounded p-2 font-semibold shadow-sm"
        >
          -1
        </button>
        <button
          onClick={() => handleChange(type, 5)}
          className="bg-green-600 hover:bg-green-700 text-white rounded p-2 font-semibold shadow-sm"
        >
          +5
        </button>
        <button
          onClick={() => handleChange(type, -5)}
          className="bg-red-600 hover:bg-red-700 text-white rounded p-2 font-semibold shadow-sm"
        >
          -5
        </button>
      </div>

      {/* Custom amount input */}
      <div className="space-y-2">
        <input
          type="number"
          value={customAmounts[type] || ''}
          onChange={(e) => setCustomAmounts(prev => ({ 
            ...prev, 
            [type]: e.target.value 
          }))}
          className="w-full bg-white border-2 border-amber-700 rounded p-2 text-amber-900 font-semibold focus:outline-none focus:border-amber-600"
          placeholder="Enter amount..."
          min="0"
        />
        <div className="flex space-x-2">
          <button
            onClick={() => handleCustomDecrease(type)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded p-2 font-semibold shadow-sm disabled:opacity-50"
            disabled={!customAmounts[type]}
          >
            Remove
          </button>
          <button
            onClick={() => handleCustomChange(type)}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded p-2 font-semibold shadow-sm disabled:opacity-50"
            disabled={!customAmounts[type]}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Card>
      <Card.Header>Currency</Card.Header>
      <Card.Content>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currencyTypes.map(type => renderCurrencyType(type))}
        </div>
      </Card.Content>
    </Card>
  );
};

export default CurrencyManager;