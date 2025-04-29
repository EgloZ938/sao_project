import React, { createContext, useContext, useState } from 'react';

export interface Track {
  id: number;
  title: string;
  type: 'opening' | 'ending' | 'ost';
  artist: string;
  description?: string;
  file: string;
}

export const tracks: Track[] = [
  {
    id: 1,
    title: "Crossing Field",
    type: "opening",
    artist: "LiSA",
    description: "The first opening theme of SAO, representing the beginning of Kirito's journey in Aincrad",
    file: "/music/crossing_field.mp3"
  },
  {
    id: 2,
    title: "Innocence",
    type: "opening",
    artist: "Eir Aoi",
    description: "The second opening theme, highlighting the growing relationship between Kirito and Asuna",
    file: "/music/innocence.mp3"
  },
  {
    id: 3,
    title: "Overfly",
    type: "ending",
    artist: "Luna Haruna",
    description: "The second ending theme of the series",
    file: "/music/overfly.mp3"
  },
  {
    id: 4,
    title: "Yume Sekai",
    type: "ending",
    artist: "Haruka Tomatsu",
    description: "The first ending theme, sung by Asuna's voice actress",
    file: "/music/yume_sekai.mp3"
  },
  {
    id: 5,
    title: "Swordland",
    type: "ost",
    artist: "Yuki Kajiura",
    description: "The main theme of SAO, played during epic battle scenes",
    file: "/music/swordland.mp3"
  },
  {
    id: 6,
    title: "We Have To Defeat It",
    type: "ost",
    artist: "Yuki Kajiura",
    description: "An intense battle theme that plays during crucial fights",
    file: "/music/we_have_to_defeat_it.mp3"
  },
  {
    id: 7,
    title: "At Our Parting",
    type: "ost",
    artist: "Yuki Kajiura",
    description: "A emotional piece that plays during farewell scenes",
    file: "/music/at_our_parting.mp3"
  },
  {
    id: 8,
    title: "A Tender Feeling",
    type: "ost",
    artist: "Yuki Kajiura",
    description: "A romantic theme often played during Kirito and Asuna's moments",
    file: "/music/a_tender_feeling.mp3"
  },
  {
    id: 9,
    title: "A Tiny Love",
    type: "ost",
    artist: "Yuki Kajiura",
    description: "A gentle piece that plays during intimate moments",
    file: "/music/a_tiny_love.mp3"
  },
  {
    id: 10,
    title: "Everyday Life",
    type: "ost",
    artist: "Yuki Kajiura",
    description: "A peaceful theme that plays during daily life scenes in Aincrad",
    file: "/music/everyday_life.mp3"
  },
  {
    id: 11,
    title: "Fight!!",
    type: "ost",
    artist: "Yuki Kajiura",
    description: "An energetic battle theme",
    file: "/music/fight.mp3"
  },
  {
    id: 12,
    title: "The Sword Draws",
    type: "ost",
    artist: "Yuki Kajiura",
    description: "A dramatic theme that plays during crucial moments",
    file: "/music/the_sword_draws.mp3"
  },
  {
    id: 13,
    title: "Survive The Swordland",
    type: "ost",
    artist: "Yuki Kajiura",
    description: "A variation of the main theme with a focus on survival",
    file: "/music/survive_the_swordland.mp3"
  },
  {
    id: 14,
    title: "The Black Swordsman",
    type: "ost",
    artist: "Yuki Kajiura",
    description: "Kirito's theme music",
    file: "/music/the_black_swordsman.mp3"
  },
  {
    id: 15,
    title: "False King",
    type: "ost",
    artist: "Yuki Kajiura",
    description: "A mysterious theme that plays during revelations",
    file: "/music/false_king.mp3"
  }
];

interface MusicContextType {
  currentTrack: Track | null;
  setCurrentTrack: (track: Track | null) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  handleNextTrack: () => void;
  handlePrevTrack: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleNextTrack = () => {
    if (!currentTrack) return;
    const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
    const nextTrack = tracks[(currentIndex + 1) % tracks.length];
    setCurrentTrack(nextTrack);
    setIsPlaying(true);
  };

  const handlePrevTrack = () => {
    if (!currentTrack) return;
    const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
    const prevTrack = tracks[(currentIndex - 1 + tracks.length) % tracks.length];
    setCurrentTrack(prevTrack);
    setIsPlaying(true);
  };

  return (
    <MusicContext.Provider
      value={{
        currentTrack,
        setCurrentTrack,
        isPlaying,
        setIsPlaying,
        handleNextTrack,
        handlePrevTrack,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};