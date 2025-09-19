import React from 'react';

const CharacterButton = ({ name, isActive, disabled, onClick, ariaLabel }) => {
  const style = {
    padding: '8px 12px',
    margin: '4px',
    border: `1px solid ${isActive ? '#007bff' : '#ccc'}`,
    borderRadius: '4px',
    backgroundColor: isActive ? '#007bff' : 'white',
    color: isActive ? 'white' : 'black',
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  return (
    <button
      style={style}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || `Select character ${name}`}
    >
      {name}
    </button>
  );
};

export default CharacterButton;
