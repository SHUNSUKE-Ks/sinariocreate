追加事項

- assets
- data
- AppScreen>00_Mnager
  - CardContllerManager 　//カードのポジションコントロール+src\data\sinario01.jsonc のファイルに合わせて、
  - AppManager //アプリの画面遷移を統括する

大カテゴリ―整理｛中カテゴリー｝ Home,CharacterCreate,GameLife,ItemList｛すべて、アイテム、武器、防具、キーアイテム｝,SkillList{スキルブック、特質ブック}、ストーリー｛メインストーリー、サブストーリー｝,ライブラリー｛キャラクター図鑑（作成したキャラクター一覧）、エネミー図鑑｝

Setting 消去 → メニューに移動 Setting｛ショートカット設定｝

本日やるべき TODO ファイヤーベース追加メモ帳作成キーマップ作成 Figma のワイヤーフレーム作成｛｝

▼ 完成図

全ての要件を満たすとゲーム g あ完成する

大カテゴリー編集名前変更｛ ・ストーリー →Story ・ライブラリー →Library ・Item ・Skill ｝項目移動｛ GameLife→Horm｛ホーム最近の編集とショートカットの section に入れ込む｝｝

アイテムリスト：｛ Icon：image Name：text 数量：num ｝ ItemIcon｛アイテム、武器、防具、キーアイテム｝プログラミングで再現可能ですか？

心の置き所 SAN 値　ｚ

C:\Users\enjoy\React_AppLists\sinariocreate_ver2.1\src\AppScreen\06_Story\StoryScreen.jsxn に中カテゴリー nav を追加して、 ChspterList,TalkScreen,mainQuest,subQuest

提案：cards.css ではなく、タイルウィンドで各ファイルにスケールを記入したほうがつかいまわしやすくなるとおもうのですが？

カードコントロールマネージャ―を作成 Component カードのポジションと Json を

sinario01.jsonc

chapter01{ sinarioID:num characterImage spaeker:characterName text: //20 文字ｘ 3 行 }

data>EntrySheet ※画像を登録して使いやすくする ※画像の発注書としても使用する Entry_CharacterImage.jsonc { chara_paper_master:"src/assets/characterImageList/chara_paper_master.png" }

Entry_UI.jsonc
