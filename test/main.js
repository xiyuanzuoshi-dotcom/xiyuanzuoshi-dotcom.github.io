const TILE=48, WORLD_W=20, WORLD_H=15;
const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");
const dialog=document.getElementById("dialog");

/* === 1. マップデータ === */
const maps = {
    "nightroad": {
      name: "夜道",
      world: [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,2,2,0,0,2,2,0,0,2,2,0,0,0,0,2,2,0,1],
        [1,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,2,2,0,0,0,0,2,2,0,0,0,1],
        [1,0,0,0,0,2,2,0,0,0,0,2,2,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
      ],
      npcs: [
        { 
          x:12, y:6, text:[
            "うぅ…ふらふら…",
            "今日も飲みすぎた…頭痛い…",
            "パないよう！半端ない！",
            "このゲームは、記憶のマップを探索してヒントを探して物語を進めるんだ",
            "さっき歩いていたお姉ちゃんは何を探していたんだろう?"
          ]
        }
      ],
      items: [
        { x:8, y:5, name:"光る貝殻のオルゴール", collected:false }
      ]
    },

    "nightroad2": {
        name: "夜道",
        world: [
          [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
          [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
          [1,0,2,2,0,0,2,2,0,0,2,2,0,0,0,0,2,2,0,1],
          [1,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
          [1,0,0,0,0,0,0,0,2,2,0,0,0,0,2,2,0,0,0,1],
          [1,0,0,0,0,2,2,0,0,0,0,2,2,0,0,0,0,0,0,1],
          [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
          [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
          [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
          [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
          [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
          [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
          [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
          [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
          [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ],
        npcs: [
          { 
            x:12, y:6, text:[
              "うぅ…ふらふら…",
              "今日も飲みすぎた…頭痛い…",
              "夢のようだろ？さっきも会わなかったか？",
              "このゲームは、記憶のマップを探索してヒントを探して物語を進めるんだ",
              "物語を進めるヒントが落ちていないかな?"
            ]
          }
        ],
        items: [
          { x:8, y:5, name:"光る貝殻のオルゴール", collected:false }
        ]
      },
  
    "room": {
      name: "部屋",
      world: [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
      ],
      npcs: [
        { x:5, y:5, text:["こんにちは！","ここは静かな部屋です。"] },
        { x:14, y:3, text:["この部屋には3人の人がいます。","動かないNPCもいますよ。"] },
        { x:10, y:8, text:["物を調べるとヒントが見つかるかも。"] }
      ],
      items: [
        { x:10, y:7, name:"不思議なランプ", collected:false }
      ]
    },
  
    "memory": {
      name: "記憶",
      world: [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,2,0,0,1],
        [1,0,2,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,2,1],
        [1,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,2,0,0,1],
        [1,0,2,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,2,1],
        [1,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,2,0,0,1],
        [1,0,2,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,2,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
      ],
      npcs: [
        { x:3, y:3, text:["昔の記憶がよみがえる…"] },
        { x:16, y:3, text:["ここで何かを思い出すかもしれない。"] },
        { x:10, y:6, text:["動き回るNPCもいる。"] }
      ],
      items: [
        { x:5, y:5, name:"記憶の欠片", collected:false },
        { x:14, y:5, name:"光る石", collected:false }
      ]
    },
  
    "empty": {
      name: "空のマップ",
      world: Array.from({ length: WORLD_H }, () => Array(WORLD_W).fill(0)),
      npcs: [],
      items: []
    }
  };
  
  

/* === 2. 共通状態 === */
let currentMap = maps[getMapFromURL()];
const player = {x:10,y:7,px:10*TILE,py:7*TILE,dir:'down',moving:false};
const camera = {x:0,y:0};
let activeNPC=null, dialogIndex=0, dialogVisible=false;
let touchStartX=null,touchStartY=null,currentDir=null,isTouching=false;
let npcMoveTimer=0;

/* === 3. 共通関数群 === */

/* === ページ読み込み時にマップを指定する === */
function getMapFromURL(){
    const params = new URLSearchParams(window.location.search);
    const mapName = params.get("map");
    if(mapName && maps[mapName]){
      return mapName;
    }
    return "nightroad"; // デフォルトマップ
  }

function isWalkable(x,y){
  if(x<0||y<0||x>=WORLD_W||y>=WORLD_H)return false;
  if(currentMap.world[y][x]===1)return false;
  for(const npc of currentMap.npcs){
    if(Math.round(npc.x)===x&&Math.round(npc.y)===y)return false;
  }
  return true;
}

function movePlayer(dir){
  if(player.moving)return;
  let nx=player.x,ny=player.y;
  if(dir==='up')ny--;if(dir==='down')ny++;if(dir==='left')nx--;if(dir==='right')nx++;
  if(!isWalkable(nx,ny))return;
  player.moving=true;player.dir=dir;
  const sx=player.px,sy=player.py,tx=nx*TILE,ty=ny*TILE;
  const start=performance.now(),duration=160;
  function step(){
    const t=Math.min((performance.now()-start)/duration,1);
    player.px=sx+(tx-sx)*t;
    player.py=sy+(ty-sy)*t;
    if(t<1)requestAnimationFrame(step);
    else{player.x=nx;player.y=ny;player.moving=false; checkItemPickup();}
  }
  requestAnimationFrame(step);
}

function checkItemPickup(){
  for(const it of currentMap.items){
    if(!it.collected && player.x===it.x && player.y===it.y){
      it.collected=true;
      showDialog(`「${it.name}」を手に入れた！`);
      setTimeout(hideDialog,2000);

        // 光る貝殻のオルゴールを手に入れたら別HTMLに遷移
        if(it.name === "光る貝殻のオルゴール"){
            setTimeout(() => {
                window.location.href = "../novel3.html"; // 遷移先のHTMLファイル名
            }, 2200); // ダイアログが消えてから遷移
        }
    }
  }
}

function updateCamera(){
  camera.x+=(player.px+TILE/2-480/2-camera.x)*0.2;
  camera.y+=(player.py+TILE/2-384/2-camera.y)*0.2;
}

function updateNPCs(dt){
  npcMoveTimer+=dt;
  if(npcMoveTimer>=5000){
    npcMoveTimer=0;
    for(const npc of currentMap.npcs){
      if(activeNPC===npc)continue;
      const dir=Math.floor(Math.random()*4);
      const dx=[1,-1,0,0][dir];
      const dy=[0,0,1,-1][dir];
      const nx=Math.round(npc.x)+dx;
      const ny=Math.round(npc.y)+dy;
      if(isWalkable(nx,ny)){npc.x=nx;npc.y=ny; npc.px=nx*TILE;npc.py=ny*TILE;}
    }
  }
}

function checkNPCProximity(){
  let near=null;
  for(const npc of currentMap.npcs){
    const dx=Math.abs(npc.x-player.x);
    const dy=Math.abs(npc.y-player.y);
    if(dx<=1&&dy<=1){near=npc;break;}
  }
  if(near!==activeNPC){if(near){dialogIndex=0;showDialog(near.text[0]);} else hideDialog(); activeNPC=near;}
}

function showDialog(text){dialog.style.display="block"; dialog.textContent=text; dialogVisible=true;}
function hideDialog(){dialog.style.display="none"; dialogVisible=false;}
function nextDialog(){if(!activeNPC)return; dialogIndex++; if(dialogIndex<activeNPC.text.length)showDialog(activeNPC.text[dialogIndex]); else {hideDialog();activeNPC=null;}}

/* === 操作系 === */
canvas.addEventListener("touchstart",e=>{e.preventDefault(); const t=e.touches[0]; touchStartX=t.clientX;touchStartY=t.clientY; isTouching=true;});
canvas.addEventListener("touchmove",e=>{e.preventDefault(); if(!isTouching)return; const t=e.touches[0]; const dx=t.clientX-touchStartX,dy=t.clientY-touchStartY; let dir=null; if(Math.abs(dx)>Math.abs(dy)){if(dx>20)dir='right';else if(dx<-20)dir='left';}else{if(dy>20)dir='down';else if(dy<-20)dir='up';} if(dir&&dir!==currentDir){currentDir=dir;movePlayer(dir);}});
canvas.addEventListener("touchend",()=>{isTouching=false;currentDir=null;});
window.addEventListener("keydown",(e)=>{if(player.moving)return; if(e.key==="ArrowUp")movePlayer("up"); else if(e.key==="ArrowDown")movePlayer("down"); else if(e.key==="ArrowLeft")movePlayer("left"); else if(e.key==="ArrowRight")movePlayer("right");});

/* === 描画 === */
function render(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let y=0;y<WORLD_H;y++)for(let x=0;x<WORLD_W;x++){
    const t=currentMap.world[y][x];
    ctx.fillStyle=t===1?'#0a0a0a':t===2?'#2e2e2e':'#111';
    ctx.fillRect(x*TILE-camera.x,y*TILE-camera.y,TILE,TILE);
  }
  for(const it of currentMap.items){if(!it.collected){ctx.fillStyle="#0ff"; ctx.beginPath(); ctx.arc(it.x*TILE+TILE/2-camera.x,it.y*TILE+TILE/2-camera.y,10,0,Math.PI*2); ctx.fill();}}
  for(const npc of currentMap.npcs){ctx.fillStyle="#ff5"; ctx.fillRect(npc.x*TILE-camera.x+4,npc.y*TILE-camera.y+4,TILE-8,TILE-8);}
  ctx.fillStyle="#66f"; ctx.fillRect(player.px-camera.x+6,player.py-camera.y+6,TILE-12,TILE-12);
}

/* === 吹き出しタッチで次のセリフへ === */
dialog.addEventListener("touchstart", e => {
    e.stopPropagation();   // タッチイベントを他に伝えない
    nextDialog();          // 次のセリフを表示
  });
  
  dialog.addEventListener("click", e => {
    e.stopPropagation();
    nextDialog();
  });
  

/* === マップ切替関数 === */
function switchMap(mapName, startX=10, startY=7){
    if(!maps[mapName]) return console.warn("マップが存在しません:", mapName);
    currentMap = maps[mapName];
    
    // プレイヤー初期位置を指定
    player.x = startX;
    player.y = startY;
    player.px = startX*TILE;
    player.py = startY*TILE;
    
    // NPC 初期位置も反映
    for(const npc of currentMap.npcs){
      npc.px = npc.x * TILE;
      npc.py = npc.y * TILE;
    }
  
    // ダイアログリセット
    activeNPC = null;
    dialogIndex = 0;
    hideDialog();
  }
  
  /* === キーボードでマップ切替例 === */
  window.addEventListener("keydown", e=>{
    if(e.key==="1") switchMap("nightroad");
    else if(e.key==="2") switchMap("room");
    else if(e.key==="3") switchMap("memory");
    else if(e.key==="4") switchMap("empty");
  });
  

/* === メインループ === */
let last=performance.now();
function loop(now){
  const dt=now-last;last=now;
  updateCamera();
  if(!player.moving&&isTouching&&currentDir)movePlayer(currentDir);
  updateNPCs(dt);
  checkNPCProximity();
  render();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
