# Project Folder Structure

This document outlines the folder and file structure of the `sinariocreate_ver2.1` project.

## Root Directory

-   `.env`: Environment variables for the project.
-   `.gitignore`: Specifies intentionally untracked files to ignore.
-   `eslint.config.js`: Configuration file for ESLint, a code linter.
-   `firebase-config.js`: Configuration for connecting to Firebase.
-   `index.html`: The main HTML entry point for the web application.
-   `jsconfig.json`: Configuration file for JavaScript language services.
-   `package-lock.json`: Records the exact version of each installed package.
-   `package.json`: Defines project metadata and dependencies.
-   `postcss.config.js`: Configuration for PostCSS, a CSS preprocessor.
-   `README.md`: General information about the project.
-   `tailwind.config.js`: Configuration file for the Tailwind CSS framework.
-   `TrialRogue.md`: Document related to a "Trial Rogue" feature or concept.
-   `vite.config.js`: Configuration file for Vite, the build tool.

---

## `00_doc/`

-   **Purpose**: Contains general project documentation and memos.
-   `AppScreen.md`: Documentation for application screens.
-   `GEMINI.md`: Memos or instructions related to Gemini.
-   `MEMO.md`: General memos.
-   `PJ_setup.md`: Notes on project setup.
-   `REACT_MIGRATION_PLAN.md`: Plan for migrating to a new React version or structure.
-   `sampleLayout.html`: Sample HTML layout.
-   `SinarioCreate_専用フォルダー構造_Ver1.1.md`: Older version of the folder structure documentation.
-   `small-app_フォルダー構成_Ver2.5.md`: Older version of the folder structure documentation.
-   `small-app_フォルダー構成_Ver2.6.md`: Older version of the folder structure documentation.
-   `TODO_List.md`: A list of tasks to be done.

---

## `01_doc/`

-   **Purpose**: Contains more specific or secondary documentation.
-   `EntrySheet_作成依頼書.md`: Request form for creating entry sheets.
-   `Firebase_Implementation_TODO.md`: To-do list for Firebase implementation.
-   `Firebase_Integration_Manual.md`: Manual for integrating Firebase.
-   `Layout01.txt`: Text file describing a layout.
-   `Memo01.md`: Another memo file.

---

## `1001_TrialRogue/`

-   **Purpose**: Documents related to the "Trial Rogue" feature.
-   `GenerateMap_SPEC.md`: Specifications for map generation.
-   `GenerateMap_TODO.md`: To-do list for map generation.

---

## `public/`

-   **Purpose**: Contains static assets that are publicly accessible.
-   `vite.svg`: Vite logo.
-   `icons/`: Application icons.
    -   `SinarioCreate_Logo_192x192.png`: 192x192 version of the app logo.
    -   `SinarioCreate_Logo_512x512.png`: 512x512 version of the app logo.

---

## `SampleImage/`

-   **Purpose**: Contains sample images for the application.
-   `01_Taitle.png`: Sample title screen image.
-   `02_TalkScreen.png`: Sample talk screen image.

---

## `src/`

-   **Purpose**: Contains the main source code of the application.

### `src/App.jsx`

-   The root component of the React application.

### `src/main.jsx`

-   The entry point for the React application, where the root component is rendered.

### `src/AppScreen/`

-   **Purpose**: Contains components representing different screens of the application.
-   `00_Manager/`: Managers for application state or logic.
-   `01_Home/`: Components for the home screen.
-   `02_CharacterCreator/`: Components for the character creation screen.
-   `03_GameLife/`: Components related to the "Game Life" feature.
-   `04_ItemList/`: Screen for displaying a list of items.
-   `05_SkillList/`: Screen for displaying a list of skills.
-   `06_Story/`: Components for the story/dialogue part of the app.
-   `07_Library/`: Components for the library feature (characters, skills, etc.).
-   `10_Settings/`: Components for the settings screen.

### `src/assets/`

-   **Purpose**: Contains static assets like images, fonts, etc., used within the source code.
-   `Wizard_OldMan_Front_Pixel.png`: An image asset.
-   `characterImageList/`: A directory containing character images.

### `src/components/`

-   **Purpose**: Contains reusable UI components.
-   `cards/`: Card-style components.
-   `forms/`: Form-related components.
-   `layout/`: Layout components like headers and side panels.
-   `library/`: Components for the library feature.
-   `nav/`: Navigation-related components.

### `src/context/`

-   **Purpose**: Contains React context providers and reducers for state management.
-   `CharacterContext.jsx`: Context for character data.
-   `characterReducer.js`: Reducer for character state.
-   `ThemeContext.jsx`: Context for theme (e.g., light/dark mode).

### `src/data/`

-   **Purpose**: Contains static data files, like JSON templates.
-   `characterSheet_template.jsonc`: Template for a character sheet.
-   `gameReflectionStatus.json`: Data related to game status.
-   `sinario01.json`: Scenario data.
-   `EntrySheet/`: Data related to entry sheets.

### `src/features/`

-   **Purpose**: Contains code related to specific application features.
-   `quickOpen/`, `shortcuts/`, `tags/`: Feature modules.

### `src/GameStyles/`

-   **Purpose**: Contains global styles and CSS variables for the application.
-   `app.css`: Main application stylesheet.
-   `variables.css`: CSS custom properties (variables).

### `src/hooks/`

-   **Purpose**: Contains custom React hooks for reusing component logic.
-   `useCharacter.js`, `useCharacterImage.js`, `useCharacterStats.js`, `useSidePanel.js`: Custom hooks for specific functionalities.

### `src/utils/`

-   **Purpose**: Contains utility functions used across the application.
