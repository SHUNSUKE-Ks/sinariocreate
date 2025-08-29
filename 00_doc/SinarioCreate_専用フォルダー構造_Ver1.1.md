# SinarioCreate 専用フォルダー構造 (Ver1.1)

このドキュメントは、`sinariocreate` プロジェクトの現在のフロントエンドフォルダー構造をまとめたものです。

## /src

```
src/
├── App.jsx                     // アプリケーションのメインコンポーネント、ルーティングを定義
├── main.jsx                    // Reactアプリケーションのエントリーポイント
│
├── AppScreen/                  // 画面単位のコンポーネントを格納するディレクトリ
│   ├── 01_Home/                // ホーム画面
│   │   ├── HomeScreen.jsx
│   │   ├── HomeHeader.jsx
│   │   ├── HomeQuickActions.jsx
│   │   ├── HomeRecentList.jsx
│   │   └── HomeTips.jsx
│   ├── 02_CharacterCreator/    // キャラクター作成画面
│   │   ├── CharacterCreatorScreen.jsx
│   │   ├── CharacterHeader.jsx
│   │   ├── BookViewer.jsx
│   │   └── CharacterTabs/
│   │       ├── BasicInfoTab.jsx
│   │       ├── VisualTab.jsx
│   │       ├── StatsTab.jsx
│   │       └── SkillsTab.jsx
│   ├── 03_GameLife/            // 人生シミュレーション画面
│   │   ├── GameLifeScreen.jsx
│   │   ├── LifeStageSelector.jsx
│   │   ├── EventDisplay.jsx
│   │   └── ProgressTracker.jsx
│   └── 10_Settings/            // 設定画面
│       └── SettingsScreen.jsx
│
├── assets/                     // 静的な画像ファイルなど
│   └── react.svg
│
├── components/                 // 複数の画面で再利用される共通コンポーNT
│   ├── layout/                 // ヘッダー、サイドパネルなどのレイアウト関連
│   │   ├── Header.jsx
│   │   └── SidePanel.jsx
│   ├── nav/                    // タブ、パンくずリストなどのナビゲーション関連
│   │   └── TabNavigation.jsx
│   └── forms/                  // フォーム関連の共通コンポーネント
│
├── constants/                  // アプリ全体で使われる定数を定義
│
├── context/                    // React Context API を利用した状態管理
│
├── features/                   // 特定の機能に関連するUIとロジック（タグ機能、ショートカット機能など）
│   ├── quickOpen/
│   ├── shortcuts/
│   └── tags/
│
├── GameStyles/                 // アプリ全体のスタイルシート
│   ├── app.css                 // メインのスタイルファイル
│   └── variables.css           // 色やフォントなどの変数
│
├── hooks/                      // 複数のコンポーネントで再利用されるカスタムフック
│
└── utils/                      // プロジェクト全体で使われるヘルパー関数など
```
