# TrialRogue / Screen Stub 仕様書 + GenerateMap テスト計画（v1.1）

最終更新: 2025-09-06

> **今回の改訂（v1.1）**
>
> - **Assets** セクションを新設：**Images（仮タイトル画面）/ Characters / Enemies / Items / Sounds（BGM, SE）** を追加。
> - **screens/SettingScreens** を追加（**tagheader**：システム設定 / サウンド設定 / ショートカットキー一覧）。
> - **data/keymaps/combat_keymap.jsonc** の参照関係を明記（ショートカット一覧へ連携）。

---

## 0. 目的 / スコープ

- **目的**: 5+1 画面（Title / StageSelect / Loading / Battle / Result / **SettingScreens**）の**仮実装（スタブ）**を定義し、`generateMap/` の統合テスト（描画まで）を**手順化**する。
- **対象**: React + Vite（JSX のみ）、Android ブラウザ＆PWA、Vercel。
- **注意**: 本書は**コードを含まない**。UI 構成・イベント・受け入れ条件・テスト手順のみを記載。

---

## 1. ディレクトリ（隔離パッケージ）

```
src/GameCollections/TrialRogue/
├─ index.jsx
├─ screens/
│  ├─ TitleScreen.jsx
│  ├─ StageSelectScreen.jsx
│  ├─ LoadingScreen.jsx
│  ├─ BattleScreen.jsx
│  ├─ ResultScreen.jsx
│  └─ SettingScreens.jsx         # ★新規：設定（tagheaderタブ）
├─ systems/
│  ├─ useSceneRouter.js
│  ├─ usePreloader.js
│  ├─ useBattleLoop.js
│  └─ rng.js
├─ ui/                           # TR専用UI（外部に依存しない）
│  ├─ HUD.jsx / MessageLog.jsx / InventoryQuickbar.jsx / TileCanvas.jsx
│  ├─ DPad.jsx / ActionCluster.jsx / StageGrid.jsx / StageCard.jsx
│  ├─ ProgressBar.jsx / FadeTransition.jsx / Toast.jsx / AudioBus.jsx
├─ data/
│  ├─ stages.json
│  └─ keymaps/
│     └─ combat_keymap.jsonc     # ★ショートカット一覧のソース
├─ assets/                       # ★新設：一般アセット
│  ├─ images/
│  │  ├─ TrialRogue_Title_1920x1080.svg   # ★仮タイトル画面（横）
│  │  └─ TrialRogue_Title_1080x1920.svg   #   （縦／任意）
│  ├─ characters/                # 例：Hero_24x24.svg, Goblin_24x24.svg
│  ├─ enemies/                   # ※表記は Enemies（旧: Enamys）に統一
│  ├─ items/                     # 例：Item_Herb_16x16.svg, Item_Stone_16x16.svg
│  └─ sounds/
│     ├─ bgm/                    # 例：BGM_Menu_loop.ogg, BGM_Battle_loop.ogg
│     └─ se/                     # 例：SE_Attack_08.wav, SE_Pickup_08.wav
└─ generateMap/                  # 生成地図ユニット（移植可能）
   ├─ assets/tiles/svg/…
   ├─ data/{map_tile_list.jsonc, map_tiles.csv}
   └─ scripts/{dungeon_auto_generate.js, tilemap_auto_generate.js, autotile.js, biome.js, export_grid.js}
```

---

## 2. Assets ガイドライン

### 2.1 Images

- **タイトル画面（仮）**: `assets/images/TrialRogue_Title_1920x1080.svg`（既存）
  - 用途：TitleScreen のメインビジュアル。**後日差し替え想定**。
  - 命名規約：`Name_WxH.svg`（サイズ明記）。
- **可搬性**: `import` または `new URL('./path', import.meta.url)` で参照（絶対パス禁止）。

### 2.2 Characters / Enemies（旧: Enamys）

- **最小構成**（プレースホルダー可）: `Hero_24x24.svg` / `Slime_24x24.svg` など。
- **規約**: `カテゴリ_名称_WidthxHeight.svg`（例：`Enemy_Goblin_24x24.svg`）。
- **用途**: Battle の `entities` 表示用（将来的にアニメ差し替え）。

### 2.3 Items

- **最小構成**: `Item_Herb_16x16.svg`, `Item_Stone_16x16.svg`。
- **規約**: `Item_名称_WidthxHeight.svg`。
- **用途**: 床上アイテムおよびインベントリアイコン。

### 2.4 Sounds（BGM / SE）

- **BGM**: ループ前提、ファイル末尾に`_loop`を付与（例：`BGM_Menu_loop.ogg`）。
- **SE**: クイック起動＆短尺。`SE_行為名_08.wav`（**08**=推奨 8bit 風味/任意の通し番号）。
- **推奨仕様**: 44.1kHz / 16bit、モノラル可。**音量は -14 LUFS 目安**。
- **再生ポリシー**: 初回タップ/クリック後に `AudioBus` が有効化。

---

## 3. 共通ガイドライン

- **入力**: `data/keymaps/combat_keymap.jsonc` をソースに、**PC/Android/Pad のショートカット定義**を一元管理。
- **CSS 規約**: クラス接頭 `tr-`（例：`.tr-battle-wrap`）。**意味は 1 行**で注釈。
- **依存**: すべて TrialRogue 内で閉じる。

---

## 4. 画面スタブ仕様（コードなし）

### 4.1 TitleScreen

- 目的：エントリーと BGM 開始、スタート導線。
- レイアウト：中央にタイトル画像（`assets/images/TrialRogue_Title_1920x1080.svg`）、下に `[はじめる]`。
- 操作：`はじめる` → **StageSelect**。
- 受け入れ：描画 800ms 以内、BGM は操作後に開始。

