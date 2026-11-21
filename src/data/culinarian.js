// Source: Culinarian Class Playtest Handbook v0.1. Proposed playtest content.
export const CULINARIAN_CANTRIPS = ['Guidance','Resistance','Spare the Dying','Thaumaturgy','Mage Hand','Prestidigitation','Poison Spray','Acid Splash','Produce Flame','Mending'];
export const CULINARIAN_SPELLS = {
1:['Bless','Cure Wounds','Detect Poison and Disease','Faerie Fire','Goodberry','Grease','Healing Word','Heroism','Longstrider','Purify Food and Drink','Sanctuary','Sleep','Protection from Evil and Good',"Tasha's Hideous Laughter"],
2:['Aid','Calm Emotions','Darkvision','Enhance Ability','Hold Person','Lesser Restoration','Pass without Trace','Prayer of Healing','Protection from Poison','See Invisibility','Silence','Spike Growth','Web','Warding Bond',"Dragon's Breath"],
3:['Aura of Vitality','Beacon of Hope','Create Food and Water','Counterspell','Dispel Magic','Haste','Mass Healing Word','Plant Growth','Protection from Energy','Revivify','Sleet Storm','Slow','Speak with Plants','Stinking Cloud','Water Breathing'],
4:['Aura of Life','Aura of Purity','Blight','Confusion','Death Ward','Freedom of Movement','Grasping Vine','Greater Invisibility','Hallucinatory Terrain','Polymorph'],
5:['Animate Objects','Awaken','Circle of Power','Contagion','Greater Restoration','Hold Monster','Mass Cure Wounds','Raise Dead','Skill Empowerment','Wall of Stone'],
6:['Find the Path','Globe of Invulnerability','Heal',"Heroes' Feast",'Mass Suggestion','Sunbeam','Transport via Plants','True Seeing','Wall of Thorns'],
7:['Etherealness','Forcecage','Mirage Arcane','Plane Shift','Regenerate','Resurrection','Reverse Gravity','Symbol'],
8:['Animal Shapes','Antimagic Field','Control Weather','Earthquake','Feeblemind','Holy Aura','Maze','Mind Blank'],
9:['Foresight','Mass Heal','Prismatic Wall','Shapechange','Time Stop','True Resurrection','Wish']
};
export const CULINARIAN_CLASS_FEATURES = [
{level:1,name:'Culinary Spellcasting',description:'Intelligence is your spellcasting ability. Spell save DC = 8 + Proficiency Bonus + Intelligence modifier; spell attack modifier = Proficiency Bonus + Intelligence modifier. Prepare recipes from your grimoire equal to your Culinarian level + Intelligence modifier (minimum 1). Change prepared recipes after a Long Rest. Recipes follow normal spell rules unless their descriptions say otherwise.'},
{level:1,name:'Culinary Grimoire',description:'Your cookbook begins with six 1st-level Culinarian recipes. Each time you gain a Culinarian level, add two Culinarian recipes of a level for which you have spell slots. Copy discovered recipes into the grimoire using the general rules for copying spells into a Wizard’s spellbook. The DM determines what recipes can be found.'},
{level:2,name:'Culinary Techniques',description:'Choose one technique; gain another at level 10. Quick Service: after casting a recipe targeting only you or one willing creature, move 10 feet without provoking Opportunity Attacks, once per turn. Potent Seasoning: once per turn when a Culinarian cantrip deals damage, add your Intelligence modifier to one damage roll. Restorative Stock: once per turn when a Culinarian recipe restores Hit Points, add your Proficiency Bonus to one healing roll.'},
{level:3,name:'Culinary Discipline',description:'Choose one discipline: Flesh Eater, Wild Forager, Grand Host, Alchemical Gourmand, or Confectioner. Gain discipline features at levels 3, 6, 10, and 14.'},
{level:4,name:'Ability Score Improvement',description:'Gain the Ability Score Improvement feat or another feat for which you qualify.'},
{level:5,name:'Restorative Mastery',description:'Once per turn when a 1st-level or higher Culinarian recipe restores Hit Points, add your Intelligence modifier to one healing roll. This does not stack with another feature that adds the same modifier to that roll.'},
{level:7,name:'Efficient Preparation',description:'When you finish a Short Rest, replace one prepared recipe with another recipe in your grimoire for which you have spell slots.'},
{level:8,name:'Ability Score Improvement',description:'Gain the Ability Score Improvement feat or another feat for which you qualify.'},
{level:9,name:'Shared Table',description:'Once per Short or Long Rest, when a 1st-level or higher recipe restores Hit Points or grants Temporary Hit Points to one willing creature, a second willing creature within 10 feet of the first gains Temporary Hit Points equal to your Proficiency Bonus.'},
{level:10,name:'Culinary Technique Improvement',description:'Choose a second Culinary Technique.'},
{level:11,name:'Signature Recipe',description:'Choose one 1st-level recipe in your grimoire. You can cast it at 1st level without a spell slot once per Long Rest.'},
{level:12,name:'Ability Score Improvement',description:'Gain the Ability Score Improvement feat or another feat for which you qualify.'},
{level:13,name:'Culinary Expertise',description:'Choose two skills from the Culinarian skill list in which you are proficient. Double your Proficiency Bonus for checks using those skills.'},
{level:14,name:'Discipline Feature',description:'Gain your Culinarian Discipline feature.'},
{level:15,name:'Masterful Service',description:'Once per Long Rest, when you cast a 1st-level or higher recipe targeting one or more willing creatures, one affected creature gains Temporary Hit Points equal to your Culinarian level.'},
{level:16,name:'Ability Score Improvement',description:'Gain the Ability Score Improvement feat or another feat for which you qualify.'},
{level:17,name:'Legendary Recipes',description:'Choose a second 1st-level Signature Recipe. Once per Long Rest, when you cast a recipe using a 5th-level or lower slot, treat it as though cast using a slot one level higher without expending an additional slot.'},
{level:18,name:'Culinary Excellence',description:'When you roll Initiative and have no use of Shared Table remaining, regain one use. Efficient Preparation remains limited to one recipe swap per Short Rest.'},
{level:19,name:'Epic Boon',description:'Gain an Epic Boon feat or another feat for which you qualify.'},
{level:20,name:'Grandmaster of Culinary Arts',description:'Once per Long Rest, cast one prepared Culinarian recipe of 5th level or lower without expending a spell slot. If it restores Hit Points, one creature healed regains the maximum possible result on one healing die.'}
];
export const CONFECTIONER_FEATURES = [
{level:3,name:'Animated Creation',description:'Create one Culinary Golem. It shares your Initiative and acts immediately after you. It can move and use its Reaction independently. As a Bonus Action, command it to take an action other than Dodge. If uncommanded, it Dodges. If destroyed, reconstruct it after a Long Rest. During a Short Rest, repair it with Cook’s Utensils to restore HP equal to your Culinarian level + Intelligence modifier; once per rest.'},
{level:6,name:'Construction Style',description:'Choose one: Guardian: when a creature the golem sees within 5 feet is hit, it can use its Reaction to reduce damage by 1d8 + Proficiency Bonus. Servitor: when Slam hits, target makes Strength save against your spell save DC or Speed becomes 0; uses Proficiency Bonus per Long Rest. Familiar: Speed +10 feet, gains Climb Speed equal to Speed, and can Help a creature within 10 feet.'},
{level:10,name:'Enchanted Ingredients',description:'Choose one: Hard Crust (+1 AC); Regenerative Dough (regains Proficiency Bonus HP at start of turn if it has at least 1 HP, unless it took Fire or Acid damage since its last turn); Sticky Sugar (Slam reduces target Speed by 10 feet until golem’s next turn, once per turn); Warm Filling (when Slam hits, one ally within 5 feet of target gains Proficiency Bonus temporary HP, once per turn).'},
{level:14,name:'Masterwork Creation',description:'Choose a second Enchanted Ingredient. When you cast a Culinarian recipe targeting one willing creature, you can have the recipe originate from your golem if it is within 60 feet. You still provide components and follow normal range and targeting rules.'}
];
export const CULINARY_GOLEM_BASE = {creatureType:'Construct',size:'Small or Medium',armorClass:'13 + PB',hitPoints:'5 + (3 × Culinarian level)',speed:30,darkvision:60,damageImmunities:['Poison'],conditionImmunities:['Charmed','Exhaustion','Poisoned'],abilities:{strength:14,dexterity:12,constitution:14,intelligence:4,wisdom:10,charisma:6},attack:'Slam',attackBonus:'Spell attack modifier',reach:5,damage:'1d8 + PB bludgeoning'};
export const CULINARIAN_DISCIPLINES = ['Flesh Eater','Wild Forager','Grand Host','Alchemical Gourmand','Confectioner'];
