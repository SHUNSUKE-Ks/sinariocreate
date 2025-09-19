import React, { useState, useEffect } from 'react';
import { loadCharacters } from '../components/PersistStore';
import CharacterSelectTag from '../components/CharacterSelectTag';
import TextBox from '../components/TextBox';
import useKeyMapManager from '../components/useKeyMapManager';

// This component now returns the elements to be placed in the layout
const TalkScreen = ({ characters, activeCharacterId, onCharacterSelect, onTextChange, onFocus, onBlur, textValue }) => {

  return (
    <>
        <CharacterSelectTag
          characters={characters}
          activeCharacterId={activeCharacterId}
          onSelect={onCharacterSelect}
        />
        <TextBox
          value={textValue}
          onChange={onTextChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder='セリフを入力...'
        />
    </>
  );
};

export default TalkScreen;