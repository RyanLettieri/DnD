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

  'Message': {
    level: 0,
    castingTime: '1 action',
    range: '120 feet',
    components: 'V, S, M (a short piece of copper wire)',
    duration: '1 round',
    description: 'You point your finger toward a creature within range and whisper a message. The target (and only the target) hears the message and can reply in a whisper that only you can hear.'
  },
  'Minor Illusion': {
    level: 0,
    castingTime: '1 action',
    range: '30 feet',
    components: 'S, M (a bit of fleece)',
    duration: '1 minute',
    description: 'You create a sound or an image of an object within range that lasts for the duration. If a creature uses its action to examine the sound or image, it can determine that it is an illusion with a successful Intelligence (Investigation) check against your spell save DC.'
  },
  'Mold Earth': {
    level: 0,
    castingTime: '1 action',
    range: '30 feet',
    components: 'S',
    duration: 'Instantaneous or 1 hour (see text)',
    description: 'You choose a portion of dirt or stone that you can see within range that fits within a 5-foot cube. You can manipulate it in one of several ways: excavate it, cause shapes, colors, or both to appear on it, or cause difficult terrain. The changes last for 1 hour unless you choose an instantaneous option.'
  },
  'Shape Water': {
    level: 0,
    castingTime: '1 action',
    range: '30 feet',
    components: 'S',
    duration: 'Instantaneous or 1 hour (see text)',
    description: 'You choose an area of water that you can see within range that fits within a 5-foot cube. You can manipulate it: move or change flow, change its color or opacity, freeze it (if no creatures are in it), or form simple shapes. Non-instantaneous changes last for 1 hour.'
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
  'Alarm': {
    level: 1,
    castingTime: '1 minute',
    range: '30 feet',
    components: 'V, S, M (a tiny bell and a piece of fine silver wire)',
    duration: '8 hours',
    description: 'Ward a door, window, or 20-foot cube; you are alerted when a creature enters the area.'
  },
  'Catapult': {
    level: 1,
    castingTime: '1 action',
    range: '60 feet',
    components: 'S',
    duration: 'Instantaneous',
    damage: '3d8 bludgeoning',
    description: 'Hurl a loose object (1–5 lb.) up to 90 feet; on impact, the target takes bludgeoning damage.'
  },
  'Disguise Self': {
    level: 1,
    castingTime: '1 action',
    range: 'Self',
    components: 'V, S',
    duration: '1 hour',
    description: 'Change your appearance, including clothing and gear; physical inspection can reveal the illusion.'
  },
  'Expeditious Retreat': {
    level: 1,
    castingTime: '1 bonus action',
    range: 'Self',
    components: 'V, S',
    duration: 'Concentration, up to 10 minutes',
    description: 'While concentrating, you can take the Dash action as a bonus action on each of your turns.'
  },
  'False Life': {
    level: 1,
    castingTime: '1 action',
    range: 'Self',
    components: 'V, S, M (a small amount of alcohol or distilled spirits)',
    duration: '1 hour',
    description: 'Bolster yourself with 1d4 + 4 temporary hit points for the duration.'
  },
  'Feather Fall': {
    level: 1,
    castingTime: '1 reaction',
    range: '60 feet',
    components: 'V, M (a small feather or piece of down)',
    duration: '1 minute',
    description: 'Choose up to five falling creatures; their descent slows to 60 feet per round for the duration.'
  },
  'Grease': {
    level: 1,
    castingTime: '1 action',
    range: '60 feet',
    components: 'V, S, M (a bit of pork rind or butter)',
    duration: '1 minute',
    description: 'A 10-foot square becomes slick difficult terrain; creatures there must save or fall prone.'
  },
  'Identify': {
    level: 1,
    castingTime: '1 minute',
    range: 'Touch',
    components: 'V, S, M (a pearl worth at least 100 gp and an owl feather)',
    duration: 'Instantaneous',
    description: 'Learn a magic item’s properties, usage, attunement, charges, and any spells affecting the target.'
  },
  'Jump': {
    level: 1,
    castingTime: '1 action',
    range: 'Touch',
    components: 'V, S, M (a grasshopper\'s hind leg)',
    duration: '1 minute',
    description: 'Triple the target’s jump distance for the duration.'
  },
  'Longstrider': {
    level: 1,
    castingTime: '1 action',
    range: 'Touch',
    components: 'V, S, M (a pinch of dirt)',
    duration: '1 hour',
    description: 'Increase the target’s speed by 10 feet for the duration.'
  },
  'Sanctuary': {
    level: 1,
    castingTime: '1 bonus action',
    range: '30 feet',
    components: 'V, S, M (a small silver mirror)',
    duration: '1 minute',
    description: 'Ward a creature; attackers must succeed on a Wisdom save or choose a new target.'
  },
  'Snare': {
    level: 1,
    castingTime: '1 minute',
    range: 'Touch',
    components: 'V, S, M (25 feet of rope, which the spell consumes)',
    duration: 'Until dispelled or triggered',
    description: 'Create an invisible trap that hoists and restrains the triggering creature upside down.'
  },
  'Tasha\'s Caustic Brew': {
    level: 1,
    castingTime: '1 action',
    range: 'Self (30-foot line)',
    components: 'V, S, M (a bit of rotten food)',
    duration: 'Concentration, up to 1 minute',
    damage: '2d4 acid/round on failed save',
    description: 'A 30-foot line of acid coats creatures on a failed save; they take ongoing acid damage until cleaned.'
  },
  'Burning Hands': {
    level: 1,
    castingTime: '1 action',
    range: 'Self (15-foot cone)',
    components: 'V, S',
    duration: 'Instantaneous',
    damage: '3d6 fire (half on save)',
    description: 'A cone of flame erupts from your hands; creatures in the area make a Dexterity save for half damage.'
  },
  'Charm Person': {
    level: 1,
    castingTime: '1 action',
    range: '30 feet',
    components: 'V, S',
    duration: '1 hour',
    description: 'A humanoid must succeed on a Wisdom save or is charmed by you until the spell ends.'
  },
  'Comprehend Languages': {
    level: 1,
    castingTime: '1 action (or 10 minutes as a ritual)',
    range: 'Self',
    components: 'V, S, M (a pinch of soot and salt)',
    duration: '1 hour',
    description: 'Understand the literal meaning of any spoken language you hear or written text you touch.'
  },
  'Detect Poison and Disease': {
    level: 1,
    castingTime: '1 action',
    range: 'Self',
    components: 'V, S, M (a yew leaf)',
    duration: 'Concentration, up to 10 minutes',
    description: 'Sense the presence and location of poisons, poisonous creatures, and diseases within 30 feet.'
  },
  'Fog Cloud': {
    level: 1,
    castingTime: '1 action',
    range: '120 feet',
    components: 'V, S',
    duration: 'Concentration, up to 1 hour',
    description: 'Create a 20-foot-radius sphere of fog that heavily obscures the area; wind disperses it.'
  },
  'Purify Food and Drink': {
    level: 1,
    castingTime: '1 action (ritual)',
    range: '10 feet',
    components: 'V, S',
    duration: 'Instantaneous',
    description: 'Purify nonmagical food and drink, rendering it free of poison and disease.'
  },
  'Sleep': {
    level: 1,
    castingTime: '1 action',
    range: '90 feet',
    components: 'V, S, M (a pinch of fine sand, rose petals, or a cricket)',
    duration: '1 minute',
    description: 'Creatures totaling 5d8 HP in a 20-foot radius fall unconscious, starting with the lowest HP.'
  },
  'Tenser\'s Floating Disk': {
    level: 1,
    castingTime: '1 action (ritual)',
    range: '30 feet',
    components: 'V, S, M (a drop of mercury)',
    duration: '1 hour',
    description: 'Create a 3-foot-diameter floating disk that follows you and can carry up to 500 pounds.'
  },
  'Unseen Servant': {
    level: 1,
    castingTime: '1 action (ritual)',
    range: '60 feet',
    components: 'V, S, M (a piece of string and a bit of wood)',
    duration: '1 hour',
    description: 'Conjure an invisible, mindless servant to perform simple tasks within range.'
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
  'Aid': {
    level: 2,
    castingTime: '1 action',
    range: '30 feet',
    components: 'V, S, M (a tiny strip of white cloth)',
    duration: '8 hours',
    description: 'Up to three creatures have their hit point maximum and current hit points increased by 5.'
  },
  'Alter Self': {
    level: 2,
    castingTime: '1 action',
    range: 'Self',
    components: 'V, S',
    duration: 'Concentration, up to 1 hour',
    description: 'Adapt your body for aquatic breathing, grow natural weapons, or change your appearance.'
  },
  'Arcane Lock': {
    level: 2,
    castingTime: '1 action',
    range: 'Touch',
    components: 'V, S, M (gold dust worth at least 25 gp, which the spell consumes)',
    duration: 'Until dispelled',
    description: 'Magically secure a door, window, chest, or portal; the DC to break or pick increases by 10.'
  },
  'Blur': {
    level: 2,
    castingTime: '1 action',
    range: 'Self',
    components: 'V',
    duration: 'Concentration, up to 1 minute',
    description: 'Your body becomes blurred; creatures have disadvantage on attack rolls against you.'
  },
  'Continual Flame': {
    level: 2,
    castingTime: '1 action',
    range: 'Touch',
    components: 'V, S, M (ruby dust worth 50 gp, which the spell consumes)',
    duration: 'Until dispelled',
    description: 'Create a permanent, heatless flame that sheds bright and dim light like a torch.'
  },
  'Darkvision': {
    level: 2,
    castingTime: '1 action',
    range: 'Touch',
    components: 'V, S, M (either a pinch of dried carrot or an agate)',
    duration: '8 hours',
    description: 'Grant a creature the ability to see in darkness (as dim light) out to 60 feet.'
  },
  'Enlarge/Reduce': {
    level: 2,
    castingTime: '1 action',
    range: '30 feet',
    components: 'V, S, M (a pinch of powdered iron)',
    duration: 'Concentration, up to 1 minute',
    description: 'Change a creature or object one size larger or smaller; adjust damage and checks accordingly.'
  },
  'Lesser Restoration': {
    level: 2,
    castingTime: '1 action',
    range: 'Touch',
    components: 'V, S',
    duration: 'Instantaneous',
    description: 'End one disease or one condition afflicting the creature: blinded, deafened, paralyzed, or poisoned.'
  },
  'Levitate': {
    level: 2,
    castingTime: '1 action',
    range: '60 feet',
    components: 'V, S, M (either a small leather loop or a piece of golden wire bent into a cup shape)',
    duration: 'Concentration, up to 10 minutes',
    description: 'One creature or object rises vertically up to 20 feet and can be moved vertically while you concentrate.'
  },
  'Magic Mouth': {
    level: 2,
    castingTime: '1 minute',
    range: '30 feet',
    components: 'V, S, M (a small bit of honeycomb and jade dust worth at least 10 gp, which the spell consumes)',
    duration: 'Until dispelled',
    description: 'Imbue an object with a triggered recorded message that plays when the condition is met.'
  },
  'Magic Weapon': {
    level: 2,
    castingTime: '1 bonus action',
    range: 'Touch',
    components: 'V, S',
    duration: 'Concentration, up to 1 hour',
    description: 'A nonmagical weapon becomes a +1 magic weapon for the duration (higher bonuses at higher slots).'
  },
  'Protection from Poison': {
    level: 2,
    castingTime: '1 action',
    range: 'Touch',
    components: 'V, S',
    duration: '1 hour',
    description: 'Neutralize one poison, grant advantage on saves against being poisoned, and resistance to poison damage.'
  },
  'Pyrotechnics': {
    level: 2,
    castingTime: '1 action',
    range: '60 feet',
    components: 'V, S',
    duration: 'Instantaneous',
    description: 'Transform a nonmagical flame into dazzling fireworks (blinding) or a thick smoke cloud (heavily obscured).'
  },
  'Rope Trick': {
    level: 2,
    castingTime: '1 action',
    range: 'Touch',
    components: 'V, S, M (powdered corn extract and a twisted loop of parchment)',
    duration: '1 hour',
    description: 'Create an invisible entrance to an extradimensional space at the end of a rope where creatures can hide.'
  },
  'See Invisibility': {
    level: 2,
    castingTime: '1 action',
    range: 'Self',
    components: 'V, S, M (a pinch of talc and a small sprinkling of powdered silver)',
    duration: '1 hour',
    description: 'You can see invisible creatures and objects, as well as into the Ethereal Plane.'
  },
  'Spider Climb': {
    level: 2,
    castingTime: '1 action',
    range: 'Touch',
    components: 'V, S, M (a drop of bitumen and a spider)',
    duration: 'Concentration, up to 1 hour',
    description: 'The target can climb difficult surfaces, including ceilings, without needing to make an ability check.'
  },
  'Web': {
    level: 2,
    castingTime: '1 action',
    range: '60 feet',
    components: 'V, S, M (a bit of spiderweb)',
    duration: 'Concentration, up to 1 hour',
    description: 'Fills a 20-foot cube with sticky webs that restrain creatures on a failed Dexterity save; webs can burn.'
  },
  'Blindness/Deafness': {
    level: 2,
    castingTime: '1 action',
    range: '30 feet',
    components: 'V',
    duration: '1 minute',
    description: 'One creature is blinded or deafened (your choice); it can make a save at the end of each of its turns to end the effect.'
  },
  'Detect Thoughts': {
    level: 2,
    castingTime: '1 action',
    range: 'Self',
    components: 'V, S, M (a copper piece)',
    duration: 'Concentration, up to 1 minute',
    description: 'Read surface thoughts; probe deeper on a failed save, and sense thinking creatures behind walls with focus.'
  },
  'Gust of Wind': {
    level: 2,
    castingTime: '1 action',
    range: 'Self (60-foot line)',
    components: 'V, S',
    duration: 'Concentration, up to 1 minute',
    description: 'A line of strong wind pushes creatures, disperses gas and vapor, and can extinguish small flames.'
  },
  'Knock': {
    level: 2,
    castingTime: '1 action',
    range: '60 feet',
    components: 'V',
    duration: 'Instantaneous',
    description: 'Choose a locked object; it becomes unlocked, unbarred, or unstuck. The spell makes a loud knock.'
  },
  'Locate Object': {
    level: 2,
    castingTime: '1 action',
    range: 'Self',
    components: 'V, S, M (a forked twig)',
    duration: 'Concentration, up to 10 minutes',
    description: 'Sense the direction of a familiar object within 1,000 feet, unless blocked by thin lead or running water.'
  },
  'Misty Step': {
    level: 2,
    castingTime: '1 bonus action',
    range: 'Self',
    components: 'V',
    duration: 'Instantaneous',
    description: 'Briefly surrounded by silvery mist, you teleport up to 30 feet to an unoccupied space you can see.'
  },
  'Nystul\'s Magic Aura': {
    level: 2,
    castingTime: '1 action',
    range: 'Touch',
    components: 'V, S, M (a small square of silk)',
    duration: '24 hours',
    description: 'Mask or alter a creature’s or object’s magical aura to mislead divination and detection magic.'
  },
  'Phantasmal Force': {
    level: 2,
    castingTime: '1 action',
    range: '60 feet',
    components: 'V, S, M (a bit of fleece)',
    duration: 'Concentration, up to 1 minute',
    description: 'Create a believable illusion in a creature’s mind; it can deal 1d6 psychic damage if interacted with.'
  },
  'Suggestion': {
    level: 2,
    castingTime: '1 action',
    range: '30 feet',
    components: 'V, M (a snake’s tongue and either a bit of honeycomb or a drop of sweet oil)',
    duration: 'Concentration, up to 8 hours',
    description: 'Magically influence a creature with a reasonable course of action; it ends if you or your allies harm it.'
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