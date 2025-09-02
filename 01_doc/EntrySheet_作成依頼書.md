EntrySheet」を用意して、画像を一元管理する仕組みを作れば シナリオ側の characterImage はキー名だけ指定できるようになります。また「発注書」としても利用できるので、未登録・未納品の画像はここで確認できます。

📄 data/EntrySheet/Entry_CharacterImage.jsonc { // ─────────────── // 納品済みキャラ画像 // ─────────────── "chara_paper_master": "src/assets/characterImageList/chara_paper_master.png",

// ─────────────── // 未納品キャラ（発注中） // ─────────────── "chara_hunter": "発注中", "chara_merchant": "発注中", "chara_miner": "発注中", "chara_blacksmith": "発注中" }

📌 運用の流れ

発注書管理

まだ絵が無いキャラは "発注中" や "未登録" を入れる。

納品されたら src/assets/characterImageList/... に差し替える。

シナリオでの使い方

{ "sinarioID": 1, "characterImage": "chara_paper_master", "speaker": "紙漉師", "text": "よう来たな。森の魔木の皮を..." }

👉 React 側で Entry_CharacterImage.jsonc を参照して実際の画像パスに変換。

再利用性アップ

同じキャラを複数章で使う場合でも、画像のパスを 1 か所で管理。

差し替えや修正もこのファイルだけで OK。

１．画像納品後のファイルパスを記入できるか？ src\assets\characterImageList にキャラクター画像を納品しました。src\data\EntrySheet\Entry_CharacterImage.jsonc にパスを通して登録してください。

２．エントリーシートのパスをシナリオ Json に反映する src\data\EntrySheet\Entry_CharacterImage.jsonc に登録した画像のキーを src\data\sinario01.jsonc に反映させて