### 4.2 StageSelectScreen

- 目的：ステージ選択と Seed/難度の確定。
- レイアウト：見出し / カードグリッド / 下部` 戻る``開始 `。
- 操作：カード選択 →`開始`→**Loading**。
- 受け入れ：未選択時は`開始`無効。

### 4.3 LoadingScreen

- 目的：必要アセット読込の可視化。
- レイアウト：ステージ名 / Progress / Tips。
- 操作：100%で自動遷移 →**Battle**。
- 受け入れ：3 秒未満で最低限の読込（目安）。

### 4.4 BattleScreen（generateMap 統合対象）

- 目的：生成マップの描画と基本 UI 配置の確認。
- レイアウト：上 HUD / 中央 TileCanvas / 右 or 下ログ / 下クイックバー＆アクション / 角 DPad。
- 生成呼び出し順：
  1. `generateDungeon` → 2) `applyBiome` → 3) `autotileWalls` → 4) `buildTileIndex` → 5) `drawTilemapToCanvas`。
- 受け入れ：Seed 再現 / Biome 差分 / Autotile 正常。

### 4.5 ResultScreen

- 目的：成績要約と次アクション。
- 操作：`再挑戦`→**Loading** / `ステージ選択へ`→**StageSelect**。

### 4.6 SettingScreens（★ 新規）

- **目的（1 行）**：プレイ全般の設定と**ショートカット参照**を提供。
- **レイアウト**：**tagheader（タブ/チップ）**で 3 カテゴリを切替。
  - **(A) システム設定**
    - 表示スケール（UI Scale）／ ミニマップ ON/OFF ／ FPS 上限（30/60） ／ テーマ（Dark/Light） ／ 安全領域（Safe-Area）
    - 受け入れ：即時反映／戻ると保持。
  - **(B) サウンド設定**
    - マスタ音量 / BGM / SE 個別スライダ ／ ミュートトグル ／ 試聴ボタン（BGM/SE）
    - 受け入れ：ミュート優先、試聴は 1 秒以内に鳴る。
  - **(C) ショートカットキー一覧**
    - **ソース**：`data/keymaps/combat_keymap.jsonc`（PC/Android/Pad プロファイル）
    - 表：アクション名 / キー or ジェスチャ / 説明（抜粋）
    - ヘッダーに**プロファイル切替（PC/Android/Pad）**、検索フィルタ、昇順/降順ソート。
    - 受け入れ：`combat_keymap.jsonc` の更新で一覧が自動更新される（リロードで反映）。
- **遷移**：`Title` から / `StageSelect` からアクセス可（戻るは直前画面）。
- **KPI**：一覧 100 行まで 16ms 以内のスクロール描画（目視）

---

## 5. 画面遷移（スタブ）

- `Title` → `StageSelect` → `Loading` → `Battle` → `Result` → `StageSelect`
- **設定**：`Title` または `StageSelect` から **SettingScreens** を開閉可能。
- **戻る**：Android 戻るキーは `Result → StageSelect` / `StageSelect → Title` / `SettingScreens → 元の画面`。

---

## 6. GenerateMap 統合テスト（描画まで）

- **目的**：`generateMap/` 一式の統合（生成 → 差し替え → オートタイル → 描画）。
- **前提**：`generateMap/scripts` と `generateMap/data` が配置済み。
- **既定**：`width=48` / `height=28` / `tileSize=16` / `seed=20250906` / `difficulty=2(ruin)` / `autotile=ON`。

### 手順（Run#GM-01）

1. Title → StageSelect → ステージ選択 → `開始`。
2. Loading 100% → Battle。
3. Battle で生成 → 描画（順序どおり）。
4. Biome を切替（basic→ruin→lava）→ 壁の自然さ確認。
5. `gridToCSV` で `map.csv` を出力、内容を目視確認。

### 合否（期待結果）

- PASS：初期描画 ≤3s、Biome 差分明確、Autotile 正常、CSV OK。
- FAIL：Seed 再現不可／壁崩れ／画像解決エラー／フリーズ。

---

## 7. データ連携：combat_keymap.jsonc

- 位置：`src/GameCollections/TrialRogue/data/keymaps/combat_keymap.jsonc`。
- 役割：**操作 → アクション ID** の辞書。
- 連携先：**SettingScreens ＞ ショートカットキー一覧**（プロファイル切替/検索/ソート対応）。
- 受け入れ：`actions[].id` が **一意**、`profiles.*` が存在。

---

## 8. アクセシビリティ & モバイル UX

- CTA 最低 44px 角、フォント `clamp(14px, 2.6vw, 18px)`、`env(safe-area-inset-bottom)`。
- 初回タップで `AudioContext`を解放。

---

## 9. リスク & 回避

- JSONC 読込失敗 → 相対/`@trial` と `new URL(..., import.meta.url)` を徹底。
- 音の自動再生不可 → Title で「タップ開始」導線。
- PNG 差し替え時の破綻 → `map_tile_list.jsonc` の `path` 拡張子置換のみで済む設計。

---

## 10. 完了条件（スタブ段階）

- 6 画面の遷移が通る（設定を含む）。
- Battle で `generateMap` の描画が確認できる。
- Run#GM-01 の検証観点が**すべて PASS**。

---

## 付録：用語

- **tagheader**：画面上部に並ぶ**カテゴリタブ（またはチップ）**による切替 UI を指す表現。
- **Enamys**：表記揺れ。正式には **Enemies** を採用。
