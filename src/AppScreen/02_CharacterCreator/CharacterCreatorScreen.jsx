import React, { useState } from 'react';
import TabNavigation from '@/components/nav/TabNavigation';
import BasicInfoTab from './CharacterTabs/BasicInfoTab';
import VisualTab from './CharacterTabs/VisualTab';
import StatsTab from './CharacterTabs/StatsTab';
import SkillsTab from './CharacterTabs/SkillsTab';

const CharacterCreatorScreen = () => {
  const [activeTab, setActiveTab] = useState('basic');

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
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="tab-contents">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default CharacterCreatorScreen;