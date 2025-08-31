import React from 'react';
import HomeHeader from './HomeHeader';
import HomeQuickActions from './HomeQuickActions';
import HomeRecentList from './HomeRecentList';
import HomeTips from './HomeTips';
import LifeStageSelector from '@/AppScreen/03_GameLife/LifeStageSelector';
import EventDisplay from '@/AppScreen/03_GameLife/EventDisplay';
import ProgressTracker from '@/AppScreen/03_GameLife/ProgressTracker';

const HomeScreen = () => {
  return (
    <div className="home-screen">
      <HomeHeader title="ホーム" subtitle="最近の編集とショートカット" />
      <HomeQuickActions />
      <HomeRecentList />
      <HomeTips />
      
      {/* GameLife content integrated into Home screen */}
      <div className="game-life-section">
        <h2>人生シミュレーション</h2>
        <LifeStageSelector />
        <EventDisplay />
        <ProgressTracker />
      </div>
    </div>
  );
};

export default HomeScreen;