# React移行のための引継ぎ資料

## 1. プロジェクト概要

このプロジェクトは、RPG（ロールプレイングゲーム）向けのキャラクター作成ツールです。ユーザーは能力値の割り振り、スキルや特質の選択・作成を行い、独自のキャラクターを構築できます。

-   **現在の技術スタック:**
    -   フロントエンド: HTML, CSS, JavaScript (Vanilla JS)
    -   バックエンド: Firebase (Firestore)
    -   その他: PWA (Progressive Web App) 対応

## 2. 主要機能一覧

-   **キャラクター情報入力:**
    -   名前、性別、出自、外見詳細のテキスト入力。
-   **能力値割り振り:**
    -   初期30点の「才能ポイント」を、6つの能力値（筋力, 器用さ, 耐久力, 知力, 判断力, 魅力）に割り振る。
    -   各能力値は8〜18の範囲で調整可能。
-   **スキル・特質の管理:**
    -   キャラクターのスキルと特質を自由記述で追加。
    -   入力したスキル・特質リストを、それぞれ`skillBook.jsonc`, `traitBook.jsonc`としてローカルに保存可能。
-   **データ永続化:**
    -   **ローカル保存:** 作成したキャラクターの全データを`characterData.jsonc`としてダウンロード。
    -   **Firebase保存:** キャラクターの基本情報をFirestoreデータベースに保存。
-   **データ読み込み:**
    -   ローカルの`skillBook.jsonc` / `traitBook.jsonc`ファイルを読み込み、内容をモーダルウィンドウで確認できる。
-   **PWA機能:**
    -   Service Workerにより、オフラインでの利用やホーム画面へのインストールが可能。
-   **その他:**
    -   能力値のランダム生成機能とリセット機能。
    -   ヘッダーの吹き出しに、開発進捗コメントがランダムで表示される。

## 3. 画面レイアウトとUI構成

UIは主に以下のパーツで構成されています。

-   **Header:**
    -   キャラクターアイコンとランダムなセリフを表示する吹き出し。
    -   残りの「才能ポイント」表示。
    -   キャラクターをリセットするボタン。
    -   各種操作（保存、読み込み等）を行うためのサイドメニューを開くボタン。
-   **Side Panel (Menu):**
    -   キャラクターの保存（ローカル/Firebase）、ランダム生成、データ読み込みなどのアクションボタン群。
-   **Tab Navigation:**
    -   「基本」「外見」「能力値」「技能」の4つのタブで表示コンテンツを切り替える。
-   **Tab Contents:**
    -   **基本 (Basic):** 名前、出自の入力エリア。
    -   **外見 (Visual):** キャラクターのビジュアル表示エリアと、外見詳細の入力エリア。
    -   **能力値 (Stats):** 6つの能力値を `+` / `-` ボタンで操作するUI。
    -   **技能 (Skills):** スキルと特質をそれぞれリスト形式で入力するフォーム。

## 4. データフローとデータ構造

-   **`data/skillBook.jsonc`, `data/traitBook.jsonc`:**
    -   **目的:** アプリケーションで使用可能なスキル/特質のマスターデータを定義します。
    -   **構造:** `{ "name": "スキル名", "dict": "説明" }` のオブジェクト配列。
    -   **フロー:** ユーザーはUI上からこの形式のファイルを読み込んだり、UI上で作成したリストをこの形式でエクスポートしたりできます。
-   **`characterData.jsonc` (エクスポート時):**
    -   **目的:** 作成したキャラクターの全情報を単一ファイルとして保存します。
    -   **構造:** `00_doc/JSONC_Formats.md` に定義されている通り、キャラクターの全情報（ステータス、スキル、特質など）を含みます。
-   **Firebase (Firestore):**
    -   **目的:** キャラクターデータをクラウドに保存します。
    -   **フロー:** 「Firebase保存」ボタンを押すと、現在のキャラクターデータがFirestoreの`charactercreate`コレクションに新しいドキュメントとして保存されます。

## 5. Reactへの移行方針案

### a. コンポーネント設計案

現在のHTML構造を参考に、以下の様にコンポーネントを分割することを推奨します。

-   `src/components/`
    -   `Header.jsx`: ヘッダー全体。
    -   `SideMenu.jsx`: 保存・読込ボタンを持つサイドパネル。
    -   `TabNavigation.jsx`: タブ切り替えボタン群。
    -   `CharacterTabs/`
        -   `BasicInfoTab.jsx`: 「基本」タブのコンテンツ。
        -   `AppearanceTab.jsx`: 「外見」タブのコンテンツ。
        -   `StatsTab.jsx`: 「能力値」タブのコンテンツ。
        -   `SkillsTab.jsx`: 「技能」タブのコンテンツ。
    -   `ui/`
        -   `Button.jsx`, `Input.jsx`, `Panel.jsx` などの汎用UIコンポーネント。

