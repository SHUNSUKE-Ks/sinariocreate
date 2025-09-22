import React from "react";

const CharaPreview = ({ character, size = 128 }) => {
  if (!character) {
    return (
      <div
        style={{
          width: size,
          height: size,
          border: "1px dashed #666",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "#888",
          textAlign: "center"
        }}>
        <p>キャラクター</p>
        <p>なし</p>
      </div>
    );
  }

  // Placeholder for avatar image. User specified only unimplemented icons are needed.
  // For now, just display the first letter of the name or a generic icon.
  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: "50%",
    backgroundColor: "#444",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: size / 3,
    color: "white",
    marginBottom: "8px",
    border: "2px solid #888"
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={avatarStyle}>{character.name ? character.name[0] : ""}</div>
      {/* ここを調整してください：minWidthとmaxWidthで名前の表示幅を固定します。 */}
      {/* 例: 全角6文字に固定したい場合は '6ch' を指定します。 */}
      {/* textAlign: 'center' でテキストが中央寄せになります。 */}
      <div
        style={{
          fontSize: "1.2em",
          color: "white",
          minWidth: "12ch",
          maxWidth: "6ch",
          textAlign: "center",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }}>
        {character.name}
      </div>
    </div>
  );
};

export default CharaPreview;
