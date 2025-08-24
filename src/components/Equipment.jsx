import React, { useState } from 'react';
import Card from './Card';
import { EQUIPMENT_TYPES } from '../data/equipment';

const Equipment = ({ equipment, onUpdateEquipment }) => {
  const [newItem, setNewItem] = useState({
    name: '',
    type: EQUIPMENT_TYPES.GEAR,
    description: '',
    weight: 0,
    quantity: 1
  });

  // Calculate total weight of all equipment
  const calculateTotalWeight = () => {
    return Object.values(equipment).reduce((total, item) => {
      return total + (item.weight * item.quantity);
    }, 0);
  };

  const handleAddItem = () => {
    if (newItem.name) {
      onUpdateEquipment({
        ...equipment,
        [newItem.name]: {
          type: newItem.type,
          description: newItem.description,
          weight: Number(newItem.weight),
          quantity: Number(newItem.quantity)
        }
      });
      setNewItem({
        name: '',
        type: EQUIPMENT_TYPES.GEAR,
        description: '',
        weight: 0,
        quantity: 1
      });
    }
  };

  const handleUpdateQuantity = (itemName, delta) => {
    const newQuantity = Math.max(0, (equipment[itemName]?.quantity || 0) + delta);
    if (newQuantity === 0) {
      const { [itemName]: _, ...rest } = equipment;
      onUpdateEquipment(rest);
    } else {
      onUpdateEquipment({
        ...equipment,
        [itemName]: {
          ...equipment[itemName],
          quantity: newQuantity
        }
      });
    }
  };

  const totalWeight = calculateTotalWeight();

  return (
    <Card>
      <Card.Header>Equipment</Card.Header>
      <Card.Content>
        {/* Total Weight Display */}
        <div className="parchment-card border border-artificerBronze/20 p-4 rounded mb-4">
          <div className="flex justify-between items-center">
            <span className="parchment-text font-bold text-lg">Total Weight</span>
            <span className="parchment-text font-bold text-2xl">{totalWeight.toFixed(1)} lbs</span>
          </div>
        </div>

        {/* Add new item form */}
        <div className="parchment-card p-4 rounded mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Item name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="bg-parchment/50 rounded p-2 parchment-text border border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none"
            />
            <select
              value={newItem.type}
              onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
              className="bg-parchment/50 rounded p-2 parchment-text border border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none"
            >
              {Object.values(EQUIPMENT_TYPES).map(type => (
                <option key={type} value={type} className="bg-parchment parchment-text">
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
            <div className="space-y-1">
              <label className="parchment-text-light text-sm">Weight (lbs)</label>
              <input
                type="number"
                value={newItem.weight}
                onChange={(e) => setNewItem({ ...newItem, weight: e.target.value })}
                className="w-full bg-parchment/50 rounded p-2 parchment-text border border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none"
                min="0"
                step="0.1"
              />
            </div>
            <div className="space-y-1">
              <label className="parchment-text-light text-sm">Quantity</label>
              <input
                type="number"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                className="w-full bg-parchment/50 rounded p-2 parchment-text border border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none"
                min="1"
              />
            </div>
            <textarea
              placeholder="Description"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              className="bg-parchment/50 rounded p-2 parchment-text col-span-2 border border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none"
            />
          </div>
          <button
            onClick={handleAddItem}
            disabled={!newItem.name}
            className="w-full bg-artificerBronze/80 hover:bg-artificerBronze text-white rounded p-2 disabled:opacity-50 button-glow"
          >
            Add Item
          </button>
        </div>

        {/* Equipment list */}
        <div className="space-y-2">
          {Object.entries(equipment).map(([itemName, details]) => (
            <div key={itemName} className="parchment-card p-4 rounded flex justify-between items-start hover:shadow-md transition-all duration-200">
              <div>
                <h3 className="parchment-text font-bold">{itemName}</h3>
                <p className="parchment-text-light text-sm">{details.description}</p>
                <p className="parchment-text-light text-sm">
                  Weight: {details.weight}lbs | Type: {details.type}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleUpdateQuantity(itemName, -1)}
                  className="bg-sealWax/80 hover:bg-sealWax text-white rounded p-2 button-glow"
                >
                  -
                </button>
                <span className="parchment-text font-bold">{details.quantity}</span>
                <button
                  onClick={() => handleUpdateQuantity(itemName, 1)}
                  className="bg-artificerBronze/80 hover:bg-artificerBronze text-white rounded p-2 button-glow"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
};

export default Equipment;