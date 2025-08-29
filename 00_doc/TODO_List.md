# 実装TODOリスト

## 1. 全体・ルーティング

-   `[ ] App.jsx`: 現在仮で置いているナビゲーションリンクを、`SidePanel.jsx`コンポーネントに統合する。

## 2. キャラクター作成画面 (`02_CharacterCreator`)

-   `[ ] CharacterCreatorScreen.jsx`:
    -   `CharacterHeader`, `TabNavigation`, 各種タブ, `SidePanel` といったサブコンポーネントを組み合わせて、キャラクター作成画面の全体レイアウトを構築する。
    -   現在アクティブなタブの状態を管理するロジックを実装する。

-   `[ ] CharacterHeader.jsx`:
    -   `sampleLayout.html` を元に、ヘッダーのHTML/CSSを実装する。
    -   キャラクターアイコン、吹き出し、残り才能ポイントの表示を実装する。
    -   「リセット」ボタンと「メニュー」ボタンの機能を接続する。

-   `[ ] SidePanel.jsx` (共通コンポーネント):
    -   `sampleLayout.html` を元に、スライド式のサイドパネルUIを実装する。
    -   各種アクションボタン（ローカル保存, Firebase保存, ランダム, スキル/特質ブック読込）の機能を実装する。
    -   パネルの開閉状態を管理するロジックを実装する。

-   `[ ] TabNavigation.jsx` (共通コンポーネント):
    -   タブボタンのUIを実装する。
    -   キャラクター作成画面の各タブを切り替えるロジックを実装する。

## 3. 各種タブコンポーネント

-   `[ ] BasicInfoTab.jsx`:
    -   名前、出自、性別の入力UIを実装する。
-   `[ ] VisualTab.jsx`:
    -   キャラクターのビジュアル表示エリアと、外見詳細のテキストエリアUIを実装する。
-   `[ ] StatsTab.jsx`:
    -   6つの能力値（筋力、器用さなど）の調整UIを実装する。
    -   `+` / `-` ボタンと数値表示を実装する。
-   `[ ] SkillsTab.jsx`:
    -   スキルと特質の入力リストUIを実装する。

## 4. 状態管理 (State Management)

-   `[ ] context/` or `zustand`など:
    -   キャラクターの全データ（名前、能力値、スキルなど）を保持するグローバルな状態（State）のデータ構造を定義する。
    -   状態を更新するためのロジック（ReducerやActionなど）を作成する。

## 5. ビジネスロジック (Hooks)

-   `[ ] hooks/useCharacterStats.js` (新規作成):
    -   残り才能ポイントの計算、ステータスのリセット、ランダム割り振りなどのロジックをカスタムフックとして実装する。

## 6. 外部連携

-   `[ ] services/firebaseService.js` (新規作成):
    -   `saveCharacterToFirebase` 関数など、Firestoreとのデータ送受信ロジックを実装する。
    -   Firebaseの初期化設定を行う (`firebase.js`の作成)。
-   `[ ] utils/fileIO.js` (新規作成):
    -   キャラクターデータやスキルブックを、ローカルのJSONファイルとして保存・ダウンロードする機能を実装する。
