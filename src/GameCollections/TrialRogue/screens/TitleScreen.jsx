import React, { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import titleImg from '@/GameCollections/TrialRogue/assets/images/TrialRogue_Title_1920x1080.svg';
import csvRaw from '@/GameCollections/TrialRogue/generateMap/data/MapStage2.csv?raw';
import tileJsoncRaw from '@/GameCollections/TrialRogue/generateMap/data/map_tile_list.jsonc?raw';
import { buildTileIndex, drawTilemapToCanvas } from '@/GameCollections/TrialRogue/generateMap/scripts/tilemap_auto_generate';
import uiStartFrame from '@/assets/UI/ui_button_frame_320x80.svg';

export default function TitleScreen() {
  const nav = useNavigate();
  const goNext = () => nav('/trialrogue/stage-select');
  const canvasRef = useRef(null);

  const parseJSONC = (raw) => {
    if (!raw) return {};
    try {
      return JSON.parse(raw.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|\n)\s*\/\/.*(?=\n|$)/g, '$1'));
    } catch { return {}; }
  };

  const tileIndex = useMemo(() => buildTileIndex(parseJSONC(tileJsoncRaw)), []);
  const grid = useMemo(() => {
    return (csvRaw || '')
      .trim()
      .split(/\r?\n/)
      .map(line => line.split(',').map(s => s.trim()));
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !grid?.length) return;
    drawTilemapToCanvas(canvasRef.current, grid, tileIndex, 16, { colorsOnly: true });
  }, [grid, tileIndex]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 16 }}>
      <img
        src={titleImg}
        alt="TrialRogue Title"
        style={{ maxWidth: '100%', height: 'auto', borderRadius: 8, boxShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
        onClick={goNext}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 8, width: '100%', maxWidth: 480 }}>
        <button onClick={goNext} style={{
          padding: 0,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          alignSelf: 'center'
        }} aria-label="Start">
          <div style={{ position: 'relative', width: 320, height: 80 }}>
            <img src={uiStartFrame} alt="Start Button" style={{ width: '100%', height: '100%', display: 'block' }} />
            <span style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#ffffff', fontWeight: 800, fontSize: 24, letterSpacing: 2,
              textShadow: '0 2px 4px rgba(0,0,0,0.6)'
            }}>START</span>
          </div>
        </button>
        <button onClick={() => nav('/trialrogue/tile-test')} style={{
          padding: '12px 16px',
          background: '#6366f1',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
        }}>Tile Test</button>
      </div>

      {/* Section: MapStage2 preview */}
      <div style={{ width: '100%', maxWidth: 480, marginTop: 16 }}>
        <h3 style={{ color: 'white', marginBottom: 8 }}>MapStage2 プレビュー（10x10）</h3>
        <div style={{ border: '1px solid #333', display: 'inline-block' }}>
          <canvas ref={canvasRef} width={160} height={160} />
        </div>
      </div>
    </div>
  );
}
