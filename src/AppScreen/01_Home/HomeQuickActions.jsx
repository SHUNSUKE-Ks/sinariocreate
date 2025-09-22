import React from 'react';
import { Link } from 'react-router-dom';

const HomeQuickActions = () => {
  return (
    <div className="panel quick-actions-panel">
      <h3>よく使う</h3>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Link to="/talklog" className="bottom-btn">MemoList</Link>
        <Link to="/talklog" className="bottom-btn">MemoList</Link>
        <Link to="/settings" className="bottom-btn">設定を開く</Link>
        <Link to="/keymap" className="bottom-btn">KeyMap</Link>
        <Link to="/talkcharacter" className="bottom-btn">TalkCharacter</Link>
      </div>
    </div>
  );
};

export default HomeQuickActions;

