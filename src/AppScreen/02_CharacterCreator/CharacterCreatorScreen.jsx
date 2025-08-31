import React, { useState } from 'react';
import TabNavigation from './TabNavigation';
import BasicInfoTab from './CharacterTabs/BasicInfoTab';
import VisualTab from './CharacterTabs/VisualTab';
import StatsTab from './CharacterTabs/StatsTab';
import SkillsTab from './CharacterTabs/SkillsTab';

const CharacterCreatorScreen = () => {
  const [activeTab, setActiveTab] = useState('basic');

  const characterTabs = [
    { name: '基本', id: 'basic' },
    { name: '外見', id: 'visual' },
    { name: '能力値', id: 'stats' },
    { name: '技能', id: 'skills' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicInfoTab />;
      case 'visual':
        return <VisualTab />;
      case 'stats':
        return <StatsTab />;
      case 'skills':
        return <SkillsTab />;
      default:
        return <BasicInfoTab />;
    }
  };

  return (
    <div>
      <TabNavigation tabs={characterTabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="tab-contents">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default CharacterCreatorScreen;