import React, { useRef } from 'react';
import { useCharacterStats } from '@/hooks/useCharacterStats';
import { useCharacter } from '@/hooks/useCharacter';

const SidePanel = ({ isOpen, toggleSidePanel }) => {
  const { randomizeStats } = useCharacterStats();
  const { saveCharacterDataLocal, saveCharacterDataFirebase, loadSkillBook, loadTraitBook, startNewLife } = useCharacter();

  const skillBookInputRef = useRef(null);
  const traitBookInputRef = useRef(null);

  const handleLoadSkillBookClick = () => {
    skillBookInputRef.current.click();
  };

  const handleLoadTraitBookClick = () => {
    traitBookInputRef.current.click();
  };

  return (
    <div className={`side-panel ${isOpen ? 'open' : ''}`}> {/* Apply 'open' class conditionally */}
      <div className="side-panel-header">
        <h3>メニュー</h3>
        <button className="side-panel-close" onClick={toggleSidePanel}>×</button> {/* Connect toggleSidePanel */}
      </div>
      <div className="points-section">
        <div className="bottom-buttons">
          <button className="bottom-btn" id="start-life-btn" onClick={startNewLife}>人生を始める</button>
          <button className="bottom-btn" id="save-local-btn" onClick={saveCharacterDataLocal}>ローカル保存</button>
          <button className="bottom-btn" id="save-firebase-btn" onClick={saveCharacterDataFirebase}>Firebase保存</button>
          <button className="bottom-btn" id="random-btn" onClick={randomizeStats}>ランダム</button>
          <button className="bottom-btn" id="load-skill-book-btn" onClick={handleLoadSkillBookClick}>スキルブック読込</button>
          <button className="bottom-btn" id="load-trait-book-btn" onClick={handleLoadTraitBookClick}>特質ブック読込</button>
        </div>
      </div>
      {/* Hidden file inputs for loading books */}
      <input
        type="file"
        id="skill-book-input"
        ref={skillBookInputRef}
        style={{ display: 'none' }}
        accept=".jsonc,.json"
        onChange={loadSkillBook}
      />
      <input
        type="file"
        id="trait-book-input"
        ref={traitBookInputRef}
        style={{ display: 'none' }}
        accept=".jsonc,.json"
        onChange={loadTraitBook}
      />
    </div>
  );
};

export default SidePanel;