import React from 'react';
import { useCharacter } from '@/hooks/useCharacter';
import { useTheme } from '@/hooks/useTheme'; // Import useTheme hook
import WizardIcon from '@/assets/Wizard_OldMan_Front_Pixel.png';

const Header = () => {
  const { state } = useCharacter();
  const { theme, toggleTheme } = useTheme(); // Use the theme hook

  return (
    <header className="header-container">
        <div className="header-left">
            <img src={WizardIcon} alt="Character Icon" className="character-icon" />
            <div className="speech-bubble" id="speech-bubble-text">...</div>
        </div>
        <div className="header-right">
            <div className="header-info">残り才能: <span id="header-remaining-points">{state.talentPoints}</span></div>
            <button className="header-btn" id="reset-button">リセット</button>
            <button className="header-btn" onClick={toggleTheme}>
              {theme === 'light' ? 'ダークモード' : 'ライトモード'} {/* Toggle button */}
            </button>
            <button className="header-btn">メニュー</button>
        </div>
    </header>
  );
};

export default Header;
