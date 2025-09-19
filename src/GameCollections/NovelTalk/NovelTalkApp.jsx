import React, { useState, useEffect } from 'react';
import AppLayout from './components/AppLayout';
import Header from './components/Header';
import TabBar from './components/TabBar';
import MainArea from './components/MainArea';
import LeftPanel from './components/LeftPanel';
import CharacterScreen from './screens/CharacterScreen';
import CharacterSelectTag from './components/CharacterSelectTag';
import TextBox from './components/TextBox';
import useKeyMapManager from './components/useKeyMapManager';
import { loadCharacters } from './components/PersistStore';

const NovelTalkApp = () => {
  const [activeTab, setActiveTab] = useState('talk');
  const [characters, setCharacters] = useState([]);
  const [activeCharacterId, setActiveCharacterId] = useState(null);
  const [textBoxFocused, setTextBoxFocused] = useState(false);
  const [text, setText] = useState('');

  // Load characters on mount
  useEffect(() => {
    setCharacters(loadCharacters());
  }, []);

  const handleAction = (action) => {
    if (action.startsWith('select:')) {
      const index = parseInt(action.split(':')[1], 10);
      if (characters[index]) {
        setActiveCharacterId(characters[index].id);
      }
    }
    if (action === 'start_recording') {
      console.log('Start recording action triggered');
      // Here you would typically trigger the Web Audio API to start recording.
    }
  };

  useKeyMapManager({
    isEnabled: textBoxFocused,
    onAction: handleAction,
  });

  const tabs = [
    { key: 'talk', label: 'トーク' },
    { key: 'character', label: 'キャラクター' },
  ];

  const renderMainArea = () => {
    if (activeTab === 'talk') {
      return (
        <MainArea>
          <LeftPanel variant="talk">
            <CharacterSelectTag
              characters={characters}
              activeCharacterId={activeCharacterId}
              onSelect={setActiveCharacterId}
            />
          </LeftPanel>
          <TextBox
            value={text}
            onChange={setText}
            onFocus={() => setTextBoxFocused(true)}
            onBlur={() => setTextBoxFocused(false)}
            placeholder='セリフを入力...'
          />
        </MainArea>
      );
    }
    if (activeTab === 'character') {
        // CharacterScreen handles its own logic, but we might need to pass a function to update the characters list
      return <CharacterScreen initialCharacters={characters} onCharactersChange={setCharacters} />;
    }
    return null;
  };

  return (
    <AppLayout
      header={<Header />}
      tabBar={<TabBar tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />}
      mainArea={renderMainArea()}
    />
  );
};

export default NovelTalkApp;