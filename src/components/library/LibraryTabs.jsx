import React from 'react';

/**
 * タブ切り替えUI
 * @param {object} props
 * @param {object} props.tabs - タブの定義オブジェクト (例: { KEY: '表示名' })
 * @param {string} props.activeTab - 現在アクティブなタブの表示名
 * @param {function} props.onTabChange - タブがクリックされたときに呼ばれる関数
 */
const LibraryTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-700">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {Object.values(tabs).map((tabName) => (
          <button
            key={tabName}
            onClick={() => onTabChange(tabName)}
            className={`${
              activeTab === tabName
                ? 'border-sky-500 text-sky-400'
                : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            {tabName}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default LibraryTabs;
