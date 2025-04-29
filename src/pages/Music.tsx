import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Music as MusicIcon, Disc, Radio } from 'lucide-react';
import { useMusic, tracks, Track } from '../context/MusicContext';

const Music: React.FC = () => {
  const { currentTrack, setCurrentTrack, isPlaying, setIsPlaying } = useMusic();
  const [filter, setFilter] = useState<'all' | 'opening' | 'ending' | 'ost'>('all');

  const filteredTracks = tracks.filter(
    track => filter === 'all' || track.type === filter
  );

  const handleTrackClick = (track: Track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-32">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-exo font-bold text-white mb-6">
              <span className="text-blue-500">MUSIC</span> COLLECTION
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the emotional soundtrack that brought Aincrad to life. From epic
              battle themes to tender moments, immerse yourself in the music of SAO.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Music List Section */}
      <section className="py-16 bg-dark-900">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setFilter('all')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                filter === 'all'
                  ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(0,191,255,0.5)]'
                  : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
              }`}
            >
              <MusicIcon size={18} />
              All Tracks
            </button>
            <button
              onClick={() => setFilter('opening')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                filter === 'opening'
                  ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(0,191,255,0.5)]'
                  : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
              }`}
            >
              <Radio size={18} />
              Openings
            </button>
            <button
              onClick={() => setFilter('ending')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                filter === 'ending'
                  ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(0,191,255,0.5)]'
                  : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
              }`}
            >
              <Disc size={18} />
              Endings
            </button>
            <button
              onClick={() => setFilter('ost')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                filter === 'ost'
                  ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(0,191,255,0.5)]'
                  : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
              }`}
            >
              <MusicIcon size={18} />
              OST
            </button>
          </div>

          {/* Track List */}
          <div className="space-y-4">
            {filteredTracks.map((track) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-dark-800 rounded-lg p-6 cursor-pointer transition-all duration-300
                  ${
                    currentTrack?.id === track.id
                      ? 'border border-blue-500 shadow-[0_0_15px_rgba(0,191,255,0.3)]'
                      : 'border border-gray-800 hover:border-blue-500/30'
                  }`}
                onClick={() => handleTrackClick(track)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center
                      ${
                        currentTrack?.id === track.id
                          ? 'bg-blue-500'
                          : 'bg-dark-700'
                      }`}
                    >
                      {currentTrack?.id === track.id && isPlaying ? (
                        <Pause className="w-5 h-5 text-white" />
                      ) : (
                        <Play className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{track.title}</h3>
                      <p className="text-gray-400 text-sm">{track.artist}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      track.type === 'opening' ? 'bg-blue-500/20 text-blue-500' :
                      track.type === 'ending' ? 'bg-purple-500/20 text-purple-500' :
                      'bg-green-500/20 text-green-500'
                    }`}>
                      {track.type.toUpperCase()}
                    </span>
                    <span className="text-gray-400">{track.duration}</span>
                  </div>
                </div>
                {track.description && (
                  <p className="mt-2 text-sm text-gray-400 ml-14">
                    {track.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Music;