import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Aincrad from './pages/Aincrad';
import Characters from './pages/Characters';
import Moments from './pages/Moments';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Music from './pages/Music';
import { MusicProvider } from './context/MusicContext';

function App() {
  return (
    <MusicProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="aincrad" element={<Aincrad />} />
          <Route path="characters" element={<Characters />} />
          <Route path="moments" element={<Moments />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="music" element={<Music />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </MusicProvider>
  );
}

export default App;