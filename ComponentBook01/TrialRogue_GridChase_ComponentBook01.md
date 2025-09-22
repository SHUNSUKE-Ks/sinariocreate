# ComponentBook01: TrialRogue Grid Chase（保存版）

目的: 現在の「マス目上でプレイヤーとエネミーが追いかけっこ」機能を、再現性のある形で記録・参照できるようにする。

---

## 対象ファイル
- タイトル: `src/GameCollections/TrialRogue/screens/TitleScreen.jsx`
- ステージ選択: `src/GameCollections/TrialRogue/screens/StageSelectScreen.jsx`
- ロード（チュートリアル表示）: `src/GameCollections/TrialRogue/screens/LoadingScreen.jsx`
- バトル（キャンバス）: `src/GameCollections/TrialRogue/screens/BattleScreen.jsx`
- キーマップ（JSONC）: `src/GameCollections/TrialRogue/data/keymaps/combat_keymap.jsonc`
- ルーティング追加: `src/App.jsx`

---

## 機能概要
- 48x28 タイルのグリッド（1タイル=16px）上でプレイヤー（黄色四角）・エネミー（赤四角）・アイテム（青丸）を描画。
- 入力でプレイヤーが1タイル移動。敵は1手でプレイヤー方向に1タイル追尾（軸優先）。
- 当たり判定:
  - 敵マスへ移動しようとした場合は近接攻撃として解決（移動しない）。
  - ダメージ計算: `E_HP = max(0, E_HP - max(0, P_AT - E_DF))`。
  - アイテム踏破時に HP+10、アイテムは消滅。
- ステータス表示: 各オブジェクトの上に `Name/HP/AT/DF` をテキスト表示。
- チュートリアル: ロード画面で `combat_keymap.jsonc` の `actions[]` を一覧表示。

---

## 再現手順（開発環境）
1) 依存インストール（未実施なら）
   - `npm install`
2) 開発サーバー起動
   - `npm run dev`
3) 画面遷移
   - Home → 「TrialRogue（偏移用ボタン）」→ `/trialrogue/title`
   - TAP START → `/trialrogue/stage-select`
   - Stage 1 を選択 → `/trialrogue/loading`（チュートリアル表示）
   - クリックで `/trialrogue/battle`
4) 操作
   - 上下左右: `矢印キー / WASD`
   - 斜め: `Q/E/Z/C`
   - 待機: `Space / Enter`

---

## キーアクション（出典: JSONC）
- ファイル: `src/GameCollections/TrialRogue/data/keymaps/combat_keymap.jsonc`
- `actions[]`: 移動（8方向）/ 待機 / 近接攻撃（今は移動先が敵なら攻撃として解決）
- ロード画面では JSONC を `?raw` で読み、コメントを除去して JSON パース→一覧表示。

---

## コンポーネント設計メモ
- `BattleScreen.jsx`
  - 状態: `useRef` に `player/enemy/item` を保持（同期描画で扱いやすい）。
  - 描画: `canvas 2D`。グリッド → アイテム → 敵 → プレイヤーの順に描画。
  - 入力: `keydown` で移動/待機。移動時に敵手番（1タイル追尾）。
- `LoadingScreen.jsx`
  - `?raw` で JSONC を取得 → コメント除去 → `JSON.parse`。
  - 0.8s 後に「準備完了」表示、クリックでバトルへ。
- `TitleScreen.jsx`
  - 画像クリック/ボタンでステージ選択へ。

---

## 再利用スニペット（最小組み込み例）
以下のように任意のルートへ `BattleScreen` を直接マウントして単体検証できます。

```jsx
// ExampleRoute.jsx（例）
import React from 'react';
import BattleScreen from '@/GameCollections/TrialRogue/screens/BattleScreen.jsx';
export default function ExampleRoute() { return <BattleScreen />; }
```

`src/App.jsx` に次のようなルートを一時追加:
```jsx
<Route path="/debug/battle" element={<ExampleRoute />} />
```

---

## 今後の拡張（要件メモ）
- profiles による「アクションID→キー割当」を JSONC 側で定義し、Battle で自動バインド。
- 敵の攻撃手番・ゲームクリア/ゲームオーバー表示。
- `generateMap` のグリッド適用（壁タイルへの侵入不可など地形判定）。

---

## 参考（関連ファイルへの導線）
- 画像: `src/GameCollections/TrialRogue/assets/images/TrialRogue_Title_1920x1080.svg`
- 生成系: `src/GameCollections/TrialRogue/generateMap/*`
- スタイル: `src/GameStyles/trialrogue.css`

```text
このドキュメントは「現時点の実装の再現」と「導線・拡張の足場」を目的にしています。
```

