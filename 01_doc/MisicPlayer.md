了解だよ、マスター。スクショのプレイヤーをベースに、**再現実装できるレベルのレイアウト仕様**と**機能表**、さらに**Component/Hook/データ構造/SVG 資産**まで一気にまとめたよ。（前提：React 19 + Vite / JSX、Android ブラウザ＆PWA 対応、Vercel 想定）

---

# フォルダー構成（提案）

```
src/
  MisicPlayer/          // ←ユーザー指定どおり。hooksもこの配下に集約
    components/
      HeaderBar.jsx
      NowPlayingCard.jsx
      TransportBar.jsx
      ProgressBar.jsx
      PlaybackButtons.jsx
      RepeatShuffleButtons.jsx
      TrackList.jsx
      TrackListItem.jsx
      FilterToggle.jsx
      VolumePopover.jsx
      ContextMenu.jsx
      EmptyState.jsx
    hooks/
      useAudioPlayer.js
      usePlaylist.js
      useProgress.js
      useKeyboardShortcuts.js
      useMediaSession.js
      usePersistedState.js
      useScrollSync.js
    data/
      tracks.sample.json
      playlists.sample.json
    styles/
      player.css
  GameStyles/            // 共通スタイルを後で分離する置き場
```

---

# レイアウト仕様（再現性重視）

### 画面グリッド

- **全体**：`display: grid; grid-template-columns: 48% 52%; grid-template-rows: 64px auto; height: 100dvh;`

  - **Row1（ヘッダー）**：高さ 64px
  - **Row2**：左「NowPlaying」、右「TrackList」

- **背景**：楽曲アートワークをぼかし＆暗幕（`backdrop-filter: blur(12px)` + `background: rgba(0,0,0,.55)`）でスクショ雰囲気に寄せる。

### ヘッダー（Row1 / 全幅）

- 左に「戻る」アイコン、中央にカテゴリ名 **BGM 43/106**、右に**三点メニュー**。
- 文字サイズ：Title 18–20px / Sub 12–13px。行間 1.2。

### 左カラム（NowPlaying）

- **アートワークカルーセル**（中央に現在曲。前後は左右に薄く見切れ表示）

  - 中央カード：縦横 1:1、**min(38vh, 38vw)** を推奨。
  - 前後カード：中央の 0.7 スケール / 0.5 不透明度 / -8px ぼかし。

- タイトル＆サブ（曲名 / パック名）を**アート下**に 2 行で表示。
- **Transport エリア**（スクショ下部の操作列）

  - 行 1：`ProgressBar`（時間ラベル 左：current / 右：total）
  - 行 2：`RepeatShuffleButtons`（左端）、`Prev`、**中央に Play/Pause 丸ボタン**、`Next`、`Like/More`（右端）

- **ミニ FAB（ループ矢印）**：スクショ左下の円形ボタンは`Repeat/Loop`トグルとして配置。

### 右カラム（TrackList）

- ヘッダー：`選択した曲のみ表示`トグル（右上）
- **リストアイテム**高さ：72px（モバイル指標）

  - 左：ミニアート（40px 正方形 / 角丸 6）
  - 中央：曲名（14–15px / semi-bold）＋サブ（12px / ミュートカラー）
  - 右：上下矢印アイコン（並び替え示唆／実装は任意）、再生状態ドット、`…`コンテキスト

- 選択中アイテムは**背景 8%ホワイト**、左の再生インジケータ点灯。

---

# コンポーネント一覧（役割/props/CSS 一言）

> ルールに沿って：**関数の役割/引数/CSS の意味は一言で**

