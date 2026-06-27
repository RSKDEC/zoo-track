import React, { useState, useEffect, useCallback, useRef } from "react";
import { createRoot } from "react-dom/client";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://hrcxdtwewgxjipfioziq.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyY3hkdHdld2d4amlwZmlvemlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0MjI2MzQsImV4cCI6MjA5Nzk5ODYzNH0.fhr2eGlg8muLef_h51_OfxmTKIzYdAK8DufMun_2ydw";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const ASSET_BASE = (() => {
  const path = window.location.pathname;
  return path.endsWith("/") ? path : path.slice(0, path.lastIndexOf("/") + 1);
})();
function assetSrc(path){
  return `${ASSET_BASE}${path}`;
}

// ── CONSTANTS ──────────────────────────────────────────
const COLORS = [
  { id:0, name:"Pink",   track:"#FF69B4", light:"#FFB6D9" },
  { id:1, name:"Yellow", track:"#FFD700", light:"#FFF0A0" },
  { id:2, name:"Blue",   track:"#4A90D9", light:"#B8D9F5" },
  { id:3, name:"Teal",   track:"#00C9A7", light:"#A0EEE0" },
  { id:4, name:"White",  track:"#CCCCCC", light:"#F0F0F0" },
  { id:5, name:"Orange", track:"#FF7A00", light:"#FFD0A0" },
  { id:6, name:"Purple", track:"#9B59B6", light:"#D8B4F0" },
  { id:7, name:"Gray",   track:"#778CA3", light:"#C8D6E0" },
];

const CARD_ANIMALS = {
  A:"🦙",2:"🐍",3:"🐰",4:"🦫",5:"🦩",6:"🐢",
  7:"🦆",8:"🦨",9:"🦄",10:"🦝",J:"🐒",Q:"🦢",K:"🦁",JOKER:"🐔"
};
const CARD_NAMES = {
  A:"Launch Llama",2:"Sneaky Snake",3:"Bouncy Bunny",4:"Backward Beaver",
  5:"Funky Flamingo",6:"Turbo Turtle",7:"Dizzy Duck",8:"Skate Skunk",
  9:"Noodle Narwhal",10:"Rocket Raccoon",J:"Trickster Monkey",
  Q:"Shield Swan",K:"Crowned Lion",JOKER:"Chaos Chicken"
};
const CARD_ACTIONS = {
  A:"Blast a peg out of start!",2:"Move 2 spaces",3:"Move 3 spaces",
  4:"Move 4 BACKWARD",5:"Move 5 spaces",6:"Move 6 or launch a peg!",
  7:"Move 7 spaces",8:"Move 8 spaces",9:"Move 9 spaces",10:"Move 10 spaces",
  J:"Move 1 + draw again",Q:"Move 1 + draw again",K:"Move 1 + draw again",
  JOKER:"Launch a peg!"
};
const CARD_ART_FOLDERS = {
  0:"pink cards",
  1:"yellow cards",
  2:"blue cards",
  3:"teal cards",
  5:"Orange cards",
  6:"purple cards",
};
const CARD_ART_FILES = {
  0:{
    A:"pink-a-launch-llama.png",
    2:"pink-2-sneaky-snake.png",
    3:"pink-3-bouncy-bunny.png",
    4:"pink-4-backward-beaver.png",
    5:"pink-5-funky-flamingo.png",
    6:"pink-6-turbo-turtle.png",
    7:"pink-7-dizzy-duck.png",
    8:"pink-8-skate-skunk.png",
    9:"pink-9-noodle-narwhal.png",
    10:"pink-10-rocket-raccoon.png",
    J:"pink-j-trickster-monkey.png",
    Q:"pink-q-shield-swan.png",
    K:"pink-k-crowned-lion.png",
    JOKER:"pink-joker-chaos-chicken.png",
  },
  1:{
    A:"yellow-a-launch-llama.png",
    2:"yellow-2-sneaky-snake.png",
    3:"yellow-3-bouncy-bunny.png",
    4:"yellow-4-backward-beaver.png",
    5:"yellow-5-funky-flamingo.png",
    6:"yellow-6-turbo-turtle.png",
    7:"yellow-7-dizzy-duck.png",
    8:"yellow-8-skate-skunk.png",
    9:"yellow-9-noodle-narwhal.png",
    10:"yellow-10-rocket-raccoon.png",
    J:"yellow-j-trickster-monkey.png",
    Q:"yellow-q-shield-swan.png",
    K:"yellow-k-crowned-lion.png",
    JOKER:"yellow-joker-chaos-chicken.png",
  },
  2:{
    A:"blue-a-launch-llama.png",
    2:"blue-2-sneaky-snake.png",
    3:"blue-3-bouncy-bunny.png",
    4:"blue-4-backward-beaver.png",
    5:"blue-5-funky-flamingo.png",
    6:"blue-6-turbo-turtle.png",
    7:"blue-7-dizzy-duck.png",
    8:"blue-8-skate-skunk.png",
    9:"blue-9-noodle-narwhal.png",
    10:"blue-10-rocket-raccoon.png",
    J:"blue-j-trickster-monkey.png",
    Q:"blue-q-shield-swan.png",
    K:"blue-k-crowned-lion.png",
    JOKER:"blue-joker-chaos-chicken.png",
  },
  3:{
    A:"teal-a-launch-llama.png",
    2:"teal-2-sneaky-snake.png",
    3:"teal-3-bouncy-bunny.png",
    4:"teal-4-backward-beaver.png",
    5:"teal-5-funky-flamingo.png",
    6:"teal-6-turbo-turtle.png",
    7:"teal-7-dizzy-duck.png",
    8:"teal-8-skate-skunk.png",
    9:"teal-9-noodle-narwhal.png",
    10:"teal-10-rocket-raccoon.png",
    J:"teal-j-trickster-monkey.png",
    Q:"teal-q-shield-swan.png",
    K:"teal-k-crowned-lion.png",
    JOKER:"teal-joker-chaos-chicken.png",
  },
  5:{
    A:"orange-a-launch-llama.png",
    2:"orange-2-sneaky-snake.png",
    3:"orange-3-bouncy-bunny.png",
    4:"orange-4-backward-beaver.png",
    5:"orange-5-funky-flamingo.png",
    6:"orange-6-turbo-turtle.png",
    7:"orange-7-dizzy-duck.png",
    8:"orange-8-skate-skunk.png",
    9:"orange-9-noodle-narwhal.png",
    10:"orange-10-rocket-raccoon.png",
    J:"orange-j-trickster-monkey.png",
    Q:"orange-q-shield-swan.png",
    K:"orange-k-crowned-lion.png",
    JOKER:"orange-joker-chaos-chicken.png",
  },
  6:{
    A:"purple-a-launch-llama.png",
    2:"purple-2-sneaky-snake.png",
    3:"purple-3-bouncy-bunny.png",
    4:"purple-4-backward-beaver.png",
    5:"purple-5-funky-flamingo.png",
    6:"purple-6-turbo-turtle.png",
    7:"purple-7-dizzy-duck.png",
    8:"purple-8-skate-skunk.png",
    9:"purple-9-noodle-narwhal.png",
    10:"purple-10-rocket-raccoon.png",
    J:"purple-j-trickster-monkey.png",
    Q:"purple-q-shield-swan.png",
    K:"purple-k-crowned-lion.png",
    JOKER:"purple-joker-chaos-chicken.png",
  },
};
function cardArtSrc(card,colorIndex){
  const colorFiles=CARD_ART_FILES[colorIndex]||CARD_ART_FILES[0];
  const file=colorFiles[card.rank]||CARD_ART_FILES[0][card.rank]||CARD_ART_FILES[0].A;
  const folder=colorFiles[card.rank] ? CARD_ART_FOLDERS[colorIndex] : CARD_ART_FOLDERS[0];
  return assetSrc(`${folder}/${file}`);
}

