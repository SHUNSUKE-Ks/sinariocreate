import React, { createContext, useReducer } from 'react';
import { characterReducer, initialCharacterState } from './characterReducer';

export const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(characterReducer, initialCharacterState);

  return (
    <CharacterContext.Provider value={{ state, dispatch }}>
      {children}
    </CharacterContext.Provider>
  );
};
