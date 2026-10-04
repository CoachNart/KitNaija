import React,{useEffect,useMemo,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import * as THREE from 'three';
import {STATES,MISSIONS,NPC_TYPES,BUS_STOPS} from './gameData';
import './styles.css';

const lessonCopy={
  wallets:{title:'Open The Right Door',brief:'Learn what a wallet controls, what an address reveals, and what must never be shared.',steps:['Find the Web3 guide','Inspect the public address','Identify the private secret','Pass the safety check']},
  transactions:{title:'Put It Onchain',brief:'Follow a real transaction flow: sender, receiver, network, fee and confirmation.',steps:['Find the community hub','Inspect the transaction','Choose the correct network','Confirm the lesson']},
  gas:{title:'Pay The Network',brief:'Understand gas as the network resource used to process a transaction.',steps:['Find the builder','Inspect the network fee','Compare two networks','Complete the gas lesson']},
  NFTs:{title:'Make It Yours',brief:'Learn what an NFT represents, how ownership is recorded and why a screenshot is not ownership.',steps:['Find the creator','Inspect the artwork','Read the token record','Publish the collectible']},
  security:{title:'Protect The Bag',brief:'Spot phishing, fake support and dangerous approvals before they become expensive mistakes.',steps:['Find the security office','Inspect three messages','Reject the phishing attempt','Lock in the lesson']},
  identity:{title:'Your Onchain Identity',brief:'Learn how a public wallet can become a portable identity without exposing private credentials.',steps:['Meet the community lead','Inspect the profile','Choose what is public','Save the identity lesson']},
  payments:{title:'Move Value',brief:'Use a simple payment story to understand stable value, addresses and confirmation.',steps:['Meet the merchant','Read the invoice','Verify the recipient','Complete the payment lesson']},
  bridges:{title:'Cross The Network',brief:'Understand why assets can move between networks and what bridge risk means.',steps:['Find the bridge guide','Compare the networks','Check the destination','Finish the bridge lesson']},
  stablecoins:{title:'Keep The Value Steady',brief:'Learn why stablecoins exist and what backing, issuer and network actually mean.',steps:['Meet the merchant','Inspect the token','Check the network','Finish the stablecoin lesson']},
  DAOs:{title:'Build Together',brief:'See how communities coordinate proposals, voting and shared treasuries onchain.',steps:['Find the community','Read the proposal','Cast a practice vote','Complete the DAO lesson']},
  DeFi:{title:'Use The Protocol',brief:'Explore the basic idea of permissionless finance without handing your keys to strangers.',steps:['Find the trader','Read the protocol','Check the risk','Complete the DeFi lesson']},
  swaps:{title:'Swap Without Getting Swapped',brief:'Read a quote, verify the token and slippage, then reject a fake route.',steps:['Meet the trader','Read the quote','Spot the fake token','Confirm the safe route']},
  'smart contracts':{title:'Read The Machine',brief:'Learn that a smart contract is programmable onchain logic, not a human promise.',steps:['Find the builder','Inspect the contract','Check the action','Complete the lesson']}
};

function makeMission(state,index){
  const authored=MISSIONS.find(m=>m.state===state.name);
  if(authored)return {...authored,index};
  const key=state.lesson;
  const c=lessonCopy[key]||lessonCopy.wallets;
  return {id:state.name.toLowerCase().replace(/[^a-z]+/g,'-'),state:state.name,title:c.title,district:state.city,lesson:key.toUpperCase(),brief:c.brief,steps:c.steps,reward:100+index*15,kind:'talk',index};
}
const ALL_MISSIONS=STATES.map(makeMission);

function makeNpc(scene,x,z,typeIndex){
  const spec=NPC_TYPES[typeIndex%NPC_TYPES.length];
  const g=new THREE.Group();
  const body=new THREE.Mesh(new THREE.CapsuleGeometry(.42,.9,4,8),new THREE.MeshStandardMaterial({color:spec.color,roughness:.8}));
  body.position.y=.9;body.castShadow=true;g.add(body);
  const head=new THREE.Mesh(new THREE.SphereGeometry(.34,14,10),new THREE.MeshStandardMaterial({color:0x70432f,roughness:.9}));
  head.position.y=1.62;head.castShadow=true;g.add(head);
  g.position.set(x,0,z);g.userData={name:spec.name,role:spec.role};scene.add(g);return g;
}
function makeCar(scene,x,z,color){
  const g=new THREE.Group();
  const base=new THREE.Mesh(new THREE.BoxGeometry(2.5,.65,4.5),new THREE.MeshStandardMaterial({color,roughness:.65}));
  base.position.y=.55;base.castShadow=true;g.add(base);
  const cabin=new THREE.Mesh(new THREE.BoxGeometry(2,.6,2),new THREE.MeshStandardMaterial({color:0x182021,metalness:.2,roughness:.3}));
  cabin.position.y=1.05;cabin.position.z=-.1;g.add(cabin);
  for(const sx of[-1,1])for(const sz of[-1,1]){const w=new THREE.Mesh(new THREE.CylinderGeometry(.32,.32,.18,12),new THREE.MeshStandardMaterial({color:0x0a0a0a}));w.rotation.z=Math.PI/2;w.position.set(sx*1.18,.35,sz*1.55);g.add(w)}
  g.position.set(x,0,z);scene.add(g);return g;
}

function Game({onExit,playerName}){
 const mount=useRef(null),keys=useRef({}),player=useRef({x:0,z:18,rot:0}),interactRef=useRef(()=>{});
 const [started,setStarted]=useState(false),[paused,setPaused]=useState(false),[missionIndex,setMissionIndex]=useState(0),[step,setStep]=useState(0),[xp,setXp]=useState(0),[toast,setToast]=useState(''),[mapOpen,setMapOpen]=useState(false);
 const current=ALL_MISSIONS[missionIndex];
 const state=STATES[missionIndex];
 const [selectedState,setSelectedState]=useState(state.name);

 useEffect(()=>{setSelectedState(state.name)},[state.name]);

 useEffect(()=>{
  const el=mount.current;if(!el)return;
  const scene=new THREE.Scene();scene.background=new THREE.Color(0x081112);scene.fog=new THREE.Fog(0x081112,35,125);
  const camera=new THREE.PerspectiveCamera(58,el.clientWidth/el.clientHeight,.1,240);
  camera.position.set(0,9,34);
  const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.7));renderer.setSize(el.clientWidth,el.clientHeight);renderer.shadowMap.enabled=true;el.appendChild(renderer.domElement);
  scene.add(new THREE.HemisphereLight(0xb7d8d1,0x17120e,2.15));
  const sun=new THREE.DirectionalLight(0xffdfae,2.3);sun.position.set(-25,40,18);sun.castShadow=true;scene.add(sun);
  const world=new THREE.Group();scene.add(world);
  const ground=new THREE.Mesh(new THREE.PlaneGeometry(190,190),new THREE.MeshStandardMaterial({color:0x26342f,roughness:1}));ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;world.add(ground);
  const roadMat=new THREE.MeshStandardMaterial({color:0x101718,roughness:.95});
  for(let i=-3;i<=3;i++){
    const r=new THREE.Mesh(new THREE.PlaneGeometry(10,190),roadMat);r.rotation.x=-Math.PI/2;r.position.x=i*29;world.add(r);
    const h=new THREE.Mesh(new THREE.PlaneGeometry(190,10),roadMat);h.rotation.x=-Math.PI/2;h.position.z=i*29;world.add(h);
  }
  const laneMat=new THREE.MeshBasicMaterial({color:0xb9aa78});
  for(let i=-3;i<=3;i++){const l=new THREE.Mesh(new THREE.PlaneGeometry(.13,190),laneMat);l.rotation.x=-Math.PI/2;l.position.x=i*29;world.add(l);const q=l.clone();q.position.z=i*29;q.rotation.z=Math.PI/2;world.add(q)}
  const palette=[0x8f604b,0xc08a5c,0x6e7f79,0x72564d,0x9b8c69,0x4e6864,0x7b6a57];
  for(let gx=-3;gx<=3;gx++)for(let gz=-3;gz<=3;gz++){
    if((gx+gz)%3===0)continue;
    for(let k=0;k<2;k++){
      const w=5+Math.abs((gx*13+gz*5+k*7)%5),d=5+Math.abs((gz*11+gx*3+k*4)%5),h=4+Math.abs((gx*5+gz*9+k*6)%7);
      const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshStandardMaterial({color:palette[Math.abs(gx+gz+k)%palette.length],roughness:.86}));
      b.position.set(gx*29+(k?7:-7),h/2,gz*29+(k?7:-7));b.castShadow=true;b.receiveShadow=true;world.add(b);
      if(k===0){const sign=new THREE.Mesh(new THREE.BoxGeometry(w*.65,.65,.06),new THREE.MeshStandardMaterial({color:0x15201e,emissive:0x0a302b}));sign.position.set(b.position.x,b.position.y+1,b.position.z-d/2-.04);world.add(sign)}
    }
  }
  const marker=new THREE.Mesh(new THREE.CylinderGeometry(1.2,1.2,.18,24),new THREE.MeshBasicMaterial({color:0x16e4d1,transparent:true,opacity:.9}));
  marker.position.set(-29,0.12,0);world.add(marker);
  const npc1=makeNpc(world, -35, -4, 3),npc2=makeNpc(world, -21, 4, 2),npc3=makeNpc(world, 32, 32, 0);
  makeCar(world,18,-14,0xd44f3e);makeCar(world,-15,32,0x1f7d8c);
  const avatar=new THREE.Group();
  const body=new THREE.Mesh(new THREE.CapsuleGeometry(.55,1.15,4,8),new THREE.MeshStandardMaterial({color:0x16e4d1,roughness:.75}));body.position.y=1.15;body.castShadow=true;avatar.add(body);
  const head=new THREE.Mesh(new THREE.SphereGeometry(.45,16,12),new THREE.MeshStandardMaterial({color:0x6f412f,roughness:.9}));head.position.y=2.05;head.castShadow=true;avatar.add(head);world.add(avatar);
  const labelCanvas=document.createElement('canvas');labelCanvas.width=512;labelCanvas.height=128;const ctx=labelCanvas.getContext('2d');ctx.fillStyle='#07110f';ctx.fillRect(0,0,512,128);ctx.fillStyle='#16e4d1';ctx.font='bold 34px Arial';ctx.fillText('WEB3 HUB',26,70);
  const labelTex=new THREE.CanvasTexture(labelCanvas);const label=new THREE.Mesh(new THREE.PlaneGeometry(5,1.25),new THREE.MeshBasicMaterial({map:labelTex,transparent:true}));label.position.set(-29,5,0);world.add(label);

  const resize=()=>{camera.aspect=el.clientWidth/el.clientHeight;camera.updateProjectionMatrix();renderer.setSize(el.clientWidth,el.clientHeight)};
  const down=e=>{keys.current[e.key.toLowerCase()]=true;if(e.key==='e'||e.key===' ')window.dispatchEvent(new Event('kit-interact'));if(e.key.toLowerCase()==='m')setMapOpen(v=>!v)};
  const up=e=>{keys.current[e.key.toLowerCase()]=false};
  window.addEventListener('resize',resize);window.addEventListener('keydown',down);window.addEventListener('keyup',up);
  const clock=new THREE.Clock();let raf;
  const loop=()=>{raf=requestAnimationFrame(loop);const dt=Math.min(clock.getDelta(),.04);
    if(started&&!paused&&!mapOpen){
      let dx=0,dz=0;if(keys.current.w||keys.current.arrowup)dz-=1;if(keys.current.s||keys.current.arrowdown)dz+=1;if(keys.current.a||keys.current.arrowleft)dx-=1;if(keys.current.d||keys.current.arrowright)dx+=1;
      const len=Math.hypot(dx,dz)||1,speed=keys.current.shift?10:6;
      player.current.x=THREE.MathUtils.clamp(player.current.x+dx/len*speed*dt,-82,82);player.current.z=THREE.MathUtils.clamp(player.current.z+dz/len*speed*dt,-82,82);
      if(dx||dz)player.current.rot=Math.atan2(dx,dz);
      avatar.position.set(player.current.x,0,player.current.z);avatar.rotation.y=player.current.rot;
      camera.position.lerp(new THREE.Vector3(player.current.x,9,player.current.z+15),.08);camera.lookAt(player.current.x,1,player.current.z);
      marker.rotation.z+=dt*1.8;marker.scale.setScalar(1+.1*Math.sin(performance.now()/240));
      [npc1,npc2,npc3].forEach((n,i)=>{n.rotation.y=Math.sin(performance.now()/900+i)*.15});
    }
    renderer.render(scene,camera);
  };loop();
  return()=>{cancelAnimationFrame(raf);window.removeEventListener('resize',resize);window.removeEventListener('keydown',down);window.removeEventListener('keyup',up);renderer.dispose();if(el.contains(renderer.domElement))el.removeChild(renderer.domElement)};
 },[started,paused,mapOpen]);

 const interact=()=>{
   const target=missionIndex===0?[-29,0]:missionIndex%3===1?[29,29]:missionIndex%3===2?[0,-29]:[-29,0];
   if(Math.hypot(player.current.x-target[0],player.current.z-target[1])<10){
     if(step<current.steps.length-1){setStep(v=>v+1);setToast(current.steps[step+1])}
     else{setXp(v=>v+current.reward);setToast(missionIndex<ALL_MISSIONS.length-1?'Mission complete — next state unlocked.':'You completed the Nigeria Web3 journey.');if(missionIndex<ALL_MISSIONS.length-1){setMissionIndex(v=>v+1);setStep(0)}}}
   else setToast('Follow the glowing marker to the mission hub.');
   window.clearTimeout(interactRef.current.timer);interactRef.current.timer=window.setTimeout(()=>setToast(''),2300);
 };
 useEffect(()=>{interactRef.current=interact},[missionIndex,step,current.steps.length]);

 const jumpToState=(i)=>{setMissionIndex(i);setStep(0);setMapOpen(false);setToast(`${STATES[i].name} — ${STATES[i].city}. Mission selected.`);window.setTimeout(()=>setToast(''),2200)};
 return <div className="game-shell">
  <div ref={mount} className="viewport"/>
  <div className="hud">
   <div className="topbar"><div><b>KIT<span>NAIJA</span></b><small>{playerName||'PLAYER'} · NIGERIA ONCHAIN JOURNEY</small></div><div className="hud-center"><span>{missionIndex+1}/37</span><strong>{current.state}</strong></div><div className="top-actions"><div className="xp">XP <strong>{xp}</strong></div><button onClick={()=>setMapOpen(v=>!v)}>MAP <kbd>M</kbd></button><button onClick={()=>setPaused(v=>!v)}>{paused?'RESUME':'PAUSE'}</button></div></div>
   <div className="mission"><div className="eyebrow">MISSION · {current.state} · {current.district}</div><h2>{current.title}</h2><p>{current.brief}</p><div className="progress">{current.steps.map((s,i)=><div className={i<step?'done':i===step?'active':''} key={s}><i/>{s}</div>)}</div><button className="primary" onClick={interact}>{step===current.steps.length-1?'COMPLETE MISSION':'INTERACT'} <span>E / SPACE</span></button></div>
   <div className="controls"><span>WASD</span> MOVE <span>SHIFT</span> RUN <span>E / SPACE</span> INTERACT <span>M</span> MAP</div>
   {toast&&<div className="toast">{toast}</div>}
   {mapOpen&&<div className="state-map"><div className="map-head"><div><div className="eyebrow">NATIONAL MAP</div><h2>37 CHAPTERS. ONE JOURNEY.</h2><p>Every state carries a local setting and a Web3 lesson.</p></div><button onClick={()=>setMapOpen(false)}>CLOSE</button></div><div className="state-grid">{STATES.map((s,i)=><button key={s.name} className={i===missionIndex?'selected':i<missionIndex?'visited':''} onClick={()=>jumpToState(i)}><span>{String(i+1).padStart(2,'0')}</span><b>{s.name}</b><small>{s.city} · {s.lesson}</small></button>)}</div></div>}
   {paused&&<div className="pause"><h1>PAUSED</h1><p>Your progress is safe. Pick up exactly where you stopped.</p><button className="primary" onClick={()=>setPaused(false)}>CONTINUE</button></div>}
   <button className="exit" onClick={onExit}>EXIT CITY</button>
  </div>
  {!started&&<div className="start-overlay"><div><div className="eyebrow">LAGOS · CHAPTER 01 · YABA</div><h1>WELCOME TO<br/><span>KITNAIJA.</span></h1><p>{playerName||'Player'}, Nigeria is the map. Web3 is the mission. Start in Lagos and work your way through all 37 chapters.</p><button className="primary" onClick={()=>setStarted(true)}>START MISSION <span>ENTER</span></button></div></div>}
 </div>;
}

