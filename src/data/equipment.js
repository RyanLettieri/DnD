export const EQUIPMENT_TYPES = {
  WEAPON: 'weapon',
  ARMOR: 'armor',
  TOOL: 'tool',
  GEAR: 'gear',
  CONTAINER: 'container',
  FOOD: 'food'
};

export const DEFAULT_EQUIPMENT = {
  "Chef's Tools": {
    type: EQUIPMENT_TYPES.TOOL,
    description: "These tools include cooking utensils, pots, and pans.",
    weight: 8,
    quantity: 1
  },
  "Tinker's Tools": {
    type: EQUIPMENT_TYPES.TOOL,
    description: "A set of tools for tinkering with mechanical devices.",
    weight: 10,
    quantity: 1
  },
  "Shield": {
    type: EQUIPMENT_TYPES.ARMOR,
    description: "A wooden or metal shield.",
    weight: 6,
    quantity: 1,
    ac: 2
  },
  "Rations (1 day)": {
    type: EQUIPMENT_TYPES.FOOD,
    description: "Dry rations sufficient to feed one creature for a day.",
    weight: 2,
    quantity: 5
  }
};