| Component | 役割(一言) | 主要 props（変更できる） | CSS 要点(一言) |  |  |
| --- | --- | --- | --- | --- | --- |
| `HeaderBar` | 画面ヘッダー | `title`(string), `count`(string \| number), `onBack`(fn), `onMenu`(fn) | 固定高さ/左右配置 |  |  |
| `NowPlayingCard` | 現在曲のアート＆メタ | `track`(Track), `prev`(Track\|null), `next`(Track\|null) | 中央拡大+前後縮小 |  |  |
| `TransportBar` | 進行と操作のコンテナ | `isPlaying`(bool), `onPlayPause`(fn), `onPrev`(fn), `onNext`(fn) | グリッド 2 行 |  |  |
| `ProgressBar` | シーク/時間表示 | `current`(number sec), `duration`(number sec), `onSeek`(fn) | 太めバー+触感 |  |  |
| `PlaybackButtons` | 再生/前後 | `isPlaying`, `onPlayPause`, `onPrev`, `onNext` | 丸ボタン影 |  |  |
| `RepeatShuffleButtons` | ループ/シャッフル | `repeatMode`('off' | 'one' | 'all'), `shuffle`(bool), `onToggleRepeat`(fn), `onToggleShuffle`(fn) | アイコン Tint |
| `TrackList` | 右側のリスト | `tracks`(Track\[]), `currentId`(id), `onSelect`(fn), `filterSelected`(bool) | スクロール |  |  |
| `TrackListItem` | リスト 1 行 | `track`(Track), `isActive`(bool), `onClick`(fn) | ホバー/選択強調 |  |  |
| `FilterToggle` | 「選択のみ」トグル | `checked`(bool), `onChange`(fn) | スイッチ UI |  |  |
| `VolumePopover` | 音量調整 | `volume`(0–1), `onChange`(fn) | ポップオーバー |  |  |
| `ContextMenu` | … メニュー | `items`({label,action}\[]) | 浮遊カード |  |  |
| `EmptyState` | 空表示 | `message`(string) | センター配置 |  |  |

---

# Hooks 一覧（役割/引数/戻り値）

| Hook | 役割(一言) | 引数 | 返り値 |
| --- | --- | --- | --- |
| `useAudioPlayer` | `<audio>`制御 | `initialQueue`(Track\[]), `initialIndex`(number=0) | `{audioRef, state:{isPlaying, currentTime, duration, volume, repeatMode, shuffle, index}, controls:{play, pause, toggle, seek, setVolume, next, prev, setRepeatMode, toggleShuffle, loadAt}}` |
| `usePlaylist` | キュー操作 | `tracks`(Track\[]) | `{queue, setQueue, reorder, filterSelected, setFilterSelected, markSelected(id,bool)}` |
| `useProgress` | 進行同期 | `audioRef` | `{currentTime, duration, percent}` |
| `useKeyboardShortcuts` | キー割当 | `bindings?` | `void`（内部でイベント登録） |
| `useMediaSession` | Media Session API | `metadataFromTrack(track)` | `{apply(track), clear()}` |
| `usePersistedState` | localStorage 保持 | `key, initial` | `[value, setValue]` |
| `useScrollSync` | アクティブ行へ自動スクロール | `containerRef, activeIndex` | `void` |

---

# データモデル（JSON 例）

```jsonc
// src/MisicPlayer/data/tracks.sample.json
[
  {
    "id": "bd2_0001",
    "title": "Inevitable Fight",
    "subtitle": "Story pack Battle Theme",
    "album": "BROWNDUST II",
    "artist": "—",
    "duration": 152,
    "artwork": "/assets/art/bd2_placeholder_512.png",
    "src": "/assets/audio/bd2/inevitable_fight.mp3",
    "selected": true,
    "tags": ["battle", "story_pack"]
  }
]
```

```jsonc
// src/MisicPlayer/data/playlists.sample.json
[
  {
    "id": "bgm_all",
    "name": "BGM",
    "tracks": ["bd2_0001", "bd2_0002", "..."]
  }
]
```

---

# 機能表（画面別）

## 共通