// ── DECK ───────────────────────────────────────────────
const RANKS = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
const SUITS = ["♠","♥","♦","♣"];
function createDeck(){
  const d=[];
  for(const s of SUITS) for(const r of RANKS) d.push({rank:r,suit:s,id:`${r}${s}`});
  d.push({rank:"JOKER",suit:"★",id:"JOKER1"});
  d.push({rank:"JOKER",suit:"★",id:"JOKER2"});
  return d;
}
function shuffle(d){ const a=[...d]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
function isStart(r){ return r==="A"||r==="6"||r==="JOKER"; }
function isFace(r){ return r==="J"||r==="Q"||r==="K"; }
function isBack(r){ return r==="4"; }
function moveVal(r){ if(r==="A"||r==="JOKER") return 0; if(isFace(r)) return 1; if(r==="6") return 6; return parseInt(r)||0; }
function readCards(value){
  if(Array.isArray(value)) return value;
  if(typeof value==="string"){
    try{ return JSON.parse(value||"[]"); } catch { return []; }
  }
  return [];
}

// ── GEOMETRY ───────────────────────────────────────────
const S=560,CX=280,CY=280;
function rad(d){ return d*Math.PI/180; }
function armSize(n){
  if(n<=4) return {W:120,H:185,Z:30,D:52};
  if(n<=6) return {W:104,H:165,Z:26,D:52};
  if(n===7) return {W:90,H:150,Z:24,D:54};
  return {W:82,H:140,Z:22,D:56};
}
function makePt(angle,g){
  const{W,D}=g;
  return (lx,ly)=>{
    const sx=CX+W/2-lx,sy=CY-D-ly;
    const r=rad(angle),c=Math.cos(r),s=Math.sin(r);
    return [CX+(sx-CX)*c-(sy-CY)*s,CY+(sx-CX)*s+(sy-CY)*c];
  };
}
function geo(n){
  const g=armSize(n);
  const{W,H,Z,D}=g;
  const LX=11,RX=W-11,MID=W/2;
  const LBOT=H*0.72,LTOP=20,LSTEP=(LBOT-LTOP)/5;
  const LYS=Array.from({length:6},(_,i)=>LBOT-i*LSTEP);
  const RBOT=H*0.72,RTOP=20,RSTEP=(RBOT-RTOP)/4;
  const RYS=Array.from({length:5},(_,i)=>RTOP+i*RSTEP);
  const BY=LBOT+LSTEP*0.85;
  const BXS=[RX,LX+(RX-LX)*.75,MID,LX+(RX-LX)*.25,LX];
  const FTY=12,TIPY=8;
  const HT=28,HS=(LBOT-HT)/3;
  const SZY=H+Z-10;
  const SZXS=[LX,LX+(RX-LX)/3,LX+(RX-LX)*2/3,RX];
  return {...g,LX,RX,MID,LYS,RYS,BY,BXS,FTY,TIPY,HT,HS,SZY,SZXS};
}

// ── TRACK BUILDER ──────────────────────────────────────
function buildTrack(owner,n){
  const g=geo(n);
  const{LX,RX,MID,LYS,RYS,BY,BXS,FTY,HT,HS}=g;
  const slots=[];
  function ap(p){ return makePt((p*360)/n+180,g); }
  function add(p,type,lx,ly){
    const[x,y]=ap(p)(lx,ly);
    slots.push({x,y,type,armPlayer:p});
  }
  // Own arm: left UP (6) + FT
  for(let i=0;i<6;i++) add(owner,'left',LX,LYS[i]);
  add(owner,'ft',LX,FTY);
  // Other arms: right DOWN(5) + bottom(5) + left UP(5) + FT
  for(let off=1;off<n;off++){
    const p=(owner+off)%n;
    for(let i=0;i<5;i++) add(p,'right',RX,RYS[i]);
    for(let i=0;i<5;i++) add(p,'bottom',BXS[i],BY);
    for(let i=0;i<5;i++) add(p,'left',LX,LYS[i]);
    add(p,'ft',LX,FTY);
  }
  // Return own arm: right DOWN(5) + bottom(5) + home UP(4)
  for(let i=0;i<5;i++) add(owner,'right',RX,RYS[i]);
  for(let i=0;i<5;i++) add(owner,'bottom',BXS[i],BY);
  for(let i=0;i<4;i++) add(owner,'home',MID,HT+(3-i)*HS);
  return slots;
}

// Track length for a player
function trackLen(n){ return 7 + (n-1)*16 + 17; }
// Launch slot index (slot 0 = bottom of left col)
const LAUNCH_SLOT = 0;
// Home starts at: 7 + (n-1)*16 + 10
function homeStart(n){ return 7+(n-1)*16+10; }
function firstOpenHomeSlot(player,pegs){
  const used=pegs.filter(p=>p.player===player&&p.position.zone==="home").map(p=>p.position.homeSlot);
  for(let i=0;i<4;i++) if(!used.includes(i)) return i;
  return null;
}
function isFastTrackSlot(owner,n,slot){
  return buildTrack(owner,n)[slot]?.type==="ft";
}

// ── GAME LOGIC ─────────────────────────────────────────
function initPegs(n){
  const pegs=[];
  for(let p=0;p<n;p++)
    for(let i=0;i<4;i++)
      pegs.push({player:p,peg_index:i,position:{zone:"start",pegSlot:i},hasLooped:false});
  return pegs;
}

function getValidMoves(peg,card,allPegs,n){
  const{rank}=card;
  const moves=[];
  const pos=peg.position;
  const owner=peg.player;
  const tlen=trackLen(n);
  const hStart=homeStart(n);

  // Fast track peg
  if(pos.zone==="fasttrack"){
    if(isFace(rank)){
      const homeSlot=firstOpenHomeSlot(owner,allPegs);
      if(homeSlot!==null) moves.push({type:"ft-home",peg,homeSlot});
    }
    else if(!isBack(rank)){
      const ftSlot=Math.min((pos.ftSlot||0)+1,3);
      moves.push({type:"ft-advance",peg,ftSlot});
    }
    return moves;
  }

  // Home peg — done
  if(pos.zone==="home") return [];

  // Start zone peg
  if(pos.zone==="start"){
    if(isStart(rank)){
      const blocked=allPegs.some(p=>p.player===owner&&p.position.zone==="track"&&p.position.slot===LAUNCH_SLOT);
      if(!blocked) moves.push({type:"launch",peg});
    }
    return moves;
  }

  // Track peg
  const{slot}=pos;

  if(isBack(rank)){
    const mv=addMoveIfValid(slot,-4,peg,allPegs,n,owner,tlen,hStart);
    if(mv) moves.push(mv);
    return moves;
  }

  const steps=moveVal(rank);
  if(steps===0){
    // Ace/Joker with peg already on track — option to launch another OR move 1
    const blocked=allPegs.some(p=>p.player===owner&&p.position.zone==="track"&&p.position.slot===LAUNCH_SLOT);
    const hasInStart=allPegs.some(p=>p.player===owner&&p.position.zone==="start");
    if(hasInStart&&!blocked) moves.push({type:"launch-choice",peg:allPegs.find(p=>p.player===owner&&p.position.zone==="start")});
    // Also allow moving this peg 1 space
    const mv=addMoveIfValid(slot,1,peg,allPegs,n,owner,tlen,hStart);
    if(mv) moves.push(mv);
    return moves;
  }

  const mv=addMoveIfValid(slot,steps,peg,allPegs,n,owner,tlen,hStart);
  if(mv) moves.push(mv);

  // Face card: move 1
  return moves;
}

function addMoveIfValid(slot,steps,peg,allPegs,n,owner,tlen,hStart){
  const newSlot=((slot+steps)%tlen+tlen)%tlen;
  // Check home entry
  if(steps>0&&slot<hStart&&newSlot>=hStart&&newSlot<hStart+4&&peg.hasLooped){
    const homeSlot=newSlot-hStart;
    const occ=allPegs.some(p=>p.player===owner&&p.position.zone==="home"&&p.position.homeSlot===homeSlot);
    if(!occ) return {type:"enter-home",peg,homeSlot};
    return null;
  }
  // Check can't land on own peg
  const selfBlock=allPegs.some(p=>p.player===owner&&p.peg_index!==peg.peg_index&&p.position.zone==="track"&&p.position.slot===newSlot);
  if(selfBlock) return null;
  if(steps>0&&isFastTrackSlot(owner,n,newSlot)) return {type:"enter-fasttrack",peg,newSlot,ftSlot:0,steps};
  return {type:"move",peg,newSlot,steps};
}

function applyMove(move,allPegs,n,card){
  let pegs=allPegs.map(p=>({...p,position:{...p.position}}));
  const peg=pegs.find(p=>p.player===move.peg.player&&p.peg_index===move.peg.peg_index);
  let msg="",drawAgain=isFace(card.rank);

  if(move.type==="launch"||move.type==="launch-choice"){
    const target=move.type==="launch-choice"?pegs.find(p=>p.player===peg.player&&p.position.zone==="start"):peg;
    // Bump opponent at launch slot
    pegs=pegs.map(p=>{
      if(p.player!==target.player&&p.position.zone==="track"&&p.position.slot===LAUNCH_SLOT){
        return {...p,position:{zone:"start",pegSlot:firstOpenSlot(p.player,pegs)},hasLooped:false};
      }
      return p;
    });
    const t=pegs.find(p=>p.player===target.player&&p.peg_index===target.peg_index);
    t.position={zone:"track",slot:LAUNCH_SLOT};
    t.hasLooped=false;
    msg=`${COLORS[peg.player].name} launched a peg! 🚀`;
  }
  else if(move.type==="move"){
    const tlen=trackLen(n);
    const hStart=homeStart(n);
    // Check if crosses launch slot of own arm → mark looped
    if(move.steps>0&&!peg.hasLooped){
      const cur=peg.position.slot;
      const dist=(LAUNCH_SLOT-cur+tlen)%tlen;
      if(dist>0&&move.steps>=dist) peg.hasLooped=true;
    }
    // Bump opponent
    pegs=pegs.map(p=>{
      if(p.player!==peg.player&&p.position.zone==="track"&&p.position.slot===move.newSlot){
        msg=`${COLORS[peg.player].name} bumped ${COLORS[p.player].name}! 💥`;
        return {...p,position:{zone:"start",pegSlot:firstOpenSlot(p.player,pegs)},hasLooped:false};
      }
      return p;
    });
    peg.position={zone:"track",slot:move.newSlot};
    if(!msg) msg=`Moved ${Math.abs(move.steps)} space${Math.abs(move.steps)!==1?"s":""}${move.steps<0?" backward":""}`;
  }
  else if(move.type==="enter-fasttrack"){
    const tlen=trackLen(n);
    if(move.steps>0&&!peg.hasLooped){
      const cur=peg.position.slot;
      const dist=(LAUNCH_SLOT-cur+tlen)%tlen;
      if(dist>0&&move.steps>=dist) peg.hasLooped=true;
    }
    pegs=pegs.map(p=>{
      if(p.player!==peg.player&&p.position.zone==="track"&&p.position.slot===move.newSlot){
        msg=`${COLORS[peg.player].name} bumped ${COLORS[p.player].name}! 💥`;
        return {...p,position:{zone:"start",pegSlot:firstOpenSlot(p.player,pegs)},hasLooped:false};
      }
      return p;
    });
    peg.position={zone:"fasttrack",ftSlot:move.ftSlot||0};
    if(!msg) msg=`⚡ ${COLORS[peg.player].name} entered the Fast Track!`;
  }
  else if(move.type==="enter-home"){
    peg.position={zone:"home",homeSlot:move.homeSlot};
    msg=`🏠 ${COLORS[peg.player].name} peg entered home!`;
  }
  else if(move.type==="ft-home"){
    peg.position={zone:"home",homeSlot:move.homeSlot};
    msg=`⚡ Fast Track → Home!`;
  }
  else if(move.type==="ft-advance"){
    peg.position={zone:"fasttrack",ftSlot:move.ftSlot};
    msg=`⚡ Advanced on Fast Track!`;
  }

  if(drawAgain) msg+=" Draw again!";
  return {pegs,msg,drawAgain};
}

function firstOpenSlot(player,pegs){
  const used=pegs.filter(p=>p.player===player&&p.position.zone==="start").map(p=>p.position.pegSlot);
  for(let i=0;i<4;i++) if(!used.includes(i)) return i;
  return 0;
}

function checkWin(pegs,player){
  return pegs.filter(p=>p.player===player).every(p=>p.position.zone==="home");
}

// ── PEG POSITIONS → XY ─────────────────────────────────
function pegToXY(position,owner,n){
  const g=geo(n);
  const{LX,RX,MID,LYS,RYS,BY,BXS,FTY,HT,HS,SZY,SZXS}=g;
  function ap(p){ return makePt((p*360)/n+180,g); }

  if(position.zone==="start")    return ap(owner)(SZXS[position.pegSlot],SZY);
  if(position.zone==="fasttrack"){
    const ftSlot=Math.max(0,Math.min(3,position.ftSlot||0));
    const tx=MID,ty=HT+(3-ftSlot)*HS;
    const mix=(ftSlot+1)/4;
    return ap(owner)(LX+(tx-LX)*mix,FTY+(ty-FTY)*mix);
  }
  if(position.zone==="home"){
    return ap(owner)(MID,HT+(3-position.homeSlot)*HS);
  }
  if(position.zone==="track"){
    const track=buildTrack(owner,n);
    const sl=track[position.slot];
    return sl?[sl.x,sl.y]:[CX,CY];
  }
  return [CX,CY];
}

// ── ROOM CODE ──────────────────────────────────────────
function genCode(){ return "FT"+Math.floor(1000+Math.random()*9000); }

// ── BOARD COMPONENTS ───────────────────────────────────
function ArmShape({pi,n,color,active}){
  const angle=(pi*360)/n+180;
  const g=geo(n);const{W,H,Z,MID}=g;
  const ch=9,ap=makePt(angle,g);
  const p=(lx,ly)=>{const[x,y]=ap(lx,ly);return`${x.toFixed(1)},${y.toFixed(1)}`;};
  const out=[p(MID,-14),p(W-ch,-2),p(W,ch),p(W,H-ch),p(W-ch,H),
    p(W-ch,H+Z-ch),p(W-ch*.6,H+Z),p(ch*.6,H+Z),p(ch,H+Z-ch),
    p(ch,H),p(0,H-ch),p(0,ch),p(ch,-2)].join(" ");
  const iP=19,iC=7,iT=34;
  const inn=[p(MID,iT),p(W-iP-iC,iT+14),p(W-iP,iT+22),p(W-iP,H-14),
    p(W-iP-iC,H-9),p(iP+iC,H-9),p(iP,H-14),p(iP,iT+22),p(iP+iC,iT+14)].join(" ");
  const st=[p(ch,H),p(W-ch,H),p(W-ch,H+17),p(ch,H+17)].join(" ");
  const[lx,ly]=ap(MID,H+8);
  return(
    <g>
      <polygon points={out} fill="url(#wood)"/>
      <polygon points={out} fill="url(#grain)" opacity={0.28}/>
      <polygon points={out} fill="none" stroke={active?"#FFD700":color.track} strokeWidth={active?4:2.5} strokeOpacity={0.9}/>
      <polygon points={inn} fill="#080808"/>
      <polygon points={st} fill="#111"/>
      <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
        fill="white" fontSize={5.5} fontWeight="800" fontFamily="Arial" letterSpacing={2}
        transform={`rotate(${angle+90},${lx},${ly})`}>ACE SIX JOKER</text>
    </g>
  );
}

function BoardHoles({pi,n,color}){
  const angle=(pi*360)/n+180;
  const g=geo(n);
  const{LX,RX,MID,LYS,RYS,BY,BXS,FTY,TIPY,HT,HS,SZY,SZXS}=g;
  const ap=makePt(angle,g);
  const th=(x,y,k)=>(
    <g key={k}>
      <circle cx={x} cy={y} r={4.5} fill="#5C3A10" opacity={0.5}/>
      <circle cx={x} cy={y} r={3} fill="#100800" stroke="#2A1500" strokeWidth={0.8}/>
    </g>
  );
  return(
    <g>
      {LYS.map((ly2,i)=>{const[x,y]=ap(LX,ly2);return th(x,y,`l${i}`);})}
      {RYS.map((ry,i)=>{const[x,y]=ap(RX,ry);return th(x,y,`r${i}`);})}
      {(()=>{const[x,y]=ap(MID,TIPY);return th(x,y,"t");})()}
      {BXS.map((bx,i)=>{const[x,y]=ap(bx,BY);return th(x,y,`b${i}`);})}
      {(()=>{const[x,y]=ap(LX,FTY);const dr=5.5;return(
        <g><polygon points={`${x},${y-dr} ${x+dr},${y} ${x},${y+dr} ${x-dr},${y}`} fill="white" stroke="#666" strokeWidth={1}/>
        <circle cx={x} cy={y} r={2.5} fill="#100800"/></g>
      );})()}
      {(()=>{const[x,y]=ap(LX,LYS[0]);const s=4.5;return(
        <rect x={x-s} y={y-s} width={s*2} height={s*2} rx={1} fill="white" stroke="#666" strokeWidth={1}/>
      );})()}
      {[0,1,2,3].map(i=>{const[x,y]=ap(MID,HT+(3-i)*HS);return(
        <g key={i}>
          <circle cx={x} cy={y} r={4.5} fill="#5C3A10" opacity={0.5}/>
          <circle cx={x} cy={y} r={3} fill="#100800" stroke={color.track} strokeWidth={1.2} strokeOpacity={0.8}/>
        </g>
      );})}
      {SZXS.map((sx,i)=>{const[x,y]=ap(sx,SZY);return(
        <g key={i}><circle cx={x} cy={y} r={5} fill={color.light} fillOpacity={0.5} stroke={color.track} strokeWidth={1.2}/></g>
      );})}
    </g>
  );
}

function Hub(){
  const r=46;
  const oct=Array.from({length:8},(_,i)=>{const a=rad(i*45-22.5);return`${CX+Math.cos(a)*(r-5)},${CY+Math.sin(a)*(r-5)}`;}).join(" ");
  return(
    <g>
      <circle cx={CX} cy={CY} r={r} fill="#0D1B2E" stroke="#C8A951" strokeWidth={3}/>
      <polygon points={oct} fill="#060E1E" stroke="#C8A951" strokeWidth={1.5}/>
      {[{t:"KING",a:270},{t:"QUEEN",a:0},{t:"JACK",a:90},{t:"KING",a:180}].map(({t,a})=>{
        const lx=CX+Math.cos(rad(a))*(r-17),ly=CY+Math.sin(rad(a))*(r-17);
        return <text key={a} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
          fill="#C8A951" fontSize={6.5} fontWeight="bold" transform={`rotate(${a+90},${lx},${ly})`}>{t}</text>;
      })}
      <circle cx={CX} cy={CY} r={5.5} fill="#C8A951"/>
      <circle cx={CX} cy={CY} r={2.5} fill="#060E1E"/>
    </g>
  );
}

function Defs(){
  return(
    <defs>
      <linearGradient id="wood" x1="0%" y1="0%" x2="60%" y2="100%">
        <stop offset="0%" stopColor="#D4924E"/><stop offset="30%" stopColor="#B8722A"/>
        <stop offset="60%" stopColor="#C8864A"/><stop offset="100%" stopColor="#C07838"/>
      </linearGradient>
      <pattern id="grain" x="0" y="0" width="4" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(88)">
        <line x1="2" y1="0" x2="2" y2="80" stroke="#7A4010" strokeWidth="0.8" opacity="0.3"/>
      </pattern>
      <radialGradient id="bg" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#0D1B3E"/><stop offset="100%" stopColor="#060E1E"/>
      </radialGradient>
    </defs>
  );
}

function PegCircle({x,y,color,selected,valid,onClick}){
  return(
    <g onClick={onClick} style={{cursor:onClick?"pointer":"default"}}>
      {onClick&&<circle cx={x} cy={y} r={18} fill="transparent"/>}
      {valid&&<circle cx={x} cy={y} r={13} fill="#FFD700" opacity={0.35}/>}
      <circle cx={x} cy={y} r={7} fill={color.track} stroke={selected?"#FFD700":"white"} strokeWidth={selected?2.5:1.5}/>
      <circle cx={x} cy={y} r={3} fill="white" opacity={0.5}/>
    </g>
  );
}

function CardDisplay({card,colorIndex=0,stale=false}){
  if(!card) return null;
  const red=card.suit==="♥"||card.suit==="♦";
  const artSrc=cardArtSrc(card,colorIndex);
  return(
    <div style={{background:"#F5F0E8",borderRadius:10,border:"3px solid #1A5FBB",
      padding:"clamp(6px, 1.8vw, 8px) clamp(8px, 2.4vw, 12px)",textAlign:"center",
      width:"clamp(104px, 28vw, 150px)",boxSizing:"border-box",opacity:stale?0.92:1}}>
      <div style={{fontSize:8,color:"#1A5FBB",fontWeight:700,letterSpacing:1}}>
        {stale?"LAST DRAWN":"DRAWN"} · {isStart(card.rank)?"START":isFace(card.rank)?"FACE":"NUMBER"} CARD
      </div>
      <img src={artSrc} alt={`${COLORS[colorIndex]?.name||"Pink"} ${card.rank} card art`}
        style={{width:"100%",aspectRatio:"2 / 3",objectFit:"cover",borderRadius:7,
          border:`2px solid ${COLORS[colorIndex]?.track||"#1A5FBB"}`,marginTop:6,background:"#111"}}/>
      <div style={{fontSize:9,fontWeight:900,color:"#1A3A7A"}}>{CARD_NAMES[card.rank]}</div>
      <div style={{fontSize:16,fontWeight:900,color:red?"#CC2200":"#1A3A7A",fontFamily:"Georgia"}}>
        {card.rank}{card.suit!=="★"?` ${card.suit}`:""}
      </div>
      <div style={{fontSize:8,color:"#333",marginTop:3,background:"white",
        borderRadius:5,border:"1px solid #1A5FBB",padding:"2px 5px"}}>
        {CARD_ACTIONS[card.rank]}
      </div>
    </div>
  );
}

// ── SCREENS ────────────────────────────────────────────

function RulesModal({onClose}){
  return(
    <div onClick={onClose}
      style={{position:"fixed",inset:0,zIndex:50,background:"rgba(3,8,18,0.88)",
        display:"flex",alignItems:"center",justifyContent:"center",
        padding:"max(12px, env(safe-area-inset-top)) 10px max(12px, env(safe-area-inset-bottom))",
        boxSizing:"border-box"}}>
      <div onClick={e=>e.stopPropagation()}
        style={{width:"min(100%, 760px)",height:"min(100%, 92vh)",display:"flex",
          flexDirection:"column",background:"#061126",border:"2px solid #C8A951",
          borderRadius:10,overflow:"hidden",boxShadow:"0 18px 60px rgba(0,0,0,0.55)"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr auto",alignItems:"center",
          gap:10,padding:"10px 12px",background:"#0D1B3E",borderBottom:"1px solid #C8A95166"}}>
          <div style={{fontSize:13,fontWeight:900,color:"#C8A951",letterSpacing:1}}>
            Rules & How To Play
          </div>
          <button onClick={onClose}
            style={{background:"#C8A951",border:"none",borderRadius:8,color:"#061126",
              fontWeight:900,fontSize:12,padding:"9px 12px",cursor:"pointer",minWidth:68}}>
            Close
          </button>
        </div>
        <div style={{flex:1,overflow:"auto",background:"#101827",padding:8}}>
          <img src={assetSrc("rules.png")} alt="Zoo Track rules and how to play"
            style={{display:"block",width:"100%",height:"auto",borderRadius:6}}/>
        </div>
      </div>
    </div>
  );
}

function HomeScreen({onCreateRoom,onJoinRoom,onLocalGame,onRules}){
  const[joinCode,setJoinCode]=useState("");
  const[name,setName]=useState("");
  const[joining,setJoining]=useState(false);
  const[creating,setCreating]=useState(false);
  const[err,setErr]=useState("");

  async function handleCreate(){
    if(!name.trim()){setErr("Enter your name first");return;}
    setCreating(true);setErr("");
    const code=genCode();
    const{error}=await supabase.from("rooms").insert({
      id:code,status:"waiting",num_players:4,current_player:0,
      deck:[],discard:[],drawn_card:null
    });
    if(error){setErr("Failed to create room");setCreating(false);return;}
    onCreateRoom(code,name.trim());
    setCreating(false);
  }

  async function handleJoin(){
    if(!name.trim()){setErr("Enter your name first");return;}
    if(!joinCode.trim()){setErr("Enter a room code");return;}
    setJoining(true);setErr("");
    const code=joinCode.trim().toUpperCase();
    const{data,error}=await supabase.from("rooms").select("*").eq("id",code).single();
    if(error||!data){setErr("Room not found");setJoining(false);return;}
    if(data.status==="playing"){setErr("Game already started");setJoining(false);return;}
    onJoinRoom(code,name.trim());
    setJoining(false);
  }

  return(
    <div style={{minHeight:"100vh",background:"#060E1E",display:"flex",flexDirection:"column",
      alignItems:"center",justifyContent:"center",fontFamily:"Arial",color:"white",padding:24}}>
      <div style={{fontSize:10,letterSpacing:4,color:"#C8A951",fontWeight:700,marginBottom:6}}>FAST TRACK</div>
      <div style={{fontSize:28,fontWeight:900,fontFamily:"Impact, Arial Black",letterSpacing:2,marginBottom:32}}>GAME</div>

      <div style={{width:"100%",maxWidth:300}}>
        <div style={{fontSize:11,color:"#7AAEE8",marginBottom:6}}>Your Name</div>
        <input value={name} onChange={e=>setName(e.target.value)}
          placeholder="Enter your name"
          style={{width:"100%",padding:"10px 12px",borderRadius:8,border:"2px solid #1A5FBB",
            background:"#0D1B3E",color:"white",fontSize:14,marginBottom:16,boxSizing:"border-box"}}/>

        <button onClick={handleCreate} disabled={creating}
          style={{width:"100%",padding:"14px",background:"#C8A951",border:"none",borderRadius:10,
            color:"#060E1E",fontWeight:900,fontSize:15,cursor:"pointer",marginBottom:10}}>
          {creating?"Creating...":"🎮 Create Room"}
        </button>

        <button onClick={onLocalGame}
          style={{width:"100%",padding:"14px",background:"#00C9A7",border:"none",borderRadius:10,
            color:"#06120F",fontWeight:900,fontSize:15,cursor:"pointer",marginBottom:10}}>
          ▶ Play Local Game
        </button>

        <button onClick={onRules}
          style={{width:"100%",padding:"13px",background:"#0D1B3E",border:"2px solid #C8A951",
            borderRadius:10,color:"#C8A951",fontWeight:900,fontSize:14,cursor:"pointer",
            marginBottom:20}}>
          Rules
        </button>

        <div style={{textAlign:"center",color:"#555",marginBottom:16,fontSize:11}}>— or —</div>

        <input value={joinCode} onChange={e=>setJoinCode(e.target.value.toUpperCase())}
          placeholder="Room code (e.g. FT1234)"
          style={{width:"100%",padding:"10px 12px",borderRadius:8,border:"2px solid #1A5FBB",
            background:"#0D1B3E",color:"white",fontSize:14,marginBottom:10,boxSizing:"border-box",
            textTransform:"uppercase",letterSpacing:2}}/>

        <button onClick={handleJoin} disabled={joining}
          style={{width:"100%",padding:"14px",background:"#1A5FBB",border:"none",borderRadius:10,
            color:"white",fontWeight:900,fontSize:15,cursor:"pointer"}}>
          {joining?"Joining...":"🚪 Join Room"}
        </button>

        {err&&<div style={{color:"#FF6B6B",textAlign:"center",marginTop:12,fontSize:12}}>{err}</div>}
      </div>
    </div>
  );
}

function LocalSetupScreen({onBack,onStart,onRules}){
  const[numPlayers,setNumPlayers]=useState(4);
  return(
    <div style={{minHeight:"100vh",background:"#060E1E",fontFamily:"Arial",color:"white",padding:20,
      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
      <div style={{alignSelf:"stretch",display:"flex",justifyContent:"space-between",gap:10,
        marginBottom:24}}>
        <button onClick={onBack}
          style={{background:"#0D1B3E",border:"1px solid #C8A951",borderRadius:8,
            color:"#C8A951",fontWeight:900,padding:"8px 12px",cursor:"pointer",minHeight:38}}>
          ← Back
        </button>
        <button onClick={onRules}
          style={{background:"#0D1B3E",border:"1px solid #C8A951",borderRadius:8,
            color:"#C8A951",fontWeight:900,padding:"8px 12px",cursor:"pointer",minHeight:38}}>
          Rules
        </button>
      </div>
      <div style={{fontSize:9,letterSpacing:4,color:"#C8A951",fontWeight:700,marginBottom:4}}>FAST TRACK</div>
      <div style={{fontSize:26,fontWeight:900,fontFamily:"Impact, Arial Black",marginBottom:20}}>LOCAL GAME</div>
      <div style={{width:"100%",maxWidth:320,background:"#0D1B3E",border:"2px solid #C8A951",
        borderRadius:12,padding:18,textAlign:"center"}}>
        <div style={{fontSize:10,color:"#7AAEE8",marginBottom:10}}>NUMBER OF PLAYERS</div>
        <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap",marginBottom:18}}>
          {[2,3,4,5,6,7,8].map(n=>(
            <button key={n} onClick={()=>setNumPlayers(n)}
              style={{width:40,height:40,borderRadius:8,cursor:"pointer",fontWeight:900,fontSize:14,
                border:numPlayers===n?"2px solid #C8A951":"2px solid #1A2A4A",
                background:numPlayers===n?"#5A4010":"#060E1E",
                color:numPlayers===n?"#C8A951":"white"}}>
              {n}
            </button>
          ))}
        </div>
        <button onClick={()=>onStart(numPlayers)}
          style={{width:"100%",padding:"14px",background:"#00C9A7",border:"none",borderRadius:10,
            color:"#06120F",fontWeight:900,fontSize:15,cursor:"pointer"}}>
          Start Local Game
        </button>
      </div>
    </div>
  );
}

function LobbyScreen({roomId,playerName,onStart,onUpdate,onBack,onRules}){
  const[room,setRoom]=useState(null);
  const[players,setPlayers]=useState([]);
  const[myIndex,setMyIndex]=useState(null);
  const[loading,setLoading]=useState(true);
  const[numPlayers,setNumPlayers]=useState(4);
  const joined=useRef(false);

  useEffect(()=>{
    if(joined.current) return;
    joined.current=true;
    joinRoom();
  },[]);

  async function joinRoom(){
    // Get current players
    const{data:existing}=await supabase.from("players").select("*").eq("room_id",roomId);
    const idx=existing?.length||0;
    setMyIndex(idx);

    // Insert self
    await supabase.from("players").insert({
      room_id:roomId,player_index:idx,name:playerName,color:COLORS[idx].track,is_connected:true
    });

    // Fetch room
    const{data:r}=await supabase.from("rooms").select("*").eq("id",roomId).single();
    setRoom(r);
    setNumPlayers(r?.num_players||4);

    // Fetch updated players
    const{data:ps}=await supabase.from("players").select("*").eq("room_id",roomId).order("player_index");
    setPlayers(ps||[]);
    setLoading(false);

    onUpdate({myIndex:idx,players:ps||[]});
  }

  // Realtime subscription
  useEffect(()=>{
    const ch=supabase.channel(`lobby-${roomId}`)
      .on("postgres_changes",{event:"*",schema:"public",table:"players",filter:`room_id=eq.${roomId}`},
        async ()=>{
          const{data:ps}=await supabase.from("players").select("*").eq("room_id",roomId).order("player_index");
          setPlayers(ps||[]);
          onUpdate({myIndex,players:ps||[]});
        })
      .on("postgres_changes",{event:"UPDATE",schema:"public",table:"rooms",filter:`id=eq.${roomId}`},
        async (payload)=>{
          if(payload.new.status==="playing") onStart(payload.new,players,myIndex);
        })
      .subscribe();
    return ()=>supabase.removeChannel(ch);
  },[roomId,myIndex]);

  async function handleStart(){
    const deck=shuffle(createDeck());
    const pegs=initPegs(numPlayers);

    // Update room
    await supabase.from("rooms").update({
      status:"playing",num_players:numPlayers,current_player:0,
      deck,discard:[],drawn_card:null
    }).eq("id",roomId);

    // Insert pegs
    for(const peg of pegs){
      await supabase.from("pegs").insert({
        room_id:roomId,player_index:peg.player,peg_index:peg.peg_index,
        position:peg.position
      });
    }

    const{data:updRoom}=await supabase.from("rooms").select("*").eq("id",roomId).single();
    onStart(updRoom,players,myIndex);
  }

  async function updateNumPlayers(n){
    setNumPlayers(n);
    await supabase.from("rooms").update({num_players:n}).eq("id",roomId);
  }

  if(loading) return(
    <div style={{minHeight:"100vh",background:"#060E1E",display:"flex",alignItems:"center",
      justifyContent:"center",color:"white",fontFamily:"Arial"}}>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:24,marginBottom:8}}>⏳</div>
        <div>Joining room...</div>
      </div>
    </div>
  );

  const isHost=myIndex===0;

  return(
    <div style={{minHeight:"100vh",background:"#060E1E",fontFamily:"Arial",color:"white",padding:20,
      display:"flex",flexDirection:"column",alignItems:"center"}}>
      <div style={{alignSelf:"stretch",display:"flex",justifyContent:"space-between",gap:10,
        marginBottom:10}}>
        <button onClick={onBack}
          style={{background:"#0D1B3E",border:"1px solid #C8A951",borderRadius:8,
            color:"#C8A951",fontWeight:900,padding:"8px 12px",cursor:"pointer",minHeight:38}}>
          ← Back
        </button>
        <button onClick={onRules}
          style={{background:"#0D1B3E",border:"1px solid #C8A951",borderRadius:8,
            color:"#C8A951",fontWeight:900,padding:"8px 12px",cursor:"pointer",minHeight:38}}>
          Rules
        </button>
      </div>
      <div style={{fontSize:9,letterSpacing:4,color:"#C8A951",fontWeight:700,marginBottom:4}}>FAST TRACK</div>
      <div style={{fontSize:22,fontWeight:900,fontFamily:"Impact, Arial Black",marginBottom:4}}>LOBBY</div>

      <div style={{background:"#0D1B3E",border:"2px solid #C8A951",borderRadius:12,
        padding:"12px 24px",textAlign:"center",marginBottom:20}}>
        <div style={{fontSize:10,color:"#7AAEE8",marginBottom:4}}>ROOM CODE</div>
        <div style={{fontSize:28,fontWeight:900,letterSpacing:4,color:"#C8A951"}}>{roomId}</div>
        <div style={{fontSize:9,color:"#555",marginTop:4}}>Share this with other players</div>
      </div>

      {isHost&&(
        <div style={{marginBottom:16,textAlign:"center"}}>
          <div style={{fontSize:10,color:"#7AAEE8",marginBottom:6}}>NUMBER OF PLAYERS</div>
          <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap"}}>
            {[2,3,4,5,6,7,8].map(n=>(
              <button key={n} onClick={()=>updateNumPlayers(n)}
                style={{width:36,height:36,borderRadius:8,cursor:"pointer",fontWeight:700,fontSize:13,
                  border:numPlayers===n?"2px solid #C8A951":"2px solid #1A2A4A",
                  background:numPlayers===n?"#5A4010":"#0D1B3E",
                  color:numPlayers===n?"#C8A951":"white"}}>
                {n}
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{width:"100%",maxWidth:320,marginBottom:20}}>
        <div style={{fontSize:10,color:"#7AAEE8",marginBottom:8}}>
          PLAYERS ({players.length}/{numPlayers})
        </div>
        {players.map((p,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,
            background:"#0D1B3E",borderRadius:8,padding:"10px 14px",marginBottom:6,
            border:`1px solid ${COLORS[i].track}44`}}>
            <div style={{width:16,height:16,borderRadius:"50%",background:COLORS[i].track,border:"2px solid white"}}/>
            <div style={{flex:1}}>
              <div style={{fontSize:13,fontWeight:700}}>{p.name}</div>
              <div style={{fontSize:9,color:COLORS[i].track}}>{COLORS[i].name}</div>
            </div>
            {i===0&&<div style={{fontSize:9,color:"#C8A951",fontWeight:700}}>HOST</div>}
            {p.player_index===myIndex&&<div style={{fontSize:9,color:"#7AAEE8"}}>YOU</div>}
          </div>
        ))}
        {Array.from({length:Math.max(0,numPlayers-players.length)},(_,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,
            background:"#080F20",borderRadius:8,padding:"10px 14px",marginBottom:6,
            border:"1px dashed #1A2A4A",opacity:0.5}}>
            <div style={{width:16,height:16,borderRadius:"50%",background:"#1A2A4A",border:"2px solid #2A3A5A"}}/>
            <div style={{fontSize:12,color:"#555"}}>Waiting for player...</div>
          </div>
        ))}
      </div>

      {isHost?(
        <button onClick={handleStart} disabled={players.length<2}
          style={{padding:"14px 40px",background:players.length>=2?"#C8A951":"#333",
            border:"none",borderRadius:10,color:players.length>=2?"#060E1E":"#666",
            fontWeight:900,fontSize:15,cursor:players.length>=2?"pointer":"default"}}>
          {players.length>=2?"🎮 Start Game":"Waiting for players..."}
        </button>
      ):(
        <div style={{textAlign:"center",color:"#7AAEE8",fontSize:12}}>
          ⏳ Waiting for host to start...
        </div>
      )}
    </div>
  );
}

function GameScreen({roomId,myIndex,numPlayers,initialRoom,isLocal,onBack,onRules}){
  const[room,setRoom]=useState(initialRoom);
  const[pegs,setPegs]=useState([]);
  const[players,setPlayers]=useState([]);
  const[selectedPeg,setSelectedPeg]=useState(null);
  const[validMoves,setValidMoves]=useState([]);
  const[msg,setMsg]=useState("");
  const[lastDrawn,setLastDrawn]=useState(null);
  const[loading,setLoading]=useState(true);
  const[winner,setWinner]=useState(null);

  const activePlayer=isLocal?room?.current_player:myIndex;
  const myTurn=isLocal||room?.current_player===myIndex;
  const drawnCard=room?.drawn_card;
  const mustDraw=myTurn&&!drawnCard;

  useEffect(()=>{ fetchAll(); },[]);

  async function fetchAll(){
    if(isLocal){
      setPegs(initPegs(numPlayers).map(p=>({
        room_id:"LOCAL",player_index:p.player,peg_index:p.peg_index,
        position:p.position,hasLooped:p.hasLooped
      })));
      setPlayers(COLORS.slice(0,numPlayers).map((c,i)=>({name:c.name,player_index:i})));
      setLoading(false);
      return;
    }
    const[{data:ps},{data:pg},{data:pl}]=await Promise.all([
      supabase.from("pegs").select("*").eq("room_id",roomId),
      supabase.from("pegs").select("*").eq("room_id",roomId),
      supabase.from("players").select("*").eq("room_id",roomId).order("player_index"),
    ]);
    setPegs(ps||[]);
    setPlayers(pl||[]);
    setLoading(false);
  }

  // Realtime
  useEffect(()=>{
    if(isLocal) return;
    const ch=supabase.channel(`game-${roomId}`)
      .on("postgres_changes",{event:"UPDATE",schema:"public",table:"rooms",filter:`id=eq.${roomId}`},
        payload=>{ setRoom(payload.new); setSelectedPeg(null); setValidMoves([]); })
      .on("postgres_changes",{event:"*",schema:"public",table:"pegs",filter:`room_id=eq.${roomId}`},
        async ()=>{ const{data}=await supabase.from("pegs").select("*").eq("room_id",roomId); setPegs(data||[]); })
      .subscribe();
    return ()=>supabase.removeChannel(ch);
  },[roomId,isLocal]);

  // Check win
  useEffect(()=>{
    if(!pegs.length||!room) return;
    for(let p=0;p<numPlayers;p++){
      if(checkWin(pegs.map(pg=>({...pg,player:pg.player_index,position:pg.position})),p)){
        setWinner(p); return;
      }
    }
  },[pegs]);

  async function handleDraw(){
    if(!myTurn||drawnCard) return;
    const drawingPlayer=isLocal?activePlayer:myIndex;
    let deck=readCards(room.deck);
    let discard=readCards(room.discard);
    if(deck.length===0){ deck=shuffle(discard); discard=[]; }
    const card=deck[0];
    const rest=deck.slice(1);

    if(isLocal){
      setRoom(r=>({...r,deck:rest,drawn_card:card}));
    }else{
      await supabase.from("rooms").update({
        deck:rest,
        drawn_card:card
      }).eq("id",roomId);
    }

    setLastDrawn({card,colorIndex:drawingPlayer,skipped:false});
    setMsg(`${card.rank}${card.suit!=="★"?" "+card.suit:""} — ${CARD_ACTIONS[card.rank]}`);

    // Check if any valid moves exist
    const myPegs=pegs.filter(p=>p.player_index===drawingPlayer).map(p=>({...p,player:p.player_index,position:p.position}));
    const allPegsMapped=pegs.map(p=>({...p,player:p.player_index}));
    const anyValid=myPegs.some(p=>getValidMoves(p,card,allPegsMapped,numPlayers).length>0);
    if(!anyValid){
      setLastDrawn({card,colorIndex:drawingPlayer,skipped:true});
      setMsg(`No valid moves for ${card.rank}${card.suit!=="★"?" "+card.suit:""} — turn skipped!`);
      await endTurn(rest,discard,card,false);
    }
  }

  function handlePegClick(peg){
    if(!myTurn||!drawnCard) return;
    if(peg.player_index!==activePlayer) return;
    const mapped={...peg,player:peg.player_index};
    const allMapped=pegs.map(p=>({...p,player:p.player_index}));
    const moves=getValidMoves(mapped,drawnCard,allMapped,numPlayers);
    if(!moves.length){ setMsg("No valid moves for that peg"); return; }
    setSelectedPeg(peg);
    setValidMoves(moves);
    if(moves.length===1) executeMove(moves[0]);
  }

  async function executeMove(move){
    const allMapped=pegs.map(p=>({...p,player:p.player_index}));
    const result=applyMove(move,allMapped,numPlayers,drawnCard);
    setMsg(result.msg);

    // Update changed pegs in DB
    for(const updPeg of result.pegs){
      const orig=pegs.find(p=>p.player_index===updPeg.player&&p.peg_index===updPeg.peg_index);
      if(!orig) continue;
      const posChanged=JSON.stringify(orig.position)!==JSON.stringify(updPeg.position);
      const loopChanged=orig.hasLooped!==updPeg.hasLooped;
      if(isLocal&&(posChanged||loopChanged)){
        setPegs(current=>current.map(p=>(
          p.player_index===updPeg.player&&p.peg_index===updPeg.peg_index
            ? {...p,position:updPeg.position,hasLooped:updPeg.hasLooped||false}
            : p
        )));
      }else if(posChanged||loopChanged){
        await supabase.from("pegs").update({
          position:updPeg.position,
          hasLooped:updPeg.hasLooped||false
        }).eq("room_id",roomId).eq("player_index",updPeg.player).eq("peg_index",updPeg.peg_index);
      }
    }

    setSelectedPeg(null);
    setValidMoves([]);

    const deck=readCards(room.deck);
    const discard=readCards(room.discard);
    await endTurn(deck,discard,drawnCard,result.drawAgain);
  }

  async function endTurn(deck,discard,card,drawAgain){
    const newDiscard=card?[...discard,card]:discard;
    const next=drawAgain?room.current_player:(room.current_player+1)%numPlayers;
    if(isLocal){
      setRoom(r=>({
        ...r,
        drawn_card:null,
        discard:newDiscard,
        deck,
        current_player:next
      }));
      return;
    }
    await supabase.from("rooms").update({
      drawn_card:drawAgain?null:null,
      discard:newDiscard,
      deck,
      current_player:next
    }).eq("id",roomId);
  }

  if(loading) return(
    <div style={{minHeight:"100vh",background:"#060E1E",display:"flex",alignItems:"center",
      justifyContent:"center",color:"white"}}>Loading game...</div>
  );

  if(winner!==null) return(
    <div style={{minHeight:"100vh",background:"#060E1E",display:"flex",flexDirection:"column",
      alignItems:"center",justifyContent:"center",color:"white",fontFamily:"Arial",textAlign:"center",padding:20}}>
      <button onClick={onBack}
        style={{position:"absolute",top:16,left:16,background:"#0D1B3E",border:"1px solid #C8A951",borderRadius:8,
          color:"#C8A951",fontWeight:900,padding:"8px 12px",cursor:"pointer"}}>
        ← Back
      </button>
      <div style={{fontSize:60,marginBottom:12}}>🏆</div>
      <div style={{fontSize:11,letterSpacing:4,color:"#C8A951",fontWeight:700}}>WINNER</div>
      <div style={{fontSize:32,fontWeight:900,fontFamily:"Impact, Arial Black",
        color:COLORS[winner].track,marginBottom:8}}>{COLORS[winner].name}!</div>
      <div style={{fontSize:13,color:"#aaa"}}>{players[winner]?.name||""}</div>
    </div>
  );

  const boardPlayers=COLORS.slice(0,numPlayers);
  const validPegKeys=validMoves.map(m=>`${m.peg.player_index}-${m.peg.peg_index}`);
  const displayCard=drawnCard||lastDrawn?.card;
  const displayCardColor=drawnCard?room.current_player:(lastDrawn?.colorIndex??room.current_player);
  const displayCardStale=!drawnCard&&!!lastDrawn;
  const boardWidth=displayCard
    ? "min(100%, 440px, calc(100vh - 400px))"
    : "min(100%, 500px, calc(100vh - 310px))";

  return(
    <div style={{minHeight:"100vh",background:"#060E1E",fontFamily:"Arial",color:"white",
      padding:"max(12px, env(safe-area-inset-top)) 10px max(14px, env(safe-area-inset-bottom))",
      boxSizing:"border-box",display:"flex",flexDirection:"column",alignItems:"center",
      gap:8,overflowX:"hidden"}}>
      {/* Header */}
      <div style={{width:"100%",maxWidth:560,display:"grid",
        gridTemplateColumns:"72px minmax(0, 1fr) 56px 58px",alignItems:"center",gap:6}}>
        <button onClick={onBack}
          style={{background:"#0D1B3E",border:"1px solid #C8A951",borderRadius:8,
            color:"#C8A951",fontWeight:900,padding:"0 10px",cursor:"pointer",fontSize:12,
            minHeight:38,width:"100%"}}>
          ← Back
        </button>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:7,
          minWidth:0,background:"#0D1B3E",border:`1px solid ${COLORS[room.current_player].track}66`,
          borderRadius:10,padding:"8px 8px",boxSizing:"border-box"}}>
          <div style={{width:13,height:13,borderRadius:"50%",background:COLORS[room.current_player].track,
            border:"2px solid white",flex:"0 0 auto"}}/>
          <div style={{fontSize:12,fontWeight:800,color:COLORS[room.current_player].track,
            whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
            {isLocal?`${players[room.current_player]?.name||COLORS[room.current_player].name}'s turn`:myTurn?"Your turn!":players[room.current_player]?.name+"'s turn"}
          </div>
        </div>
        <div style={{fontSize:9,color:"#7AAEE8",textAlign:"center",background:"#080F20",
          border:"1px solid #1A2A4A",borderRadius:8,padding:"7px 4px",boxSizing:"border-box"}}>
          {isLocal?"Local":roomId}
        </div>
        <button onClick={onRules}
          style={{background:"#0D1B3E",border:"1px solid #C8A951",borderRadius:8,
            color:"#C8A951",fontWeight:900,padding:"0 6px",cursor:"pointer",fontSize:11,
            minHeight:38,width:"100%"}}>
          Rules
        </button>
      </div>

      {/* Board */}
      <svg width="100%" viewBox={`0 0 ${S} ${S}`}
        style={{width:boardWidth,minWidth:260,
          display:"block",flex:"0 0 auto"}}>
        <Defs/>
        <rect width={S} height={S} fill="url(#bg)" rx={24}/>
        {boardPlayers.map((c,i)=>(
          <ArmShape key={i} pi={i} n={numPlayers} color={c} active={i===room.current_player}/>
        ))}
        {boardPlayers.map((_,i)=>(
          <BoardHoles key={i} pi={i} n={numPlayers} color={boardPlayers[i]}/>
        ))}
        {pegs.map(peg=>{
          const key=`${peg.player_index}-${peg.peg_index}`;
          const[x,y]=pegToXY(peg.position,peg.player_index,numPlayers);
          return(
            <PegCircle key={key} x={x} y={y}
              color={COLORS[peg.player_index]}
              selected={selectedPeg&&selectedPeg.player_index===peg.player_index&&selectedPeg.peg_index===peg.peg_index}
              valid={validPegKeys.includes(key)}
              onClick={peg.player_index===activePlayer?()=>handlePegClick(peg):undefined}/>
          );
        })}
        <Hub/>
      </svg>

      {/* Message */}
      {msg&&(
        <div style={{textAlign:"center",fontSize:11,color:"#ddd",background:"#0D1B3E",
          borderRadius:8,padding:"7px 12px",width:"100%",maxWidth:420,boxSizing:"border-box"}}>
          {msg}
        </div>
      )}

      {/* Card + actions */}
      <div style={{display:"flex",gap:10,justifyContent:"center",alignItems:"stretch",
        width:"100%",maxWidth:520,flexWrap:"wrap"}}>
        <CardDisplay card={displayCard} colorIndex={displayCardColor} stale={displayCardStale}/>
        <div style={{display:"flex",flexDirection:"column",gap:8,alignItems:"stretch",
          justifyContent:"center",minWidth:150,flex:"1 1 150px",maxWidth:260}}>
          {myTurn&&mustDraw&&(
            <button onClick={handleDraw}
              style={{background:"#C8A951",border:"none",borderRadius:10,padding:"0 18px",
                color:"#060E1E",fontWeight:900,fontSize:13,cursor:"pointer",minWidth:120,
                minHeight:46}}>
              DRAW CARD
            </button>
          )}
          {myTurn&&drawnCard&&!selectedPeg&&(
            <div style={{fontSize:11,color:"#7AAEE8",textAlign:"center",background:"#0D1B3E",
              border:"1px solid #1A2A4A",borderRadius:8,padding:"9px 10px"}}>
              Tap one of your pegs
            </div>
          )}
          {validMoves.length>1&&(
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {validMoves.map((m,i)=>(
                <button key={i} onClick={()=>executeMove(m)}
                  style={{background:"#1A5FBB",border:"none",borderRadius:6,
                    padding:"10px 12px",color:"white",fontWeight:800,fontSize:11,cursor:"pointer",
                    minHeight:38}}>
                  {m.type==="launch"||m.type==="launch-choice"?"🚀 Launch peg":
                   m.type==="enter-home"?"🏠 Enter home":
                   m.type==="move"?`Move ${m.steps>0?"→":"←"} ${Math.abs(m.steps)}`:m.type}
                </button>
              ))}
            </div>
          )}
          <div style={{fontSize:10,color:"#7A8AA8",textAlign:"center"}}>{readCards(room.deck).length} cards left</div>
        </div>
      </div>

      {/* Player status */}
      <div style={{display:"flex",gap:5,justifyContent:"center",flexWrap:"wrap",
        width:"100%",maxWidth:560,paddingTop:2}}>
        {boardPlayers.map((c,i)=>{
          const playerPegs=pegs.filter(p=>p.player_index===i);
          const homeCount=playerPegs.filter(p=>p.position.zone==="home").length;
          return(
            <div key={i} style={{background:i===room.current_player?"#5A4010":"#0D1B3E",
              border:`2px solid ${i===room.current_player?"#C8A951":c.track+"44"}`,
              borderRadius:8,padding:"5px 6px",textAlign:"center",minWidth:48,maxWidth:74,
              flex:"1 1 48px",boxSizing:"border-box"}}>
              <div style={{width:10,height:10,borderRadius:"50%",background:c.track,margin:"0 auto 2px",border:"1px solid white"}}/>
              <div style={{fontSize:8,color:"#ccc",whiteSpace:"nowrap",overflow:"hidden",
                textOverflow:"ellipsis"}}>{players[i]?.name||c.name}</div>
              <div style={{fontSize:10,color:"#FFD700",fontWeight:700}}>🏠{homeCount}/4</div>
              {!isLocal&&i===myIndex&&<div style={{fontSize:7,color:"#7AAEE8"}}>YOU</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── MAIN APP ───────────────────────────────────────────
function App(){
  const[screen,setScreen]=useState("home"); // home|local|lobby|game
  const[roomId,setRoomId]=useState(null);
  const[playerName,setPlayerName]=useState("");
  const[myIndex,setMyIndex]=useState(null);
  const[numPlayers,setNumPlayers]=useState(4);
  const[initialRoom,setInitialRoom]=useState(null);
  const[isLocal,setIsLocal]=useState(false);
  const[showRules,setShowRules]=useState(false);

  function goHome(){
    setScreen("home");
    setRoomId(null);
    setPlayerName("");
    setMyIndex(null);
    setInitialRoom(null);
    setIsLocal(false);
  }

  function handleCreateRoom(code,name){
    setIsLocal(false); setRoomId(code); setPlayerName(name); setScreen("lobby");
  }
  function handleJoinRoom(code,name){
    setIsLocal(false); setRoomId(code); setPlayerName(name); setScreen("lobby");
  }
  function handleLobbyUpdate({myIndex:mi,players}){
    setMyIndex(mi);
  }
  function handleStart(room,players,mi){
    setIsLocal(false);
    setNumPlayers(room.num_players);
    setMyIndex(mi);
    setInitialRoom(room);
    setScreen("game");
  }
  function handleLocalStart(n){
    setIsLocal(true);
    setNumPlayers(n);
    setMyIndex(0);
    setRoomId("LOCAL");
    setInitialRoom({
      id:"LOCAL",
      status:"playing",
      num_players:n,
      current_player:0,
      deck:shuffle(createDeck()),
      discard:[],
      drawn_card:null
    });
    setScreen("game");
  }

  let screenNode=null;
  if(screen==="home") screenNode=<HomeScreen onCreateRoom={handleCreateRoom} onJoinRoom={handleJoinRoom} onLocalGame={()=>setScreen("local")} onRules={()=>setShowRules(true)}/>;
  else if(screen==="local") screenNode=<LocalSetupScreen onBack={goHome} onStart={handleLocalStart} onRules={()=>setShowRules(true)}/>;
  else if(screen==="lobby") screenNode=<LobbyScreen roomId={roomId} playerName={playerName} onStart={handleStart} onUpdate={handleLobbyUpdate} onBack={goHome} onRules={()=>setShowRules(true)}/>;
  else if(screen==="game") screenNode=<GameScreen roomId={roomId} myIndex={myIndex} numPlayers={numPlayers} initialRoom={initialRoom} isLocal={isLocal} onBack={goHome} onRules={()=>setShowRules(true)}/>;

  return(
    <>
      {screenNode}
      {showRules&&<RulesModal onClose={()=>setShowRules(false)}/>}
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
