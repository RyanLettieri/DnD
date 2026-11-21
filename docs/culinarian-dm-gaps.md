# Culinarian implementation reference and DM questions

## Sources of truth
- Base Culinarian class: Culinarian Class Playtest Handbook v0.1 (13-page PDF supplied by the player).
- Confectioner subclass: the player's custom multi-golem design from the conversation "Culinarian: The Confectioner". This intentionally overrides the handbook's single-evolving-golem Confectioner.
- All handbook features and recipe options are playtest proposals, not official or automatically DM-approved rules.

## Handbook-backed base class
- d8 Hit Die; Intelligence primary ability.
- Constitution and Intelligence saving throws.
- Light and medium armor training; simple weapons; Cook's utensils.
- Choose two skills from Arcana, Insight, Medicine, Nature, Perception, Persuasion, Survival.
- Starting equipment: leather or scale mail, a simple weapon, cook's utensils, explorer's pack, culinary grimoire.
- Full-caster spell-slot progression through 9th level.
- Prepare Culinarian level + Intelligence modifier recipes (minimum 1); change after Long Rest.
- Grimoire starts with six 1st-level recipes; add two recipes each Culinarian level.
- Cantrips known: 3 at levels 1–3, 4 at levels 4–9, 5 at levels 10–20.
- Culinary Techniques at level 2 and a second at level 10.
- Base progression levels 1–20, including Restorative Mastery, Efficient Preparation, Shared Table, Signature Recipe, Culinary Expertise, Masterful Service, Legendary Recipes, Culinary Excellence, Epic Boon, Grandmaster of Culinary Arts.
- All five disciplines: Flesh Eater, Wild Forager, Grand Host, Alchemical Gourmand, Confectioner.
- Handbook spell list is a proposed starting pool; check exact spell text and campaign availability with DM.

## Custom multi-golem Confectioner (the app's intended design)
- Level 3: up to 3 independently positioned golems; shared HP = 5 + (5 × Culinarian level).
- Level 10: up to 4 golems; shared HP = 6 × Culinarian level; attacks magical; command two different golems with one Bonus Action.
- Level 14: up to 5 golems; Grand Banquet once per Long Rest for 1 minute; shared temporary HP equal to Culinarian level; +10 ft speed; once per turn add PB to golem damage or temporary HP.
- Shared golem statistics: Small Construct; AC 13 + PB; shared pool; speed 30 ft; STR 10, DEX 14, CON 14, INT 6, WIS 10, CHA 6; poison resistance; immune Charmed, Exhaustion, Poisoned; darkvision 60 ft; understands languages but cannot speak.
- Shared initiative; each golem independently moves up to speed; no independent actions; uncommanded golems Dodge; command range 60 ft; no opportunity attacks; conditions apply to individual tokens.
- Recipes: Guardian, Medic, Saboteur, Striker, Grapevine. Medic grants temp HP and death-save support, not actual healing. Grapevine has five one-use grapes, each healing 1d6 + INT modifier.
- Level 6 Magical Seasoning: Spicy adds 1d6 damage per slot level; Savory adds 1d6 healing/temp HP per slot level; Bitter gives disadvantage on next attack after failed save.

## DM rulings still needed
1. Confirm the custom multi-golem design is approved as written and supersedes the handbook's single golem.
2. Confirm Grapevine as an official fifth construct recipe and how/when its five charges refresh.
3. Resolve wording conflict: golems share initiative immediately after the Culinarian's turn, while also moving on the Culinarian's turn. Choose one exact timing.
4. Confirm uncommanded golems Dodge despite the no-independent-actions rule.
5. Confirm Guardian's reaction refresh timing, whether the reaction is per golem, and whether multiple Guardians can protect one ally.
6. Confirm Saboteur: on a successful Strength save, target still cannot take reactions (the current custom wording says yes).
7. Confirm how an area effect hitting multiple golems applies damage once to the shared HP pool.
8. Confirm whether shared HP at level 10 replaces the level 3 formula with 6 × level.
9. Confirm whether multiple golems may use the same recipe and whether recipe choices can be changed after creation.
10. Confirm whether constructs are recreated only after a Long Rest when the shared pool reaches 0.
11. Confirm whether Grand Banquet's once-per-turn PB bonus applies to damage and temporary HP only, or also actual healing from Grapevine.
12. Confirm how Bitter seasoning applies to abilities that do not force a saving throw.
13. Confirm whether two commands at level 10/14 may both receive seasoning and require separate spell slots (current custom design says yes).

## App implementation notes
- The app tracks each golem as an independent record with a name, recipe, size, battlefield position, conditions, and notes.
- Shared HP and shared temporary HP are tracked once for the brigade.
- Spellbook tracks grimoire, proposed recipe options, known cantrips, prepared recipes, and custom DM-approved recipes.
- Background and custom features are editable after character creation and stored per character.
- The app is a tracker, not a virtual tabletop: token movement, rolls, saves, damage resolution, and exact spell text still require player/DM adjudication.
