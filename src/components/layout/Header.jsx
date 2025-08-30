import React from 'react';
import { useCharacter } from '@/hooks/useCharacter';
import { useCharacterStats } from '@/hooks/useCharacterStats';
import WizardIcon from '@/assets/Wizard_OldMan_Front_Pixel.png';

const Header = ({ toggleSidePanel }) => { // Receive toggleSidePanel as prop
  const { state } = useCharacter();
  const { resetStats } = useCharacterStats();

  return (
    <header className="header-container">
        <div className="header-left">
            <img src={WizardIcon} alt="Character Icon" className="character-icon" />
            <div className="speech-bubble" id="speech-bubble-text">...</div>
        </div>
        <div className="header-right">
            <div className="header-info">残り才能: <span id="header-remaining-points">{state.talentPoints}</span></div>
            <button className="header-btn" id="reset-button" onClick={resetStats}>リセット</button>
            <button className="header-btn" onClick={toggleSidePanel}>メニュー</button> {/* Connect toggleSidePanel */}
        </div>
    </header>
  );
};

export default Header;
