import React from 'react';

const Header = ({ logoText = 'NovelTalk', showAuto = true, showSkip = true, onAutoToggle, onSkipToggle }) => {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ccc' }}>
      <h1>{logoText}</h1>
      <div>
        {showAuto && <button onClick={onAutoToggle}>Auto</button>}
        {showSkip && <button onClick={onSkipToggle} style={{ marginLeft: '10px' }}>Skip</button>}
      </div>
    </header>
  );
};

export default Header;
