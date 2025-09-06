import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import { CharacterProvider } from '@/context/CharacterContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { useSidePanel } from '@/hooks/useSidePanel';
import '@/GameStyles/trialrogue.css';

import Header from '@/components/layout/Header';
import SidePanel from '@/components/layout/SidePanel';
import HomeScreen from '@/AppScreen/01_Home/HomeScreen';
import CharacterCreatorScreen from '@/AppScreen/02_CharacterCreator/CharacterCreatorScreen';

import ItemListScreen from '@/AppScreen/04_ItemList/ItemListScreen';
import SkillListScreen from '@/AppScreen/05_SkillList/SkillListScreen';
import StoryScreen from '@/AppScreen/06_Story/StoryScreen';
import LibraryScreen from '@/AppScreen/07_Library/LibraryScreen';

import SettingsScreen from '@/AppScreen/10_Settings/SettingsScreen';
import MapPreview from '@/GameCollections/TrialRogue/generateMap/preview/MapPreview.jsx';
import TitleScreen from '@/GameCollections/TrialRogue/screens/TitleScreen.jsx';
import StageSelectScreen from '@/GameCollections/TrialRogue/screens/StageSelectScreen.jsx';
import LoadingScreen from '@/GameCollections/TrialRogue/screens/LoadingScreen.jsx';
import BattleScreen from '@/GameCollections/TrialRogue/screens/BattleScreen.jsx';

function App() {
  const { isOpen, toggleSidePanel } = useSidePanel();

  return (
    <ThemeProvider>
      <BrowserRouter>
        <CharacterProvider>
          {/* Overlay for side panel */}
          <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={toggleSidePanel}></div>

          <Header toggleSidePanel={toggleSidePanel} />
          <SidePanel isOpen={isOpen} toggleSidePanel={toggleSidePanel} />
          
          {/* Main navigation tabs */}
          <nav style={{ position: 'fixed', top: '80px', zIndex: 100, background: 'black', padding: '10px', width: '100%', display: 'flex', justifyContent: 'space-around' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', padding: '5px 10px' }}>Home</Link>
            <Link to="/character-creator" style={{ color: 'white', textDecoration: 'none', padding: '5px 10px' }}>CharacterCreate</Link>
            
            <Link to="/item-list" style={{ color: 'white', textDecoration: 'none', padding: '5px 10px' }}>Item</Link>
            <Link to="/skill-list" style={{ color: 'white', textDecoration: 'none', padding: '5px 10px' }}>Skill</Link>
            <Link to="/story" style={{ color: 'white', textDecoration: 'none', padding: '5px 10px' }}>Story</Link>
            <Link to="/library" style={{ color: 'white', textDecoration: 'none', padding: '5px 10px' }}>Library</Link>
            <Link to="/trialrogue-preview" style={{ color: 'white', textDecoration: 'none', padding: '5px 10px' }}>TR Map Preview</Link>
          </nav>

          <div className="container" style={{ paddingTop: '130px' }}> {/* Adjust padding-top for the new nav */}
            <main>
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/character-creator" element={<CharacterCreatorScreen />} />
                
                <Route path="/item-list" element={<ItemListScreen />} />
                <Route path="/skill-list" element={<SkillListScreen />} />
                <Route path="/story" element={<StoryScreen />} />
                <Route path="/library" element={<LibraryScreen />} />
                <Route path="/settings" element={<SettingsScreen />} />
                <Route path="/trialrogue/title" element={<TitleScreen />} />
                <Route path="/trialrogue/stage-select" element={<StageSelectScreen />} />
                <Route path="/trialrogue/loading" element={<LoadingScreen />} />
                <Route path="/trialrogue/battle" element={<BattleScreen />} />
                <Route path="/trialrogue-preview" element={<MapPreview />} />
              </Routes>
            </main>
          </div>
        </CharacterProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
