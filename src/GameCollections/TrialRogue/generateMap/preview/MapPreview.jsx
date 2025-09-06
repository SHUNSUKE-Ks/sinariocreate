import React, { useEffect, useMemo, useRef, useState } from 'react';
import { generateDungeon } from '@/GameCollections/TrialRogue/generateMap/scripts/dungeon_auto_generate';
import { applyBiome } from '@/GameCollections/TrialRogue/generateMap/scripts/biome';
import { autotileWalls } from '@/GameCollections/TrialRogue/generateMap/scripts/autotile';
import { buildTileIndex, drawTilemapToCanvas } from '@/GameCollections/TrialRogue/generateMap/scripts/tilemap_auto_generate';
import tileJsoncRaw from '@/GameCollections/TrialRogue/generateMap/data/map_tile_list.jsonc?raw';
import { gridToCSV, downloadText } from '@/GameCollections/TrialRogue/generateMap/scripts/export_grid';

const TILE_SIZE = 16;

export default function MapPreview() {
  const canvasRef = useRef(null);
  const [seed, setSeed] = useState(1001);
  const [diff, setDiff] = useState(1);
  const [size, setSize] = useState({ w: 48, h: 28 });

  const tileIndex = useMemo(() => {
    // Parse JSONC by removing // and /* */ comments
    const stripped = tileJsoncRaw
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/(^|\n)\s*\/\/.*(?=\n|$)/g, '$1');
    try {
      const json = JSON.parse(stripped);
      return buildTileIndex(json);
    } catch {
      return {};
    }
  }, []);

  const regenAndDraw = () => {
    const { grid } = generateDungeon({ width: size.w, height: size.h, seed: Number(seed) });
    applyBiome(grid, { difficulty: Number(diff) });
    autotileWalls(grid);
    drawTilemapToCanvas(canvasRef.current, grid, tileIndex, TILE_SIZE);
    return grid;
  };

  useEffect(() => {
    regenAndDraw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDownloadCSV = () => {
    const { grid } = generateDungeon({ width: size.w, height: size.h, seed: Number(seed) });
    applyBiome(grid, { difficulty: Number(diff) });
    const csv = gridToCSV(grid);
    downloadText(`grid_${size.w}x${size.h}_seed${seed}.csv`, csv);
  };

  return (
    <div style={{ padding: '16px' }}>
      <h2>TrialRogue Map Preview</h2>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: 12 }}>
        <label>Seed: <input type="number" value={seed} onChange={e => setSeed(e.target.value)} style={{ width: 100 }} /></label>
        <label>Diff: <input type="number" min={1} max={3} value={diff} onChange={e => setDiff(e.target.value)} style={{ width: 60 }} /></label>
        <label>W: <input type="number" min={16} max={96} value={size.w} onChange={e => setSize(s => ({ ...s, w: Number(e.target.value) }))} style={{ width: 80 }} /></label>
        <label>H: <input type="number" min={12} max={64} value={size.h} onChange={e => setSize(s => ({ ...s, h: Number(e.target.value) }))} style={{ width: 80 }} /></label>
        <button onClick={regenAndDraw}>Generate & Draw</button>
        <button onClick={onDownloadCSV}>Download CSV</button>
      </div>
      <canvas ref={canvasRef} className="tile-canvas" style={{ border: '1px solid #333' }} />
    </div>
  );
}
