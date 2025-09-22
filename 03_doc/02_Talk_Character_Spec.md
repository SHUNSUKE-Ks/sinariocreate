02_Talk_Character_Spec

以下は フォルダー構造 と 画面ごとのセクション＋ Component（各コンポーネントの役割を一言・変更可能プロパティ列挙・主要イベント） をまとめた仕様書です。テスト導入しやすい最小単位で整理しています。ファイル名やパスも提案しています。

📁 推奨フォルダー構造 src/ ├─ GameCollections/ │ └─ NovelTalk/ │ ├─ screens/ │ │ ├─ TalkScreen.md // 仕様（ドキュメント） │ │ ├─ TalkScreen.jsx │ │ └─ CharacterScreen.jsx │ ├─ components/ │ │ ├─ AppLayout.jsx │ │ ├─ Header.jsx │ │ ├─ TabBar.jsx │ │ ├─ MainArea.jsx │ │ ├─ LeftPanel.jsx │ │ ├─ CharacterSelectTag.jsx │ │ ├─ CharacterButton.jsx │ │ ├─ CharacterDictionary.jsx │ │ ├─ TextBox.jsx │ │ ├─ KeyMapManager.jsx │ │ ├─ PersistStore.js │ │ └─ Toast.jsx │ ├─ data/ │ │ └─ characters.json // テスト用初期データ（localStorage と同期） │ └─ styles/ │ └─ NovelTalk.css ├─ components/ // アプリ共通コンポーネント └─ GameStyles/

画面構成（セクション単位） TalkScreen（TalkScreen.jsx / doc: TalkScreen.md） [Header] [TabBar: talk | character] +--------------------------------------------+ | LeftPanel (CharacterSelectTag) | RightPanel| | TextBox | +--------------------------------------------+

TalkScreen のセクション

Header（共通ヘッダー）

TabBar（タブ切替）

LeftPanel（CharacterSelectTag を表示／Character タブ時は CharacterDictionary へ切替）

RightPanel（TextBox：セリフ入力・送信）

Toast（通知表示、軽いフィードバック）

CharacterScreen（図鑑編集画面、CharacterScreen.jsx）

Header（共通）

TabBar（active: character）

Main：CharacterDictionary（名前追加、一覧、削除）

Component 詳細（〈Component 要素＝プロパティ〉 形式）

〈AppLayout 　要素＝ Header, TabBar, MainArea〉

役割（一言）：全体レイアウトを束ねるコンテナ。

プロパティ：headerProps, initialTab, layoutGap, className

主要イベント：onTabChange(tabKey)

〈Header 　要素＝ logoText, showAuto, showSkip〉

役割：共通上部ナビ（ロゴ・Auto・Skip 等）。

プロパティ：logoText, showAuto:boolean, showSkip:boolean, className

イベント：onAutoToggle(bool), onSkipToggle(bool)

備考：小さなヘルプ（ショートカット説明）を表示できると親切。

〈TabBar 　要素＝ tabs[]〉

役割：画面のタブ切替（例：talk / character）。

プロパティ：tabs（[{ key, label, icon? }]）, activeTab, orientation

イベント：onTabClick(key)

〈MainArea 　要素＝ LeftPanel, RightPanel〉

役割：左右 2 カラムのコンテナ（モバイルは縦積みへフォールバック）。

プロパティ：leftWidth, rightWidth, stackBreakpoint（px）

備考：レスポンシブルールを明記（例：width < 640px なら縦並び）。

〈LeftPanel 　要素＝ variant, padding〉

役割：タブに応じた左側コンテンツを表示（talk → CharacterSelectTag、character → CharacterDictionary）。

プロパティ：variant: "talk" | "character", padding

イベント：onCharacterSelect(id)（内部で発火）

〈CharacterSelectTag 　要素＝ characters[], maxVisible, buttonSize〉

役割：登録済みキャラクター名をボタン群で表示し、選択を可能にする。

プロパティ：characters（[{id,name}]）, maxVisible:number（省略時は全表示）, buttonSize: "sm"|"md"|"lg"

イベント：onSelect(characterId)

UI ルール：選択中はハイライト、未登録時に 「キャラクターが登録されていません」 を表示。

