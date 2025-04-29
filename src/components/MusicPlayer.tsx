import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, ChevronUp, ChevronDown, SkipBack, SkipForward, Repeat } from 'lucide-react';
import useSound from 'use-sound';
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

  const [play, { pause, stop, duration: soundDuration, sound }] = useSound(
    currentTrack?.file || '',
    {
      volume: isMuted ? 0 : volume,
      loop: isRepeat,
      onload: () => {
        if (soundDuration) {
          setDuration(soundDuration / 1000);
        }
      },
      onplay: () => {
        // Start progress tracking
        requestAnimationFrame(trackProgress);
      },
      onend: () => {
        if (!isRepeat) {
          onNextTrack();
        }
      },
    }
  );

  useEffect(() => {
    if (isPlaying) {
      play();
    } else {
      pause();
    }
    return () => {
      stop();
    };
  }, [isPlaying, currentTrack, play, pause, stop]);

  const trackProgress = () => {
    if (sound) {
      setCurrentTime(sound.seek());
      setProgress((sound.seek() / (soundDuration / 1000)) * 100);
      if (isPlaying) {
        requestAnimationFrame(trackProgress);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseInt(e.target.value) / 100) * (soundDuration / 1000);
    if (sound) {
      sound.seek(newTime);
    }
    setProgress(parseInt(e.target.value));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
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