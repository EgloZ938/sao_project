import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Sword, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Navigation items
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Aincrad', path: '/aincrad' },
    { name: 'Characters', path: '/characters' },
    { name: 'Moments', path: '/moments' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Music', path: '/music' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'bg-dark-900/90 backdrop-blur shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Sword className="w-6 h-6 text-blue-500" />
            <span className="text-xl font-exo font-bold tracking-wider text-white">
              <span className="text-blue-500">SAO</span> AINCRAD
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative px-1 py-2 text-sm font-medium tracking-wide uppercase transition-colors duration-300
                  ${isActive ? 'text-blue-500' : 'text-white hover:text-blue-500'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    {isActive && (
                      <motion.span
                        layoutId="underline"
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-dark-800/95 backdrop-blur-md"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 pt-2 pb-4 space-y-1 sm:px-6">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `block px-3 py-3 text-base font-medium border-l-4 transition-colors duration-300 ${
                    isActive
                      ? 'border-blue-500 text-blue-500 bg-dark-700/50'
                      : 'border-transparent text-white hover:border-blue-500/50 hover:text-blue-500 hover:bg-dark-700/30'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;