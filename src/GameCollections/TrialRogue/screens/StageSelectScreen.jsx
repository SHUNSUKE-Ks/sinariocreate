import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function StageSelectScreen() {
  const nav = useNavigate();
  const go = (id) => nav(`/trialrogue/loading?stage=${id}`);
  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ color: 'white', marginBottom: 12 }}>Stage Select</h2>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button onClick={() => go(1)} className="btn">Stage 1</button>
        <button onClick={() => go(2)} className="btn">Stage 2</button>
      </div>
    </div>
  );
}

