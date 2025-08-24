import React, { useState } from 'react';

const CurrencyInput = ({ type, amount, onChange }) => {
  const [inputAmount, setInputAmount] = useState('');

  const handleAddAmount = () => {
    const valueToAdd = parseInt(inputAmount) || 0;
    if (valueToAdd > 0) {
      onChange(amount + valueToAdd);
      setInputAmount('');
    }
  };

  const handleSubtractAmount = () => {
    const valueToSubtract = parseInt(inputAmount) || 0;
    if (valueToSubtract > 0) {
      onChange(Math.max(0, amount - valueToSubtract));
      setInputAmount('');
    }
  };

  return (
    <div className="bg-white/5 p-4 rounded">
      {/* Currency type and amount display */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-tortleYellow font-bold capitalize">{type}</div>
        <div className="text-2xl font-bold text-white">{amount}</div>
      </div>

      {/* Quick adjust buttons */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          onClick={() => onChange(amount + 1)}
          className="bg-green-500/20 hover:bg-green-500/30 text-white rounded p-2"
        >
          +1
        </button>
        <button
          onClick={() => onChange(Math.max(0, amount - 1))}
          className="bg-red-500/20 hover:bg-red-500/30 text-white rounded p-2"
        >
          -1
        </button>
        <button
          onClick={() => onChange(amount + 5)}
          className="bg-green-500/20 hover:bg-green-500/30 text-white rounded p-2"
        >
          +5
        </button>
        <button
          onClick={() => onChange(Math.max(0, amount - 5))}
          className="bg-red-500/20 hover:bg-red-500/30 text-white rounded p-2"
        >
          -5
        </button>
      </div>

      {/* Custom amount input and buttons */}
      <div className="space-y-2">
        <input
          type="number"
          value={inputAmount}
          onChange={(e) => setInputAmount(e.target.value)}
          className="w-full bg-white/10 rounded p-2 text-white"
          placeholder="Enter amount..."
          min="0"
        />
        <div className="flex space-x-2">
          <button
            onClick={handleSubtractAmount}
            className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-white rounded p-2"
            disabled={!inputAmount}
          >
            Remove
          </button>
          <button
            onClick={handleAddAmount}
            className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-white rounded p-2"
            disabled={!inputAmount}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrencyInput;