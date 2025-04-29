import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, Sword, Users, Map, Image } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import CharacterCard from '../components/CharacterCard';
import QuoteSection from '../components/QuoteSection';

// Sample character data
const featuredCharacters = [
  {
    id: 1,
    name: 'Kirito',
    role: 'The Black Swordsman',
    image: 'https://images.pexels.com/photos/1870438/pexels-photo-1870438.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'A solo player known for his dual-wielding ability and determination to clear the game.',
  },
  {
    id: 2,
    name: 'Asuna',
    role: 'The Flash',
    image: 'https://images.pexels.com/photos/53159/women-face-portrait-attractive-53159.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: 'Vice Commander of the Knights of the Blood Oath, known for her lightning-fast rapier skills.',
  },
  {
    id: 3,
    name: 'Klein',
    role: 'Guild Leader',
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1600',
    description: "Leader of the Fuurinkazan guild and one of Kirito's first friends in Aincrad.",
  },
];

const Home: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  // Intersection observer hooks
  const [featureRef, featureInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [charactersRef, charactersInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Scroll Down Indicator */}
      <div className="flex justify-center -mt-16 relative z-10">
        <a
          href="#features"
          className="text-white bg-dark-800/70 rounded-full p-3 animate-bounce shadow-lg"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-6 h-6" />
        </a>
      </div>

      {/* Features Section */}
      <section id="features" className="section-container" ref={featureRef}>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={featureInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Discover Aincrad</h2>
          <p className="max-w-2xl mx-auto text-gray-300 mt-4">
            Explore the floating castle of Aincrad, where 10,000 players are trapped in a
            death game. Navigate through 100 floors of challenges, boss battles, and
            unforgettable moments.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          variants={containerVariants}
          initial="hidden"
          animate={featureInView ? "visible" : "hidden"}
        >
          {/* Aincrad Feature */}
          <motion.div
            className="card p-6 flex flex-col items-center text-center"
            variants={itemVariants}
          >
            <div className="w-16 h-16 mb-4 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Map className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-exo font-semibold mb-2">Explore The Castle</h3>
            <p className="text-gray-400 mb-4">
              Discover all 100 floors of Aincrad, from the Town of Beginnings to the Ruby
              Palace.
            </p>
            <Link
              to="/aincrad"
              className="mt-auto text-blue-500 hover:text-blue-400 font-medium transition-colors duration-300"
            >
              View Floors →
            </Link>
          </motion.div>

          {/* Characters Feature */}
          <motion.div
            className="card p-6 flex flex-col items-center text-center"
            variants={itemVariants}
          >
            <div className="w-16 h-16 mb-4 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Users className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-exo font-semibold mb-2">Meet The Heroes</h3>
            <p className="text-gray-400 mb-4">
              Get to know the brave warriors fighting to clear the game and free everyone
              trapped inside.
            </p>
            <Link
              to="/characters"
              className="mt-auto text-blue-500 hover:text-blue-400 font-medium transition-colors duration-300"
            >
              View Characters →
            </Link>
          </motion.div>

          {/* Gallery Feature */}
          <motion.div
            className="card p-6 flex flex-col items-center text-center"
            variants={itemVariants}
          >
            <div className="w-16 h-16 mb-4 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Image className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-exo font-semibold mb-2">Visual Journey</h3>
            <p className="text-gray-400 mb-4">
              Immerse yourself in stunning images from across the floating castle and its
              breathtaking landscapes.
            </p>
            <Link
              to="/gallery"
              className="mt-auto text-blue-500 hover:text-blue-400 font-medium transition-colors duration-300"
            >
              View Gallery →
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Characters Preview Section */}
      <section className="py-16 bg-dark-800" ref={charactersRef}>
        <div className="section-container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={charactersInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">Main Characters</h2>
            <p className="max-w-2xl mx-auto text-gray-300 mt-4">
              Meet the heroes of Aincrad who fight for survival and freedom in this
              virtual death game.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={charactersInView ? "visible" : "hidden"}
          >
            {featuredCharacters.map((character) => (
              <motion.div key={character.id} variants={itemVariants}>
                <CharacterCard character={character} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={charactersInView ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Link
              to="/characters"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Users size={18} />
              View All Characters
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Quote Section */}
      <QuoteSection 
        quote="This may be a game, but it's not something you play."
        author="Kirito"
      />
    </div>
  );
};

export default Home;