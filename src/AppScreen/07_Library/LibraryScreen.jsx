import React, { useState } from 'react';
import LibraryTabs from '@/components/library/LibraryTabs';
import CharacterScreen from '@/GameCollections/NovelTalk/screens/CharacterScreen';
import SkillLibrary from './SkillLibrary';
import MusicPlayer from './MusicPlayer';

const TABS = {
  CHARACTERS: 'キャラクター図鑑',
  SKILLS: 'スキル図鑑',
};

const LIBTABS = {
  CHARACTERS: 'キャラクター図鑑',
  SKILLS: 'スキル図鑑',
  MUSIC: 'Music Player',
};

const LibraryScreen = () => {
  const [activeTab, setActiveTab] = useState(LIBTABS.CHARACTERS);

  return (
    <div className="p-4 text-white bg-gray-900 h-full">
      <h1 className="text-2xl font-bold mb-4">ライブラリ</h1>
      
      <LibraryTabs 
        tabs={LIBTABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="mt-4">
        {activeTab === LIBTABS.CHARACTERS && <CharacterScreen />}
        {activeTab === LIBTABS.SKILLS && <SkillLibrary />}
        {activeTab === LIBTABS.MUSIC && <MusicPlayer />}
      </div>
    </div>
  );
};

export default LibraryScreen;
