import React from 'react';

const TextBox = ({ value, placeholder, rows = 4, autoFocus = false, onChange, onEnter, onFocus, onBlur }) => {

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (onEnter) {
        onEnter();
      }
    }
  };

  return (
    <textarea
      value={value}
      placeholder={placeholder}
      rows={rows}
      autoFocus={autoFocus}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={handleKeyDown}
      style={{ width: '100%', padding: '10px', boxSizing: 'border-box', color: 'white', backgroundColor: '#333' }}
    />
  );
};

export default TextBox;
