export const CULINARIAN_PROGRESSION = [
[1,"Culinary Spellcasting","Intelligence is your spellcasting ability. Prepare recipes equal to Culinarian level + Intelligence modifier (minimum 1). Change prepared recipes after a Long Rest."],
[1,"Culinary Grimoire","Begin with six 1st-level recipes. Add two Culinarian recipes to your grimoire each time you gain a Culinarian level, choosing a level for which you have spell slots."],
[2,"Culinary Techniques","Choose one technique; gain another at level 10. Quick Service: after a recipe targeting only you or one willing creature, move 10 feet without provoking opportunity attacks once per turn. Potent Seasoning: once per turn add INT modifier to one Culinarian cantrip damage roll. Restorative Stock: once per turn add PB to one Culinarian recipe healing roll."],
[3,"Culinary Discipline","Choose Flesh Eater, Wild Forager, Grand Host, Alchemical Gourmand, or Confectioner. Discipline features arrive at levels 3, 6, 10, and 14."],
[4,"Ability Score Improvement","Gain the Ability Score Improvement feat or another feat for which you qualify."],
[5,"Restorative Mastery","Once per turn when a 1st-level or higher Culinarian recipe restores HP, add your Intelligence modifier to one healing roll. This does not stack with another feature adding the same modifier."],
[7,"Efficient Preparation","When you finish a Short Rest, replace one prepared recipe with another recipe in your grimoire for which you have spell slots."],
[9,"Shared Table","Once per Short or Long Rest, when a 1st-level or higher recipe restores HP or grants Temporary HP to one willing creature, a second willing creature within 10 feet gains Temporary HP equal to PB."],
[10,"Culinary Technique","Choose a second Culinary Technique."],
[11,"Signature Recipe","Choose one 1st-level recipe in your grimoire. Cast it at 1st level without a spell slot once per Long Rest."],
[13,"Culinary Expertise","Choose two proficient skills from the Culinarian skill list; double your proficiency bonus for checks using them."],
[15,"Masterful Service","Once per Long Rest, when you cast a 1st-level or higher recipe targeting willing creatures, one affected creature gains Temporary HP equal to your Culinarian level."],
[17,"Legendary Recipes","Choose a second 1st-level Signature Recipe. Once per Long Rest, when casting a recipe with a 5th-level or lower slot, treat it as one level higher without expending an additional slot."],
[18,"Culinary Excellence","When you roll Initiative and have no use of Shared Table remaining, regain one use."],
[19,"Epic Boon","Gain an Epic Boon feat or another feat for which you qualify."],
[20,"Grandmaster of Culinary Arts","Once per Long Rest, cast one prepared recipe of 5th level or lower without a spell slot. If it restores HP, one creature healed regains the maximum possible result on one healing die."]
].map(([level,name,description])=>({level,name,description}));

export const CULINARIAN_RECIPES = {
0:["Guidance","Resistance","Spare the Dying","Thaumaturgy","Mage Hand","Prestidigitation","Poison Spray","Acid Splash","Produce Flame","Mending"],
1:["Bless","Cure Wounds","Detect Poison and Disease","Faerie Fire","Goodberry","Grease","Healing Word","Heroism","Longstrider","Purify Food and Drink","Sanctuary","Sleep","Protection from Evil and Good","Tasha's Hideous Laughter"],
2:["Aid","Calm Emotions","Darkvision","Enhance Ability","Hold Person","Lesser Restoration","Pass without Trace","Prayer of Healing","Protection from Poison","See Invisibility","Silence","Spike Growth","Web","Warding Bond","Dragon's Breath"],
3:["Aura of Vitality","Beacon of Hope","Create Food and Water","Counterspell","Dispel Magic","Haste","Mass Healing Word","Plant Growth","Protection from Energy","Revivify","Sleet Storm","Slow","Speak with Plants","Stinking Cloud","Water Breathing"],
4:["Aura of Life","Aura of Purity","Blight","Confusion","Death Ward","Freedom of Movement","Grasping Vine","Greater Invisibility","Hallucinatory Terrain","Polymorph"],
5:["Animate Objects","Awaken","Circle of Power","Contagion","Greater Restoration","Hold Monster","Mass Cure Wounds","Raise Dead","Skill Empowerment","Wall of Stone"],
6:["Find the Path","Globe of Invulnerability","Heal","Heroes' Feast","Mass Suggestion","Sunbeam","Transport via Plants","True Seeing","Wall of Thorns"],
7:["Etherealness","Forcecage","Mirage Arcane","Plane Shift","Regenerate","Resurrection","Reverse Gravity","Symbol"],
8:["Animal Shapes","Antimagic Field","Control Weather","Earthquake","Feeblemind","Holy Aura","Maze","Mind Blank"],
9:["Foresight","Mass Heal","Prismatic Wall","Shapechange","Time Stop","True Resurrection","Wish"]
};

export const CULINARIAN_SLOT_TABLE = [
[2,0,0,0,0,0,0,0,0],[3,0,0,0,0,0,0,0,0],[4,2,0,0,0,0,0,0,0],[4,3,0,0,0,0,0,0,0],[4,3,2,0,0,0,0,0,0],
[4,3,3,0,0,0,0,0,0],[4,3,3,1,0,0,0,0,0],[4,3,3,2,0,0,0,0,0],[4,3,3,3,1,0,0,0,0],[4,3,3,3,2,0,0,0,0],
[4,3,3,3,2,1,0,0,0],[4,3,3,3,2,1,0,0,0],[4,3,3,3,2,1,1,0,0],[4,3,3,3,2,1,1,0,0],
[4,3,3,3,2,1,1,1,0],[4,3,3,3,2,1,1,1,0],[4,3,3,3,2,1,1,1,1],[4,3,3,3,3,1,1,1,1],[4,3,3,3,3,2,1,1,1],[4,3,3,3,3,2,2,1,1]
];

