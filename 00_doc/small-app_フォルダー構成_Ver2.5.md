
# 📂 small-app/ フォルダー構成（Ver2.5：説明コメント付き）

"
small-app/
├── public/
│   ├── icons/                                   // PWA/OSランチャー用アイコン（共通）
│   │   ├── [APP_NAME]_Logo_512x512.png          // 512pxアイコン
│   │   └── [APP_NAME]_Logo_192x192.png          // 192pxアイコン
│   └── index.html                               // ViteエントリーHTML（#root を置く）
│
├── src/
│   ├── App.jsx                                   // ルーター/Providerのラップ（KeyMap等の適用）
│   ├── main.jsx                                  // React起動（createRoot）
│   │
│   ├── AppScreen/
│   │   ├── 01_Home/
│   │   │   ├── HomeScreen.jsx                    // ホーム統括（下記4つをレイアウト）
│   │   │   ├── HomeHeader.jsx                    // 画面見出し（タイトル/サブ/右側アクション）
│   │   │   ├── HomeQuickActions.jsx              // よく使う操作（ボタン群/ショートカット案内）
│   │   │   ├── HomeRecentList.jsx                // 最近の項目/セーブ/履歴などのリスト
│   │   │   └── HomeTips.jsx                      // 使い方ヒント/チュートリアルカード
│   │   └── 10_Settings/
│   │       └── SettingsScreen.jsx                // 設定（KeyMapのJSONC切替/編集/保存）
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   └── SidePanel.jsx                     // 右スライドパネル（共通UI）
│   │   ├── nav/
│   │   │   └── Tabs.jsx                          // タブナビ（共通UI）
│   │   ├── forms/
│   │   │   └── KeyBindingRow.jsx                 // キーバインド1行編集（Settingsで使用）
│   │   └── Button.jsx                            // 汎用ボタン（必要なら）
│   │
│   ├── features/                                 // ロジック+UI補助（どのアプリでも使う共通）
│   │   ├── tags/
│   │   │   ├── TagSystem.jsx                     // タグ表示/追加/削除/フィルタ
│   │   │   └── tagUtils.js                       // タグ正規化・検索ヘルパ（normalize等）
│   │   ├── shortcuts/
│   │   │   ├── KeymapProvider.jsx                // JSONC読込/保存/現在KeyMap提供（Context）
│   │   │   ├── keymapDefaults.jsonc              // 既定キーマップ（JSONCで管理）
│   │   │   └── schema.d.ts                       // 型の参考（JSでもドキュメント目的）
│   │   └── quickOpen/
│   │       └── QuickOpenPalette.jsx              // “Ctrl/Cmd+K”のコマンドパレットUI
│   │
│   ├── constants/
│   │   ├── appSteps.js                           // 画面識別（最小: HOME / SETTINGS）
│   │   └── actionTypes.js                        // アクション定数
│   │
│   ├── context/
│   │   └── AppContext.jsx                        // Context本体
│   │
│   ├── hooks/
│   │   ├── useAppState.jsx                       // useReducer+Provider+useContext 一体管理
│   │   └── useSidePanel.js                       // サイドパネル開閉の小フック
│   │
│   ├── utils/
│   │   ├── jsonc.js                              // JSONC→JSON（コメント剥離）
│   │   └── fileIO.js                             // 共通のファイル保存/読込（JSON等）
│   │
│   └── GameStyles/
│       ├── variables.css                         // カラートークン（テーマ化しやすい）
│       └── app.css                               // 共通スタイル（.panel/.stat-row 等）
│
├── package.json                                   // 依存とスクリプト
├── vite.config.js                                 // Vite設定（@エイリアス/PWA等）
├── tailwind.config.js                             // Tailwind（使う場合）
├── postcss.config.js                              // PostCSS（使う場合）
├── eslint.config.js                               // ESLint（任意）
├── jsconfig.json                                  // @エイリアス等の補完設定
└── README.md                                      // プロジェクト説明

"

---

# 🧩 Home配下5ファイルの詳細（役割・引数・CSS・可変プロパティ）

> ルールに合わせて：**役割 / 引数の意味 / CSSの意味** を“一言”で明記し、  
> さらに **`<Component (prop)/>` = 変更できるプロパティ** を列挙します。

## 1) `HomeScreen.jsx`

- 役割：**ホーム画面の統括**（各セクションを`.panel`で並べる）
    
- 引数：なし（アプリ全体状態はContext経由）
    
- CSS：`.container`（余白/横幅調整）、`.panel`（区切りカード）
    

**可変プロパティ（子へ渡す）**

- `<HomeHeader (title, subtitle, actions, rightSlot)/>`
    
- `<HomeQuickActions (actions)/>`
    
- `<HomeRecentList (items, onOpen, filters, emptyText, enableTags)/>`
    
- `<HomeTips (tips)/>`
    

**使い方イメージ**

- 小規模なら**固定レイアウト**、アプリにより `actions`/`items`/`tips` を差し替える運用。
    

---

## 2) `HomeHeader.jsx`

- 役割：**見出しバー**（タイトル/サブタイトル/右側アクション領域）
    
- 引数：`title`=文字列, `subtitle`=文字列, `actions`=ボタン配列, `rightSlot`=任意React要素
    
- CSS：`.header-container`（横並び固定ヘッダーを踏襲可）、`.header-right`（ボタン群）
    

**プロパティ詳細**

