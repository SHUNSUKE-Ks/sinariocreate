import React from 'react';

const tabs = [
  { id: 'basic', label: '基本' },
  { id: 'visual', label: '外見' },
  { id: 'stats', label: '能力値' },
  { id: 'skills', label: '技能' },
];

const TabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="tab-nav">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
};

export default TabNavigation;
