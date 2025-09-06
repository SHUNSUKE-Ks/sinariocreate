import React from 'react';
import { useNavigate } from 'react-router-dom';
import titleImg from '@/GameCollections/TrialRogue/assets/images/TrialRogue_Title_1920x1080.svg';

export default function TitleScreen() {
  const nav = useNavigate();
  const goNext = () => nav('/trialrogue/stage-select');
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 16 }}>
      <img
        src={titleImg}
        alt="TrialRogue Title"
        style={{ maxWidth: '100%', height: 'auto', borderRadius: 8, boxShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
        onClick={goNext}
      />
      <button onClick={goNext} style={{
        position: 'absolute',
        bottom: 24,
        padding: '12px 20px',
        background: '#10b981',
        color: 'white',
        border: 'none',
        borderRadius: 8,
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
      }}>TAP START</button>
    </div>
  );
}
