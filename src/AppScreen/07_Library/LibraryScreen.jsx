import React, { useState } from 'react';
import LibraryTabs from '@/components/library/LibraryTabs';
import CharacterLibrary from './CharacterLibrary';
import SkillLibrary from './SkillLibrary';

const TABS = {
  CHARACTERS: 'キャラクター図鑑',
  SKILLS: 'スキル図鑑',
};

const LibraryScreen = () => {
  const [activeTab, setActiveTab] = useState(TABS.CHARACTERS);

  return (
    <div className="p-4 text-white bg-gray-900 h-full">
      <h1 className="text-2xl font-bold mb-4">ライブラリ</h1>
      
      <LibraryTabs 
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="mt-4">
        {activeTab === TABS.CHARACTERS && <CharacterLibrary />}
        {activeTab === TABS.SKILLS && <SkillLibrary />}
      </div>
    </div>
  );
};

export default LibraryScreen;
