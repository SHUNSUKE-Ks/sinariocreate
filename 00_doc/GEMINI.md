# Git コミットメッセージのルール

このプロジェクトでは、Gitのコミットメッセージに以下のルールを適用します。

## フォーマット

コミットメッセージは、以下の形式に従ってください。

`<type>:<subject_with_underscores>`

-   `<type>`: コミットの種類を表す接頭辞 (例: `feat`, `fix`, `chore`, `refactor`)
-   `<subject_with_underscores>`: コミットの概要。**スペースは使用せず、代わりにアンダースコア `_` を使用してください。**

## なぜこのルールが必要か？

現在使用している環境では、コミットメッセージにスペースが含まれていると、`git commit` コマンドの実行時にエラーが発生する問題が確認されています。このルールは、そのエラーを確実に回避するためのものです。

## 良い例

-   `feat:Add_new_character_stats`
-   `fix:Correct_calculation_of_remaining_points`
-   `chore:Add_gitignore_to_exclude_env_files`
-   `refactor:Rename_characterCreate_to_index`

## 悪い例 (スペースを使用)

-   `feat: Add new character stats`
