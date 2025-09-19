import React from 'react';
import CharacterButton from './CharacterButton';

const CharacterSelectTag = ({ characters, activeCharacterId, onSelect, maxVisible, buttonSize = 'md' }) => {
  if (!characters || characters.length === 0) {
    return <div>キャラクターが登録されていません</div>;
  }

  const visibleCharacters = maxVisible ? characters.slice(0, maxVisible) : characters;

  return (
    <div>
      {visibleCharacters.map((char) => (
        <CharacterButton
          key={char.id}
          name={char.name}
          isActive={char.id === activeCharacterId}
          onClick={() => onSelect(char.id)}
        />
      ))}
    </div>
  );
};

export default CharacterSelectTag;
