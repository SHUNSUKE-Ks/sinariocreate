// Build a tile index from jsonc-like structure { basePath, tiles: [{id,path,type,...}] }
export function buildTileIndex(tileJson) {
  if (!tileJson || !Array.isArray(tileJson.tiles)) return {};
  const base = tileJson.basePath || '';
  const index = {};
  for (const t of tileJson.tiles) {
    index[t.id] = {
      id: t.id,
      url: `${base}/${t.path}`.replace(/\\/g, '/'),
      type: t.type,
      passable: !!t.passable,
      blocksLOS: !!t.blocksLOS,
      cost: t.cost ?? null,
    };
  }
  return index;
}

// Simple canvas renderer for MVP using colors by tile type/ID.
export async function drawTilemapToCanvas(canvas, grid, tileIndex = {}, tileSize = 16) {
  if (!canvas) return;
  const h = grid.length;
  const w = grid[0]?.length || 0;
  const pxW = w * tileSize;
  const pxH = h * tileSize;
  if (canvas.width !== pxW) canvas.width = pxW;
  if (canvas.height !== pxH) canvas.height = pxH;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, pxW, pxH);

  const colorFor = (id) => {
    if (id === 'floor_basic') return '#777';
    if (id === 'wall_basic') return '#222';
    if (id === 'stairs_down') return '#e0c341';
    if (id === 'water_shore') return '#2c6fbf';
    return '#ff00ff';
  };

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const id = grid[y][x];
      ctx.fillStyle = colorFor(id);
      ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  }
}

