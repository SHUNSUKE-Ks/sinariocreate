import React from 'react';

const VisualTab = () => {
  return (
    <div className="tab-content active" id="visual">
        <div className="panel">
            <div className="character-display">
                <div>キャラクターのビジュアル表示エリア<br />（ここに3Dモデルやイラストを表示）</div>
            </div>

            <div className="appearance-area">
                <div className="description-label">外見詳細:</div>
                <textarea className="appearance-text" placeholder="キャラクターの外見を入力してください..."></textarea>
            </div>
        </div>
    </div>
  );
};

export default VisualTab;
