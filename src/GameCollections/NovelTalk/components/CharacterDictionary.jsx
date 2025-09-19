import React, { useState } from 'react';

const CharacterDictionary = ({ characters, onAdd, onRemove, placeholder = 'キャラクター名', maxNameLength = 20, allowDuplicate = false }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (!name.trim()) {
      setError('名前を入力してください');
      return;
    }
    if (!allowDuplicate && characters.some(c => c.name === name)) {
      setError('同じ名前のキャラクターが既に存在します');
      return;
    }
    if (name.length > maxNameLength) {
      setError(`${maxNameLength}文字以内で入力してください`);
      return;
    }

    onAdd(name);
    setName('');
    setError('');
  };

  return (
    <div>
      <h3>キャラクター図鑑</h3>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={placeholder}
          maxLength={maxNameLength}
          style={{ color: 'white', backgroundColor: '#333' }}
        />
        <button onClick={handleAdd}>追加</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
      <ul>
        {characters.map(char => (
          <li key={char.id}>
            {char.name}
            <button onClick={() => onRemove(char.id)} style={{ marginLeft: '10px' }}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterDictionary;
