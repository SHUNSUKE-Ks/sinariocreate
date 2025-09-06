
# TrialRogue / 開発実装TODO（v1.0）
最終更新: 2025-09-06

## 0) 準備
- [ ] Vite + React 19 プロジェクト作成（JSXのみ）
- [ ] `@` エイリアスを `src` に設定（vite.config.js）
- [ ] Android端末での**USBデバッグ** or ローカルLAN閲覧準備
- [ ] `GameStyles/` に `trialrogue.css` ひな形作成

## 1) 生成マップパッケージ（移植ユニット）
- [ ] `src/GenerateMap/assets/tiles/svg/` にプレースホルダーSVG配置（*_16x16.svg）
- [ ] `src/GenerateMap/data/map_tile_list.jsonc`（辞書）作成
- [ ] `src/GenerateMap/data/map_tiles.csv`（人向け一覧）作成
- [ ] `src/GenerateMap/scripts/dungeon_auto_generate.js`（部屋/通路）実装
- [ ] `src/GenerateMap/scripts/tilemap_auto_generate.js`（描画）実装
- [ ] `src/GenerateMap/scripts/autotile.js`（壁接続）実装
- [ ] `src/GenerateMap/scripts/biome.js`（床差し替え）実装
- [ ] `src/GenerateMap/scripts/export_grid.js`（CSV/TSV出力）実装
- [ ] `src/GenerateMap/preview/MapPreview.jsx`（可視化）実装

### 検証
- [ ] Seed固定で同一レイアウトが再現される
- [ ] `applyBiome` の `basic/ruin/lava` が視覚的に判別できる
- [ ] `autotileWalls` 適用後、壁が不自然に途切れない
- [ ] `gridToCSV/TSV` でダウンロードできる

## 2) 画面実装
### TitleScreen
- [ ] `TitleLogo` / `MenuList` / `AudioBus` 組込み
- [ ] 「はじめる」→ StageSelect へ遷移

### StageSelectScreen
- [ ] `StageGrid` + `StageCard`（仮データ: `stages.json`）
- [ ] 選択→ `stageId/seed/diff` を保持して Loading へ

### LoadingScreen
- [ ] `usePreloader` ダミー（BGM/数枚SVGの読込＋進捗）
- [ ] `ProgressBar` / `TipCarousel` 表示
- [ ] 完了で Battle へ

### BattleScreen
- [ ] `HUD`/`TileCanvas`/`MessageLog`/`InventoryQuickbar`/`ActionCluster`/`DPad`
- [ ] `generateDungeon → applyBiome → autotileWalls → drawTilemapToCanvas`
- [ ] `useBattleLoop` の最小行動（移動/待機/近接攻撃）
- [ ] `combat_keymap.jsonc` を読み込んで入力ルーター作成
- [ ] 階段到達で Result へ

### ResultScreen
- [ ] `ResultSummary`（到達階層/撃破数/ターン/Seed）
- [ ] 「再挑戦 / ステージ選択へ」ボタン実装

## 3) 入力 & サウンド
- [ ] `combat_keymap.jsonc` の PC/Android/Pad プロファイルをバインド
- [ ] Android: スワイプ移動 / 隣接タップ攻撃 / ダブルタップ待機
- [ ] `AudioBus` 経由で BGM/SE の最小再生（再生/停止/ループ）

## 4) スタイル（CSS）
- [ ] `.battle-wrap`, `.hud`, `.tile-canvas{ image-rendering: pixelated; }`
- [ ] 親指到達域に `DPad` と `ActionCluster` を配置
- [ ] `env(safe-area-inset-bottom)` 対応（PWA）

## 5) QA（受け入れテスト）
- [ ] 48x28（16pxタイル）で操作遅延なく描画（中級Android）
- [ ] Seed固定再現 / 階段到達遷移 / HP0敗北
- [ ] キーマップ：PC/Android/Padすべての基本操作が通る
- [ ] PNGへ差し替えても描画エラー無し（辞書のpath変更のみ）
- [ ] Vercelにデプロイして実機確認（音量/ページ遷移/アイコン）

## 6) ドキュメント/配布
- [ ] 本仕様書（SPEC）・実装TODO（本書）・README（移植手順）を `docs/` へ
- [ ] Notionへインポート（`map_tile_list.jsonc` とCSVのビュー）
- [ ] `create_project_structure.js` に GenerateMap 一式の自動生成を追加

## 7) ストレッチ（任意）
- [ ] 壁オートタイル16種のSVG追加（`Wall_*_16x16.svg`）
- [ ] バイオームの追加（雪/苔/砂）と危険床（毒/凍結）
- [ ] デイリーSeed（当日の日付→Seed）と簡易ランキング（クライアント内）
- [ ] 罠2種（混乱/落とし穴）と識別アイテム（？薬）をMVP+に投入
