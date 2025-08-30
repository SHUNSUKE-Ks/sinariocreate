import React from 'react';
import HomeHeader from './HomeHeader';
import HomeQuickActions from './HomeQuickActions';
import HomeRecentList from './HomeRecentList';
import HomeTips from './HomeTips';

const HomeScreen = () => {
  return (
    <div className="home-screen">
      <HomeHeader title="ホーム" subtitle="最近の編集とショートカット" />
      <HomeQuickActions />
      <HomeRecentList />
      <HomeTips />
    </div>
  );
};

export default HomeScreen;