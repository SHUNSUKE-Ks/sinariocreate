import React, { createContext, useReducer } from 'react';
import { characterReducer, initialCharacterState } from './characterReducer';

export const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(characterReducer, initialCharacterState);

  // Function to save data locally (file download)
  const saveCharacterDataLocal = () => {
    const characterData = {
      name: state.name,
      gender: state.gender,
      origin: state.origin,
      appearance: state.appearance,
      stats: state.stats,
      skills: state.skills,
      traits: state.traits,
    };

    const dataStr = JSON.stringify(characterData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'characterData.jsonc';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert('キャラクターデータをローカルに保存しました。');
  };

  // Function to save to Firebase (dummy for now)
  const saveCharacterDataFirebase = () => {
    console.log('Saving character data to Firebase:', state);
    alert('Firebaseへの保存機能は現在開発中です。');
    // Here you would integrate with Firebase Firestore
    // e.g., db.collection("charactercreate").add(state);
  };

  // Function to load skill book
  const loadSkillBook = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const skills = JSON.parse(e.target.result);
        // Assuming skills is an array of { name, dict }
        // You might want to dispatch an action to update skills in reducer
        console.log('Loaded skills:', skills);
        alert('スキルブックを読み込みました。');
      } catch (error) {
        alert('スキルブックの読み込みに失敗しました。JSON形式が正しいか確認してください。');
        console.error('Error parsing skill book:', error);
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset input
  };

  // Function to load trait book
  const loadTraitBook = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const traits = JSON.parse(e.target.result);
        // Assuming traits is an array of { name, dict }
        // You might want to dispatch an action to update traits in reducer
        console.log('Loaded traits:', traits);
        alert('特質ブックを読み込みました。');
      } catch (error) {
        alert('特質ブックの読み込みに失敗しました。JSON形式が正しいか確認してください。');
        console.error('Error parsing trait book:', error);
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset input
  };

  // Function for "Start New Life" button
  const startNewLife = () => {
    alert('人生を始めます！');
  };

  return (
    <CharacterContext.Provider
      value={{
        state,
        dispatch,
        saveCharacterDataLocal,
        saveCharacterDataFirebase,
        loadSkillBook,
        loadTraitBook,
        startNewLife,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};