- **再生/一時停止/前後/シーク/音量/ミュート**
- **リピート**（off / one / all）、**シャッフル**
- **選択曲のみ表示**トグル
- **現在曲ハイライト & 自動スクロール**
- **バックグラウンド再生**（PWA + Media Session）
- **キーボード**：Space=再生/停止、←/→=5 秒、J/K/L= -10/0/+10、↑/↓=音量、`S`=シャッフル、`R`=リピート
- **長押し/ドラッグ**：ProgressBar シーク、ボリュームスライダー
- **ローカル永続化**：音量/リピート/シャッフル/最後の曲を保存

## HeaderBar

- Back ナビゲーション / メニュー（並び替え、選択のみ、全て表示 など）

## NowPlaying（左）

- カードカルーセル（prev/next をタップで移動）
- タイトル/サブタイトル表示
- Transport（Progress + ボタン群）
- ミニ FAB ＝ Repeat トグル

## TrackList（右）

- リスト選択で再生開始
- アクティブ行の再生インジケータ点灯
- コンテキスト：`キュー末尾へ追加 / ダウンロード（任意） / 情報`
- 並び替え（将来的にドラッグ対応を想定）

---

# ステートマシン（要点）

- `idle → loading → playing → paused → ended`
- `ended`時：`repeatMode==='one'` ⇒ 同曲に戻る / `shuffle` ⇒ ランダム / `all` ⇒ 次曲 / それ以外 ⇒ `paused`
- エラー：`error`へ遷移し`EmptyState`を表示

---

# メディア連携（Android/PWA）

- **Media Session API**

  - `navigator.mediaSession.metadata = new MediaMetadata({...})`
  - `setActionHandler('play'|'pause'|'previoustrack'|'nexttrack'|'seekto', …)`

- **ユーザー操作で初回再生を解錠**（モバイルの自動再生制限）
- **Service Worker**でキャッシュ（`audio/*`はストリーミング推奨・プリキャッシュは短尺のみ）

---

# CSS ガイド（player.css：一言キーワード）

- コンテナ：**glass-dark**（半透明/ぼかし）
- ボタン：**soft-elevation**（2 層影）
- アクティブ：**tint-primary**（アクセント色 10–15%）
- 角丸：**r-12**、カードは**r-16**
- フォント：**14/12**のツイン軸、タイトルのみ**18–20**
- トランジション：**200ms ease**（hover/active/enter）

---

# SVG アイコン資産（ファイル名にサイズ明記）

> すべて線幅は 2px 目安、塗り無し + `currentColor`。 **ファイル名（例）**：`icon_play_24x24.svg`（w=24, h=24）

- `icon_back_24x24.svg`
- `icon_menu_24x24.svg`
- `icon_play_24x24.svg` / `icon_pause_24x24.svg`
- `icon_prev_24x24.svg` / `icon_next_24x24.svg`
- `icon_shuffle_24x24.svg`
- `icon_repeat_24x24.svg`
- `icon_repeat_one_24x24.svg`
- `icon_like_24x24.svg`
- `icon_more_24x24.svg`
- `icon_dot_active_8x8.svg`
- `icon_volume_24x24.svg` / `icon_volume_mute_24x24.svg`
- `icon_check_16x16.svg`
- `art_placeholder_512x512.svg`（アルバムアート無い時の枠）

---

# 主要コンポーネントの雛形（JSX/要点のみ）

> 仕様理解用の形。コピペして開始できる最小骨格。

```jsx
// src/MisicPlayer/components/HeaderBar.jsx
export default function HeaderBar({ title, count, onBack, onMenu }) {
  /* 役割: 画面ヘッダー */
  return (
    <header className="mp-header">
      <button aria-label="Back" onClick={onBack}>
        <img src="/icons/icon_back_24x24.svg" />
      </button>
      <div className="mp-title">
        <strong>{title}</strong>
        <span className="mp-sub">{count}</span>
      </div>
      <button aria-label="Menu" onClick={onMenu}>
        <img src="/icons/icon_menu_24x24.svg" />
      </button>
    </header>
  );
}
```