function App(){
 const [play,setPlay]=useState(false),[name,setName]=useState('');
 return play?<Game onExit={()=>setPlay(false)} playerName={name}/>:<main className="landing"><nav><div className="brand">KIT<span>NAIJA</span></div><div className="navtag">36 STATES + FCT · 37 MISSION CHAPTERS</div></nav><section className="hero"><div className="copy"><div className="kicker">THE NIGERIA WEB3 MISSION GAME</div><h1>LEARN<br/><em>ONCHAIN.</em><br/>IN THE CITY.</h1><p>Explore all 36 states and the FCT, meet Nigerians, complete missions and learn Web3 by doing — wallets, transactions, swaps, security, NFTs, DeFi and more.</p><div className="start"><input value={name} onChange={e=>setName(e.target.value)} placeholder="ENTER YOUR NAME" maxLength={18}/><button onClick={()=>setPlay(true)}>ENTER KITNAIJA <b>→</b></button></div><div className="micro"><span>●</span> NO WALLET REQUIRED TO START · 37 CHAPTERS</div></div><div className="map-art"><div className="sun"/><div className="road r1"/><div className="road r2"/><div className="block b1"/><div className="block b2"/><div className="block b3"/><div className="pin">WEB3<br/>HUB</div><div className="citylabel">LAGOS<br/><small>CHAPTER 01</small></div></div></section><footer><span>36 STATES + FCT</span><span>MISSION-DRIVEN ONBOARDING</span><span>WALLETS · DEFI · NFTS · SECURITY</span></footer></main>
}
createRoot(document.getElementById('root')).render(<App/>);
