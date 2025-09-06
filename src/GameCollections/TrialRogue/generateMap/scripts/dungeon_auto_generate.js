// Simple deterministic PRNG (mulberry32)
function mulberry32(seed) {
  let t = seed >>> 0;
  return function () {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

// Tile IDs per spec examples
const TILE = {
  WALL: 'wall_basic',
  FLOOR: 'floor_basic',
  STAIRS: 'stairs_down',
};

export function generateDungeon({
  width = 48,
  height = 28,
  roomCount = 6,
  minRoom = 4,
  maxRoom = 8,
  seed = 1001,
} = {}) {
  const rnd = mulberry32(seed);

  // Create filled grid with walls
  const grid = Array.from({ length: height }, () => Array.from({ length: width }, () => TILE.WALL));

  function carveRoom(x, y, w, h) {
    const x2 = Math.min(width - 2, x + w);
    const y2 = Math.min(height - 2, y + h);
    for (let j = y; j <= y2; j++) {
      for (let i = x; i <= x2; i++) {
        grid[j][i] = TILE.FLOOR;
      }
    }
  }

  function carveCorridor(x1, y1, x2, y2) {
    // Simple L-shaped corridor
    let x = x1, y = y1;
    while (x !== x2) {
      grid[y][x] = TILE.FLOOR;
      x += x < x2 ? 1 : -1;
    }
    while (y !== y2) {
      grid[y][x] = TILE.FLOOR;
      y += y < y2 ? 1 : -1;
    }
  }

  // Place rooms
  const centers = [];
  for (let r = 0; r < roomCount; r++) {
    const rw = Math.floor(rnd() * (maxRoom - minRoom + 1)) + minRoom;
    const rh = Math.floor(rnd() * (maxRoom - minRoom + 1)) + minRoom;
    const rx = 1 + Math.floor(rnd() * Math.max(1, width - rw - 2));
    const ry = 1 + Math.floor(rnd() * Math.max(1, height - rh - 2));
    carveRoom(rx, ry, rw, rh);
    centers.push({ x: Math.floor(rx + rw / 2), y: Math.floor(ry + rh / 2) });
  }

  // Connect room centers
  for (let i = 1; i < centers.length; i++) {
    const a = centers[i - 1];
    const b = centers[i];
    carveCorridor(a.x, a.y, b.x, b.y);
  }

  // Choose entry (first center) and stairs (last center)
  const entry = centers[0] || { x: 2, y: 2 };
  const stairs = centers[centers.length - 1] || { x: width - 3, y: height - 3 };
  grid[stairs.y][stairs.x] = TILE.STAIRS;

  return { grid, entry, stairs };
}

export const TILE_IDS = TILE;

