
# 📂 sinariocreate_ver2.1/ フォルダー構成（Ver2.6：現状反映版）

"""
sinariocreate_ver2.1/
├── public/
│   ├── icons/                                   // PWA/OSランチャー用アイコン
│   │   ├── SinarioCreate_Logo_512x512.png       // 512pxアイコン
│   │   └── SinarioCreate_Logo_192x192.png       // 192pxアイコン
│   └── vite.svg                                 // Viteロゴ
│
├── src/
│   ├── App.jsx                                   // ルーター/Providerのラップ
│   ├── main.jsx                                  // React起動（createRoot）
│   │
│   ├── AppScreen/
│   │   ├── 00_Manager/
│   │   │   ├── AppManager.jsx                    // アプリ全体の状態管理
│   │   │   └── CardControllerManager.jsx         // カード操作の管理
│   │   ├── 01_Home/
│   │   │   ├── HomeScreen.jsx                    // ホーム統括
│   │   │   ├── HomeHeader.jsx                    // 画面見出し
│   │   │   ├── HomeQuickActions.jsx              // よく使う操作
│   │   │   ├── HomeRecentList.jsx                // 最近の項目リスト
│   │   │   └── HomeTips.jsx                      // 使い方ヒント
│   │   ├── 02_CharacterCreator/
│   │   │   ├── CharacterCreatorScreen.jsx        // キャラクター作成画面の統括
│   │   │   ├── CharacterHeader.jsx               // キャラクター作成画面のヘッダー
│   │   │   ├── TabNavigation.jsx                 // タブ切り替えUI
│   │   │   ├── BookViewer.jsx                    // キャラクター設定のプレビュー
│   │   │   └── CharacterTabs/
│   │   │       ├── BasicInfoTab.jsx              // 基本情報タブ
│   │   │       ├── StatsTab.jsx                  // 能力値タブ
│   │   │       ├── SkillsTab.jsx                 // スキルタブ
│   │   │       ├── AppearanceTab.jsx             // 容姿タブ
│   │   │       └── VisualTab.jsx                 // ビジュアルタブ
│   │   ├── 03_GameLife/
│   │   │   ├── LifeStageSelector.jsx             // ライフステージ選択
│   │   │   ├── EventDisplay.jsx                  // イベント表示
│   │   │   └── ProgressTracker.jsx               // 進捗トラッカー
│   │   ├── 04_ItemList/
│   │   │   └── ItemListScreen.jsx                // アイテムリスト画面
│   │   ├── 05_SkillList/
│   │   │   └── SkillListScreen.jsx               // スキルリスト画面
│   │   ├── 06_Story/
│   │   │   ├── StoryScreen.jsx                   // ストーリー画面
│   │   │   ├── TalkScreen.jsx                    // 会話画面
│   │   │   └── story.css                         // ストーリー画面用CSS
│   │   ├── 07_Library/
│   │   │   └── LibraryScreen.jsx                 // ライブラリ画面
│   │   └── 10_Settings/
│   │       └── SettingsScreen.jsx                // 設定画面
│   │
│   ├── components/
│   │   ├── cards/
│   │   │   ├── CharacterImagecard.jsx            // キャラクター画像カード
│   │   │   ├── TextDaialogCard.jsx               // テキストダイアログカード
│   │   │   ├── cards.css                         // カード共通CSS
│   │   │   └── index.js                          // カードコンポーネントの集約
│   │   ├── layout/
│   │   │   ├── Header.jsx                        // グローバルヘッダー
│   │   │   └── SidePanel.jsx                     // 右スライドパネル
│   │   ├── forms/
│   │   └── nav/
│   │
│   ├── context/
│   │   ├── CharacterContext.jsx                  // キャラクター関連のContext
│   │   ├── characterReducer.js                   // キャラクター関連のReducer
│   │   └── ThemeContext.jsx                      // テーマ（UIモード）関連のContext
│   │
│   ├── hooks/
│   │   ├── useCharacter.js                       // キャラクターロジック
│   │   ├── useCharacterImage.js                  // キャラクター画像ロジック
│   │   ├── useCharacterStats.js                  // キャラクター能力値ロジック
│   │   └── useSidePanel.js                       // サイドパネル開閉ロジック
│   │
│   ├── data/
│   │   ├── sinario01.json                        // シナリオデータ
│   │   └── EntrySheet/
│   │       └── Entry_CharacterImage.jsonc        // 画像エントリーシート
│   │
│   ├── assets/
│   │   ├── Wizard_OldMan_Front_Pixel.png         // キャラクター画像素材
│   │   └── characterImageList/                   // キャラクター画像リスト
│   │
│   ├── features/
│   │   ├── quickOpen/
│   │   ├── shortcuts/
│   │   └── tags/
│   │
│   ├── GameStyles/
│   │   ├── app.css                               // 共通スタイル
│   │   └── variables.css                         // CSS変数
│   │
│   └── utils/
│
├── 00_doc/                                        // 設計・ドキュメント類
├── 01_doc/                                        // 顧客からの資料など
├── SampleImage/                                   // アプリのサンプル画像
│
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── jsconfig.json
└── README.md
"""
