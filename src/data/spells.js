export const ARTIFICER_CANTRIPS = [
  'Mending',
  'Fire Bolt',
  'Guidance',
  'Dancing Lights',
  'Light',
  'Prestidigitation',
  'Spare the Dying',
  'Thorn Whip',
  'Ray of Frost',
  'Shocking Grasp',
  'Acid Splash',
  'Message',
  'Minor Illusion',
  'Mold Earth',
  'Shape Water'
];

export const ARTIFICER_SPELLS = {
  1: [
    'Cure Wounds',
    'Detect Magic',
    'Shield',
    'Thunderwave',
    'Absorb Elements',
    'Alarm',
    'Catapult',
    'Disguise Self',
    'Expeditious Retreat',
    'Faerie Fire',
    'False Life',
    'Feather Fall',
    'Grease',
    'Identify',
    'Jump',
    'Longstrider',
    'Sanctuary',
    'Snare',
    'Tasha\'s Caustic Brew',
    'Burning Hands',
    'Charm Person',
    'Comprehend Languages',
    'Detect Poison and Disease',
    'Fog Cloud',
    'Purify Food and Drink',
    'Sleep',
    'Tenser\'s Floating Disk',
    'Unseen Servant'
  ],
  2: [
    'Heat Metal',
    'Scorching Ray',
    'Shatter',
    'Aid',
    'Alter Self',
    'Arcane Lock',
    'Blur',
    'Continual Flame',
    'Darkvision',
    'Enhance Ability',
    'Enlarge/Reduce',
    'Invisibility',
    'Lesser Restoration',
    'Levitate',
    'Magic Mouth',
    'Magic Weapon',
    'Protection from Poison',
    'Pyrotechnics',
    'Rope Trick',
    'See Invisibility',
    'Spider Climb',
    'Web',
    'Blindness/Deafness',
    'Detect Thoughts',
    'Gust of Wind',
    'Knock',
    'Locate Object',
    'Misty Step',
    'Nystul\'s Magic Aura',
    'Phantasmal Force',
    'Suggestion'
  ],
  3: [
    'Fireball',
    'Wind Wall',
    'Blink',
    'Catnap',
    'Create Food and Water',
    'Dispel Magic',
    'Elemental Weapon',
    'Flame Arrows',
    'Fly',
    'Glyph of Warding',
    'Haste',
    'Protection from Energy',
    'Revivify',
    'Water Breathing',
    'Water Walk',
    'Clairvoyance',
    'Counterspell',
    'Daylight',
    'Fear',
    'Feign Death',
    'Gaseous Form',
    'Hypnotic Pattern',
    'Leomund\'s Tiny Hut',
    'Major Image',
    'Nondetection',
    'Phantom Steed',
    'Remove Curse',
    'Sending',
    'Sleet Storm',
    'Slow',
    'Speak with Dead',
    'Speak with Plants',
    'Stinking Cloud',
    'Tongues'
  ],
  4: [
    'Fabricate',
    'Fire Shield',
    'Wall of Fire',
    'Arcane Eye',
    'Banishment',
    'Blight',
    'Confusion',
    'Conjure Minor Elementals',
    'Control Water',
    'Death Ward',
    'Dimension Door',
    'Divination',
    'Evard\'s Black Tentacles',
    'Greater Invisibility',
    'Hallucinatory Terrain',
    'Ice Storm',
    'Leomund\'s Secret Chest',
    'Locate Creature',
    'Mordenkainen\'s Faithful Hound',
    'Mordenkainen\'s Private Sanctum',
    'Otiluke\'s Resilient Sphere',
    'Phantasmal Killer',
    'Polymorph',
    'Stone Shape',
    'Stoneskin'
  ],
  5: [
    'Animate Objects',
    'Bigby\'s Hand',
    'Cone of Cold',
    'Creation',
    'Greater Restoration',
    'Passwall',
    'Planar Binding',
    'Rary\'s Telepathic Bond',
    'Scrying',
    'Seeming',
    'Swift Quiver',
    'Telekinesis',
    'Teleportation Circle',
    'Wall of Force',
    'Wall of Stone'
  ]
};