〈CharacterButton 　要素＝ name, isActive, disabled〉

役割：CharacterSelectTag 内の単一ボタンコンポーネント。

プロパティ：name, isActive:boolean, disabled:boolean, ariaLabel

イベント：onClick()

〈CharacterDictionary 　要素＝ placeholder, maxNameLength, allowDuplicate〉

役割：名前のみを登録できる簡潔な図鑑編集（追加／一覧／削除）。

プロパティ：placeholder, maxNameLength, allowDuplicate:boolean

イベント：onAdd(name), onRemove(id)

UX：追加時は短いトースト 「追加しました」 を表示。削除は確認ダイアログ推奨。

〈TextBox 　要素＝ value, placeholder, rows, autoFocus〉

役割：セリフ入力領域（フォーカスでショートカット有効化）。

プロパティ：value, placeholder, rows, autoFocus:boolean

イベント：onChange(text), onEnter()（Enter で送信）、onFocus(), onBlur()

動作ルール：Shift+Enter は改行、Enter（単押し）は送信（既存仕様に合わせて調整可）。

〈KeyMapManager 　要素＝ defaultKeyMap, typingKeyMap, maxSlots〉

役割：State に応じたショートカット（今回は TextBox 入力中のみキャラクター選択）を管理・発行する。UI は不要。

プロパティ：defaultKeyMap（今回空）、typingKeyMap（{"Alt+1": "select 0", ...}）, maxSlots:number

イベント：onAction(actionKey) → 例："select:0" をアプリ側で受け取り onCharacterSelect を呼ぶ。

備考：localStorage や設定 UI と接続するとユーザー定義ショートカットに拡張可能。

〈PersistStore 　要素＝ storageKey, serialize, deserialize〉

役割：characters データを localStorage に保存／読み込みする責務（副作用を担当）。

プロパティ：storageKey:string（例："noveltalk.characters"）, serialize, deserialize

イベント：onLoad(data), onSave(data)

〈Toast 　要素＝ message, duration, position〉

役割：操作結果の短時間通知（追加・削除・エラーメッセージ等）。

プロパティ：message, duration(ms), position: "top"|"bottom"

イベント：onClose()

〈TabContentSwitcher 　要素＝ tabKey, mappings〉

役割：TabBar の activeTab に応じて LeftPanel の中身を切り替える。

プロパティ：tabKey, mappings: { [tabKey]: Component }

データモデル（簡潔再掲） Character = { id: "string (uuid or numeric)", name: "string" }

AppState = { tab: "talk" | "character", characters: Character[], activeCharacterId: string | null, textBoxFocused: boolean }

保存場所（テスト）：localStorage（noveltalk.characters）

画面ごとの詳細（セクション毎の要素とイベントフロー） TalkScreen（詳細）

Header（表示）

TabBar（talk / character）

LeftPanel (variant="talk")

CharacterSelectTag（表示）

CharacterButton × n（クリックで onCharacterSelect）

RightPanel

TextBox（onFocus → textBoxFocused = true → KeyMapManager 有効）

KeyMapManager（TextBox 入力中に Alt+N を監視し onAction("select:N-1") 発火）

PersistStore（character の読み込みは初期レンダ時に行う）

Toast（操作フィードバック）

TalkScreen の主なイベント呼び出し順（例：Alt+2 押下）

TextBox にフォーカス → textBoxFocused = true

KeyMapManager が typingKeyMap を監視 → Alt+2 検出

KeyMapManager が onAction("select:1") を発火

上位が onCharacterSelect(characters[1].id) を実行 → UI ハイライト更新

必要なら Toast を表示（選択確認）

CharacterScreen（詳細）

Header

TabBar（active=character）

CharacterDictionary

name 入力フォーム（placeholder: "キャラクター名"）

追加ボタン（onAdd）

登録済みリスト（onRemove オプション）

保存ファイル（ドキュメント）提案

docs/02_Talk_Character_Spec.md ←（この内容をファイル化）

src/GameCollections/NovelTalk/screens/TalkScreen.jsx（実装）

src/GameCollections/NovelTalk/components/（上記コンポーネント群）
