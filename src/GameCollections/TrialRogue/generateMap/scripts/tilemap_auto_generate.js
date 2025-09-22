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

// Eagerly map tile SVGs to URLs via Vite. Keys are full paths; values are built URLs.
const __svgUrlMap = import.meta && typeof import.meta.glob === 'function'
  ? import.meta.glob('@/GameCollections/TrialRogue/generateMap/assets/tiles/svg/*', { query: '?url', import: 'default', eager: true })
  : {};

const __imgCache = new Map(); // url -> HTMLImageElement

function resolveAssetUrl(requested) {
  if (!requested) return null;
  // If already a public/absolute URL, return as-is
  if (/^(?:https?:)?\//.test(requested)) return requested;
  // Match by file name at the end of path
  const file = requested.split('/').pop();
  for (const [key, url] of Object.entries(__svgUrlMap)) {
    if (key.endsWith('/' + file)) return url;
  }
  return null;
}

async function getImage(url) {
  if (!url) return null;
  if (__imgCache.has(url)) return __imgCache.get(url);
  const img = new Image();
  img.decoding = 'async';
  img.src = url;
  __imgCache.set(url, img);
  // no await of onload to avoid blocking; caller should fallback until complete
  return img;
}

export async function preloadTileImages(tileIndex = {}) {
  const urls = new Set();
  for (const key of Object.keys(tileIndex)) {
    const info = tileIndex[key];
    if (!info || !info.url) continue;
    const resolved = resolveAssetUrl(info.url);
    if (resolved) urls.add(resolved);
  }
  const loaders = Array.from(urls).map(u => new Promise((res) => {
    const img = new Image();
    img.onload = () => res(true);
    img.onerror = () => res(false);
    img.src = u;
    __imgCache.set(u, img);
  }));
  await Promise.all(loaders);
}

// Canvas renderer: tries to draw tile images; falls back to color fill.
export async function drawTilemapToCanvas(canvas, grid, tileIndex = {}, tileSize = 16, options = {}) {
  const { colorsOnly = false } = options;
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
      const info = tileIndex[id];
      let drawn = false;
      if (!colorsOnly && info && info.url) {
        const url = resolveAssetUrl(info.url);
        if (url) {
          const img = await getImage(url);
          if (img && img.complete) {
            ctx.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize);
            drawn = true;
          }
        }
      }
      if (!drawn) {
        ctx.fillStyle = colorFor(id);
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }
  }
}
