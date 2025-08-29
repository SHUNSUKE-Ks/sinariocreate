npm create vite@latest [project-name] -- --template react
sinariocreate_ver2.1

  #  プロジェクト設定反映 ToDoリスト                                                                
                                                                                                 
                                                                                                 
   1. `package.json` の更新:                                                                     
       * dependencies と devDependencies に、tailwindcss, postcss, autoprefixer,                 
         react-router-dom, vite-plugin-pwa などを追加・更新します。                              
       * lint スクリプトを修正します。                                                           
                                                                                                 
                                                                                                 
   2. 設定ファイルの作成と上書き:
       * vite.config.js: PWA対応の設定を追記します。
       * eslint.config.js: 新しいルールで上書きします。
       * tailwind.config.js: 新規作成します。
       * postcss.config.js: 新規作成します。

   3. `index.html` の更新:
       * PWAのための基本的なメタタグや、lang="ja" などを設定します。


   4. Tailwind CSS の有効化:
       * src/index.css の内容を、Tailwind CSSを読み込むための記述で上書きします。


   5. PWA用アイコンの準備:
       * public フォルダ内に icons ディレクトリを作成します。
       * （ユーザー作業）作成した public/icons フォルダに、192x192 と 512x512
         サイズのPNGアイコンを配置していただく必要があります。


   6. 依存関係のインストール:
       * 更新された package.json に基づいて、npm install を実行します。


   7. プレースホルダーの置換:
       * 各設定ファイル内の [APP_NAME] や [APP_TITLE]
         などのプレースホルダーを、このプロジェクトに合わせた具体的な名前に置換します。



# React + Vite プロジェクトテンプレート設定

## package.json

`
{
  "name":  [project-name] ,
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@headlessui/react": "^2.2.4",
    "@heroicons/react": "^2.2.0",
    "@vitejs/plugin-react": "^4.5.2",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-router-dom": "^7.6.2",
    "vite-plugin-pwa": "^1.0.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.25.0",
    "@types/react": "^19.1.2",
    "@types/react-dom": "^19.1.2",
    "@vitejs/plugin-react-swc": "^3.9.0",
    "autoprefixer": "^10.4.21",
    "eslint": "^9.25.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "globals": "^16.0.0",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.17",
    "vite": "^6.3.5"
  }
}
`

## vite.config.js

`javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: '[APP_FULL_NAME]',
        short_name: '[APP_SHORT_NAME]',
        description: '[APP_DESCRIPTION]',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'icons/[APP_NAME]_Logo_192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/[APP_NAME]_Logo_512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
`

## eslint.config.js

`javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module"
      }
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // アンダースコアで始まる変数を無視
      "no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_"
        }
      ],
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "no-case-declarations": "off"
    }
  }
];
`

## 追加設定ファイル

### tailwind.config.js

`javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`

### postcss.config.js

`javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`

### index.html テンプレート

`html
<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>[APP_TITLE]</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`

## プロジェクト作成手順

1. **新規プロジェクト作成**
    
    `ash
    
	
    cd [project-name]
    `
    
2. **設定ファイルコピー**
    
    - 上記テンプレートの [PROJECT_NAME], [APP_FULL_NAME] などを使用目的に応じた値に置き換える
    - 各設定ファイルをコピー
3. **アイコン配置**
    
    `
    public/
    └── icons/
        ├── [APP_NAME]_Logo_192x192.png
        └── [APP_NAME]_Logo_512x512.png
    `
    
4. **関連依存インストール**
    
    `ash
    npm install
    `
    
5. **開発開始**
    
    `ash
    npm run dev
    `
    

## 備考

- **PWA対応**: ServiceWorker更新とマニフェスト設定済み
- **Tailwind CSS**: ユーティリティファーストCSS
- **ESLint**: React Hooksと未使用変数のカスタムルール
- **React Router**: SPAルーティング
- **HeadlessUI/Heroicons**: アクセシブルなUIコンポーネント

## カスタマイズポイント

- [PROJECT_NAME]: npmパッケージ名
- [APP_FULL_NAME]: PWAマニフェストのフルネーム
- [APP_SHORT_NAME]: PWAマニフェストの省略名
- [APP_DESCRIPTION]: アプリの説明
- [APP_NAME]: アイコンファイル名のプリフィックス
- [APP_TITLE]: HTMLタイトル