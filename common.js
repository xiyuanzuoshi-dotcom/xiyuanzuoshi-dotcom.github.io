// ======================
// 共通操作処理 common.js
// ======================

export function setupControls({ onMove, onA, onB }) {
    const keyLock = { up:false, down:false, left:false, right:false };
  
    // === キーボード操作 ===
    window.addEventListener("keydown", e => {
      if (e.key === "ArrowUp" && !keyLock.up) { keyLock.up = true; onMove("up"); }
      if (e.key === "ArrowDown" && !keyLock.down) { keyLock.down = true; onMove("down"); }
      if (e.key === "ArrowLeft" && !keyLock.left) { keyLock.left = true; onMove("left"); }
      if (e.key === "ArrowRight" && !keyLock.right) { keyLock.right = true; onMove("right"); }
      if (["z","Z","Enter"].includes(e.key)) onA();
      if (["x","X","Escape"].includes(e.key)) onB();
    });
    window.addEventListener("keyup", e => {
      if (e.key === "ArrowUp") keyLock.up = false;
      if (e.key === "ArrowDown") keyLock.down = false;
      if (e.key === "ArrowLeft") keyLock.left = false;
      if (e.key === "ArrowRight") keyLock.right = false;
    });
  
    // === スマホタッチ D-PAD ===
    function bindButton(el, onDown) {
      el.addEventListener("touchstart", e => { e.preventDefault(); onDown(); });
      el.addEventListener("mousedown", e => { e.preventDefault(); onDown(); });
    }
  
    document.querySelectorAll("#dpad button").forEach(btn => {
      const dir = btn.dataset.dir;
      if (!dir) return;
      bindButton(btn, () => onMove(dir));
    });
  
    const btnA = document.getElementById("btnA");
    const btnB = document.getElementById("btnB");
    if (btnA) bindButton(btnA, onA);
    if (btnB) bindButton(btnB, onB);
  }

