import React from 'react';
import { motion } from 'framer-motion';

interface Character {
  id: number;
  name: string;
  role: string;
  image: string;
  description: string;
}

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <div className="card h-full group">
      <div className="relative overflow-hidden h-60">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-70"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-exo font-semibold text-white">
            {character.name}
          </h3>
          <p className="text-blue-500 text-sm">{character.role}</p>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-400">{character.description}</p>
      </div>
    </div>
  );
};

export default CharacterCard;