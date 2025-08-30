import React from 'react';
import LifeStageSelector from './LifeStageSelector';
import EventDisplay from './EventDisplay';
import ProgressTracker from './ProgressTracker';

const GameLifeScreen = () => {
  return (
    <div className="game-life-screen">
      <h2>人生シミュレーション</h2>
      <LifeStageSelector />
      <EventDisplay />
      <ProgressTracker />
    </div>
  );
};

export default GameLifeScreen;