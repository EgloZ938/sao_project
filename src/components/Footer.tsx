import React from 'react';
import { Link } from 'react-router-dom';
import { Sword, Heart, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-800 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2">
              <Sword className="w-6 h-6 text-blue-500" />
              <span className="text-xl font-exo font-bold tracking-wider text-white">
                <span className="text-blue-500">SAO</span> AINCRAD
              </span>
            </Link>
            <p className="mt-4 text-gray-400 max-w-md">
              A fan-created tribute site dedicated to the world of Sword Art Online's
              Aincrad arc. Explore the floating castle, its inhabitants, and the epic
              journey of Kirito and friends.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Aincrad', 'Characters', 'Moments', 'Gallery'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
                aria-label="Youtube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col items-center">
          <p className="text-gray-500 text-sm text-center">
            This is a fan-created site. Sword Art Online and all related properties are
            trademarks of A-1 Pictures, Aniplex, and Reki Kawahara.
          </p>
          <p className="flex items-center justify-center text-gray-500 text-sm mt-2">
            Made with <Heart className="mx-1 text-red-500" size={14} /> by SAO fans
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;