import React, { useEffect, useRef, useMemo, useState } from 'react';
import keymapRaw from '@/GameCollections/TrialRogue/data/keymaps/combat_keymap.jsonc?raw';
import { generateDungeon } from '@/GameCollections/TrialRogue/generateMap/scripts/dungeon_auto_generate';
import tileJsoncRaw from '@/GameCollections/TrialRogue/generateMap/data/map_tile_list.jsonc?raw';
import { buildTileIndex, drawTilemapToCanvas, preloadTileImages } from '@/GameCollections/TrialRogue/generateMap/scripts/tilemap_auto_generate';
import BattleFieldLayer from '@/GameCollections/TrialRogue/03_Battle/layers/BattleFieldLayer.jsx';
import CharacterLayer from '@/GameCollections/TrialRogue/03_Battle/layers/CharacterLayer.jsx';
import BattleMapLayer from '@/GameCollections/TrialRogue/03_Battle/layers/BattleMapLayer.jsx';

const TILE = 16;
const W = 48; // tiles
const H = 28; // tiles

function parseJSONC(raw) {
  if (!raw) return {};
  try {
    const stripped = raw
      .replace(/\/\*[\s\S]*?\*\//g, '') // block comments
      // line comments not preceded by ':' (to avoid stripping http://)
      .replace(/(^|[^:\\])\/\/.*$/gm, '$1');
    return JSON.parse(stripped);
  } catch (e) {
    console.warn('JSONC parse failed:', e);
    return {};
  }
}

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

export default function BattleScreen() {
  const [overlay, setOverlay] = useState(null); // 'win' | 'lose' | null
  const fieldRef = useRef(null);
  const charRef = useRef(null);
  const mapRef = useRef(null);

  // Parse config data
  const keymap = useMemo(() => parseJSONC(keymapRaw), []);
  const tileIndex = useMemo(() => {
    try { return buildTileIndex(parseJSONC(tileJsoncRaw)); } catch { return {}; }
  }, []);

  // Generate dungeon grid and entry
  const dungeon = useMemo(() => generateDungeon({ width: W, height: H, seed: 20250907 }), []);

  const passableAt = (x, y) => {
    if (!dungeon?.grid?.[y]?.[x]) return false;
    const id = dungeon.grid[y][x];
    const info = tileIndex[id];
    return info ? !!info.passable : id !== 'wall_basic';
  };

  const findNearbyFloor = (sx, sy) => {
    // simple spiral search for first passable cell
    for (let r = 0; r < Math.max(W, H); r++) {
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          const x = clamp(sx + dx, 0, W - 1);
          const y = clamp(sy + dy, 0, H - 1);
          if (passableAt(x, y)) return { x, y };
        }
      }
    }
    return { x: sx, y: sy };
  };

  const stateRef = useRef(null);
  if (!stateRef.current) {
    const entry = dungeon.entry || { x: 4, y: 4 };
    const stairs = dungeon.stairs || { x: 40, y: 20 };
    const p0 = findNearbyFloor(entry.x, entry.y);
    const e0 = findNearbyFloor(stairs.x, stairs.y);
    const i0 = findNearbyFloor(Math.floor(W / 2), Math.floor(H / 2));
    // make a draw-only grid that hides stairs (treat as floor)
    const gridForDraw = (dungeon.grid || []).map(row => row.map(id => (id === 'stairs_down' ? 'floor_basic' : id)));
    stateRef.current = {
      player: { name: 'Player', x: p0.x, y: p0.y, hp: 30, at: 8, df: 2, color: '#FFD54F' },
      enemy:  { name: 'Enemy',  x: e0.x, y: e0.y, hp: 20, at: 5, df: 1, color: '#EF5350' },
      item:   { name: 'Item1',  x: i0.x, y: i0.y, type: 'hp', val: 10, color: '#64B5F6' },
      grid: dungeon.grid,
      gridForDraw,
    };
  }

  // Build action maps from keymap profiles
  const { actionForKey, deltaForAction } = useMemo(() => {
    const actions = Array.isArray(keymap.actions) ? keymap.actions : [];
    const profile = keymap?.profiles?.PC_Default?.keyboard || [];
    const aIdToDelta = {};
    for (const a of actions) {
      if (a.cat === 'move' && a.payload && typeof a.payload.dx === 'number' && typeof a.payload.dy === 'number') {
        aIdToDelta[a.id] = { dx: a.payload.dx, dy: a.payload.dy };
      }
    }
    const keyToAction = {};
    for (const bind of profile) {
      if (!bind || !bind.action) continue;
      const arr = Array.isArray(bind.keys) ? bind.keys : [];
      for (const k of arr) {
        if (!k) continue;
        keyToAction[k] = bind.action;
        // heuristic: also map lowercase of character keys to convenience
        if (/^Key[A-Z]$/.test(k)) keyToAction[k.replace('Key', '').toLowerCase()] = bind.action;
        if (k.startsWith('Arrow')) keyToAction[k] = bind.action; // already exact
        if (k === 'Space' || k === 'Spacebar' || k === ' ') keyToAction[' '] = bind.action;
      }
    }
    // Fallback for WASD/QEZC/Arrows if profile empty
    if (Object.keys(keyToAction).length === 0) {
      Object.assign(keyToAction, {
        ArrowUp: 'move.n', ArrowDown: 'move.s', ArrowLeft: 'move.w', ArrowRight: 'move.e',
        w: 'move.n', s: 'move.s', a: 'move.w', d: 'move.e', q: 'move.nw', e: 'move.ne', z: 'move.sw', c: 'move.se',
        ' ': 'wait', Enter: 'wait'
      });
    }
    return { actionForKey: keyToAction, deltaForAction: aIdToDelta };
  }, [keymap]);

  const draw = () => {
    const ctx = canvasRef.current.getContext('2d');
    const { player, enemy, item, gridForDraw } = stateRef.current;
    const px = player.x * TILE, py = player.y * TILE;
    const ex = enemy.x * TILE,  ey = enemy.y * TILE;
    const ix = item ? item.x * TILE : -1000; const iy = item ? item.y * TILE : -1000;

    // draw dungeon background
    drawTilemapToCanvas(canvasRef.current, gridForDraw, tileIndex, TILE);

    // item (blue circle)
    if (item) {
      ctx.fillStyle = item.color;
      ctx.beginPath(); ctx.arc(ix + TILE/2, iy + TILE/2, 6, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = '#cfe';
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

    // overlay
    if (overlay) {
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(0, 0, W*TILE, H*TILE);
      ctx.fillStyle = overlay === 'win' ? '#8ef58e' : '#ff9a9a';
      ctx.font = '28px sans-serif';
      const text = overlay === 'win' ? 'Stage Clear' : 'Game Over';
      ctx.fillText(text, 24, 48);
    }
  };

  const isAdjacent = (ax, ay, bx, by) => Math.max(Math.abs(ax - bx), Math.abs(ay - by)) === 1;

  const redraw = () => {
    const st = stateRef.current;
    fieldRef.current?.draw({ grid: st.gridForDraw, tileIndex });
    charRef.current?.draw({ player: st.player, enemy: st.enemy, item: st.item, overlay });
    mapRef.current?.draw();
  };

  const enemyAttackIfAdjacent = () => {
    const st = stateRef.current; const { player, enemy } = st;
    if (isAdjacent(player.x, player.y, enemy.x, enemy.y)) {
      const dmg = Math.max(0, enemy.at - player.df);
      player.hp = Math.max(0, player.hp - dmg);
      if (player.hp <= 0) setOverlay('lose');
    }
  };

  const enemyStep = () => {
    const st = stateRef.current; const { player, enemy } = st;
    // if adjacent, attack and don't move
    if (isAdjacent(player.x, player.y, enemy.x, enemy.y)) {
      enemyAttackIfAdjacent();
      return;
    }
    let dx = Math.sign(player.x - enemy.x);
    let dy = Math.sign(player.y - enemy.y);
    if (Math.abs(player.x - enemy.x) >= Math.abs(player.y - enemy.y)) dy = 0; else dx = 0;
    const nx = clamp(enemy.x + dx, 0, W-1);
    const ny = clamp(enemy.y + dy, 0, H-1);
    if (passableAt(nx, ny) && !(nx === st.player.x && ny === st.player.y)) {
      enemy.x = nx; enemy.y = ny;
    }
    enemyAttackIfAdjacent();
  };

  const tryMovePlayer = (dx, dy) => {
    if (overlay) return;
    const st = stateRef.current; const { player, enemy } = st;
    const nx = clamp(player.x + dx, 0, W-1);
    const ny = clamp(player.y + dy, 0, H-1);

    // wall collision
    if (!passableAt(nx, ny)) { redraw(); return; }

    // attack if moving into enemy
    if (nx === enemy.x && ny === enemy.y) {
      const dmg = Math.max(0, player.at - enemy.df);
      enemy.hp = Math.max(0, enemy.hp - dmg);
      if (enemy.hp <= 0) setOverlay('win');
    } else {
      player.x = nx; player.y = ny;
      // pickup item
      if (st.item && player.x === st.item.x && player.y === st.item.y) {
        player.hp += st.item.val;
        st.item = null;
      }
      // enemy turn
      enemyStep();
    }
    redraw();
  };

  useEffect(() => {
    redraw();
    // Preload tile images, then redraw once they are ready
    preloadTileImages(tileIndex).then(() => redraw());
    const onKey = (e) => {
      if (overlay) return;
      const code = e.code || '';
      const key = e.key || '';
      const action = actionForKey[code] || actionForKey[key];
      if (action) {
        e.preventDefault();
        if (action.startsWith('move.')) {
          const d = deltaForAction[action];
          if (d) tryMovePlayer(d.dx, d.dy);
        } else if (action === 'wait' || key === ' ' || key === 'Enter') {
          enemyStep(); redraw();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overlay, actionForKey, deltaForAction]);

  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ color: 'white', marginBottom: 8 }}>Battle Field</h2>
      <div style={{ color: '#bbb', marginBottom: 8 }}>キー操作は keymap profiles に準拠（PC_Default）。</div>
      <div style={{ position: 'relative', width: W * TILE, height: H * TILE, border: '1px solid #333' }}>
        <BattleFieldLayer ref={fieldRef} width={W} height={H} tileSize={TILE} />
        <CharacterLayer ref={charRef} width={W} height={H} tileSize={TILE} />
        <BattleMapLayer ref={mapRef} grid={stateRef.current.gridForDraw} scale={4} />
      </div>
    </div>
  );
}
