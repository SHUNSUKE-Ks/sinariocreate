import React, { useMemo } from 'react';
import mdRaw from '../../../01_doc/TalkLog.md?raw';
import knightJsoncRaw from '@/assets/characterImageList/Knight/00_Exp_Knight.jsonc?raw';
import witchJsoncRaw from '@/assets/characterImageList/Witch/00_Exp_Witch.jsonc?raw';

const parseJSONC = (raw) => {
  if (!raw) return {};
  try { return JSON.parse(raw.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|\n)\s*\/\/.*(?=\n|$)/g, '$1')); }
  catch { return {}; }
};

function useCharacterExpressions() {
  const kImgs = useMemo(() => {
    const files = import.meta.glob('../../assets/characterImageList/Knight/*', { query: '?url', import: 'default', eager: true });
    const m = {}; Object.entries(files).forEach(([p, url]) => { m[p.split('/').pop()] = url; });
    return m;
  }, []);
  const wImgs = useMemo(() => {
    const files = import.meta.glob('../../assets/characterImageList/Witch/*', { query: '?url', import: 'default', eager: true });
    const m = {}; Object.entries(files).forEach(([p, url]) => { m[p.split('/').pop()] = url; });
    return m;
  }, []);
  const k = useMemo(() => parseJSONC(knightJsoncRaw), []);
  const w = useMemo(() => parseJSONC(witchJsoncRaw), []);
  const toList = (label, json, imgs) => (json.expressions || []).map(e => ({ who: label, id: e.id, url: imgs[(e.image_path||'').split('/').pop()] })).filter(x => x.url);
  return [...toList('Knight', k, kImgs), ...toList('Witch', w, wImgs)];
}

export default function TalkLogScreen() {
  const expressions = useCharacterExpressions();
  return (
    <div className="p-4 text-white bg-gray-900 min-h-full" style={{ whiteSpace: 'pre-wrap' }}>
      <h1 className="text-2xl font-bold mb-4">TalkLog</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <article className="md:col-span-2 p-4 bg-gray-800 rounded border border-gray-700" dangerouslySetInnerHTML={{ __html: mdRaw.replace(/</g,'&lt;') }} />
        <aside className="p-4 bg-gray-800 rounded border border-gray-700">
          <h2 className="text-lg font-semibold mb-2">Character Expressions</h2>
          <div className="grid grid-cols-2 gap-2">
            {expressions.map((ex, i) => (
              <div key={i} className="flex items-center gap-2">
                <img src={ex.url} alt={`${ex.who}-${ex.id}`} className="w-10 h-10 object-contain rounded" />
                <div className="text-sm text-gray-300">{ex.who}: {ex.id}</div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
