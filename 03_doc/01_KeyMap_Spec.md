01_KeyMap_Spec.md 概要

TextBox 入力中にのみ有効なショートカットで、登録済みキャラクターを即選択できる仕様。通常状態（TextBox 未入力時）ではショートカットは無効とする（画面遷移系のショートカットは今回対象外）。

State 管理

State_default

TextBox 入力中でない通常状態。ショートカットは 無効（今回の仕様では何も割当てない）。

State_TextBox 入力中

TextBox にフォーカスして入力している状態。

有効ショートカット：キャラクター選択のみ（Alt+1, Alt+2, ...）

KeyMap（今回仕様） State_default KeyMap: { tabSwitch: { } }

説明：通常状態ではショートカット割当なし（画面遷移等のショートカットは導入しない）

State_TextBox 入力中 KeyMap: { characterSelect: { "Alt+1": "select characters[0]", "Alt+2": "select characters[1]", "Alt+3": "select characters[2]" // characters 数に応じて Alt+4... を追加可能 } }

説明：入力中のみ、Alt+番号で登録済みキャラクターを即選択する（選択ハイライト表示）

備考：登録数が少ない場合、存在しない番号は何もしない（またはトーストで「未登録」を表示）

データモデル（簡潔） Character = { id: "uuid or incremental int", name: "string" }

AppState = { tab: "talk" | "character", characters: Character[], activeCharacterId: string | null, textBoxFocused: boolean }

characters は名前のみ管理（今回要件）

保存推奨：localStorage（key: app.characters）

UI 要素（高レベル）

TextBox：フォーカス時に textBoxFocused = true にする

CharacterSelectTag：登録済み characters をボタン群で表示、クリックで選択

CharacterDictionary (tab)：名前追加用のインプット＋追加ボタン

イベント（推奨命名）

onTextBoxFocus() / onTextBoxBlur() — State 切替（ショートカット有効化／無効化）

onCharacterAdd(name) — 図鑑にキャラ追加（localStorage 保存）

onCharacterSelect(characterId) — キャラ選択（ボタン操作・ショートカット共通）

onKeyShortcut(action) — KeyMapManager からの汎用アクション受け口（今回 "select characters[i]"）

挙動フロー（利用時）

ユーザーが character タブで名前を追加 → characters に登録（localStorage に保存）。

talk タブの TextBox にフォーカス → textBoxFocused = true → KeyMap（characterSelect）を有効化。

Alt+1（など）押下 → 該当インデックスのキャラクターが選択される（onCharacterSelect 呼出）。

選択は UI 上でハイライト表示。動作はクリック選択と同じ結果を生む。

表示 / エラー処理

存在しないインデックス（例：Alt+3 だが characters.length < 3）の場合は無視、または短い通知を表示（「キャラクターが登録されていません」）。

重複登録は仕様次第で許容／拒否。推奨：重複は警告して拒否。

永続化（テスト段階）

推奨：localStorage（key: app.characters）

初期ロードで読み込み、追加／削除時に保存

将来的にサーバ同期が必要であれば別途 API 設計

アクセシビリティ（簡潔）

Character ボタンは <button> として keyboard focus が可能にする（クリック以外に Tab→Enter で選択できる）。

ショートカット利用時もフォーカスインジケーターを視覚的に残す。

チェックリスト（導入用）

CharacterDictionary（name 入力＋追加）を実装し localStorage に保存

CharacterSelectTag に登録済み name を表示（クリックで onCharacterSelect）

TextBox の focus/blur で textBoxFocused を管理

KeyMapManager は textBoxFocused === true のときのみ Alt+N を onCharacterSelect にマッピング

存在しないインデックスでのショートカットは安全に無視（または通知）する
