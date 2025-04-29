import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [showLinkStart, setShowLinkStart] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Simulate Link Start animation
    const linkStartTimer = setTimeout(() => {
      setShowLinkStart(true);
    }, 500);

    // Show main content after link start animation
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 2500);

    return () => {
      clearTimeout(linkStartTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with parallax effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg?auto=compress&cs=tinysrgb&w=1600')`,
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/70 via-dark-900/50 to-dark-900"></div>
      </div>

      {/* Link Start Animation */}
      {showLinkStart && !showContent && (
        <motion.div
          className="text-white text-center z-20 link-start"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-exo font-bold tracking-wider text-blue-500 mb-4">
            LINK START
          </h1>
        </motion.div>
      )}

      {/* Main Hero Content */}
      {showContent && (
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
          {/* Floating castle image */}
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <img
              src="https://images.pexels.com/photos/1421903/pexels-photo-1421903.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Aincrad Castle"
              className="w-full max-w-lg h-auto floating rounded-lg shadow-2xl"
            />
          </motion.div>
          
          {/* Hero Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-exo font-bold tracking-wider text-white mb-4">
              WELCOME TO <span className="text-blue-500">AINCRAD</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              The floating castle where 10,000 players are trapped in a death game.
              Clear all 100 floors to win your freedom.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#features" className="btn-primary">
                Discover
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;