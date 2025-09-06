# Firebase 実装 TODOリスト

このドキュメントは、プロジェクトへのFirebase実装に関する作業リストです。

---

## フェーズ1: 初期設定と構成 (完了)

- [x] `firebase` ライブラリのインストール (`npm install firebase`)
- [x] `.env` ファイルにFirebaseプロジェクトの環境変数を設定
- [x] `firebase-config.js` をプロジェクトルートに作成し、Firebase初期化ロジックを記述
- [x] アプリのエントリーポイント (`src/main.jsx`) で `firebase-config.js` をインポートし、アプリ起動時にFirebaseが初期化されるように構成

---

## フェーズ2: Firestoreへの書き込みテスト (次のステップ)

**目的:** Firebaseとの接続が正常に行われ、データの書き込みが可能であることを確認する。

- [ ] **テスト用UIの作成:**
    - いずれかのコンポーネント（例: `src/AppScreen/01_Home/HomeScreen.jsx`）に、テスト実行用のボタンを一時的に追加する。

- [ ] **書き込み機能の実装:**
    - ボタンクリック時に、Firestoreデータベースにテストデータを書き込む関数を実装する。
    - `import { db } from '../../firebase-config.js'` のように、設定ファイルをインポートする。
    - `import { collection, addDoc } from 'firebase/firestore'` を使い、`test_collection` のような名前でコレクションを指定し、簡単なドキュメント（例: `{ name: 'test', timestamp: new Date() }`）を追加する。

- [ ] **動作確認:**
    - アプリを起動し、テストボタンをクリックする。
    - [Firebaseコンソール](https://console.firebase.google.com/)にアクセスし、Firestoreデータベースに `test_collection` が作成され、データが正しく書き込まれていることを確認する。

---

## フェーズ3: アプリケーションへの本格導入 (今後のタスク)

**目的:** アプリケーションのコア機能（キャラクターデータ、シナリオ等）をFirebaseに連携させる。

- [ ] **データ保存ロジックの置き換え:**
    - 現在ローカル（JSONファイルやContextなど）で管理しているキャラクターデータやシナリオデータを、Firestoreに保存・読み込みするようロジックを修正する。

- [ ] **認証機能の導入 (必要に応じて):**
    - ユーザーアカウント機能が必要な場合、Firebase Authenticationを導入する。
    - ログイン、ログアウト、新規登録画面と関連ロジックを実装する。

- [ ] **ストレージの利用 (必要に応じて):**
    - ユーザーが画像をアップロードする機能などが必要な場合、Firebase Storageを利用するロジックを実装する。

---

## フェーズ4: Vercelへのデプロイと環境設定 (最終目的)

**目的:** 本番環境でアプリケーションがFirebaseと正しく連携して動作することを確認する。

- [ ] **Vercelでの環境変数設定:**
    - Vercelのプロジェクト設定ページにアクセスする。
    - `Settings` > `Environment Variables` を選択する。
    - ローカルの `.env` ファイルに記載されている `VITE_FIREBASE_API_KEY` などのキーと値をすべて登録する。

- [ ] **デプロイ:**
    - Gitリポジトリに最新のコードをプッシュし、Vercelで新しいデプロイをトリガーする。

- [ ] **本番環境での動作確認:**
    - デプロイされたURLにアクセスする。
    - Firebaseと連携している機能（データの読み書き、認証など）がすべて正常に動作することを確認する。