### b. 状態管理

-   **キャラクターデータ:**
    -   キャラクターの全情報（名前、能力値、スキル等）は、アプリケーション全体で共有されるべきグローバルな状態です。`useReducer` と `useContext` を組み合わせるか、`Zustand` や `Redux Toolkit` などの状態管理ライブラリを用いて一元管理するのが適切です。
-   **UI状態:**
    -   アクティブなタブ、サイドメニューの開閉状態などは、それぞれを管理する親コンポーネント内で `useState` を使って管理するのがシンプルです。

### c. データとロジック

-   **マスターデータ:** `skillBook.jsonc` と `traitBook.jsonc` は、`src/data/` ディレクトリに配置し、コンポーネントから直接 `import` して利用できます。
-   **ロジックの分離:** 能力値の計算ロジックや、キャラクターデータの保存/読込処理は、カスタムフック（例: `useCharacterStats`, `useCharacterData`）として切り出すと、コンポーネントの見通しが良くなります。

### d. Firebase連携

-   `Firebase_Integration_Manual.md` に記載されている通り、`src/firebase.js` を作成してFirebaseの初期化を行います。
-   Firestoreとのやり取りは、専用のサービスファイル (`src/services/firebaseService.js`) やカスタムフックにカプセル化することを推奨します。

### e. PWA対応

-   Create React AppやViteなどのモダンなReact開発環境には、PWAをサポートするテンプレートやプラグインが用意されています。既存の`manifest.webmanifest`や`sw.js`のロジックを、選択したフレームワークの作法に沿って移植してください。

### f. 主要機能の実装詳細

#### 1. ローカルファイルへの書き出し

**方針:** グローバルStateからキャラクターデータを取得し、`Blob`オブジェクトを介してJSONファイルを生成、ダウンロードさせます。

**コード例:**
```jsx
// SideMenu.jsx やカスタムフック内
import { useCharacterStore } from '''../store/characterStore'''; // Zustandなどを想定

const handleSaveToLocal = () => {
  const characterData = useCharacterStore.getState(); 

  const dataToSave = {
    name: characterData.name,
    gender: characterData.gender,
    description: characterData.description,
    appearance: characterData.appearance,
    stats: characterData.stats,
    skills: characterData.skills,
    traits: characterData.traits
  };

  const jsonString = JSON.stringify(dataToSave, null, 2);
  const blob = new Blob([jsonString], { type: '''application/json''' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('''a''');
  a.href = url;
  a.download = `${characterData.name || '''character'''}.jsonc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  alert('''キャラクターデータをローカルに保存しました。''');
};
```

#### 2. Firebaseへの書き出し

**方針:** `firebase.js`で初期化されたdbインスタンスを使い、Firestoreの`charactercreate`コレクションにキャラクターデータを`addDoc`で追加します。

**コード例（サービス層）:**
```javascript
// src/services/firebaseService.js
import { db } from '''../firebase''';
import { collection, addDoc, serverTimestamp } from '''firebase/firestore''';

export const saveCharacterToFirebase = async (characterData) => {
  if (!characterData.name) {
    alert('''キャラクター名を入力してください。''');
    throw new Error('''Character name is required.''');
  }

  const dataToSave = {
    name: characterData.name,
    description: characterData.description,
    stats: characterData.stats,
    skills: characterData.skills,
    traits: characterData.traits,
    createdAt: serverTimestamp()
  };

  try {
    const docRef = await addDoc(collection(db, "charactercreate"), dataToSave);
    alert('''キャラクターをFirebaseに保存しました！''');
    return docRef;
  } catch (error) {
    console.error("Error adding document: ", error);
    alert('''Firebaseへの保存中にエラーが発生しました。''');
    throw error;
  }
};
```

**コード例（コンポーネントからの呼び出し）:**
```jsx
// SideMenu.jsx
import { useCharacterStore } from '''../store/characterStore''';
import { saveCharacterToFirebase } from '''../services/firebaseService''';

const handleSaveToFirebase = async () => {
  const characterData = useCharacterStore.getState();
  try {
    await saveCharacterToFirebase(characterData);
  } catch (error) {
    // エラー時のUIフィードバック
  }
};
```