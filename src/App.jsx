import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import { CharacterProvider } from '@/context/CharacterContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { useSidePanel } from '@/hooks/useSidePanel'; // Import useSidePanel

import Header from '@/components/layout/Header';
import SidePanel from '@/components/layout/SidePanel';
import HomeScreen from '@/AppScreen/01_Home/HomeScreen';
import CharacterCreatorScreen from '@/AppScreen/02_CharacterCreator/CharacterCreatorScreen';
import GameLifeScreen from '@/AppScreen/03_GameLife/GameLifeScreen';
import SettingsScreen from '@/AppScreen/10_Settings/SettingsScreen';

function App() {
  const { isOpen, toggleSidePanel } = useSidePanel(); // Use the hook

  return (
    <ThemeProvider>
      <BrowserRouter>
        <CharacterProvider>
          {/* Overlay for side panel */}
          <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={toggleSidePanel}></div>

          <Header toggleSidePanel={toggleSidePanel} /> {/* Pass toggle function */}
          <SidePanel isOpen={isOpen} toggleSidePanel={toggleSidePanel} /> {/* Pass state and toggle function */}
          
          {/* Simple navigation for now */}
          <nav style={{ position: 'fixed', top: '80px', zIndex: 100, background: 'black', padding: '10px' }}>
            <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
            <Link to="/character-creator">Character Creator</Link>
            <Link to="/game-life" style={{ marginLeft: '10px' }}>Game Life</Link>
            <Link to="/settings" style={{ marginLeft: '10px' }}>Settings</Link>
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
        </CharacterProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;