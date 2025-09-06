
# TrialRogue / GenerateMap 仕様書（v1.0）
最終更新: 2025-09-06

## 1. 概要 / スコープ
- **目的**: 「風来のシレン風」簡易ローグライクのMVPを、他プロジェクトへ **フォルダごと移植可能** な構造で実装する。  
- **対象**: React 19 + Vite（JSXのみ）、Androidブラウザ対応/PWA、Vercelホスティング。  
- **セーブ/ロード**: なし。都度ステージ選択→プレイ→結果表示→選択へ戻る。

## 2. ゲームフロー（MVP）
Title → Stage Select → Loading → **Battle**（1行動=1ターン）→ Result → Stage Select

- **勝利条件**: 階段到達（MVP）。
- **敗北条件**: HP=0。
- **“シレン味”の核**: ターン制 / ランダム生成 / 空腹・罠・アイテム（将来拡張）。

## 3. 画面レイアウト & コンポーネント
> 各コンポーネントは「役割（1行）」「変更できるprops」を明記。CSSの意味は1行で記載。

### 3.1 TitleScreen
- レイアウト: 中央ロゴ、下「はじめる」、右上バージョン。背景はSVGアニメ。
- コンポーネント
  - `TitleLogo(text, subtitle)` — 作品名を魅せる。  
  - `MenuList(items[{id,label}], onSelect)` — 選択肢の入口。  
  - `AudioBus(bgmId, autoPlay, loop)` — 音の統括。
- CSS例: `.title-center {display:grid; place-items:center; min-height:100dvh;}` — 画面中央寄せ。

### 3.2 StageSelectScreen
- レイアウト: 見出し / `StageGrid` / 下部「戻る・開始」。
- コンポーネント
  - `StageGrid(stages[], onSelect, columns?)` — 候補を並べる。  
  - `StageCard(name, diff, seed, preview, locked?)` — 難度/プレビュー。  
  - `MenuList(items, onSelect)` — 戻る・開始。  
  - `AudioBus(bgmId='menu')` — メニューBGM。
- CSS例: `.grid-auto {display:grid; grid-template-columns:repeat(auto-fill,minmax(160px,1fr)); gap:12px;}` — 可変グリッド。

### 3.3 LoadingScreen
- レイアウト: タイトル / `ProgressBar` / Tips。
- コンポーネント
  - `ProgressBar(value, label?)` — 進捗表示。  
  - `TipCarousel(tips[], intervalMs)` — Tips切替。  
  - フック `usePreloader({stageId})` — 必要資源の読込。
- CSS例: `.fade-bg {animation: fade 1.6s ease-in-out infinite alternate;}` — 退屈防止アニメ。

### 3.4 BattleScreen（メイン）
- レイアウト: 上`HUD` / 中央`TileCanvas`（描画） / 右or下`MessageLog` / 下`InventoryQuickbar`+`ActionCluster` / 角`DPad`（Android）。
- コンポーネント
  - `HUD(hp, maxHp, hunger, floor, turns)` — 状態の体力計。  
  - `TileCanvas(map, entities, effects, onInput)` — タイルと駒を描く。  
  - `MessageLog(messages, maxLines)` — 出来事の記録。  
  - `InventoryQuickbar(slots, onUse)` — 即時アイテム。  
  - `ActionCluster(actions, onAction)` — 攻撃/拾う/階段。  
  - `DPad(onMove, onWait, diagonal?)` — 親指操作。  
  - `AudioBus(sfxQueue, bgmId='battle')` — SE/BGM。
- フック/関数
  - `useBattleLoop({map, player, enemies})` — 1ターン進行。  
  - `resolveAction(actionId, payload)` — 命中/移動/罠/投擲などを実行。
- CSS例: `.battle-wrap {display:grid; grid-template-rows:auto 1fr auto; height:100dvh;}` — 上下三分割。

### 3.5 ResultScreen
- レイアウト: `ResultSummary`中央 / 下アクション。
- コンポーネント
  - `ResultSummary(stats, seed, stageName)` — 成績の要約。  
  - `MenuList(items, onSelect)` — 再挑戦/選択へ。  
  - `AudioBus(bgmId='result')` — リザルトBGM。
- CSS例: `.result-panel {max-width:560px; margin-inline:auto;}` — 可読幅に制限。

## 4. 入力（PC/Android/Pad）
- **キーマップ**: `src/data/keymaps/combat_keymap.jsonc` を参照（PC/Android/Padプロファイル）。  
- 役割: 物理入力 → ゲーム内アクションIDの辞書化。  
- 主要アクション: `move.*`, `wait`, `combat.attack.*`, `inventory.*`, `interact.*`, `mode.*`, `ui.*`。

