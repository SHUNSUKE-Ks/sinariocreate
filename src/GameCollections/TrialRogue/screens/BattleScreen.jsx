import React, { useEffect, useRef, useMemo } from 'react';

const TILE = 16;
const W = 48; // tiles
const H = 28; // tiles

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

export default function BattleScreen() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    player: { name: 'Player', x: 4, y: 4, hp: 30, at: 8, df: 2, color: '#FFD54F' },
    enemy:  { name: 'Enemy',  x: 20, y: 10, hp: 20, at: 5, df: 1, color: '#EF5350' },
    item:   { name: 'Item1',  x: 12, y: 8, type: 'hp', val: 10, color: '#64B5F6' },
  });

  const keyToDelta = useMemo(() => ({
    ArrowUp:    { dx: 0,  dy: -1 },
    ArrowDown:  { dx: 0,  dy: 1 },
    ArrowLeft:  { dx: -1, dy: 0 },
    ArrowRight: { dx: 1,  dy: 0 },
    w: { dx: 0,  dy: -1 }, s: { dx: 0,  dy: 1 }, a: { dx: -1, dy: 0 }, d: { dx: 1, dy: 0 },
    q: { dx: -1, dy: -1 }, e: { dx: 1, dy: -1 }, z: { dx: -1, dy: 1 }, c: { dx: 1, dy: 1 },
  }), []);

  const draw = () => {
    const ctx = canvasRef.current.getContext('2d');
    const { player, enemy, item } = stateRef.current;
    const px = player.x * TILE, py = player.y * TILE;
    const ex = enemy.x * TILE,  ey = enemy.y * TILE;
    const ix = item ? item.x * TILE : -1000; const iy = item ? item.y * TILE : -1000;

    // clear
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, W * TILE, H * TILE);

    // simple grid
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 1;
    for (let x = 0; x <= W; x++) { ctx.beginPath(); ctx.moveTo(x*TILE, 0); ctx.lineTo(x*TILE, H*TILE); ctx.stroke(); }
    for (let y = 0; y <= H; y++) { ctx.beginPath(); ctx.moveTo(0, y*TILE); ctx.lineTo(W*TILE, y*TILE); ctx.stroke(); }

    // item (blue circle)
    if (item) {
      ctx.fillStyle = item.color;
      ctx.beginPath(); ctx.arc(ix + TILE/2, iy + TILE/2, 6, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = '#9cf';
      ctx.font = '12px sans-serif';
      ctx.fillText(`${item.name}: HP+${item.val}`, ix + 10, iy - 4);
    }

    // enemy (red square)
    ctx.fillStyle = enemy.color; ctx.fillRect(ex+2, ey+2, TILE-4, TILE-4);
    ctx.fillStyle = '#faa'; ctx.font = '12px sans-serif';
    ctx.fillText(`${enemy.name} HP:${enemy.hp} AT:${enemy.at} DF:${enemy.df}`, ex + 10, ey - 4);

    // player (yellow square)
    ctx.fillStyle = player.color; ctx.fillRect(px+2, py+2, TILE-4, TILE-4);
    ctx.fillStyle = '#ff8'; ctx.font = '12px sans-serif';
    ctx.fillText(`${player.name} HP:${player.hp} AT:${player.at} DF:${player.df}`, px + 10, py - 4);
  };

  const enemyStep = () => {
    const st = stateRef.current; const { player, enemy } = st;
    let dx = Math.sign(player.x - enemy.x);
    let dy = Math.sign(player.y - enemy.y);
    // prefer axis with larger distance
    if (Math.abs(player.x - enemy.x) >= Math.abs(player.y - enemy.y)) dy = 0; else dx = 0;
    enemy.x = clamp(enemy.x + dx, 0, W-1);
    enemy.y = clamp(enemy.y + dy, 0, H-1);
  };

  const tryMovePlayer = (dx, dy) => {
    const st = stateRef.current; const { player, enemy } = st;
    const nx = clamp(player.x + dx, 0, W-1);
    const ny = clamp(player.y + dy, 0, H-1);

    // attack if moving into enemy
    if (nx === enemy.x && ny === enemy.y) {
      const dmg = Math.max(0, player.at - enemy.df);
      enemy.hp = Math.max(0, enemy.hp - dmg);
      // enemy defeated doesn't block cell
      if (enemy.hp <= 0) {
        // remove enemy by moving off-grid
        enemy.x = -999; enemy.y = -999;
      }
    } else {
      player.x = nx; player.y = ny;
      // pickup item
      if (st.item && player.x === st.item.x && player.y === st.item.y) {
        player.hp += st.item.val;
        st.item = null;
      }
      // simple enemy reaction turn
      enemyStep();
    }
    draw();
  };

  useEffect(() => {
    const c = canvasRef.current; c.width = W*TILE; c.height = H*TILE; draw();
    const onKey = (e) => {
      const k = e.key; const d = keyToDelta[k];
      if (d) { e.preventDefault(); tryMovePlayer(d.dx, d.dy); }
      if (k === ' ' || k === 'Enter') { e.preventDefault(); enemyStep(); draw(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ color: 'white', marginBottom: 8 }}>Battle Field</h2>
      <div style={{ color: '#bbb', marginBottom: 8 }}>矢印/WASD で移動, Q/E/Z/C で斜め, Space/Enter で待機</div>
      <canvas ref={canvasRef} style={{ border: '1px solid #333' }} />
    </div>
  );
}

