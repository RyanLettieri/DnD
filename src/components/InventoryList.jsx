import React from 'react';

const InventoryList = ({ inventory, setInventory }) => {
  const handleQuantityChange = (index, value) => {
    const newInventory = [...inventory];
    newInventory[index].qty = Math.max(0, value); // Prevent negative quantities
    setInventory(newInventory);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {inventory.map((item, idx) => (
        <div key={idx} className="bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 transition p-4 rounded-lg shadow-lg">
          <h3 className="font-bold text-black">{item.name}</h3>
          <label className="font-bold text-black">Quantity</label>
          <input
            type="number"
            value={item.qty}
            onChange={(e) => handleQuantityChange(idx, Number(e.target.value))}
            className="w-full p-2 rounded bg-white/20 text-black focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-2"
          />
          <button className="bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition" onClick={() => handleQuantityChange(idx, item.qty - 1)}>
            Use Item
          </button>
        </div>
      ))}
    </div>
  );
};

export default InventoryList;