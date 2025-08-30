import React from 'react';

const HomeQuickActions = () => {
  return (
    <div className="panel quick-actions-panel">
      <h3>よく使う操作</h3>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button className="bottom-btn">新規作成</button>
        <button className="bottom-btn">インポート</button>
        <button className="bottom-btn">設定を開く</button>
      </div>
    </div>
  );
};

export default HomeQuickActions;