import React,{useMemo,useState} from 'react';
import Card from './Card';
import usePersistentState from '../hooks/usePersistentState';
import {CULINARIAN_RECIPES} from '../data/culinarianData';
import {SPELL_DETAILS} from '../data/spells';
import SpellCard from './SpellCard';
export default function CulinarianSpellbook({characterId,level=1,intelligence=10}){
 const key="character_"+characterId;
 const [grimoire,setGrimoire]=usePersistentState(key+"_culinarianGrimoire",{0:["Guidance","Resistance","Spare the Dying"],1:["Bless","Cure Wounds","Goodberry","Healing Word","Sanctuary","Purify Food and Drink"]});
 const [prepared,setPrepared]=usePersistentState(key+"_culinarianPrepared",{});
 const [search,setSearch]=useState("");
 const [newRecipe,setNewRecipe]=useState({name:"",level:1});
 const intMod=Math.floor((Number(intelligence)-10)/2);
 const preparedCount=Object.entries(prepared).filter(([lvl])=>Number(lvl)>0).reduce((n,[,names])=>n+names.length,0);
 const cantripCount=(grimoire[0]||[]).length;
 const preparedLimit=Math.max(1,Number(level)+intMod);
 const cantripsKnown=level>=10?5:level>=4?4:3;
 const maxSpellLevel=Math.min(9,Math.ceil(level/2));
 const known=useMemo(()=>Object.entries(grimoire).flatMap(([lvl,names])=>(names||[]).map(name=>({name,level:Number(lvl)}))),[grimoire]);
 const expectedGrimoireRecipes=6+2*Math.max(0,Number(level)-1);
 const leveledKnown=known.filter(x=>x.level>0).length;
 const add=(lvl,name)=>{if(!name||known.some(x=>x.name===name))return;if(Number(lvl)===0&&cantripCount>=cantripsKnown)return;setGrimoire(p=>({...p,[lvl]:[...(p[lvl]||[]),name]}));};
 const toggle=(lvl,name)=>{const list=prepared[lvl]||[];const exists=list.includes(name);if(Number(lvl)===0)return;if(!exists&&preparedCount>=preparedLimit)return;setPrepared(p=>({...p,[lvl]:exists?list.filter(x=>x!==name):[...(p[lvl]||[]),name]}));};
 const remove=(lvl,name)=>{setGrimoire(p=>({...p,[lvl]:(p[lvl]||[]).filter(x=>x!==name)}));setPrepared(p=>({...p,[lvl]:(p[lvl]||[]).filter(x=>x!==name)}));};
 const addCustom=()=>{const name=newRecipe.name.trim(),lvl=Number(newRecipe.level);if(!name||known.some(x=>x.name.toLowerCase()===name.toLowerCase())||(lvl===0&&cantripCount>=cantripsKnown))return;add(lvl,name);setNewRecipe({name:"",level:1});};
 return <div className="space-y-5"><Card><Card.Header>Culinary Grimoire & Recipe Preparation</Card.Header><Card.Content>
 <p className="text-sm mb-3">The handbook's proposed recipe pool is shown by level. The DM can approve or reject individual recipes. Grimoire: start with six 1st-level recipes and add two recipes per Culinarian level. Prepare after a Long Rest: Culinarian level + INT modifier (minimum 1). Cantrips known: {cantripsKnown}.</p>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">{[["Prepared",preparedCount+" / "+preparedLimit],["Cantrips known",cantripCount+" / "+cantripsKnown],["Grimoire recipes",leveledKnown+" / "+expectedGrimoireRecipes],["Highest recipe level",maxSpellLevel]].map(([a,b])=><div className="parchment-card p-3 rounded" key={a}><small>{a}</small><div className="font-bold">{b}</div></div>)}</div>
 <div className="flex gap-2 mb-3"><input className="sheet-input flex-1" placeholder="Search known recipes" value={search} onChange={e=>setSearch(e.target.value)}/><button className="action-button secondary" onClick={()=>setPrepared({})}>Clear prepared recipes (Long Rest)</button></div>
 <p className="text-xs opacity-70 mb-2">Expected leveled grimoire entries at your current level: {expectedGrimoireRecipes}. The handbook grants two additional recipes each level; record the choices you and your DM approve.</p><div className="space-y-3">{Array.from({length:maxSpellLevel+1},(_,lvl)=><div className="parchment-card p-3 rounded" key={lvl}><strong>{lvl===0?"Cantrips":"Level "+lvl+" Recipes"}</strong><div className="space-y-2 mt-2">{(grimoire[lvl]||[]).filter(n=>n.toLowerCase().includes(search.toLowerCase())).map(name=><div className="flex items-center justify-between gap-2" key={name}><label className="flex items-center gap-2 text-sm">{lvl===0?<span className="text-xs opacity-70">Known</span>:<input type="checkbox" checked={(prepared[lvl]||[]).includes(name)} onChange={()=>toggle(lvl,name)} />}{name}</label><button className="text-xs underline" onClick={()=>remove(lvl,name)}>Remove</button></div>)}</div>
 <select className="sheet-input w-full mt-3" value="" onChange={e=>add(lvl,e.target.value)}><option value="">Add from handbook proposed list…</option>{(CULINARIAN_RECIPES[lvl]||[]).filter(n=>!(grimoire[lvl]||[]).includes(n)).map(n=><option key={n} value={n}>{n}</option>)}</select></div>)}</div>
 <div className="flex flex-wrap gap-2 mt-4"><input className="sheet-input flex-1" placeholder="Custom / DM-approved recipe" value={newRecipe.name} onChange={e=>setNewRecipe(p=>({...p,name:e.target.value}))}/><select className="sheet-input" value={newRecipe.level} onChange={e=>setNewRecipe(p=>({...p,level:e.target.value}))}>{Array.from({length:maxSpellLevel+1},(_,i)=><option key={i} value={i}>{i===0?"Cantrip":"Level "+i}</option>)}</select><button className="action-button" onClick={addCustom}>Add to Grimoire</button></div>
 </Card.Content></Card>
 <Card><Card.Header>Prepared Recipes</Card.Header><Card.Content><div className="grid md:grid-cols-2 gap-2">{(grimoire[0]||[]).map(name=><div className="parchment-card p-3 rounded" key={name}><SpellCard spell={name} details={SPELL_DETAILS[name]} level={0} characterLevel={level}/><div className="text-xs opacity-70">Known cantrip</div></div>)}{Object.entries(prepared).filter(([lvl])=>Number(lvl)>0).flatMap(([lvl,names])=>names.map(name=><div className="parchment-card p-3 rounded" key={lvl+name}><SpellCard spell={name} details={SPELL_DETAILS[name]} level={Number(lvl)} characterLevel={level}/><div className="text-xs opacity-70">Level {lvl} prepared recipe</div></div>))}</div>{preparedCount===0&&(grimoire[0]||[]).length===0&&<p className="text-sm opacity-70">No recipes prepared. Select recipes above.</p>}</Card.Content></Card>
 <Card><Card.Header>Efficient Preparation (Level 7)</Card.Header><Card.Content><p className="text-sm">After a Short Rest, you may replace one prepared recipe with another recipe in your grimoire. Update the checkboxes above; track the once-per-short-rest swap here.</p><ShortRestSwap characterId={characterId}/></Card.Content></Card>
 </div>;
}
function ShortRestSwap({characterId}){const [used,setUsed]=usePersistentState("character_"+characterId+"_culinarianShortSwap",false);return <button className="action-button secondary mt-2" onClick={()=>setUsed(v=>!v)}>{used?"Short-rest swap marked used":"Mark short-rest swap used"} (toggle after rest)</button>}
