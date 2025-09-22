レイアウト変更依頼（GEMINI.CLI 向け） — 「1 枚目 → 2 枚目」へ移行概要（短く）

既存のトーク編集画面（添付画像 1）を、添付画像 2 のレイアウト構成に変更してください。主な変更点は「上部にキャラクター横並びリスト」「中央に区切りライン」「下部に左にアイコン／右に大きなテキスト入力エリア」です。この.md は GEMINI.CLI が読み取れるよう、実施タスク・対象ファイル・差分指示・受け入れ基準を明確にしています。

参照画像

元（現在）: image_a.png（添付 1）

目標（変更後）: image_b.png（添付 2）

目的

UI の情報密度を上げ、キャラクター選択を上部に配置して編集エリアを広く使えるようにする。

Android ブラウザ/PWA 対応。React 19 + Vite（JSX のみ）に準拠。

変更サマリ（箇条書き）

ヘッダー（Header）はそのままトップ固定。

タブ領域はそのまま維持（Tabs）。

タブ直下にキャラクターの横スクロールリスト（CharaCarousel）を設置。アイコン＋ラベルを 1 行で並べる。

キャラクター領域の下に横幅いっぱいの仕切り線。

仕切り下は左右 2 カラム：左カラムに大きめのアバター縦（CharaPreview）、右カラムに大きなテキストエリア（TalkEditor）。

レスポンシブ：幅狭（モバイル）では 2 カラム → 縦並びに切り替え。

対象ファイル（修正箇所） src/components/Header.jsx src/components/Tabs.jsx src/components/CharaCarousel.jsx ← 新規 or 既存を拡張 src/components/CharaPreview.jsx ← 新規（左カラムの大アイコン） src/components/TalkEditor.jsx ← 既存 TalkInput を拡張 src/styles/NovelTalk.css ← 追加 / 既存上書き src/GameCollections/NovelTalk.jsx ← 画面を束ねるコンテナ（変更）

コンポーネント一覧（関数の役割を一言、引数/props は列挙）

※ 各説明は一行で要約しています（要件通り）。

NovelTalk.jsx

役割：画面全体のレイアウトを管理するコンテナ。

props: initialScenario（開始データ）, onSave（保存コールバック）

使用可能プロパティ：<NovelTalk initialScenario={} onSave={} />

Header.jsx

役割：画面上部のタイトルと右上操作（Auto Skip 等）。

props: title, showAutoSkip

使用例：<Header title="NovelTalk" showAutoSkip={true} />

Tabs.jsx

役割：トーク／キャラクター切替タブを表示。

props: activeTab, onChangeTab(['talk'|'chara'])

使用例：<Tabs activeTab="talk" onChangeTab={t=>...} />

CharaCarousel.jsx

役割：上部に並ぶキャラクター一覧（横並び／スクロール可）。

props: characters: [{id,name,avatar}], onSelect(id), selectedId

使用例：<CharaCarousel characters={chars} selectedId={id} onSelect={fn} />

CharaPreview.jsx

役割：左カラムの大きなアバター＋ラベル（選択中キャラ表示）。

props: character, size（例:128）

使用例：<CharaPreview character={c} size={128} />

TalkEditor.jsx

役割：右カラムの大テキスト入力（セリフ編集）。

props: value, onChange(text), placeholder, rows

使用例：<TalkEditor value={s} onChange={fn} placeholder="セリフを入力..." />

CSS（クラス名・意味を一言／変更ポイント）

各行は クラス名 : 一言説明

.novel-talk : 画面全体コンテナ（中央寄せ・余白管理）

.nt-header : ヘッダー領域（top 固定）

.nt-tabs : タブバー（下線・アクティブ色）

.nt-chara-row : キャラクター横並びリスト（横スクロール可）

.nt-separator : 画面を二段に分ける仕切り線（幅 100%）

.nt-body : 仕切り下のコンテナ（左右カラムのグリッド）

.nt-left : 左カラム（アバター縦配置）

.nt-right : 右カラム（大テキストエリア）

