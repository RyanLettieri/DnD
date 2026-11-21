import React from 'react';
import Card from './Card';
import usePersistentState from '../hooks/usePersistentState';
import {CULINARIAN_PROGRESSION,CULINARIAN_DISCIPLINES} from '../data/culinarianData';
import ConfectionerBrigade from './ConfectionerBrigade';
export default function CulinarianClassFeatures({characterId,level=1,subclass="",proficiencyBonus=2,intelligence=10,spellSlots={},onUpdateSpellSlots=()=>{}}){
 const [choices,setChoices]=usePersistentState("character_"+characterId+"_culinarianChoices",{techniques:"",signatureRecipes:"",expertise:"",notes:""});
 const discipline=(CULINARIAN_DISCIPLINES[subclass]||[]).map(([level,name,description])=>({level,name,description}));
 return <div className="space-y-5">
 <Card><Card.Header>Culinarian Base-Class Progression</Card.Header><Card.Content><div className="grid md:grid-cols-2 gap-3">{CULINARIAN_PROGRESSION.filter(f=>f.level<=level).map(f=><div className="parchment-card p-3 rounded" key={f.level+"-"+f.name}><b>Level {f.level}: {f.name}</b><p className="text-sm mt-2">{f.description}</p></div>)}</div></Card.Content></Card>
 {subclass&&<Card><Card.Header>{subclass} Discipline Features</Card.Header><Card.Content><div className="space-y-3">{discipline.filter(f=>f.level<=level).map(f=><div className="parchment-card p-3 rounded" key={f.level}><b>Level {f.level}: {f.name}</b><p className="text-sm mt-2">{f.description}</p></div>)}</div></Card.Content></Card>}
 {subclass==="Confectioner"&&level>=3&&<ConfectionerBrigade characterId={characterId} level={level} proficiencyBonus={proficiencyBonus} intelligence={intelligence} spellSaveDC={8+proficiencyBonus+Math.floor((intelligence-10)/2)} spellAttack={proficiencyBonus+Math.floor((intelligence-10)/2)} spellSlots={spellSlots} onUpdateSpellSlots={onUpdateSpellSlots}/>}
 <Card><Card.Header>Feature Choices & Player Notes</Card.Header><Card.Content><p className="text-sm mb-3">Record technique selections, Signature Recipes, Expertise skills, and any DM-approved variations. These fields save automatically.</p>{[["techniques","Culinary Techniques (level 2 and 10)"],["signatureRecipes","Signature Recipes (level 11 and 17)"],["expertise","Culinary Expertise skills"],["notes","Other class feature choices / DM rulings"]].map(([k,label])=><label className="block text-sm mb-3" key={k}>{label}<textarea className="sheet-input w-full mt-1" rows="2" value={choices[k]||""} onChange={e=>setChoices(p=>({...p,[k]:e.target.value}))}/></label>)}</Card.Content></Card>
 </div>;
}