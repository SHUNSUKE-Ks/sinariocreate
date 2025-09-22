import React, { useMemo } from 'react';

export default function TileTestScreen() {
  // Load all SVGs in the tiles folder as URLs (reliable relative glob)
  const tiles = useMemo(() => {
    const files = import.meta.glob('../generateMap/assets/tiles/svg/*', {
      query: '?url',
      import: 'default',
      eager: true
    });
    const list = Object.entries(files).map(([path, url]) => {
      const parts = path.split('/');
      const name = parts[parts.length - 1];
      return { name, url };
    });
    list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ color: 'white', marginBottom: 12 }}>Tile Test</h2>
      <div style={{ color: '#9aa', marginBottom: 12 }}>
        フォルダ: src/GameCollections/TrialRogue/generateMap/assets/tiles/svg
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: 12
      }}>
        {tiles.map(t => (
          <div key={t.name} style={{ background: '#111', padding: 12, borderRadius: 8, border: '1px solid #333' }}>
            <div style={{ color: '#ddd', marginBottom: 8, fontSize: 12 }}>{t.name}</div>
            <img src={t.url} alt={t.name} style={{ width: 64, height: 64, imageRendering: 'pixelated' }} />
          </div>
        ))}
      </div>
    </div>
  );
}
