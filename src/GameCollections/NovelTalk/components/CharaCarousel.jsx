import React from 'react';

const CharaCarousel = ({ characters, selectedId, onSelect }) => {
  if (!characters || characters.length === 0) {
    return null;
  }

  return (
    <div className="nt-chara-row">
      {characters.map(char => (
        <div 
          key={char.id} 
          className="chara-item"
          onClick={() => onSelect(char.id)}
          style={{
            cursor: 'pointer',
            border: char.id === selectedId ? '2px solid #007bff' : '2px solid transparent',
            borderRadius: '8px',
            padding: '4px',
            backgroundColor: char.id === selectedId ? '#1a1a1a' : 'transparent',
          }}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5em',
            color: 'white',
            marginBottom: '4px',
          }}>
            {char.name ? char.name[0] : ''}
          </div>
          <div style={{ fontSize: '0.8em', color: 'white', textAlign: 'center' }}>
            {char.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CharaCarousel;
