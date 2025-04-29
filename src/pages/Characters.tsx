import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, Shield, Sword, Crosshair } from 'lucide-react';
import CharacterCard from '../components/CharacterCard';

// Character data
const characters = [
  {
    id: 1,
    name: 'Kirito',
    role: 'The Black Swordsman',
    image: 'https://images.pexels.com/photos/1870438/pexels-photo-1870438.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'A solo player known for his dual-wielding ability and determination to clear the game.',
    group: 'solo',
  },
  {
    id: 2,
    name: 'Asuna',
    role: 'The Flash',
    image: 'https://images.pexels.com/photos/53159/women-face-portrait-attractive-53159.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'Vice Commander of the Knights of the Blood Oath, known for her lightning-fast rapier skills.',
    group: 'knights',
  },
  {
    id: 3,
    name: 'Klein',
    role: 'Guild Leader',
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: "Leader of the Fuurinkazan guild and one of Kirito's first friends in Aincrad.",
    group: 'guild',
  },
  {
    id: 4,
    name: 'Agil',
    role: 'Merchant',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'A merchant and axe-wielder who helps players by selling quality gear at fair prices.',
    group: 'solo',
  },
  {
    id: 5,
    name: 'Silica',
    role: 'Beast Tamer',
    image: 'https://images.pexels.com/photos/1898555/pexels-photo-1898555.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'A beast tamer who befriends Kirito and has a pet dragon named Pina.',
    group: 'solo',
  },
  {
    id: 6,
    name: 'Heathcliff',
    role: 'Guild Commander',
    image: 'https://images.pexels.com/photos/333850/pexels-photo-333850.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'The legendary founder and leader of the Knights of the Blood Oath guild.',
    group: 'knights',
  },
  {
    id: 7,
    name: 'Lisbeth',
    role: 'Blacksmith',
    image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'A skilled blacksmith who creates some of the finest weapons in Aincrad.',
    group: 'solo',
  },
  {
    id: 8,
    name: 'Sachi',
    role: 'Guild Member',
    image: 'https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'A timid member of the Moonlit Black Cats guild who struggles with her fears.',
    group: 'guild',
  },
  {
    id: 9,
    name: 'Kuradeel',
    role: 'Knight',
    image: 'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'A member of the Knights of the Blood Oath with a dangerous obsession.',
    group: 'knights',
  },
];

const Characters: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  // Filter characters based on search term and group filter
  const filteredCharacters = characters.filter((character) => {
    const matchesSearch = character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         character.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || character.group === filter;
    
    return matchesSearch && matchesFilter;
  });

  const filterButtons = [
    { id: 'all', label: 'All', icon: <Users size={18} /> },
    { id: 'solo', label: 'Solo Players', icon: <Sword size={18} /> },
    { id: 'knights', label: 'Knights', icon: <Shield size={18} /> },
    { id: 'guild', label: 'Guild Members', icon: <Crosshair size={18} /> },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-exo font-bold text-white mb-6">
              <span className="text-blue-500">CHARACTERS</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Meet the heroes and villains who shaped the world of Aincrad. From
              legendary warriors to skilled craftspeople, each played a crucial role in
              the fight for survival.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Characters List Section */}
      <section className="py-16 bg-dark-900">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          {/* Search and Filter */}
          <div className="mb-12 space-y-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search characters..."
                className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              {filterButtons.map((button) => (
                <button
                  key={button.id}
                  onClick={() => setFilter(button.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    filter === button.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                  }`}
                >
                  {button.icon}
                  {button.label}
                </button>
              ))}
            </div>
          </div>

          {/* Character Grid */}
          {filteredCharacters.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredCharacters.map((character) => (
                <motion.div key={character.id} variants={cardVariants}>
                  <CharacterCard character={character} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No characters found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Characters;