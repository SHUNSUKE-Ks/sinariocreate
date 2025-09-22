# クライアント提出チェックリスト（TrialRogue / 資料とデータ）

目的: 実装を円滑に進めるため、事前にご提出いただく素材とデータ項目（カラム）を整理しました。該当項目にチェックを入れて納品ください。

---

## 1. ビジュアル素材（画像）
- [ ] タイトル画像（横/縦それぞれ1点以上）
  - 形式: SVG 推奨（PNG でも可）
  - 推奨サイズ: 1920x1080（横）/ 1080x1920（縦）
  - 納品先: `src/GameCollections/TrialRogue/assets/images/`
  - 命名例: `TrialRogue_Title_1920x1080.svg`
- [ ] キャラクター立ち絵/アイコン
  - 形式: SVG/PNG、ベクタ優先
  - 推奨タイル: 24x24 or 32x32（使用サイズに合わせて）
  - 納品先: `src/GameCollections/TrialRogue/assets/characters/`
  - 命名例: `Hero_24x24.svg`
- [ ] エネミーアイコン
  - 形式: SVG/PNG
  - 納品先: `src/GameCollections/TrialRogue/assets/enemies/`
  - 命名例: `Goblin_24x24.svg`
- [ ] アイテムアイコン
  - 形式: SVG/PNG
  - 納品先: `src/GameCollections/TrialRogue/assets/items/`
  - 命名例: `Item_Herb_16x16.svg`
- [ ] タイル（マップ用）
  - 形式: SVG（推奨）
  - 納品先: `src/GameCollections/TrialRogue/generateMap/assets/tiles/svg/`
  - 命名例: `Tile_Floor_16x16.svg`, `Wall_NS_16x16.svg`, `Tile_WaterEdge_16x16.svg`

---

## 2. オーディオ素材（BGM/SE）
- [ ] BGM（ループ）
  - 形式: OGG 推奨 / 44.1kHz、ループ前提
  - 音量目安: -14 LUFS 程度
  - 納品先: `src/GameCollections/TrialRogue/assets/sounds/bgm/`
  - 命名例: `BGM_Menu_loop.ogg`, `BGM_Battle_loop.ogg`
- [ ] SE（効果音）
  - 形式: WAV 44.1kHz/16bit 推奨
  - 納品先: `src/GameCollections/TrialRogue/assets/sounds/se/`
  - 命名例: `SE_Attack_08.wav`, `SE_Pickup_08.wav`

---

## 3. データ（JSON/JSONC/CSV）
- [ ] キーマップ JSONC（操作定義）
  - 納品先: `src/GameCollections/TrialRogue/data/keymaps/combat_keymap.jsonc`
  - 必須カラム（`actions[]`）:
    - `id`（例: `move.n`）
    - `name`（表示名）
    - `cat`（カテゴリ: `move`/`combat` など）
    - `payload`（例: `{ "dx": 0, "dy": -1 }`）
  - プロファイル（`profiles`）例:
    - `profiles.pc`: `{ "move.n": ["ArrowUp","w"], ... , "wait": [" ", "Enter"] }`
    - `profiles.android`: タップ/仮想キー割当の想定（空でも可）
- [ ] ステージ定義 JSON（任意）
  - 納品先: `src/GameCollections/TrialRogue/data/stages.json`
  - 推奨カラム:
    - `id`, `name`, `size`（`{w,h}` タイル）, `seed`, `biome|difficulty`
    - `playerStart`（`{x,y}`）
    - `enemies[]`（`{id,name,hp,at,df,x,y}`）
    - `items[]`（`{id,name,type,val,x,y}`）
- [ ] エンティティ定義 JSON（任意）
  - 納品先: `src/GameCollections/TrialRogue/data/entities.json`
  - 推奨カラム:
    - 共通: `id`, `name`, `spritePath`, `hp`, `at`, `df`
    - 敵のみ: `aiType`, `exp`, `dropTable`（任意）
- [ ] タイル一覧 JSONC / CSV（どちらか）
  - 納品先: `src/GameCollections/TrialRogue/generateMap/data/`
  - JSONC 例: `map_tile_list.jsonc`
    - カラム: `id`, `name`, `type`, `path`, `passable`, `blocksLOS`, `cost`
  - CSV 例: `map_tiles.csv`
    - カラム: `tile_id`, `name`, `type`, `path`, `passable`, `blocksLOS`, `cost`

---

## 4. ブランド/アプリ資材
- [ ] PWA アイコン
  - 納品先: `public/icons/`
  - 必須サイズ: `192x192`, `512x512`（PNG）
  - 命名例: `SinarioCreate_Logo_192x192.png`, `SinarioCreate_Logo_512x512.png`
- [ ] クレジット/権利表記（必要に応じて）
  - ライセンス種別、クレジット表記、禁止事項 など

---

## 5. 命名/配置ルール（重要）
- [ ] 画像/音声は上記の各ディレクトリへ配置
- [ ] 命名は半角英数と `_` のみ（スペース・全角記号は不可推奨）
- [ ] サイズ・拡張子を名前に含める（例: `Tile_Floor_16x16.svg`）
- [ ] JSON/JSONC は UTF-8（BOM なし）

---

## 6. 提出形式
- [ ] まとめて ZIP で納品、または Git リポジトリ PR
- [ ] 大容量素材はクラウドリンク共有（Google Drive / Dropbox など）
- [ ] 連絡先・差し戻し可否（置換可/代替可 など）を明記

---

## 7. 受け入れチェック（開発側）
- [ ] 画像・音声のパスを `map_tile_list.jsonc` / コンポーネントから解決可能
- [ ] `combat_keymap.jsonc` の `actions`/`profiles` に欠落がない
- [ ] ステージ/エンティティ JSON の必須カラムが揃っている
- [ ] ビルド（`npm run build`）がエラーなく通る

---

### 備考
- フォーマットやカラムに不明点があれば、サンプルをこちらで用意します。最小構成から段階的に拡張可能です。

