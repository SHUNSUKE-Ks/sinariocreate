// Apply a simple biome adjustment for MVP.
// For difficulty > 1, sprinkle some water at the borders to demonstrate change.
export function applyBiome(grid, { difficulty = 1, biome = 'basic' } = {}) {
  if (!Array.isArray(grid) || grid.length === 0) return grid;
  if (difficulty <= 1 && biome === 'basic') return grid;

  const H = grid.length;
  const W = grid[0].length;
  const WATER = 'water_shore';

  for (let x = 1; x < W - 1; x++) {
    if (grid[1][x] !== 'stairs_down') grid[1][x] = WATER;
    if (grid[H - 2][x] !== 'stairs_down') grid[H - 2][x] = WATER;
  }
  for (let y = 1; y < H - 1; y++) {
    if (grid[y][1] !== 'stairs_down') grid[y][1] = WATER;
    if (grid[y][W - 2] !== 'stairs_down') grid[y][W - 2] = WATER;
  }
  return grid;
}

