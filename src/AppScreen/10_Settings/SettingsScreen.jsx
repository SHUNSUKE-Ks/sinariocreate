import React from 'react';

const SettingsScreen = () => {
  return (
    <div className="settings-screen">
      <h2>設定</h2>
      <div className="panel">
        <h3>キーマップ設定</h3>
        <p>キーマップのJSONCファイルをインポート・エクスポートできます。</p>
        <button className="bottom-btn">キーマップをインポート</button>
        <button className="bottom-btn">キーマップをエクスポート</button>
      </div>
      <div className="panel">
        <h3>その他設定</h3>
        <p>ここに他の設定項目を追加します。</p>
      </div>
    </div>
  );
};

export default SettingsScreen;