<HomeHeader (
  title,            // 画面名（例: "ホーム"）
  subtitle,         // 説明（例: "最近の編集・ショートカット"）
  actions,          // [{label, onClick, shortcut?}] 右上のボタン群
  rightSlot         // 任意：KeyMap切替や検索ボックスなど差し込み
)/>


- 役割：画面の**認知負荷を下げる**（今どこにいるか/何ができるか）
    
- 引数の意味：どれを表示するか（文字/ボタン/差し込みUI）
    
- CSSの意味：ヘッダーとして**視覚的な最上段**に配置（固定/非固定は用途で選択）
    

**例**

- `actions`に「設定」「新規作成」「コマンドパレット」等を渡す
    
- `shortcut`表示で「Ctrl+K」などの**KeyMapヒント**を出すのが◎
    

---

## 3) `HomeQuickActions.jsx`

- 役割：**頻出操作のボタン群**（グリッド/行で表示）
    
- 引数：`actions`=[{ id, label, onClick, icon?, shortcut? }]
    
- CSS：`.panel`内部で**ボタンの見やすい整列**（レスポンシブ）
    

**プロパティ詳細**

<HomeQuickActions (
  actions           // 例: [{id:'new', label:'新規作成', onClick, shortcut:'N'}, ...]
)/>


- 役割：**最短動線**を提供（ワンクリックで主要機能へ）
    
- 引数の意味：**何を置くか**（アプリで頻度の高い操作）
    
- CSSの意味：**ボタンの視認性**と**間隔**（誤タップ防止/タッチ配慮）
    

**補足**

- `shortcut`をボタン右上に小さく表示 → **KeyMapとの一貫性**
    
- icon は任意（文字だけでも運用可）
    

---

## 4) `HomeRecentList.jsx`

- 役割：**最近の項目リスト**（履歴/セーブ/ドキュメント等）
    
- 引数：
    
    - `items`=[{ id, title, updatedAt, tags? } …]
        
    - `onOpen`=(item)=>void（クリック時の処理）
        
    - `filters`={ tags?: string[], query?: string }（簡易検索）
        
    - `emptyText`=空表示文言
        
    - `enableTags`=true/false（タグ表示・フィルタの有効化）
        
- CSS：`.stat-row`（1行の見出し行）、`.panel`（全体）
    

**プロパティ詳細**

"
<HomeRecentList (
  items,            // 最近データ
  onOpen,           // 行クリックで開く処理
  filters,          // {tags:[], query:""}（省略可）
  emptyText,        // "最近の項目はありません" 等
  enableTags        // タグバッジ/フィルタを出すか
)/>

"

- 役割：**直近の文脈**に素早く復帰
    
- 引数の意味：**何を出す/どう絞る**か
    
- CSSの意味：行単位で**情報密度**を保ちつつ可読性（行間/区切り）
    

**タグ連携**

- `features/tags/TagSystem.jsx` と相性◎。`enableTags`がtrueならタグ表示＆クリックで絞込。
    

---

## 5) `HomeTips.jsx`

- 役割：**ヒント/チュートリアルカード**（Markdown風の軽い解説可）
    
- 引数：`tips`=[{ id, title, body, link? }]（空なら非表示）
    
- CSS：`.panel`内で**小カード**を縦に並べる
    

**プロパティ詳細**

<HomeTips (
  tips              // 例: [{id:'k1', title:'Ctrl+Kでコマンド', body:'QuickOpenの使い方', link:'/settings'}]
)/>


- 役割：**初見ユーザーの学習補助**、運用チームの**Updateノート**配信にも使える
    
- 引数の意味：**何を教えるか**（テキスト/リンク）
    
- CSSの意味：**本文の可読性**（行間/余白）を重視
    

---

# 🔌 データと配線（参考）

- **HomeScreen**が“データの入口”。
    
    - `actions` はアプリ側で定義（例：`[{id:'open_settings', label:'設定', onClick: gotoSettings}]`）
        
    - `items` はアプリのデータ層（Firestore/LocalStorage/JSON）から取得して `HomeRecentList` へ
        
    - `tips` は静的JSON/MDにしてもOK（運用が楽）
        
- **KeyMap連携（推奨）**
    
    - `HomeHeader` の右側に「現在の代表ショートカット」を表示（例：`Ctrl+K: コマンドパレット`）
        
    - `HomeQuickActions` の各ボタンにも `shortcut` を表示 → 学習コスト低下
        

---

# 🧪 例：propsの渡し方（超ショート）

// HomeScreen.jsx（例）
<HomeHeader
  title="ホーム"
  subtitle="最近の編集とショートカット"
  actions={[
    { label: '設定', onClick: () => go(APP_STEPS.SETTINGS), shortcut: 'Alt+S' },
    { label: 'コマンド', onClick: openQuickPalette, shortcut: 'Ctrl+K' },
  ]}
/>

<HomeQuickActions
  actions={[
    { id:'new', label:'新規作成', onClick: onCreateNew, shortcut:'N' },
    { id:'import', label:'インポート', onClick: onImport },
  ]}
/>

<HomeRecentList
  items={recentItems}
  onOpen={(item) => openItem(item.id)}
  filters={{ tags:selectedTags, query:searchText }}
  emptyText="最近の項目はありません"
  enableTags
/>

<HomeTips
  tips={[
    { id:'t1', title:'Ctrl+Kでコマンド', body:'QuickOpenPalette から機能を検索できます。' },
    { id:'t2', title:'KeyMap編集', body:'Settings で JSONC をインポートして切替可能。', link:'#settings' },
  ]}
/>
