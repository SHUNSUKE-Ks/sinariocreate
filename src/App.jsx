import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Header from '@/components/layout/Header';
import SidePanel from '@/components/layout/SidePanel';
import HomeScreen from '@/AppScreen/01_Home/HomeScreen';
import CharacterCreatorScreen from '@/AppScreen/02_CharacterCreator/CharacterCreatorScreen';
import GameLifeScreen from '@/AppScreen/03_GameLife/GameLifeScreen';
import SettingsScreen from '@/AppScreen/10_Settings/SettingsScreen';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <SidePanel />
      
      {/* Simple navigation for now */}
      <nav style={{ position: 'fixed', top: '80px', zIndex: 100, background: 'black', padding: '10px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
        <Link to="/character-creator">Character Creator</Link>
        {/* Add other links as needed */}
      </nav>

      <div className="container" style={{ paddingTop: '50px' }}>
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/character-creator" element={<CharacterCreatorScreen />} />
            <Route path="/game-life" element={<GameLifeScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