export const CULINARIAN_DISCIPLINES = {
"Flesh Eater":[
[3,"Feast of the Fallen","After a Short or Long Rest, consume remains of a creature dead within 24 hours (not Construct or Undead). Choose one adaptation until next Long Rest: Predator's Eyes (Darkvision 60 ft or +30 ft); Climber's Tendons (climb speed equal to speed); Amphibious Lungs (swim speed equal to speed and breathe underwater); Stolen Vigor (Temporary HP equal to twice Culinarian level); Borrowed Instinct (Perception or Survival proficiency, or Expertise if already proficient). One adaptation at a time."],
[6,"Nourishment Through Death","When a creature you see dies within 30 ft, use Reaction to grant yourself or a willing creature within 30 ft Temporary HP equal to Culinarian level + INT modifier. Uses: PB per Long Rest."],
[10,"Unnatural Appetite","Gain an enhancement with your adaptation: Predator's Eyes grants advantage on sight-based Perception; Climber's Tendons allows hands-free ceiling climbing; Amphibious Lungs grants Cold resistance; Stolen Vigor grants advantage on saves against Poisoned; Borrowed Instinct adds INT modifier to Initiative."],
[14,"Perfected Consumption","Choose two different adaptations with Feast of the Fallen. Nourishment Through Death Temporary HP can be divided among up to three willing creatures, each receiving at least 1."]],
"Wild Forager":[
[3,"Nature's Pantry","Gain Herbalism Kit and Nature proficiency (or another Culinarian skill if already proficient). After a Long Rest choose a preparation until next Long Rest; PB uses: Envenomed Extract adds PB Poison damage once per turn when a creature fails a save against your recipe; Rootbound Extract reduces its Speed by 10 ft until next turn; Restorative Extract grants Temporary HP equal to PB when you heal."],
[6,"Overgrowth","Action: create magical growth in a 10-ft radius within 60 ft for 1 minute. Enemies treat it as Difficult Terrain; first time an enemy enters on a turn or starts there, STR save or Speed 0 until start of its next turn. PB uses per Long Rest."],
[10,"Symbiotic Nourishment","When a Culinarian recipe restores HP, you can also end Blinded, Deafened, or Poisoned. Uses: INT modifier per Long Rest (minimum 1)."],
[14,"Ancient Bloom","Overgrowth radius becomes 20 ft. When it appears, chosen allies in area gain Temporary HP equal to Culinarian level."]],
"Grand Host":[
[3,"A Place at the Table","When you cast a 1st-level or higher Culinarian recipe targeting one willing creature, a second willing creature within 10 ft gains Temporary HP equal to PB. PB uses per Long Rest."],
[6,"Comforting Presence","When you or a creature you see within 30 ft fails a save against Charmed or Frightened, use Reaction to let it reroll. INT modifier uses per Long Rest (minimum 1)."],
[10,"Second Course","When your recipe heals or grants Temporary HP to an ally, choose one affected ally. Before end of its next turn it can add INT modifier to one saving throw. A creature can benefit once per Short or Long Rest."],
[14,"Grand Banquet","Action: up to six creatures within 30 ft gain Temporary HP equal to Culinarian level + INT modifier, advantage on saves against Charmed and Frightened for 1 minute, and end Frightened. Once per Long Rest."]],
"Alchemical Gourmand":[
[3,"Experimental Concoctions","After Long Rest choose two concoctions, each usable once before next Long Rest: Volatile Mixture (Action, 30 ft, 5-ft radius, DEX save, 2d6 Fire or half); Elastic Tonic (Bonus Action, self or willing creature within 5 ft gains climb speed 10 ft for 10 min); Smokescreen (Action, 10-ft radius cloud within 30 ft heavily obscured until your next turn); Reactive Serum (Reaction, reduce damage to you or creature within 30 ft by 1d8 + INT modifier)."],
[6,"Transmutative Cooking","Bonus Action, self or willing creature within 30 ft, until start of next turn: Lightweight (movement doesn't provoke opportunity attacks), Dense (Resistance to Bludgeoning), or Volatile (next weapon hit deals extra Force damage equal PB). PB uses per Long Rest."],
[10,"Unstable Reactions","When you use an Experimental Concoction, choose a second eligible target within 5 ft of original target or area; it is affected by the same concoction."],
[14,"Magnum Opus","After Long Rest choose one opus, use once before next Long Rest: Grand Detonation (20-ft radius within 60 ft, DEX save, 6d8 Force or half); Miracle Serum (up to three creatures within 30 ft regain 4d8 + INT HP and gain Temporary HP equal level); Transmutation Cloud (20-ft radius within 60 ft, up to six allies gain Fly 30 ft until end next turn; chosen enemies CON save or Poisoned until then)."]],
"Confectioner":[
[3,"Culinary Constructs","Create and command a brigade of animated food constructs. Your active brigade size and shared HP pool are tracked in the Brigade Manager."],
[6,"Magical Seasoning","When commanding a construct's active recipe ability, expend a spell slot to apply one seasoning: Spicy adds 1d6 damage per slot level; Savory adds 1d6 healing or Temporary HP per slot level; Bitter imposes disadvantage on the target's next attack after a failed save."],
[10,"Expanded Brigade","Brigade maximum increases to four; shared HP becomes 6 × Culinarian level; construct attacks are magical; command a second different construct with the same Bonus Action."],
[14,"Grand Banquet","Once per Long Rest for 1 minute: brigade maximum five; gain shared Temporary HP equal to Culinarian level; command two constructs per Bonus Action; once per turn add PB to damage or Temporary HP from a commanded construct; speed +10 ft."]]
};