## 5. 生成マップパッケージ（移植ユニット）
```
src/GenerateMap/
├─ assets/tiles/svg/         # SVGプレースホルダー（後にPNG置換可）
├─ data/
│  ├─ map_tiles.csv          # 人が読む一覧
│  └─ map_tile_list.jsonc    # ID→実ファイル辞書（basePath + path）
├─ scripts/
│  ├─ dungeon_auto_generate.js   # 部屋/通路の生成（壁/床/階段/水辺）
│  ├─ tilemap_auto_generate.js   # グリッド→キャンバス描画
│  ├─ autotile.js                # 壁の接続を自動整形
│  ├─ biome.js                   # 床をバイオーム差し替え
│  └─ export_grid.js             # CSV/TSV出力ユーティリティ
└─ preview/MapPreview.jsx        # ブラウザで即確認
```
- **命名規約**: `Tile_*_16x16.svg` / `Wall_*_16x16.svg`（必ず `幅x高さ.svg` を末尾に）。
- **PNG置換**: `map_tile_list.jsonc` の `path` を `*.png` に変更するだけでOK。

## 6. データ仕様
### 6.1 `map_tile_list.jsonc`（抜粋）
```jsonc
{
  "basePath": "@/GenerateMap/assets/tiles/svg",
  "tiles": [
    { "id": "floor_basic", "name": "床", "path": "Tile_Floor_16x16.svg", "type": "floor", "passable": true, "cost": 1 },
    { "id": "stairs_down", "name": "階段", "path": "Tile_StairsDown_16x16.svg", "type": "stairs", "passable": true },
    { "id": "wall_basic",  "name": "壁", "path": "Wall_NS_16x16.svg", "type": "wall", "passable": false, "blocksLOS": true },
    { "id": "water_shore", "name": "水辺", "path": "Tile_WaterEdge_16x16.svg", "type": "water", "passable": false }
  ]
}
```
- **意味**: タイルID→実ファイルの対応 / 当たり判定（`passable`）/ 視線遮蔽（`blocksLOS`）/ コスト。

### 6.2 `map_tiles.csv`（抜粋）
```
tile_id,name,type,path,passable,blocksLOS,cost
floor_basic,床,floor,Tile_Floor_16x16.svg,true,false,1
stairs_down,階段,stairs,Tile_StairsDown_16x16.svg,true,false,
wall_basic,壁,wall,Wall_NS_16x16.svg,false,true,
water_shore,水辺,water,Tile_WaterEdge_16x16.svg,false,false,
```

## 7. アルゴリズム/API一覧（関数チートシート）
- `generateDungeon({width,height,roomCount,minRoom,maxRoom,seed})` — **ダンジョン骨格を作る**（2Dグリッド返却）。  
- `applyBiome(grid, {difficulty|biome})` — **床の雰囲気を一括変更**。  
- `autotileWalls(grid)` — **壁の形を整える**（近傍でバリアント置換）。  
- `buildTileIndex(tileJsonc)` — **ID→URL辞書を作る**。  
- `drawTilemapToCanvas(canvas, grid, tileIndex, tileSize)` — **グリッドを描画**。  
- `gridToCSV(grid)/gridToTSV(grid)` — **資料出力**。  
- `downloadText(filename, text)` — **ダウンロード発火**。

> 引数はすべて「一言で言うと」：サイズ/Seed/難度など、**最小限の制御つまみ**。

## 8. アセット規約（SVG → PNG移行可能）
- 最初は **SVG** を使い、`16x16`, `32x32` 等の **サイズをファイル名に含める**。  
- フォント/アウトラインのみで簡素に（軽量）。  
- 描画側CSS：`image-rendering: pixelated;`（ドット感を守る）。

## 9. 統合シーケンス（擬似コード）
```js
// StageSelect → Loading
const stage = { id:'stg01', seed:1001, diff:1 };

// LoadingScreen
await preload(stage); // 音/画像/データ（必要最小限）

// BattleScreen
const { grid, entry, stairs } = generateDungeon({ width:48, height:28, seed: stage.seed });
applyBiome(grid, { difficulty: stage.diff });
autotileWalls(grid);
const idx = buildTileIndex(tileJson);
await drawTilemapToCanvas(canvasEl, grid, idx, 16);
loop.start(); // useBattleLoopで1行動=1ターン
```
- **CSSメモ（1行）**: `.tile-canvas{image-rendering: pixelated;}` — 低解像度でも滲ませない。

## 10. 受け入れ基準（MVP）
- 乱数Seed固定で **同一マップ再現** が可能。  
- `階段` に到達すると Result に遷移。  
- Androidタッチ: スワイプ移動 / タップ攻撃 / ダブルタップ待機 が動作。  
- `map_tile_list.jsonc` の `path` を PNGへ変更しても描画が壊れない。  
- 48x28（16pxタイル）で 60fps 等倍表示が保てる（中程度の端末）。