export const SPELL_DETAILS = {
  // Cantrips
  'Mending': {
    level: 0,
    castingTime: '1 minute',
    range: 'Touch',
    components: 'V, S, M (two lodestones)',
    duration: 'Instantaneous',
    description: 'This spell repairs a single break or tear in an object you touch. As long as the break or tear is no larger than 1 foot in any dimension, you mend it, leaving no trace of the former damage.'
  },
  'Fire Bolt': {
    level: 0,
    castingTime: '1 action',
    range: '120 feet',
    components: 'V, S',
    duration: 'Instantaneous',
    damage: '1d10 fire',
    description: 'You hurl a mote of fire at a creature or object within range. Make a ranged spell attack. On hit, the target takes 1d10 fire damage. A flammable object hit by this spell ignites if it isn\'t being worn or carried.'
  },
  'Guidance': {
    level: 0,
    castingTime: '1 action',
    range: 'Touch',
    components: 'V, S',
    duration: 'Concentration, up to 1 minute',
    description: 'You touch one willing creature. Once before the spell ends, the target can roll a d4 and add the number rolled to one ability check of its choice.'
  },
  'Dancing Lights': {
    level: 0,
    castingTime: '1 action',
    range: '120 feet',
    components: 'V, S, M (a bit of phosphorus or wychwood, or a glowworm)',
    duration: 'Concentration, up to 1 minute',
    description: 'You create up to four torch-sized lights that hover in the air within range, shedding bright light in a 10-foot radius.'
  },
  'Light': {
    level: 0,
    castingTime: '1 action',
    range: 'Touch',
    components: 'V, M (a firefly or phosphorescent moss)',
    duration: '1 hour',
    description: 'You touch one object no larger than 10 feet in any dimension. The object sheds bright light in a 20-foot radius and dim light for an additional 20 feet.'
  },
  'Prestidigitation': {
    level: 0,
    castingTime: '1 action',
    range: '10 feet',
    components: 'V, S',
    duration: 'Up to 1 hour',
    description: 'Create an instantaneous, harmless sensory effect, clean or soil an object no larger than 1 cubic foot, chill, warm, or flavor up to 1 cubic foot of nonliving material for 1 hour.'
  },
  'Spare the Dying': {
    level: 0,
    castingTime: '1 action',
    range: 'Touch',
    components: 'V, S',
    duration: 'Instantaneous',
    description: 'You touch a living creature that has 0 hit points. The creature becomes stable. This spell has no effect on undead or constructs.'
  },
  'Thorn Whip': {
    level: 0,
    castingTime: '1 action',
    range: '30 feet',
    components: 'V, S, M (the stem of a plant with thorns)',
    duration: 'Instantaneous',
    damage: '1d6 piercing',
    description: 'You create a long, vine-like whip covered in thorns that lashes out at your command toward a creature in range. Make a melee spell attack. On hit, the creature takes 1d6 piercing damage, and if the creature is Large or smaller, you pull it up to 10 feet closer to you.'
  },
  'Ray of Frost': {
    level: 0,
    castingTime: '1 action',
    range: '60 feet',
    components: 'V, S',
    duration: 'Instantaneous',
    damage: '1d8 cold',
    description: 'A frigid beam of blue-white light streaks toward a creature within range. Make a ranged spell attack. On hit, it takes 1d8 cold damage, and its speed is reduced by 10 feet until the start of your next turn.'
  },
  'Shocking Grasp': {
    level: 0,
    castingTime: '1 action',
    range: 'Touch',
    components: 'V, S',
    duration: 'Instantaneous',
    damage: '1d8 lightning',
    description: 'Lightning springs from your hand to deliver a shock to a creature you try to touch. Make a melee spell attack. On hit, the target takes 1d8 lightning damage, and it can\'t take reactions until the start of its next turn.'
  },
  'Acid Splash': {
    level: 0,
    castingTime: '1 action',
    range: '60 feet',
    components: 'V, S',
    duration: 'Instantaneous',
    damage: '1d6 acid',
    description: 'You hurl a bubble of acid. Choose one creature within range, or choose two creatures within range that are within 5 feet of each other. A target must succeed on a Dexterity saving throw or take 1d6 acid damage.'
  },

  // Level 1 Spells
  'Cure Wounds': {
    level: 1,
    castingTime: '1 action',
    range: 'Touch',
    components: 'V, S',
    duration: 'Instantaneous',
    healing: '1d8 + modifier',
    description: 'A creature you touch regains a number of hit points equal to 1d8 + your spellcasting ability modifier.'
  },
  'Detect Magic': {
    level: 1,
    castingTime: '1 action',
    range: 'Self',
    components: 'V, S',
    duration: 'Concentration, up to 10 minutes',
    description: 'For the duration, you sense the presence of magic within 30 feet of you. If you sense magic in this way, you can use your action to see a faint aura around any visible creature or object in the area that bears magic.'
  },
  'Shield': {
    level: 1,
    castingTime: '1 reaction',
    range: 'Self',
    components: 'V, S',
    duration: '1 round',
    description: 'An invisible barrier of magical force appears and protects you. Until the start of your next turn, you have a +5 bonus to AC, including against the triggering attack, and you take no damage from magic missile.'
  },
  'Thunderwave': {
    level: 1,
    castingTime: '1 action',
    range: 'Self (15-foot cube)',
    components: 'V, S',
    duration: 'Instantaneous',
    damage: '2d8 thunder',
    description: 'A wave of thunderous sound sweeps out from you. Each creature in a 15-foot cube originating from you must make a Constitution saving throw. On a failed save, a creature takes 2d8 thunder damage and is pushed 10 feet away from you.'
  },
  'Absorb Elements': {
    level: 1,
    castingTime: '1 reaction',
    range: 'Self',
    components: 'S',
    duration: '1 round',
    description: 'React to elemental damage to gain resistance and add 1d6 damage of that type to your next melee hit.'
  },
  'Faerie Fire': {
    level: 1,
    castingTime: '1 action',
    range: '60 feet',
    components: 'V',
    duration: 'Concentration, up to 1 minute',
    description: 'Each object in a 20-foot cube within range is outlined in blue, green, or violet light. Attacks against affected creatures have advantage.'
  },
  'Heat Metal': {
    level: 2,
    castingTime: '1 action',
    range: '60 feet',
    components: 'V, S, M (a piece of iron and a flame)',
    duration: 'Concentration, up to 1 minute',
    damage: '2d8 fire',
    description: 'Heat a manufactured metal object, dealing 2d8 fire damage to anyone in contact with it.'
  },
  'Scorching Ray': {
    level: 2,
    castingTime: '1 action',
    range: '120 feet',
    components: 'V, S',
    duration: 'Instantaneous',
    damage: '3 rays, 2d6 fire each',
    description: 'You make three ranged spell attacks. Each ray hits a creature of your choice that you can see within range. Each ray deals 2d6 fire damage to its target.'
  },
  'Shatter': {
    level: 2,
    castingTime: '1 action',
    range: '60 feet',
    components: 'V, S, M (a chip of mica)',
    duration: 'Instantaneous',
    damage: '3d8 thunder',
    description: 'A sudden loud ringing noise, painfully intense, erupts from a point of your choice within range. Each creature in a 10-foot-radius sphere centered on that point must make a Constitution saving throw.'
  },
  'Enhance Ability': {
    level: 2,
    castingTime: '1 action',
    range: 'Touch',
    components: 'V, S, M (fur or feather from a beast)',
    duration: 'Concentration, up to 1 hour',
    description: 'Grant a creature advantage on ability checks with one ability score.'
  },
  'Invisibility': {
    level: 2,
    castingTime: '1 action',
    range: 'Touch',
    components: 'V, S, M (an eyelash encased in gum arabic)',
    duration: 'Concentration, up to 1 hour',
    description: 'A creature you touch becomes invisible until the spell ends. Anything the target is wearing or carrying is invisible as long as it is on the target\'s person.'
  },
  'Haste': {
    level: 3,
    castingTime: '1 action',
    range: '30 feet',
    components: 'V, S, M (a shaving of licorice root)',
    duration: 'Concentration, up to 1 minute',
    description: 'Double a creature\'s speed, give +2 AC, advantage on Dex saves, and an extra action each turn.'
  },
  'Dispel Magic': {
    level: 3,
    castingTime: '1 action',
    range: '120 feet',
    components: 'V, S',
    duration: 'Instantaneous',
    description: 'End spells of 3rd level or lower on a target. Roll ability check for higher level spells.'
  },
  'Fireball': {
    level: 3,
    castingTime: '1 action',
    range: '150 feet',
    components: 'V, S, M (a tiny ball of bat guano and sulfur)',
    duration: 'Instantaneous',
    damage: '8d6 fire',
    description: 'A bright streak flashes from your pointing finger to a point you choose within range and then blossoms with a low roar into an explosion of flame. Each creature in a 20-foot-radius sphere centered on that point must make a Dexterity saving throw.'
  },
  'Revivify': {
    level: 3,
    castingTime: '1 action',
    range: 'Touch',
    components: 'V, S, M (diamonds worth 300 gp)',
    duration: 'Instantaneous',
    description: 'You touch a creature that has died within the last minute. That creature returns to life with 1 hit point. This spell can\'t return to life a creature that has died of old age, nor can it restore any missing body parts.'
  },
  'Elemental Weapon': {
    level: 3,
    castingTime: '1 action',
    range: 'Touch',
    components: 'V, S',
    duration: 'Concentration, up to 1 hour',
    damage: '+1d4 elemental',
    description: 'A nonmagical weapon you touch becomes a magic weapon. Choose one of the following damage types: acid, cold, fire, lightning, or thunder. For the duration, the weapon has a +1 bonus to attack rolls and deals an extra 1d4 damage of the chosen type when it hits.'
  },
  'Fly': {
    level: 3,
    castingTime: '1 action',
    range: 'Touch',
    components: 'V, S, M (a wing feather from any bird)',
    duration: 'Concentration, up to 10 minutes',
    description: 'You touch a willing creature. The target gains a flying speed of 60 feet for the duration. When the spell ends, the target falls if it is still aloft, unless it can stop the fall.'
  },
  'Protection from Energy': {
    level: 3,
    castingTime: '1 action',
    range: 'Touch',
    components: 'V, S',
    duration: 'Concentration, up to 1 hour',
    description: 'Protective energy wreathes you, granting you resistance to one damage type of your choice: acid, cold, fire, lightning, or thunder.'
  },
  'Wind Wall': {
    level: 3,
    castingTime: '1 action',
    range: '120 feet',
    components: 'V, S, M (a tiny fan and a feather of exotic origin)',
    duration: 'Concentration, up to 1 minute',
    description: 'A wall of strong wind rises from the ground at a point you choose within range. You can make the wall up to 50 feet long, 15 feet high, and 1 foot thick.'
  },
  'Fabricate': {
    level: 4,
    castingTime: '10 minutes',
    range: '120 feet',
    components: 'V, S',
    duration: 'Instantaneous',
    description: 'You convert raw materials into products of the same material. For example, you can fabricate a wooden bridge from a clump of trees, a rope from a patch of hemp, and clothes from flax or wool.'
  },
  'Fire Shield': {
    level: 4,
    castingTime: '1 action',
    range: 'Self',
    components: 'V, S, M (a bit of phosphorus or a firefly)',
    duration: '10 minutes',
    damage: '2d8 fire/cold',
    description: 'Thin and wispy flames wreathe your body for the duration, shedding bright light in a 10-foot radius and dim light for an additional 10 feet. You can end the spell early by using an action to dismiss it.'
  },
  'Wall of Fire': {
    level: 4,
    castingTime: '1 action',
    range: '120 feet',
    components: 'V, S, M (a small piece of phosphorus)',
    duration: 'Concentration, up to 1 minute',
    damage: '5d8 fire',
    description: 'You create a wall of fire on a solid surface within range. You can make the wall up to 60 feet long, 20 feet high, and 1 foot thick, or a ringed wall up to 20 feet in diameter, 20 feet high, and 1 foot thick.'
  },
  'Animate Objects': {
    level: 5,
    castingTime: '1 action',
    range: '120 feet',
    components: 'V, S',
    duration: 'Concentration, up to 1 minute',
    description: 'Objects come to life at your command. Choose up to ten nonmagical objects within range that are not being worn or carried. Medium targets count as two objects, Large targets count as four objects, Huge targets count as eight objects.'
  },
  'Bigby\'s Hand': {
    level: 5,
    castingTime: '1 action',
    range: '120 feet',
    components: 'V, S, M (an eggshell and a snakeskin glove)',
    duration: 'Concentration, up to 1 minute',
    description: 'You create a Large hand of shimmering, translucent force in an unoccupied space that you can see within range. The hand lasts for the spell\'s duration, and it moves at your command, mimicking the movements of your own hand.'
  },
  'Cone of Cold': {
    level: 5,
    castingTime: '1 action',
    range: 'Self (60-foot cone)',
    components: 'V, S, M (a small crystal or glass cone)',
    duration: 'Instantaneous',
    damage: '8d8 cold',
    description: 'A blast of cold air erupts from your hands. Each creature in a 60-foot cone must make a Constitution saving throw. A creature takes 8d8 cold damage on a failed save, or half as much damage on a successful one.'
  }
};