```jsx
// src/MisicPlayer/components/TrackListItem.jsx
export default function TrackListItem({ track, isActive, onClick }) {
  /* 役割: リスト1行 */
  return (
    <div className={`mp-track ${isActive ? "is-active" : ""}`} onClick={() => onClick(track.id)}>
      <img className="mp-art" src={track.artwork} alt="" width="40" height="40" />
      <div className="mp-meta">
        <div className="mp-name">{track.title}</div>
        <div className="mp-sub">{track.subtitle}</div>
      </div>
      <div className="mp-right">
        {isActive && <img src="/icons/icon_dot_active_8x8.svg" alt="playing" />}
        <button className="mp-more" aria-label="More">
          <img src="/icons/icon_more_24x24.svg" />
        </button>
      </div>
    </div>
  );
}
```

```js
// src/MisicPlayer/hooks/useAudioPlayer.js
// 役割: <audio>の再生制御を一元管理
import { useEffect, useRef, useState, useCallback } from "react";

export default function useAudioPlayer(initialQueue = [], initialIndex = 0) {
  const audioRef = useRef(null);
  const [queue, setQueue] = useState(initialQueue);
  const [index, setIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [repeatMode, setRepeatMode] = useState("off"); // off|one|all
  const [shuffle, setShuffle] = useState(false);

  const loadAt = useCallback((i) => {
    setIndex(i);
    setCurrentTime(0);
  }, []);
  const play = useCallback(() => audioRef.current?.play(), []);
  const pause = useCallback(() => audioRef.current?.pause(), []);
  const toggle = useCallback(() => (isPlaying ? pause() : play()), [isPlaying, play, pause]);
  const seek = useCallback((t) => {
    if (audioRef.current) audioRef.current.currentTime = t;
  }, []);
  const next = useCallback(() => {
    if (!queue.length) return;
    if (shuffle) return setIndex(Math.floor(Math.random() * queue.length));
    setIndex((p) => (p + 1) % queue.length);
  }, [queue.length, shuffle]);
  const prev = useCallback(() => setIndex((p) => (p - 1 + queue.length) % queue.length), [queue.length]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTime = () => setCurrentTime(a.currentTime);
    const onMeta = () => setDuration(a.duration || 0);
    const onEnd = () => {
      if (repeatMode === "one") {
        a.currentTime = 0;
        a.play();
        return;
      }
      if (repeatMode === "all" || shuffle) next();
      else setIsPlaying(false);
    };
    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
    };
  }, [next, repeatMode, shuffle]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  return {
    audioRef,
    state: { isPlaying, currentTime, duration, volume, repeatMode, shuffle, index, queue },
    controls: {
      play,
      pause,
      toggle,
      seek,
      setVolume,
      next,
      prev,
      setRepeatMode,
      toggleShuffle: () => setShuffle((s) => !s),
      loadAt,
      setQueue
    }
  };
}
```

> これで**1 ファイル hook**を流用でき、`NowPlaying`・`TrackList`が同じ状態を参照可能。

---

# キーボード & ジェスチャー

- **Key**：Space/←/→/J/K/L/↑/↓/S/R（前述）
- **Mobile**：アートワーク左右スワイプ＝前後曲、長押し＝シークスクラブ開始

---

# 画像 / SVG（ファイル名明示）

- **アートプレースホルダ**：`art_placeholder_512x512.svg`（512×512）
- **アイコン**：上記リスト通り（**24x24.svg**中心）

---

# 実装メモ（現場の落とし穴）

- **初回再生**はユーザー操作で開始（自動再生不可）
- **mp3/m4a**などコーデック差：Android は aac/h264 は安定、opus は機種差あり
- **リスト大量**：`virtualize`（後で最適化）
- **SEO 不要**：`<audio preload="metadata">`にして初期負荷抑制
- **PWA**：MediaSession の`setActionHandler`を必ず設定

---

必要ならこの仕様をベースに、**`create_project_structure.js`** と **最小起動の`App.jsx`** も書き起こすよ。次のステップ、どこから着手する？（レイアウト → Hook 結線 → MediaSession の順が安全）
