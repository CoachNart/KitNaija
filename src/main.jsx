import React,{useEffect,useMemo,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {STATES,MISSIONS,NPC_TYPES,BUS_STOPS,CITY_STYLES} from './gameData';
import './styles.css';

const lessonCopy={
 wallets:{title:'First Key',brief:'Learn what a wallet controls, what an address reveals, and what must never be shared.'},
 transactions:{title:'Put It Onchain',brief:'Follow a real transaction flow: sender, receiver, network, fee and confirmation.'},
 gas:{title:'Who Paid The Network?',brief:'Understand gas as the network resource used to process a transaction.'},
 NFTs:{title:'The Story Has A Token',brief:'Learn what an NFT represents, how ownership is recorded and why a screenshot is not ownership.'},
 security:{title:'Protect The Bag',brief:'Spot phishing, fake support and dangerous approvals before they become expensive mistakes.'},
 identity:{title:'Your Onchain Identity',brief:'Learn how a public wallet can become a portable identity without exposing private credentials.'},
 payments:{title:'Move Value',brief:'Use a simple payment story to understand stable value, addresses and confirmation.'},
 bridges:{title:'Cross The Network',brief:'Understand networks, destinations and the risks of moving assets between them.'},
 stablecoins:{title:'Keep The Value Steady',brief:'Learn why stablecoins exist and what backing, issuer and network actually mean.'},
 DAOs:{title:'Build Together',brief:'See how communities coordinate proposals, voting and shared treasuries onchain.'},
 DeFi:{title:'Use The Protocol',brief:'Explore permissionless finance while learning that protocol risk still matters.'},
 swaps:{title:'Swap Without Getting Swapped',brief:'Read a quote, verify the token and slippage, then reject a fake route.'},
 'smart contracts':{title:'Read The Machine',brief:'Learn that a smart contract is programmable onchain logic, not a human promise.'}
};

function makeMission(state,index){
 const authored=MISSIONS.find(m=>m.state===state.name);
 if(authored)return {...authored,index};
 const c=lessonCopy[state.lesson]||lessonCopy.wallets;
 return {id:state.name.toLowerCase().replace(/[^a-z]+/g,'-'),state:state.name,title:c.title,district:state.district,lesson:state.lesson.toUpperCase(),brief:c.brief,
 steps:state.lesson==='security'?['Find the guide','Inspect the suspicious message','Reject the phishing attempt','Lock in the lesson']:
 state.lesson==='swaps'?['Meet the trader','Read the quote','Spot the fake token','Confirm the safe route']:
 ['Find the local guide','Inspect the Web3 lesson','Make the safe choice','Complete the chapter'],
 reward:100+index*15,kind:state.lesson==='wallets'||state.lesson==='identity'?'dialogue':state.lesson==='NFTs'?'collection':'choice',index};
}
const ALL_MISSIONS=STATES.map(makeMission);

const QUIZZES={
 wallets:{q:'Which detail should NEVER be shared with a stranger?',options:['Public wallet address','Recovery phrase','Transaction hash'],answer:1,explain:'A recovery phrase controls access to the wallet. A public address can be shared.'},
 transactions:{q:'What does a signed transaction normally contain?',options:['Sender, receiver, action and network data','Your recovery phrase','A screenshot of your wallet'],answer:0,explain:'The wallet signs the transaction data; the recovery secret stays private.'},
 gas:{q:'What is a network fee (gas) mainly paying for?',options:['A logo on the app','Computation and blockspace','Ownership of the token'],answer:1,explain:'Gas compensates the network for processing the transaction.'},
 NFTs:{q:'What should you inspect before buying an NFT?',options:['Only the picture','Token/contract details and what ownership means','The follower count only'],answer:1,explain:'The image is not enough. Inspect the token record, contract and actual utility.'},
 security:{q:'A support agent asks for your recovery phrase. What do you do?',options:['Send it privately','Share half','Refuse and use official support channels'],answer:2,explain:'Legitimate support should never need your recovery phrase.'},
 identity:{q:'Which is safe to publish?',options:['Recovery phrase','Private key','Public wallet address'],answer:2,explain:'A public address can be used to receive assets; private credentials must remain secret.'},
 payments:{q:'Before sending a payment, what is the safest first check?',options:['Verify recipient and network','Trust the display name','Ignore the address'],answer:0,explain:'Verify the destination and network before signing.'},
 bridges:{q:'What is a major bridge risk?',options:['Destination mismatch and smart-contract risk','The screen brightness','A larger logo'],answer:0,explain:'Bridges add contracts and routes that must be verified.'},
 stablecoins:{q:'What should you understand about a stablecoin?',options:['Issuer/backing and network','Only its ticker','Nothing beyond the logo'],answer:0,explain:'Price stability depends on the mechanism, issuer/backing and the network used.'},
 DAOs:{q:'What is a DAO proposal used for?',options:['Coordinating community decisions','Hiding a private key','Generating a seed phrase'],answer:0,explain:'DAOs can coordinate proposals, voting and shared resources.'},
 DeFi:{q:'What should you do before using a DeFi protocol?',options:['Understand contract, asset and liquidity risks','Send all funds first','Trust every token logo'],answer:0,explain:'Permissionless does not mean risk-free.'},
 swaps:{q:'What is the safest way to verify a swap?',options:['Check token identity, route and slippage','Pick the prettiest logo','Ignore the contract address'],answer:0,explain:'Verify the actual token and route, not just the name or image.'},
 'smart contracts':{q:'A smart contract is best described as...',options:['Programmable onchain logic','A customer-service promise','A private password'],answer:0,explain:'It is code deployed on a blockchain with defined rules.'}
};

function makeNpc(scene,x,z,typeIndex){
 const spec=NPC_TYPES[typeIndex%NPC_TYPES.length],g=new THREE.Group();
 g.userData={name:spec.name,role:spec.role,lines:spec.lines,isCharacter:true};
 g.position.set(x,0,z);scene.add(g);return g;
}
function fitModel(root,targetHeight){
 const box=new THREE.Box3().setFromObject(root),size=box.getSize(new THREE.Vector3());
 if(size.y>0)root.scale.multiplyScalar(targetHeight/size.y);
 const fitted=new THREE.Box3().setFromObject(root);root.position.y-=fitted.min.y;return root;
}
function addLoadedModel(parent,source,targetHeight){
 const loader=source.loader, url=source.url;
 loader.load(url,(gltf)=>{
   const model=fitModel(gltf.scene,targetHeight);
   model.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;if(o.material){o.material.roughness=Math.min(o.material.roughness??.8,.92)}}});
   parent.clear();parent.add(model);parent.userData.modelReady=true;
 },undefined,()=>{parent.userData.modelFailed=true});
}
function makeCar(scene,x,z,color){
 const spec=NPC_TYPES[typeIndex%NPC_TYPES.length],g=new THREE.Group();
 const body=new THREE.Mesh(new THREE.CapsuleGeometry(.42,.9,4,8),new THREE.MeshStandardMaterial({color:spec.color,roughness:.82}));
 body.position.y=.9;body.castShadow=true;g.add(body);
 const head=new THREE.Mesh(new THREE.SphereGeometry(.34,14,10),new THREE.MeshStandardMaterial({color:0x70432f,roughness:.9}));
 head.position.y=1.62;head.castShadow=true;g.add(head);
 g.position.set(x,0,z);g.userData={name:spec.name,role:spec.role,lines:spec.lines};scene.add(g);return g;
}
function makeCar(scene,x,z,color){
 const g=new THREE.Group(),paint=new THREE.MeshStandardMaterial({color,roughness:.58,metalness:.08});
 const base=new THREE.Mesh(new THREE.BoxGeometry(2.5,.62,4.5),paint);base.position.y=.58;base.castShadow=true;g.add(base);
 const cabin=new THREE.Mesh(new THREE.BoxGeometry(2,.62,2),new THREE.MeshStandardMaterial({color:0x182021,metalness:.2,roughness:.3}));cabin.position.y=1.06;cabin.position.z=-.18;g.add(cabin);
 for(const sx of[-1,1])for(const sz of[-1,1]){const w=new THREE.Mesh(new THREE.CylinderGeometry(.32,.32,.2,14),new THREE.MeshStandardMaterial({color:0x080909,roughness:1}));w.rotation.z=Math.PI/2;w.position.set(sx*1.18,.35,sz*1.55);g.add(w)}
 g.userData={drivable:true,vehicleColor:color};g.position.set(x,0,z);scene.add(g);return g;
}
function addTextLabel(scene,text,x,y,z,accent=0x16e4d1){
 const c=document.createElement('canvas');c.width=512;c.height=128;const ctx=c.getContext('2d');
 ctx.fillStyle='#06100eee';ctx.fillRect(0,0,512,128);ctx.strokeStyle='#16e4d1';ctx.strokeRect(3,3,506,122);
 ctx.fillStyle='#f0f5f2';ctx.font='bold 30px Arial';ctx.fillText(text,22,72);
 const tex=new THREE.CanvasTexture(c),m=new THREE.Mesh(new THREE.PlaneGeometry(5.4,1.35),new THREE.MeshBasicMaterial({map:tex,transparent:true,side:THREE.DoubleSide}));
 m.position.set(x,y,z);m.userData.setText=(next)=>{ctx.clearRect(0,0,512,128);ctx.fillStyle='#06100eee';ctx.fillRect(0,0,512,128);ctx.strokeStyle='#16e4d1';ctx.strokeRect(3,3,506,122);ctx.fillStyle='#f0f5f2';ctx.font='bold 30px Arial';ctx.fillText(next,22,72);tex.needsUpdate=true};scene.add(m);return m;
}
function beep(type='confirm'){
 try{
  const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
  const ac=new AC(),o=ac.createOscillator(),g=ac.createGain();
  o.type=type==='error'?'sawtooth':'sine';o.frequency.value=type==='error'?150:type==='complete'?740:520;
  g.gain.setValueAtTime(.0001,ac.currentTime);g.gain.exponentialRampToValueAtTime(.045,ac.currentTime+.015);g.gain.exponentialRampToValueAtTime(.0001,ac.currentTime+.18);
  o.connect(g);g.connect(ac.destination);o.start();o.stop(ac.currentTime+.2);
 }catch{}
}

