import React from 'react';

// Hit Dice tracker component
// Props:
// - level: current character level (total hit dice)
// - hitDiceSize: die size number (e.g., 8 for d8)
// - hitDiceSpent: number of dice spent
// - conMod: constitution modifier to add per die
// - onApplyHealing: function(amount) to apply healing to HP
// - onChange: function({ hitDiceSpent, hitDiceSize })
// - className: optional extra classes
const HitDice = ({ level = 1, hitDiceSize = 8, hitDiceSpent = 0, conMod = 0, onApplyHealing, onChange, className = '' }) => {
  const total = Math.max(1, Number(level) || 1);
  const size = Math.max(4, Number(hitDiceSize) || 8);
  const spent = Math.min(Math.max(0, Number(hitDiceSpent) || 0), total);
  const remaining = Math.max(0, total - spent);

  const update = (updates) => {
    if (typeof onChange === 'function') onChange({ hitDiceSpent: spent, hitDiceSize: size, ...updates });
  };

  const spendOne = () => {
    if (spent < total) update({ hitDiceSpent: spent + 1 });
  };

  const regainOne = () => {
    if (spent > 0) update({ hitDiceSpent: spent - 1 });
  };

  const longRest = () => {
    const regain = Math.floor(total / 2);
    const newSpent = Math.max(0, spent - regain);
    update({ hitDiceSpent: newSpent });
  };

  const shortRest = () => {
    if (remaining <= 0) return;
    const input = prompt(`Short Rest: How many hit dice to spend? (1-${remaining})`, '1');
    const n = Math.max(1, Math.min(remaining, Number(input) || 0));
    if (!Number.isFinite(n) || n <= 0) return;
    let totalHeal = 0;
    for (let i = 0; i < n; i++) {
      const roll = Math.floor(Math.random() * size) + 1; // 1..size
      totalHeal += roll + (Number(conMod) || 0);
    }
    if (typeof onApplyHealing === 'function' && totalHeal > 0) {
      onApplyHealing(totalHeal);
    }
    update({ hitDiceSpent: spent + n });
  };

  return (
    <div className={`parchment-card p-4 rounded-lg ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-artificerBronze/20 rounded-full flex items-center justify-center">
            <span role="img" aria-label="die" className="text-xl">🎲</span>
          </div>
          <div>
            <div className="parchment-text font-semibold">Hit Dice</div>
            <div className="parchment-text-light text-sm">Class Die: d{size}</div>
          </div>
        </div>
        <div>
          <select
            className="bg-transparent border-2 border-artificerBronze/50 rounded px-2 py-1 parchment-text"
            value={size}
            onChange={(e) => update({ hitDiceSize: Number(e.target.value) })}
            title="Set Hit Die Size"
          >
            {[6, 8, 10, 12].map((s) => (
              <option key={s} value={s}>d{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 items-center">
        <div className="text-center">
          <div className="parchment-text-light text-xs uppercase tracking-wide">Total</div>
          <div className="parchment-text text-2xl font-bold">{total}</div>
        </div>
        <div className="text-center">
          <div className="parchment-text-light text-xs uppercase tracking-wide">Remaining</div>
          <div className="parchment-text text-2xl font-bold">{remaining}</div>
        </div>
        <div className="text-center">
          <div className="parchment-text-light text-xs uppercase tracking-wide">Spent</div>
          <div className="parchment-text text-2xl font-bold">{spent}</div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <button
          onClick={spendOne}
          className="px-3 py-2 rounded ink-text font-bold button-glow artificer-border"
          style={{ background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #8B4513 100%)' }}
          title="Spend 1 Hit Die"
        >
          Spend 1
        </button>
        <button
          onClick={regainOne}
          className="px-3 py-2 rounded ink-text font-bold button-glow artificer-border"
          style={{ background: 'linear-gradient(135deg, #14532d 0%, #166534 50%, #14532d 100%)' }}
          title="Regain 1 Hit Die"
        >
          Regain 1
        </button>
        <button
          onClick={shortRest}
          className="px-3 py-2 rounded ink-text font-bold button-glow artificer-border"
          style={{ background: 'linear-gradient(135deg, #0f766e 0%, #0ea5a4 50%, #0f766e 100%)' }}
          title={`Short Rest (spend up to ${remaining} dice, heal d${size} + CON per die)`}
        >
          Short Rest
        </button>
        <button
          onClick={longRest}
          className="px-3 py-2 rounded ink-text font-bold button-glow artificer-border"
          style={{ background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #1e40af 100%)' }}
          title={`Long Rest (regain up to ${Math.floor(total / 2)} hit dice)`}
        >
          Long Rest
        </button>
      </div>

      <div className="mt-3 text-center parchment-text-light text-xs">
        Spending a hit die during a short rest lets you roll d{size} + CON mod to regain HP.
      </div>
    </div>
  );
};

export default HitDice;
