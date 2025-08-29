import React from 'react';
import { useCharacter } from '@/hooks/useCharacter';

const Header = () => {
  const { state } = useCharacter();

  return (
    <header className="header-container">
        <div className="header-left">
            <img src="/assets/Wizard_OldMan_Front_Pixel.png" alt="Character Icon" className="character-icon" />
            <div className="speech-bubble" id="speech-bubble-text">...</div>
        </div>
        <div className="header-right">
            <div className="header-info">残り才能: <span id="header-remaining-points">{state.talentPoints}</span></div>
            <button className="header-btn" id="reset-button">リセット</button>
            <button className="header-btn">メニュー</button>
        </div>
    </header>
  );
};

export default Header;