function Game({onExit,playerName}){
 const mount=useRef(null),keys=useRef({}),player=useRef({x:0,z:18,rot:0}),vehicle=useRef(null),vehicleMode=useRef(false);
 const stateRef=useRef(0),missionRef=useRef(0),stepRef=useRef(0),startedRef=useRef(false),pausedRef=useRef(false),mapRef=useRef(false);
 const interactRef=useRef(()=>{}),toastTimer=useRef(null),sceneRef=useRef(null);
 const [started,setStarted]=useState(false),[paused,setPaused]=useState(false),[missionIndex,setMissionIndex]=useState(0),[step,setStep]=useState(0),[xp,setXp]=useState(0),[mapOpen,setMapOpen]=useState(false);
 const [dialogue,setDialogue]=useState(null),[choice,setChoice]=useState(null),[vehicleActive,setVehicleActive]=useState(false),[toast,setToast]=useState('');
 const dialogueRef=useRef(null),choiceRef=useRef(null);
 const current=ALL_MISSIONS[missionIndex],state=STATES[missionIndex];
 const currentObjective=useMemo(()=>{
   const kind=current.kind;
   if(kind==='dialogue')return step===0?'talk':step===1?'inspect':step===2?'inspect':'choice';
   if(kind==='collection')return step===0?'talk':step===1?'collect':step===2?'inspect':'choice';
   if(kind==='delivery')return step===0?'talk':step===1?'inspect':step===2?'deliver':'choice';
   return step===0?'talk':step===1?'inspect':step===2?'choice':'choice';
 },[current.kind,step]);

 useEffect(()=>{stateRef.current=missionIndex;missionRef.current=missionIndex;stepRef.current=step;startedRef.current=started;pausedRef.current=paused;mapRef.current=mapOpen},[missionIndex,step,started,paused,mapOpen]);

 const say=(msg)=>{setToast(msg);clearTimeout(toastTimer.current);toastTimer.current=setTimeout(()=>setToast(''),2400)};

 useEffect(()=>{
  const el=mount.current;if(!el)return;
  const scene=new THREE.Scene();scene.background=new THREE.Color(0x8aa6a0);scene.fog=new THREE.Fog(0x8aa6a0,55,165);sceneRef.current=scene;
  const gltfLoader=new GLTFLoader();
  const characterSource={loader:gltfLoader,url:'https://raw.githubusercontent.com/Seyamalam/blood-league-kickoff/main/public/assets/vendor/quaternius/night-striker.glb'};
  const carSource={loader:gltfLoader,url:'https://raw.githubusercontent.com/BabylonJS/Assets/master/meshes/car.glb'};
  const camera=new THREE.PerspectiveCamera(58,Math.max(el.clientWidth,1)/Math.max(el.clientHeight,1),.1,260);
  camera.position.set(0,7.2,30);
  const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance',alpha:false});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.7));renderer.setSize(el.clientWidth,el.clientHeight);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;el.appendChild(renderer.domElement);
  scene.add(new THREE.HemisphereLight(0xd8ebe8,0x2a241d,2.6));
  const sun=new THREE.DirectionalLight(0xffe0b2,3.1);sun.position.set(-35,48,28);sun.castShadow=true;sun.shadow.mapSize.set(1536,1536);sun.shadow.camera.left=-75;sun.shadow.camera.right=75;sun.shadow.camera.top=75;sun.shadow.camera.bottom=-75;scene.add(sun);
  const sky=new THREE.Mesh(new THREE.SphereGeometry(210,32,16),new THREE.MeshBasicMaterial({color:0x88a7a2,side:THREE.BackSide,fog:false}));scene.add(sky);
  const world=new THREE.Group();scene.add(world);
  const ground=new THREE.Mesh(new THREE.PlaneGeometry(190,190),new THREE.MeshStandardMaterial({color:0x30443d,roughness:1}));ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;world.add(ground);
  const roads=new THREE.Group(),buildings=new THREE.Group(),props=new THREE.Group(),npcs=new THREE.Group(),cars=new THREE.Group();world.add(roads,buildings,props,npcs,cars);
  const roadMat=new THREE.MeshStandardMaterial({color:0x111918,roughness:.95});
  for(let i=-3;i<=3;i++){
   const r=new THREE.Mesh(new THREE.PlaneGeometry(10,190),roadMat);r.rotation.x=-Math.PI/2;r.position.x=i*29;roads.add(r);
   const h=new THREE.Mesh(new THREE.PlaneGeometry(190,10),roadMat);h.rotation.x=-Math.PI/2;h.position.z=i*29;roads.add(h);
   const lane=new THREE.Mesh(new THREE.PlaneGeometry(.12,190),new THREE.MeshBasicMaterial({color:0xb9aa78}));lane.rotation.x=-Math.PI/2;lane.position.x=i*29;roads.add(lane);
   const lane2=lane.clone();lane2.position.x=0;lane2.position.z=i*29;lane2.rotation.z=Math.PI/2;roads.add(lane2);
  }
  const buildingPalette=[0x9b6b50,0xc49a69,0x7d8a83,0x7e5d51,0xa79672,0x526c68,0x806f5b,0x6b6460];
  const windowMat=new THREE.MeshStandardMaterial({color:0x17262a,metalness:.15,roughness:.28});
  const roofMat=new THREE.MeshStandardMaterial({color:0x4b3c34,roughness:.92});
  for(let gx=-3;gx<=3;gx++)for(let gz=-3;gz<=3;gz++){
   if((gx+gz)%3===0)continue;
   for(let k=0;k<2;k++){
    const w=5+Math.abs((gx*13+gz*5+k*7)%5),d=5+Math.abs((gz*11+gx*3+k*4)%5),h=4+Math.abs((gx*5+gz*9+k*6)%7);
    const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshStandardMaterial({color:buildingPalette[Math.abs(gx+gz+k)%buildingPalette.length],roughness:.86}));
    b.position.set(gx*29+(k?7:-7),h/2,gz*29+(k?7:-7));b.castShadow=true;b.receiveShadow=true;buildings.add(b);
    const roof=new THREE.Mesh(new THREE.BoxGeometry(w+.18,.18,d+.18),roofMat);roof.position.set(b.position.x,b.position.y+.09,b.position.z);roof.castShadow=true;buildings.add(roof);
    const facadeZ=b.position.z-d/2-.04;
    for(let wx=-1;wx<=1;wx++){for(let wy=.8;wy<h-.7;wy+=1.55){const win=new THREE.Mesh(new THREE.BoxGeometry(.55,.72,.05),windowMat);win.position.set(b.position.x+wx*Math.max(1.1,w*.22),wy,facadeZ);buildings.add(win)}}
    if(k===0){const sign=new THREE.Mesh(new THREE.BoxGeometry(w*.72,.72,.06),new THREE.MeshStandardMaterial({color:0x10221f,emissive:0x062b27,emissiveIntensity:.35}));sign.position.set(b.position.x,b.position.y+1.1,facadeZ-.04);buildings.add(sign)}
   }
  }
  const avatar=new THREE.Group();avatar.userData.isPlayer=true;world.add(avatar);
  const avatarFallback=new THREE.Mesh(new THREE.CapsuleGeometry(.55,1.15,4,8),new THREE.MeshStandardMaterial({color:0x16e4d1,roughness:.75}));avatarFallback.position.y=1.15;avatarFallback.castShadow=true;avatar.add(avatarFallback);
  const avatarHead=new THREE.Mesh(new THREE.SphereGeometry(.45,16,12),new THREE.MeshStandardMaterial({color:0x6f412f,roughness:.9}));avatarHead.position.y=2.05;avatarHead.castShadow=true;avatar.add(avatarHead);
  addLoadedModel(avatar,characterSource,2.05);
  const targetMarker=new THREE.Mesh(new THREE.CylinderGeometry(1.15,1.15,.18,24),new THREE.MeshBasicMaterial({color:0x16e4d1,transparent:true,opacity:.9}));targetMarker.position.set(-29,.12,0);world.add(targetMarker);
  const targetBeam=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,5,10),new THREE.MeshBasicMaterial({color:0x16e4d1,transparent:true,opacity:.45}));targetBeam.position.set(-29,2.6,0);world.add(targetBeam);
  const label=addTextLabel(world,'WEB3 HUB',-29,5.2,0);
  const npcA=makeNpc(npcs,-35,-4,3),npcB=makeNpc(npcs,-21,4,2),npcC=makeNpc(npcs,32,32,0);
  [npcA,npcB,npcC].forEach(n=>addLoadedModel(n,characterSource,2.0));
  const npcActors=[npcA,npcB,npcC];
  npcActors.forEach((n,i)=>{n.userData.home=n.position.clone();n.userData.phase=i*2.1;n.userData.speed=.45+i*.08});
  const carA=makeCar(cars,18,-14,0xd44f3e),carB=makeCar(cars,-15,32,0x1f7d8c);
  [carA,carB].forEach(c=>addLoadedModel(c,carSource,1.55));
  const traffic=[];
  const trafficColors=[0x1f7d8c,0xd39a61,0x6e7f79,0xb54b43,0x7d8fb3,0x9b8c69];
  for(let i=0;i<10;i++){
   const axis=i%2, lane=(Math.floor(i/2)%3-1)*29+(i%2?.9:-.9), start=-82+(i*17)%164;
   const t=makeCar(cars,axis?lane:start,axis?start:lane,trafficColors[i%trafficColors.length]);
   addLoadedModel(t,carSource,1.55);
   t.userData.traffic=true;t.userData.axis=axis;t.userData.direction=i%4<2?1:-1;t.userData.speed=4.5+(i%4)*.7;
   if(axis)t.rotation.y=Math.PI/2;
   traffic.push(t);
  }
  const busStop=addTextLabel(props,'BUS STOP · '+(BUS_STOPS[0]?.[0]||'CITY'),7,3.4,8);
  const districtLabel=addTextLabel(props,'MISSION DISTRICT',7,5.1,8);
  const objectiveProp=new THREE.Mesh(new THREE.CylinderGeometry(.28,.28,1.8,12),new THREE.MeshStandardMaterial({color:0x16e4d1,emissive:0x063d37,emissiveIntensity:1.4}));
  objectiveProp.position.set(-29,.9,0);objectiveProp.castShadow=true;props.add(objectiveProp);
  const propsList=[];
  for(let i=0;i<12;i++){
   const pole=new THREE.Mesh(new THREE.CylinderGeometry(.07,.1,5.5,10),new THREE.MeshStandardMaterial({color:0x2e3431,roughness:.75}));pole.position.set(-80+i*14,2.75,12+(i%2)*5);pole.castShadow=true;props.add(pole);
   const arm=new THREE.Mesh(new THREE.BoxGeometry(1.2,.08,.08),new THREE.MeshStandardMaterial({color:0x303633}));arm.position.set(pole.position.x+.45,5.1,pole.position.z);props.add(arm);
   const lamp=new THREE.Mesh(new THREE.SphereGeometry(.14,10,8),new THREE.MeshStandardMaterial({color:0xffe5ad,emissive:0x8a6320,emissiveIntensity:1.8}));lamp.position.set(pole.position.x+1,5.05,pole.position.z);props.add(lamp);
   propsList.push(pole);
  }
  for(let i=0;i<18;i++){
   const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.18,.28,2.2,8),new THREE.MeshStandardMaterial({color:0x5a3827,roughness:1}));trunk.position.set(-78+(i*17)%156,1.1,-75+(i*31)%150);trunk.castShadow=true;props.add(trunk);
   const crown=new THREE.Mesh(new THREE.SphereGeometry(1.7,10,8),new THREE.MeshStandardMaterial({color:0x3d6441,roughness:1}));crown.scale.set(1.15,.75,1.15);crown.position.set(trunk.position.x,3.0,trunk.position.z);crown.castShadow=true;props.add(crown);
  }
  vehicle.current=carA;

  const applyState=(idx)=>{
   const s=STATES[idx],style=CITY_STYLES[s.city]||CITY_STYLES.default;
   ground.material.color.setHex(style.ground);roadMat.color.setHex(style.road);
   targetMarker.material.color.setHex(style.accent);targetBeam.material.color.setHex(style.accent);
   label.material.map.needsUpdate=true;
   label.position.set(-29,5.2,0);
   busStop.material.map.needsUpdate=true;
   busStop.position.set(7,3.4,8);
   sun.color.setHex(style.accent);
   scene.background.setHex(style.weather==='dry'?0x0d1110:0x081112);
  };
  const sunColor=new THREE.Color(0xffdfae);sun.color.copy(sunColor);applyState(0);

  const getObjectiveTarget=(idx,objectiveStep=0)=>{
   const route=[[-29,0],[-18,29],[29,29],[0,-29],[18,-14]];
   const base=route[idx%route.length],offsets=[[0,0],[7,-6],[-7,6],[0,0]];
   const o=offsets[Math.min(objectiveStep,offsets.length-1)];return [base[0]+o[0],base[1]+o[1]];
  };
  const resetWorldForMission=(idx,objectiveStep=stepRef.current)=>{
   const [tx,tz]=getObjectiveTarget(idx,objectiveStep);targetMarker.position.set(tx,.12,tz);targetBeam.position.set(tx,2.6,tz);label.position.set(tx,5.2,tz);objectiveProp.position.set(tx,.9,tz);
   const stop=BUS_STOPS.find(s=>s[1]===STATES[idx].name)||[STATES[idx].district,STATES[idx].name];
   busStop.userData.setText('BUS STOP · '+stop[0].toUpperCase());busStop.position.set(tx+5,3.4,tz+5);
   districtLabel.userData.setText(STATES[idx].city.toUpperCase()+' · '+STATES[idx].district.toUpperCase());districtLabel.position.set(tx+5,5.1,tz+5);
   npcA.position.set(tx-6,0,tz-4);npcB.position.set(tx+7,0,tz+4);npcC.position.set(tx+5,0,tz-7);
   applyState(idx);
  };
  resetWorldForMission(0);
  scene.userData.resetMission=resetWorldForMission;

  const resize=()=>{camera.aspect=Math.max(el.clientWidth,1)/Math.max(el.clientHeight,1);camera.updateProjectionMatrix();renderer.setSize(el.clientWidth,el.clientHeight)};
  const down=e=>{
   const key=e.key.toLowerCase();keys.current[key]=true;
   if(key==='e'||e.key===' '){e.preventDefault();window.dispatchEvent(new Event('kit-interact'))}
   if(key==='m'){e.preventDefault();setMapOpen(v=>!v)}
   if(key==='escape'){setPaused(v=>!v)}
  };
  const up=e=>{keys.current[e.key.toLowerCase()]=false};
  window.addEventListener('resize',resize);window.addEventListener('keydown',down);window.addEventListener('keyup',up);
  const clock=new THREE.Clock();let raf;
  const loop=()=>{
   raf=requestAnimationFrame(loop);const dt=Math.min(clock.getDelta(),.04),now=performance.now();
   traffic.forEach(t=>{
    const dir=t.userData.direction,speed=t.userData.speed*dt;
    if(t.userData.axis){t.position.z+=speed*dir;if(t.position.z>88)t.position.z=-88;if(t.position.z<-88)t.position.z=88}
    else{t.position.x+=speed*dir;if(t.position.x>88)t.position.x=-88;if(t.position.x<-88)t.position.x=88}
   });
   npcActors.forEach((n,i)=>{
    const h=n.userData.home,p=n.userData.phase||0,s=n.userData.speed||.5;
    n.position.x=h.x+Math.sin(now/1800*s+p)*2.8;
    n.position.z=h.z+Math.cos(now/2100*s+p)*2.2;
    n.rotation.y=Math.atan2(Math.cos(now/2100*s+p),Math.cos(now/1800*s+p));
   });
   if(startedRef.current&&!pausedRef.current&&!mapRef.current&&!dialogueRef.current&&!choiceRef.current){
    let dx=0,dz=0;if(keys.current.w||keys.current.arrowup)dz-=1;if(keys.current.s||keys.current.arrowdown)dz+=1;if(keys.current.a||keys.current.arrowleft)dx-=1;if(keys.current.d||keys.current.arrowright)dx+=1;
    const len=Math.hypot(dx,dz)||1;
    if(vehicleMode.current&&vehicle.current){
      const car=vehicle.current;
      const forward=keys.current.w||keys.current.arrowup?1:keys.current.s||keys.current.arrowdown?-1:0;
      const steer=(keys.current.a||keys.current.arrowleft?1:0)+(keys.current.d||keys.current.arrowright?-1:0);
      const speed=keys.current.shift?14:9;
      car.rotation.y+=steer*dt*(Math.abs(forward)+.25);
      car.translateZ(-forward*speed*dt);
      car.position.x=THREE.MathUtils.clamp(car.position.x,-86,86);car.position.z=THREE.MathUtils.clamp(car.position.z,-86,86);
      if(keys.current[' '])car.translateZ(speed*dt*.55);
      player.current.x=car.position.x;player.current.z=car.position.z;
      avatar.visible=false;
    }else{
      const speed=keys.current.shift?10:6;
      player.current.x=THREE.MathUtils.clamp(player.current.x+dx/len*speed*dt,-82,82);
      player.current.z=THREE.MathUtils.clamp(player.current.z+dz/len*speed*dt,-82,82);
      if(dx||dz)player.current.rot=Math.atan2(dx,dz);
      avatar.position.set(player.current.x,0,player.current.z);avatar.rotation.y=player.current.rot;avatar.visible=true;
    }
    const focusX=vehicleMode.current?vehicle.current.position.x:player.current.x,focusZ=vehicleMode.current?vehicle.current.position.z:player.current.z;
    camera.position.lerp(new THREE.Vector3(focusX,vehicleMode.current?6.2:7.2,focusZ+13.5),.08);camera.lookAt(focusX,1.15,focusZ);
   }
   targetMarker.rotation.z+=dt*1.8;targetMarker.scale.setScalar(1+.1*Math.sin(now/240));targetBeam.scale.y=.8+.25*Math.sin(now/300);
   renderer.render(scene,camera);
  };loop();
  const observer=new MutationObserver(()=>resetWorldForMission(missionRef.current));observer.observe(el,{childList:true,subtree:false});
  return()=>{observer.disconnect();cancelAnimationFrame(raf);window.removeEventListener('resize',resize);window.removeEventListener('keydown',down);window.removeEventListener('keyup',up);renderer.dispose();if(el.contains(renderer.domElement))el.removeChild(renderer.domElement)};
 },[]);

 const finishStep=()=>{
   const next=stepRef.current+1;
   if(next<current.steps.length){setStep(next);stepRef.current=next;say(current.steps[next]);beep('confirm');return}
   const reward=current.reward;setXp(v=>v+reward);beep('complete');
   if(missionIndex<ALL_MISSIONS.length-1){const n=missionIndex+1;setMissionIndex(n);missionRef.current=n;setStep(0);stepRef.current=0;say(`Chapter complete +${reward} XP · ${STATES[n].name} unlocked`)}
   else say('Nigeria Web3 journey complete. You made it across all 37 chapters.');
 };

 const openObjective=()=>{
   if(vehicleMode.current){vehicleMode.current=false;setVehicleActive(false);if(vehicle.current){player.current.x=vehicle.current.position.x+2.5;player.current.z=vehicle.current.position.z;}say('Exited vehicle. Walk to the mission objective.');beep();return}
   const car=vehicle.current;
   if(car){
     const carDistance=Math.hypot(player.current.x-car.position.x,player.current.z-car.position.z);
     if(carDistance<7){vehicleMode.current=true;setVehicleActive(true);say('Vehicle entered. WASD drive · SPACE brake · E exit');beep();return}
   }
   const idx=missionRef.current,[tx,tz]=getObjectiveTarget(idx,stepRef.current);
   const d=Math.hypot(player.current.x-tx,player.current.z-tz);
   if(d>11){say('Follow the glowing marker to the mission objective.');beep('error');return}
   const type=currentObjective;
   if(type==='talk'){
     const npc=NPC_TYPES[idx%NPC_TYPES.length];setDialogue({name:npc.name,role:npc.role,text:npc.lines[stepRef.current%npc.lines.length]||'Welcome to KitNaija.',step:stepRef.current});return;
   }
   if(type==='choice'){
     const q=QUIZZES[(state.lesson||'wallets')]||QUIZZES.wallets;const next={...q,step:stepRef.current};choiceRef.current=next;setChoice(next);return;
   }
   if(type==='collect'){finishStep();say('Item collected. Keep moving.');return}
   if(type==='deliver'){finishStep();return}
   finishStep();
 };
 useEffect(()=>{interactRef.current=openObjective},[currentObjective,current.steps.length,missionIndex,step,state.lesson]);
 useEffect(()=>{const scene=sceneRef.current;if(scene?.userData?.resetMission)scene.userData.resetMission(missionIndex,step)},[missionIndex,step]);
 useEffect(()=>{const f=()=>interactRef.current();window.addEventListener('kit-interact',f);return()=>window.removeEventListener('kit-interact',f)},[]);

 const answer=(i)=>{
   const active=choiceRef.current;if(!active)return;
   if(i===active.answer){const explanation=active.explain;choiceRef.current=null;setChoice(null);say(explanation||'Correct.');finishStep();beep('confirm')}
   else{choiceRef.current=null;setChoice(null);say('Not quite. Read the lesson and try the safe choice.');beep('error')}
 };
 const jumpToState=(i)=>{setMissionIndex(i);missionRef.current=i;setStep(0);stepRef.current=0;setMapOpen(false);dialogueRef.current=null;choiceRef.current=null;setDialogue(null);setChoice(null);say(`${STATES[i].name} · ${STATES[i].city} selected`)};
 const toggleVehicle=()=>{
   if(!started)return;
   if(vehicleMode.current){openObjective();return}
   const car=vehicle.current;if(!car)return;
   const d=Math.hypot(player.current.x-car.position.x,player.current.z-car.position.z);
   if(d<7){vehicleMode.current=true;setVehicleActive(true);say('Vehicle entered. WASD drive · SPACE brake · E exit');beep()}
   else say('Get closer to the marked car to enter it.');
 };
 const activeStop=BUS_STOPS.find(s=>s[1]===state.name)||BUS_STOPS.find(s=>s[1]==='Lagos');

 return <div className="game-shell">
  <div ref={mount} className="viewport"/>
  <div className="hud">
   <div className="topbar">
    <div><b>KIT<span>NAIJA</span></b><small>{playerName||'PLAYER'} · {state.city.toUpperCase()}</small></div>
    <div className="hud-center"><span>{missionIndex+1}/37</span><strong>{state.name}</strong><small>{state.zone}</small></div>
    <div className="top-actions"><div className="xp">XP <strong>{xp}</strong></div><button onClick={()=>setMapOpen(v=>!v)}>MAP <kbd>M</kbd></button><button onClick={()=>setPaused(v=>!v)}>{paused?'RESUME':'PAUSE'}</button></div>
   </div>
   <div className="mission">
    <div className="eyebrow">CHAPTER {String(missionIndex+1).padStart(2,'0')} · {state.city} · {activeStop?.[0]||state.district}</div>
    <h2>{current.title}</h2><p>{current.brief}</p>
    <div className="progress">{current.steps.map((s,i)=><div className={i<step?'done':i===step?'active':''} key={s}><i/>{s}</div>)}</div>
    <button className="primary" onClick={openObjective}>{currentObjective==='talk'?'TALK':currentObjective==='choice'?'MAKE CHOICE':step===current.steps.length-1?'COMPLETE CHAPTER':'INTERACT'} <span>E / SPACE</span></button>
    <button className="secondary" onClick={toggleVehicle}>{vehicleActive?'EXIT VEHICLE':'ENTER VEHICLE'} <span>E</span></button>
   </div>
   <div className="controls"><span>WASD</span> MOVE <span>SHIFT</span> RUN <span>E / SPACE</span> ACTION <span>M</span> MAP <span>ESC</span> PAUSE</div>
   {toast&&<div className="toast">{toast}</div>}
   {mapOpen&&<div className="state-map"><div className="map-head"><div><div className="eyebrow">NATIONAL MAP</div><h2>37 CHAPTERS. ONE JOURNEY.</h2><p>Every state has a city setting, local transport reference and Web3 lesson.</p></div><button onClick={()=>setMapOpen(false)}>CLOSE</button></div><div className="state-grid">{STATES.map((s,i)=><button key={s.name} className={i===missionIndex?'selected':i<missionIndex?'visited':''} onClick={()=>jumpToState(i)}><span>{String(i+1).padStart(2,'0')}</span><b>{s.name}</b><small>{s.city} · {s.lesson}</small></button>)}</div></div>}
   {dialogue&&<div className="dialogue"><div className="dialogue-role">{dialogue.role.toUpperCase()}</div><h3>{dialogue.name}</h3><p>{dialogue.text}</p><button className="primary" onClick={()=>{dialogueRef.current=null;setDialogue(null);finishStep()}}>CONTINUE <span>ENTER</span></button></div>}
   {choice&&<div className="choice"><div className="eyebrow">MISSION CHECK</div><h3>{choice.q}</h3><div className="choice-list">{choice.options.map((o,i)=><button key={o} onClick={()=>answer(i)}><span>{String.fromCharCode(65+i)}</span>{o}</button>)}</div></div>}
   {paused&&<div className="pause"><h1>PAUSED</h1><p>Your progress is safe. Pick up exactly where you stopped.</p><button className="primary" onClick={()=>setPaused(false)}>CONTINUE</button></div>}
   <button className="exit" onClick={onExit}>EXIT CITY</button>
  </div>
  {!started&&<div className="start-overlay"><div><div className="eyebrow">LAGOS · CHAPTER 01 · YABA</div><h1>WELCOME TO<br/><span>KITNAIJA.</span></h1><p>{playerName||'Player'}, Nigeria is the map. Web3 is the mission. Start in Lagos, learn through real choices, drive between objectives and unlock all 37 chapters.</p><button className="primary" onClick={()=>{setStarted(true);startedRef.current=true;beep()}}>START MISSION <span>ENTER</span></button></div></div>}
 </div>;
}

