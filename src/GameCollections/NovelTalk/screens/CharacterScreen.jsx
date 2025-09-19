import React, { useState, useEffect } from 'react';
import { saveCharacters } from '../components/PersistStore';
import CharacterDictionary from '../components/CharacterDictionary';
import Toast from '../components/Toast';
import { v4 as uuidv4 } from 'uuid';

const CharacterScreen = ({ initialCharacters, onCharactersChange }) => {
  const [characters, setCharacters] = useState(initialCharacters);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    setCharacters(initialCharacters);
  }, [initialCharacters]);

  useEffect(() => {
    saveCharacters(characters);
    if (onCharactersChange) {
      onCharactersChange(characters);
    }
  }, [characters, onCharactersChange]);

  const handleAddCharacter = (name) => {
    const newCharacter = { id: uuidv4(), name };
    setCharacters([...characters, newCharacter]);
    setToastMessage(`「${name}」を追加しました`);
  };

  const handleRemoveCharacter = (id) => {
    const charToRemove = characters.find(c => c.id === id);
    if (window.confirm(`「${charToRemove.name}」を削除しますか？`)) {
        const newCharacters = characters.filter(char => char.id !== id);
        setCharacters(newCharacters);
        setToastMessage(`「${charToRemove.name}」を削除しました`);
    }
  };

  return (
    <div>
      <CharacterDictionary
        characters={characters}
        onAdd={handleAddCharacter}
        onRemove={handleRemoveCharacter}
      />
      <Toast message={toastMessage} onClose={() => setToastMessage('')} />
    </div>
  );
};

export default CharacterScreen;
