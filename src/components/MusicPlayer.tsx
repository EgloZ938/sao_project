import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, ChevronUp, ChevronDown, SkipBack, SkipForward, Repeat } from 'lucide-react';
import { Track } from '../context/MusicContext';

interface MusicPlayerProps {
  tracks: Track[];
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  tracks,
  currentTrack,
  isPlaying,
  onPlayPause,
  onNextTrack,
  onPrevTrack,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isRepeat, setIsRepeat] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);

  // Créer l'élément audio si nécessaire
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      
      // Ajouter des event listeners
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('ended', handleEnded);
      audioRef.current.addEventListener('error', handleError);
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.removeEventListener('error', handleError);
        audioRef.current.pause();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Mettre à jour la source audio quand la piste change
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.file;
      audioRef.current.load();
      if (isPlaying) {
        playAudio();
      }
    }
  }, [currentTrack]);

  // Gérer la lecture/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        playAudio();
      } else {
        pauseAudio();
      }
    }
  }, [isPlaying]);

  // Gérer le volume et le mode répétition
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.loop = isRepeat;
    }
  }, [volume, isMuted, isRepeat]);

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      console.log("Métadonnées audio chargées:", audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    if (!isRepeat) {
      onNextTrack();
    }
  };

  const handleError = (e: any) => {
    console.error("Erreur de lecture audio:", e);
    // Vous pouvez ajouter un état d'erreur ici si nécessaire
  };

  const playAudio = () => {
    if (audioRef.current) {
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Lecture audio démarrée avec succès");
            startProgressTimer();
          })
          .catch(error => {
            console.error("Erreur lors du démarrage de la lecture:", error);
            // Si la lecture échoue, mettre à jour l'état
            onPlayPause();
          });
      }
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }
  };

  const startProgressTimer = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    const updateProgress = () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
        setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        animationRef.current = requestAnimationFrame(updateProgress);
      }
    };
    
    animationRef.current = requestAnimationFrame(updateProgress);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (audioRef.current) {
      const newTime = (value / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(value);
      setCurrentTime(newTime);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Si vous voulez voir les informations en temps réel (pour déboguer)
  const debugInfo = () => {
    if (audioRef.current) {
      return (
        <div className="bg-red-500/10 p-2 rounded text-xs mb-2">
          <p>Source: {audioRef.current.src}</p>
          <p>Durée: {audioRef.current.duration}</p>
          <p>Temps actuel: {audioRef.current.currentTime}</p>
          <p>Paused: {audioRef.current.paused.toString()}</p>
          <p>État de lecture: {isPlaying ? 'En lecture' : 'En pause'}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 right-0 z-50 p-4"
    >
      <div className="bg-dark-800/95 backdrop-blur-md rounded-lg border border-gray-800 shadow-lg overflow-hidden">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="p-4 border-b border-gray-700"
            >
              {/* Uncomment this to show debug info */}
              {/* {debugInfo()} */}
              
              {/* Progress Bar */}
              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={handleSeek}
                  className="w-full accent-blue-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={onPrevTrack}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <SkipBack size={20} />
                </button>
                <button
                  onClick={onPlayPause}
                  className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white" />
                  )}
                </button>
                <button
                  onClick={onNextTrack}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <SkipForward size={20} />
                </button>
                <button
                  onClick={() => setIsRepeat(!isRepeat)}
                  className={`text-gray-400 hover:text-white transition-colors ${
                    isRepeat ? 'text-blue-500' : ''
                  }`}
                >
                  <Repeat size={20} />
                </button>
                <div className="flex items-center gap-2">
                  <button onClick={toggleMute}>
                    {isMuted ? (
                      <VolumeX size={20} className="text-gray-400" />
                    ) : (
                      <Volume2 size={20} className="text-gray-400" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume * 100}
                    onChange={(e) => setVolume(parseInt(e.target.value) / 100)}
                    className="w-20 accent-blue-500"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mini Player */}
        <div className="p-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onPlayPause}
              className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-white" />
              ) : (
                <Play className="w-4 h-4 text-white" />
              )}
            </button>
            <div>
              <h3 className="text-white text-sm font-medium">
                {currentTrack?.title || 'No track selected'}
              </h3>
              <p className="text-gray-400 text-xs">{currentTrack?.artist}</p>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MusicPlayer;