function App(){
 const [play,setPlay]=useState(false),[name,setName]=useState('');
 return play?<Game onExit={()=>setPlay(false)} playerName={name}/>:<main className="landing">
  <nav><div className="brand">KIT<span>NAIJA</span></div><div className="navtag">36 STATES + FCT · 37 MISSION CHAPTERS</div></nav>
  <section className="hero"><div className="copy"><div className="kicker">THE NIGERIA WEB3 MISSION GAME</div><h1>LEARN<br/><em>ONCHAIN.</em><br/>IN THE CITY.</h1><p>Explore all 36 states and the FCT, meet Nigerians, drive to missions and learn Web3 by doing — wallets, transactions, swaps, security, NFTs, DeFi and more.</p><div className="start"><input value={name} onChange={e=>setName(e.target.value)} placeholder="ENTER YOUR NAME" maxLength={18}/><button onClick={()=>setPlay(true)}>ENTER KITNAIJA <b>→</b></button></div><div className="micro"><span>●</span> NO WALLET REQUIRED · DRIVING + DIALOGUE + CHOICES · 37 CHAPTERS</div></div><div className="map-art"><div className="sun"/><div className="road r1"/><div className="road r2"/><div className="block b1"/><div className="block b2"/><div className="block b3"/><div className="pin">WEB3<br/>HUB</div><div className="citylabel">LAGOS<br/><small>CHAPTER 01</small></div></div></section>
  <footer><span>36 STATES + FCT</span><span>MISSION-DRIVEN ONBOARDING</span><span>WALLETS · DEFI · NFTS · SECURITY</span></footer>
 </main>
}
createRoot(document.getElementById('root')).render(<App/>);