.chara-item : キャラアイコン＋ラベル（丸＋バブル）

.talk-editor : テキストエリア本体（大きめ、高さ指定）

.responsive-stack : モバイル時に縦並びへ切替ルール

（CSS は Tailwind 未使用 前提の純 CSS 例）

変更手順（GEMINI.CLI で分かる形式：タスク ID 付き） TASK-001: Create/Update component files

- create src/components/CharaCarousel.jsx
- create src/components/CharaPreview.jsx
- update src/components/TalkEditor.jsx (expand layout & props)
- update src/GameCollections/NovelTalk.jsx (compose new layout)

TASK-002: Add styles

- append/modify src/styles/NovelTalk.css with classes listed above

TASK-003: Integrate & wire events

- NovelTalk.jsx: fetch characters -> pass to CharaCarousel
- onSelect -> set selectedId -> CharaPreview shows selected character
- TalkEditor receives selected character context (optional)

TASK-004: Responsive behavior

- add media query breakpoint @media (max-width: 640px) to apply `.responsive-stack`

TASK-005: QA & Acceptance

- run dev build, test on Android Browser & PWA dev-mode

JSX レイアウト例（差分で貼る — すぐ使える簡易版） // src/GameCollections/NovelTalk.jsx (抜粋) import Header from '@/components/Header'; import Tabs from '@/components/Tabs'; import CharaCarousel from '@/components/CharaCarousel'; import CharaPreview from '@/components/CharaPreview'; import TalkEditor from '@/components/TalkEditor'; import '@/styles/NovelTalk.css';

export default function NovelTalk({ initialScenario, onSave }) { const [activeTab, setActiveTab] = React.useState('talk'); const [chars, setChars] = React.useState(initialScenario.characters || []); const [selectedId, setSelectedId] = React.useState(chars[0]?.id ?? null); const selectedChar = chars.find(c=>c.id===selectedId);

return ( <div className="novel-talk"> <Header title="NovelTalk" showAutoSkip /> <Tabs activeTab={activeTab} onChangeTab={setActiveTab} /> <CharaCarousel characters={chars} selectedId={selectedId} onSelect={setSelectedId} /> <div className="nt-separator" /> <div className="nt-body"> <div className="nt-left"> {selectedChar && <CharaPreview character={selectedChar} size={128} />} </div> <div className="nt-right"> <TalkEditor placeholder="セリフを入力..." /> </div> </div> </div> ); }

CSS（抜粋 / すぐ貼れる最小スタイル） .novel-talk { width: 100%; max-width: 1200px; margin: 0 auto; padding: 8px; box-sizing: border-box; color: #fff; } .nt-separator { height: 2px; background:#fff; opacity:0.8; margin:12px 0; } .nt-body { display: grid; grid-template-columns: 160px 1fr; gap: 20px; align-items: start; min-height: 240px; } .nt-left { padding: 12px; } .nt-right { padding: 12px; } .nt-chara-row { display:flex; gap:18px; padding:12px 8px; overflow-x:auto; align-items:center; } .chara-item { display:flex; flex-direction:column; align-items:center; width:88px; } .talk-editor textarea { width:100%; min-height:180px; resize:vertical; background:#333; color:#ddd; padding:16px; border-radius:4px; border:1px solid #555; }

@media (max-width:640px) { .nt-body { grid-template-columns: 1fr; } .nt-left { order: 2; } .nt-right { order: 1; } }

CSS 意味は上の一覧で一言説明済み。

受け入れ基準（Acceptance Criteria）

上部にキャラの横並びリストが表示され、表示数超過時は横スクロールできる。

その下に白い仕切り線が表示される。

仕切り下は左：選択中の大アバター、右：大きなテキストエリアの 2 カラム表示になっている。

モバイル（<=640px）では 2 カラムが縦並びに切り替わる。

既存のタブ切替／ヘッダー機能に影響がない。

Android ブラウザでタッチ操作が自然に動作する（横スクロール、テキスト入力）。
