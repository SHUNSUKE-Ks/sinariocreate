import React, { useState } from 'react';

const CharacterDictionary = ({ characters, onAdd, onRemove, onEdit, placeholder = 'キャラクター名', maxNameLength = 20, allowDuplicate = false }) => {
  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');
  const [inlineEditingId, setInlineEditingId] = useState(null);
  const [inlineEditText, setInlineEditText] = useState('');

  const handleAdd = () => {
    if (!newName.trim()) {
      setError('名前を入力してください');
      return;
    }
    if (!allowDuplicate && characters.some(c => c.name === newName)) {
      setError('同じ名前のキャラクターが既に存在します');
      return;
    }
    if (newName.length > maxNameLength) {
      setError(`${maxNameLength}文字以内で入力してください`);
      return;
    }

    onAdd(newName);
    setNewName('');
    setError('');
  };

  const handleAddKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const startInlineEditing = (character) => {
    setInlineEditingId(character.id);
    setInlineEditText(character.name);
  };

  const handleInlineEditChange = (e) => {
    setInlineEditText(e.target.value);
  };

  const commitInlineEdit = () => {
    if (inlineEditingId && inlineEditText.trim()) {
      onEdit(inlineEditingId, inlineEditText);
    }
    setInlineEditingId(null);
    setInlineEditText('');
  };

  const handleInlineEditKeyDown = (e) => {
    if (e.key === 'Enter') {
      commitInlineEdit();
    }
    if (e.key === 'Escape') {
      setInlineEditingId(null);
      setInlineEditText('');
    }
  };

  return (
    <div>
      <h3>キャラクター図鑑</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Add character row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={handleAddKeyDown}
            placeholder={placeholder}
            maxLength={maxNameLength}
            style={{ color: 'white', backgroundColor: '#333', flex: 1, marginRight: '10px' }}
          />
          <div style={{ border: '1px solid white', padding: '5px' }}>
            <button onClick={handleAdd}>追加</button>
          </div>
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}

        {/* Character list */}
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {characters.map(char => (
            <li key={char.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
              {inlineEditingId === char.id ? (
                <input
                  type="text"
                  value={inlineEditText}
                  onChange={handleInlineEditChange}
                  onKeyDown={handleInlineEditKeyDown}
                  onBlur={commitInlineEdit}
                  autoFocus
                  style={{ border: '1px solid white', padding: '8px', width: '20ch', color: 'white', backgroundColor: '#333' }}
                />
              ) : (
                <span 
                  onClick={() => startInlineEditing(char)}
                  style={{ border: '1px solid white', padding: '8px', width: '20ch', cursor: 'pointer' }}
                >
                  {char.name}
                </span>
              )}
              <div style={{ display: 'flex', gap: '5px', paddingLeft: '8px' }}>
                <button onClick={() => onRemove(char.id)} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '8px' }}>
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CharacterDictionary;
