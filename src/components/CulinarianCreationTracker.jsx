import React,{useState} from 'react';
import usePersistentState from '../hooks/usePersistentState';
import Card from './Card';
import {CULINARY_GOLEM_BASE} from '../data/culinarian';
const initial={created:false,name:'',size:'Small',hp:0,maxHp:0,style:'',enhancements:[],notes:'',usedRepair:false};
export default function CulinarianCreationTracker({characterId,level=1,intelligence=10,proficiencyBonus=2,spellAttackBonus=0,spellSaveDc=0}){
 const [golem,setGolem]=usePersistentState(`character_${characterId}_culinaryGolem`,initial);
 const [damage,setDamage]=useState(''),[healing,setHealing]=useState('');
 const intMod=Math.floor((Number(intelligence||10)-10)/2),maxHp=5+3*Number(level||1);
 const update=p=>setGolem(v=>({...v,...p}));
 const create=()=>setGolem(v=>({...v,created:true,maxHp,hp:maxHp,usedRepair:false}));
 const applyDamage=()=>{const n=Math.max(0,Number(damage)||0);update({hp:Math.max(0,Number(golem.hp||0)-n)});setDamage('');};
 const applyHealing=()=>{const n=Math.max(0,Number(healing)||0);update({hp:Math.min(Number(golem.maxHp||maxHp),Number(golem.hp||0)+n)});setHealing('');};
 const repair=()=>{if(!golem.usedRepair)update({hp:Math.min(Number(golem.maxHp||maxHp),Number(golem.hp||0)+Number(level)+intMod),usedRepair:true});};
 const ac=13+Number(proficiencyBonus||2)+(golem.enhancements.includes('Hard Crust')?1:0);
 const speed=30+(golem.style==='Familiar'?10:0);
 const ingredients=['Hard Crust','Regenerative Dough','Sticky Sugar','Warm Filling'];
 return <Card><Card.Header>Confectioner — Culinary Creation</Card.Header><Card.Content>
 <p className="text-sm parchment-text-light mb-3">The handbook's Confectioner creates one evolving food construct with its own hit points, movement, reaction, and Slam attack.</p>
 {!golem.created?<button className="action-button" disabled={level<3} onClick={create}>Create Culinary Golem {level<3?'(unlocks at level 3)':''}</button>:<>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
 <label className="text-sm">Name<input className="sheet-input mt-1" value={golem.name} onChange={e=>update({name:e.target.value})} placeholder="Name your creation"/></label>
 <label className="text-sm">Size<select className="sheet-input mt-1" value={golem.size} onChange={e=>update({size:e.target.value})}><option>Small</option><option>Medium</option></select></label>
 <div className="parchment-card p-3 rounded">HP<strong className="block">{golem.hp}/{golem.maxHp}</strong></div>
 <div className="parchment-card p-3 rounded">Armor Class<strong className="block">{ac}</strong></div>
 </div>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3 text-sm">
 <div className="parchment-card p-3 rounded">Speed<strong className="block">{speed} ft.</strong></div>
 <div className="parchment-card p-3 rounded">Darkvision<strong className="block">60 ft.</strong></div>
 <div className="parchment-card p-3 rounded">Slam<strong className="block">+{spellAttackBonus} to hit</strong>1d8 + {proficiencyBonus} bludgeoning</div>
 <div className="parchment-card p-3 rounded">Spell Save DC<strong className="block">{spellSaveDc}</strong></div>
 </div>
 <div className="parchment-card p-3 rounded mt-3"><strong>Ability Scores</strong><div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-2 text-center text-sm">{Object.entries(CULINARY_GOLEM_BASE.abilities).map(([k,v])=><div key={k}><span className="block uppercase text-xs">{k.slice(0,3)}</span><strong>{v}</strong></div>)}</div></div>
 <p className="text-sm parchment-text-light mt-3">Creature Type: Construct · Poison damage immunity · Condition immunities: Charmed, Exhaustion, Poisoned · Acts immediately after your Initiative · Can move and use its Reaction independently.</p>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
 <label className="text-sm">Damage<input className="sheet-input mt-1" type="number" min="0" value={damage} onChange={e=>setDamage(e.target.value)}/></label><button className="action-button danger self-end" onClick={applyDamage}>Apply Damage</button>
 <label className="text-sm">Healing<input className="sheet-input mt-1" type="number" min="0" value={healing} onChange={e=>setHealing(e.target.value)}/></label><button className="action-button self-end" onClick={applyHealing}>Heal Creation</button>
 </div>
 <div className="flex flex-wrap gap-2 mt-3"><button className="action-button secondary" disabled={golem.usedRepair} onClick={repair}>Short Rest Repair (+{Number(level)+intMod} HP)</button><button className="action-button secondary" onClick={()=>update({hp:golem.maxHp,usedRepair:false})}>Long Rest Restore / Reconstruct</button><button className="action-button danger" onClick={()=>setGolem(initial)}>Dismiss / Reset</button></div>
 <label className="block text-sm mt-4">Level 6 Construction Style<select className="sheet-input mt-1" disabled={level<6} value={golem.style} onChange={e=>update({style:e.target.value})}><option value="">Choose style</option>{['Guardian','Servitor','Familiar'].map(x=><option key={x}>{x}</option>)}</select></label>
 {golem.style==='Guardian'&&<p className="text-sm mt-2">Guardian: reaction reduces damage to a creature the golem sees within 5 feet by 1d8 + PB.</p>}
 {golem.style==='Servitor'&&<p className="text-sm mt-2">Servitor: on Slam hit, target makes Strength save (DC {spellSaveDc}) or Speed becomes 0 until your next turn. Uses: {proficiencyBonus} per Long Rest.</p>}
 {golem.style==='Familiar'&&<p className="text-sm mt-2">Familiar: Speed +10 feet, Climb Speed equal to Speed, and can Help a creature within 10 feet.</p>}
 <div className="mt-4"><strong className="text-sm">Level 10 Enchanted Ingredient</strong><div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">{ingredients.map(x=><label key={x} className="parchment-card rounded p-2 flex gap-2"><input type="checkbox" disabled={level<10||(!golem.enhancements.includes(x)&&golem.enhancements.length>=(level>=14?2:1))} checked={golem.enhancements.includes(x)} onChange={()=>update({enhancements:golem.enhancements.includes(x)?golem.enhancements.filter(v=>v!==x):[...golem.enhancements,x]})}/><span className="text-sm">{x}</span></label>)}</div><p className="text-xs parchment-text-light mt-1">Choose one at level 10 and a second at level 14.</p></div>
 {level>=14&&<p className="text-sm mt-3">Masterwork Creation: a Culinarian recipe targeting one willing creature can originate from the golem if it is within 60 feet. Normal components, range, and targeting rules still apply.</p>}
 <label className="block text-sm mt-4">Creation notes<textarea className="sheet-input mt-1 min-h-20" value={golem.notes} onChange={e=>update({notes:e.target.value})}/></label>
 </>}
 </Card.Content></Card>;
}
