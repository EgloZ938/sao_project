import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Sample data for Aincrad floors
const floors = [
  {
    id: 1,
    name: 'Town of Beginnings',
    description: 'The starting point for all players. A safe zone with markets, inns, and basic equipment shops.',
    image: 'https://images.pexels.com/photos/417344/pexels-photo-417344.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 22,
    name: 'Coral Forest',
    description: 'A beautiful but dangerous area filled with unique plant-type monsters and rare materials.',
    image: 'https://images.pexels.com/photos/1034887/pexels-photo-1034887.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 50,
    name: 'Algade',
    description: 'The largest city in Aincrad, home to countless shops, services, and player-run businesses.',
    image: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 75,
    name: 'Collinia',
    description: 'A snowy mountain area with challenging terrain and powerful ice-based enemies.',
    image: 'https://images.pexels.com/photos/355770/pexels-photo-355770.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 100,
    name: 'Ruby Palace',
    description: 'The final floor where the boss Heathcliff awaits those brave enough to challenge him.',
    image: 'https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
];

const Aincrad: React.FC = () => {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="absolute inset-0 overflow-hidden">
          {/* Background pattern - abstract digital grid */}
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMGJmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyek00NiAzNGgtNHYtMmg0djJ6bTAtNGgtNHYtMmg0djJ6bTAtNmgtNHYtMmg0djJ6bTAtNGgtNHYtMmg0djJ6bTYgMTJoLTJ2LTRoMnY0em0wLThoLTJ2LTRoMnY0em0wLThoLTJ2LTRoMnY0em0wLTRoLTJ2LTRoMnY0em0tNDggNDBoLTR2LTJoNHYyem0wLTRoLTR2LTJoNHYyem0wLTZoLTR2LTJoNHYyem0wLTRoLTR2LTJoNHYyem02IDEyaC0ydi00aDJ2NHptMC04aC0ydi00aDJ2NHptMC04aC0ydi00aDJ2NHptMC00aC0ydi00aDJ2NHptNyA4aC0zdi0yaDN2MnptMC00aC0zdi0yaDN2MnptMC02aC0zdi0yaDN2MnptMC00aC0zdi0yaDN2MnptNSAxMmgtMnYtNGgydjR6bTAtOGgtMnYtNGgydjR6bTAtOGgtMnYtNGgydjR6bTAtNGgtMnYtNGgydjR6bTUgOGgtM3YtMmgzdjJ6bTAtNGgtM3YtMmgzdjJ6bTAtNmgtM3YtMmgzdjJ6bTAtNGgtM3YtMmgzdjJ6bTUgMTJoLTJ2LTRoMnY0em0wLThoLTJ2LTRoMnY0em0wLThoLTJ2LTRoMnY0em0wLTRoLTJ2LTRoMnY0em01IDhoLTN2LTJoM3Yyem0wLTRoLTN2LTJoM3Yyem0wLTZoLTN2LTJoM3Yyem0wLTRoLTN2LTJoM3Yyem01IDhoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyek0xMiAyMGg0djRoLTR2LTR6bTQgMGg0djRoLTR2LTR6TTggMjRoNHY0SDh2LTR6bTAgNGg0djRIOHYtNHptMTItOGg0djRoLTR2LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-center"></div>
        </div>
        
        <div className="relative container max-w-4xl mx-auto px-4 sm:px-6 text-center" ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-exo font-bold text-white mb-6">
              <span className="text-blue-500">AINCRAD</span> FLOORS
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore the floating castle of Aincrad - a massive structure with 100 unique
              floors, each with its own environments, cities, dungeons and boss.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Castle Overview */}
      <section className="py-16 bg-dark-900">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-exo font-bold text-white mb-6">
                The Floating Castle
              </h2>
              <p className="text-gray-300 mb-4">
                Aincrad is a giant floating castle made up of 100 floors, each with a
                diameter of 10 kilometers. The design resembles a cone, with the bottom
                floor being the largest and each subsequent floor slightly smaller.
              </p>
              <p className="text-gray-300 mb-4">
                Each floor contains unique landscapes, from lush forests and lakes to
                snow-covered mountains and barren wastelands. Towns and safe zones are
                scattered throughout, offering respite from the dangers outside.
              </p>
              <p className="text-gray-300">
                To advance to the next floor, players must locate and defeat the floor
                boss that guards the stairway to the next level.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <img
                src="https://images.pexels.com/photos/1421903/pexels-photo-1421903.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="Aincrad Castle"
                className="rounded-lg shadow-xl max-w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Floors */}
      <section className="py-16 bg-dark-800">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <motion.h2
            className="text-3xl font-exo font-bold text-white mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Notable Floors
          </motion.h2>

          <motion.div
            className="space-y-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {floors.map((floor, index) => (
              <motion.div
                key={floor.id}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } gap-8 items-center`}
                variants={itemVariants}
              >
                <div className="w-full md:w-1/2">
                  <img
                    src={floor.image}
                    alt={floor.name}
                    className="rounded-lg shadow-lg w-full h-64 object-cover"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mr-4 border border-blue-500/50">
                      <span className="text-blue-500 font-bold">{floor.id}</span>
                    </div>
                    <h3 className="text-2xl font-exo font-bold text-white">
                      {floor.name}
                    </h3>
                  </div>
                  <p className="text-gray-300">{floor.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Interactive Map Teaser */}
      <section className="py-16 bg-dark-900">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-exo font-bold text-white mb-6">
              Interactive Map Coming Soon
            </h2>
            <p className="text-gray-300 mb-8">
              We're working on an interactive map of Aincrad that will allow you to
              explore all 100 floors in detail. Check back soon for this exciting feature!
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Aincrad;