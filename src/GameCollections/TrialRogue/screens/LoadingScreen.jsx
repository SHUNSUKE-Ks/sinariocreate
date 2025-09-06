import React, { useEffect, useMemo, useState } from 'react';
import keymapRaw from '@/GameCollections/TrialRogue/data/keymaps/combat_keymap.jsonc?raw';
import { useNavigate, useSearchParams } from 'react-router-dom';

function parseJSONC(raw) {
  const stripped = raw
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|\n)\s*\/\/.*(?=\n|$)/g, '$1');
  try { return JSON.parse(stripped); } catch { return {}; }
}

export default function LoadingScreen() {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const [ready, setReady] = useState(false);
  const data = useMemo(() => parseJSONC(keymapRaw), []);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 800); // fake preload
    return () => clearTimeout(t);
  }, []);

  const goNext = () => {
    if (!ready) return;
    const stage = params.get('stage') ?? '1';
    nav(`/trialrogue/battle?stage=${stage}`);
  };

  return (
    <div onClick={goNext} style={{ padding: 16, cursor: ready ? 'pointer' : 'wait' }}>
      <h2 style={{ color: 'white', marginBottom: 8 }}>Loading...</h2>
      <div style={{ color: '#ddd', fontSize: 14, marginBottom: 12 }}>チュートリアル（クリックで進む）</div>
      <ul style={{ color: '#cfe', lineHeight: 1.6 }}>
        {(data.actions ?? []).map((a) => (
          <li key={a.id}>{a.name}（{a.id}）</li>
        ))}
      </ul>
      <div style={{ color: ready ? '#0f0' : '#aaa', marginTop: 12 }}>{ready ? '準備完了：クリックでバトルへ' : '読み込み中...'}</div>
    </div>
  );
}

