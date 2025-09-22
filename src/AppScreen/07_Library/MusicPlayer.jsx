import React, { useEffect, useMemo, useRef, useState } from 'react';

export default function MusicPlayer() {
  // Load all audio under GameBGM as URLs (use relative glob for reliability)
  const tracks = useMemo(() => {
    const files = import.meta.glob('../../assets/GameBGM/*', { query: '?url', import: 'default', eager: true });
    const list = Object.entries(files).map(([path, url]) => {
      const parts = path.split('/');
      const base = parts[parts.length - 1];
      let name = base;
      try { name = decodeURIComponent(base); } catch {}
      return { name, url };
    });
    list.sort((a, b) => a.name.localeCompare(b.name, 'ja'));
    return list;
  }, []);

  const audioRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setProgress(a.currentTime);
    const onDur = () => setDuration(a.duration || 0);
    a.addEventListener('timeupdate', onTime);
    a.addEventListener('loadedmetadata', onDur);
    return () => {
      a.removeEventListener('timeupdate', onTime);
      a.removeEventListener('loadedmetadata', onDur);
    };
  }, []);

  useEffect(() => {
    const a = audioRef.current; if (!a) return;
    a.src = tracks[index]?.url || '';
    if (playing) a.play().catch(() => setPlaying(false));
  }, [index]);

  const togglePlay = () => {
    const a = audioRef.current; if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play().then(() => setPlaying(true)).catch(() => {}); }
  };
  const next = () => { if (tracks.length) setIndex(i => (i + 1) % tracks.length); };
  const prev = () => { if (tracks.length) setIndex(i => (i - 1 + tracks.length) % tracks.length); };
  const onSeek = (e) => {
    const val = Number(e.target.value);
    const a = audioRef.current; if (!a) return;
    a.currentTime = val; setProgress(val);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Music Player</h2>
      <div className="p-4 bg-gray-800 rounded border border-gray-700">
        <div className="text-sm text-gray-300 mb-2">{tracks[index]?.name || 'No track'}</div>
        <div className="flex items-center gap-2 mb-2">
          <button className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600" onClick={prev} disabled={!tracks.length}>Prev</button>
          <button className="px-3 py-1 rounded bg-sky-700 hover:bg-sky-600 disabled:opacity-50" onClick={togglePlay} disabled={!tracks.length}>{playing ? 'Pause' : 'Play'}</button>
          <button className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600" onClick={next} disabled={!tracks.length}>Next</button>
        </div>
        <input type="range" min="0" max={duration || 0} step="0.01" value={Math.min(progress, duration || 0)} onChange={onSeek} className="w-full" disabled={!tracks.length} />
        <div className="text-xs text-gray-400 mt-1">{progress.toFixed(1)} / {duration ? duration.toFixed(1) : '0.0'} sec</div>
        <audio ref={audioRef} preload="metadata" />
      </div>

      <div>
        <h3 className="text-lg mb-2">Tracks</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {tracks.length === 0 && (
            <li className="text-gray-400">No audio files found in src/assets/GameBGM</li>
          )}
          {tracks.map((t, i) => (
            <li key={t.url}>
              <button onClick={() => { setIndex(i); setPlaying(true); }}
                className={`w-full text-left px-3 py-2 rounded border ${i===index? 'bg-gray-700 border-sky-600' : 'bg-gray-800 border-gray-700 hover:bg-gray-700'}`}>
                {t.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
