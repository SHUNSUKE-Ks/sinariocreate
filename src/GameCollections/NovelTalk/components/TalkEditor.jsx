import React, { forwardRef } from 'react';

const TalkEditor = forwardRef(({ value, onChange, placeholder, rows = 10, onFocus, onBlur, onCtrlEnter }, ref) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      if (onCtrlEnter) {
        onCtrlEnter();
      }
    }
  };

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      rows={rows}
      style={{
        width: '100%',
        minHeight: '180px',
        resize: 'vertical',
        backgroundColor: '#333',
        color: '#ddd',
        padding: '16px',
        borderRadius: '4px',
        border: '1px solid #555',
        boxSizing: 'border-box',
        fontFamily: 'inherit',
        fontSize: '1em',
      }}
    />
  );
});

export default TalkEditor;
