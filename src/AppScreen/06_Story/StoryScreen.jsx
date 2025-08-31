import React, { useState } from 'react';
import TabNavigation from '@/AppScreen/02_CharacterCreator/TabNavigation';

const StoryScreen = () => {
  const [activeTab, setActiveTab] = useState('chapterList'); // 'chapterList', 'talkScreen', 'mainQuest', 'subQuest'

  const storyTabs = [
    { name: 'チャプターリスト', id: 'chapterList' },
    { name: 'トーク画面', id: 'talkScreen' },
    { name: 'メインクエスト', id: 'mainQuest' },
    { name: 'サブクエスト', id: 'subQuest' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'chapterList':
        return <div><h3>チャプターリスト</h3><p>ここにチャプターリストの内容が表示されます。</p></div>;
      case 'talkScreen':
        return <div><h3>トーク画面</h3><p>ここにトーク画面の内容が表示されます。</p></div>;
      case 'mainQuest':
        return <div><h3>メインクエスト</h3><p>ここにメインクエストの内容が表示されます。</p></div>;
      case 'subQuest':
        return <div><h3>サブクエスト</h3><p>ここにサブクエストの内容が表示されます。</p></div>;
      default:
        return <div><h3>チャプターリスト</h3><p>ここにチャプターリストの内容が表示されます。</p></div>;
    }
  };

  return (
    <div>
      <h2>ストーリー</h2>
      <TabNavigation tabs={storyTabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="story-content">
        {renderContent()}
      </div>
      <style jsx>{`
        .story-content {
          margin-top: 20px;
          padding: 15px;
          border: 1px solid #666;
          background-color: #111;
          color: #fff;
        }
        .story-content h3 {
          margin-bottom: 10px;
          color: #fff;
        }
        .story-content p {
          color: #bbb;
        }
      `}</style>
    </div>
  );
};

export default StoryScreen;