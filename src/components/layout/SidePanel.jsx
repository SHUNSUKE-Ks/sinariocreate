import React from 'react';
import { useCharacterStats } from '@/hooks/useCharacterStats';

const SidePanel = ({ isOpen, toggleSidePanel }) => { // Receive isOpen and toggleSidePanel as props
  const { randomizeStats } = useCharacterStats();

  return (
    <div className={`side-panel ${isOpen ? 'open' : ''}`}> {/* Apply 'open' class conditionally */}
        <div className="side-panel-header">
            <h3>メニュー</h3>
            <button className="side-panel-close" onClick={toggleSidePanel}>×</button> {/* Connect toggleSidePanel */}
        </div>
        <div className="points-section">
            <div className="bottom-buttons">
                <button className="bottom-btn" id="start-life-btn">人生を始める</button>
                <button className="bottom-btn" id="save-local-btn">ローカル保存</button>
                <button className="bottom-btn" id="save-firebase-btn">Firebase保存</button>
                <button className="bottom-btn" id="random-btn" onClick={randomizeStats}>ランダム</button>
                <button className="bottom-btn" id="load-skill-book-btn">スキルブック読込</button>
                <button className="bottom-btn" id="load-trait-book-btn">特質ブック読込</button>
            </div>
        </div>
    </div>
  );
};

export default SidePanel;