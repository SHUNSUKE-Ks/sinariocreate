import React from 'react';
import Header from '@/components/layout/Header';
import SidePanel from '@/components/layout/SidePanel';
import HomeScreen from '@/AppScreen/01_Home/HomeScreen';

function App() {
  return (
    <>
      <Header />
      <SidePanel />
      <div className="container">
        <main>
          <HomeScreen />
        </main>
      </div>
      {/* Overlay and other root-level elements from sampleLayout.html can be added here */}
    </>
  );
}

export default App;