import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MusicPlayer from './MusicPlayer';
import { useMusic, tracks } from '../context/MusicContext';

const Layout: React.FC = () => {
  const { currentTrack, isPlaying, setIsPlaying, handleNextTrack, handlePrevTrack } = useMusic();

  return (
    <div className="min-h-screen flex flex-col bg-dark-900 text-white">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <MusicPlayer
        tracks={tracks}
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onNextTrack={handleNextTrack}
        onPrevTrack={handlePrevTrack}
      />
    </div>
  );
};

export default Layout;