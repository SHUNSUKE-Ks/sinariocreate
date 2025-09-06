# 03 ゲーム画面作成 TODO（TrialRogue）

目的: 最小実装で動く画面スタブを作り、動的にプレイヤー移動・当たり判定・アイテム取得・簡易エネミー挙動を確認する。

対象: src/GameCollections/TrialRogue/

---

## 表示仕様（プレースホルダー）
- プレイヤー: 黄色い四角（16x16）
- エネミー: 赤い四角（16x16）
- アイテム: 青い丸（12px）効果: HP+10

---

## TODO
- 画面: `screens/TitleScreen.jsx` から Start ボタンで `BattleScreen` 仮画面へ遷移
- 画面: `screens/BattleScreen.jsx` を新規作成（キャンバス1枚でOK）
  - `Canvas` 初期化とループ（`requestAnimationFrame`）
  - グリッドサイズ: 48x28, タイル16px
  - 入力: 矢印キー or WASD でプレイヤー移動（1タイル）
  - 当たり判定: 壁マスは侵入不可
  - エネミー: 1体を赤四角で表示、1タイル追尾（A*不要の簡易ステップ）
  - アイテム: 青丸を1つ配置、接触で HP+10、ログ表示
- UI: 左上に HP 表示、右上にミニログ（3行）
- データ: `data/keymaps/combat_keymap.jsonc`（キー割り当て雛形）

---

## 実装メモ
- 描画: `ctx.fillStyle` と `fillRect` / `beginPath+arc+fill`
- 状態: `useRef` で `state`（プレイヤー位置, HP, 敵位置, アイテム位置）
- 更新: 入力→座標更新→敵移動→衝突判定→描画
- 将来: `generateMap` のグリッドを流用し、壁/床/階段のマップ適用に切替

