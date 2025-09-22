import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { drawTilemapToCanvas, preloadTileImages } from '@/GameCollections/TrialRogue/generateMap/scripts/tilemap_auto_generate';

const BattleFieldLayer = forwardRef(function BattleFieldLayer({ width, height, tileSize }, ref) {
  const canvasRef = useRef(null);

  const lastIndexSig = useRef('');

  useImperativeHandle(ref, () => ({
    draw: async ({ grid, tileIndex }) => {
      if (!canvasRef.current || !grid) return;
      // Force color-mode for stable display per request
      await drawTilemapToCanvas(canvasRef.current, grid, tileIndex, tileSize, { colorsOnly: true });
      // 2nd pass: preload once per tile set, then redraw with images
      const sig = Object.keys(tileIndex || {}).sort().join('|');
      if (lastIndexSig.current !== sig) {
        lastIndexSig.current = sig;
        try {
          await preloadTileImages(tileIndex);
          await drawTilemapToCanvas(canvasRef.current, grid, tileIndex, tileSize, { colorsOnly: true });
        } catch {
          /* ignore */
        }
      }
    },
    getCanvas: () => canvasRef.current,
  }));

  return (
    <canvas ref={canvasRef} width={width * tileSize} height={height * tileSize}
      style={{ position: 'absolute', inset: 0, zIndex: 10 }} />
  );
});

export default BattleFieldLayer;
