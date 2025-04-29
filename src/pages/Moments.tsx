import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Flag, Sword, Heart, Shield, Trophy } from 'lucide-react';

// Key moments data
const keyMoments = [
  {
    id: 1,
    title: 'Trapped in the Game',
    date: 'November 6, 2022',
    description: 'Kayaba Akihiko reveals that all 10,000 players are trapped in SAO. Death in the game means death in real life.',
    image: 'https://images.pexels.com/photos/1553659/pexels-photo-1553659.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: <Flag className="w-5 h-5" />,
  },
  {
    id: 2,
    title: 'First Floor Boss',
    date: 'December 4, 2022',
    description: 'Kirito and Asuna team up with other players to defeat Illfang the Kobold Lord, the first floor boss.',
    image: 'https://images.pexels.com/photos/1552617/pexels-photo-1552617.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: <Sword className="w-5 h-5" />,
  },
  {
    id: 3,
    title: 'Moonlit Black Cats',
    date: 'April 8, 2023',
    description: 'Kirito joins the Moonlit Black Cats guild, but tragedy strikes when they enter a high-level dungeon.',
    image: 'https://images.pexels.com/photos/2670898/pexels-photo-2670898.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    id: 4,
    title: 'Dual Wielding Revealed',
    date: 'October 17, 2024',
    description: 'During the battle against The Gleam Eyes on the 74th floor, Kirito reveals his unique Dual Wielding skill.',
    image: 'https://images.pexels.com/photos/1393572/pexels-photo-1393572.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: <Sword className="w-5 h-5" />,
  },
  {
    id: 5,
    title: 'Kirito and Asuna',
    date: 'October 24, 2024',
    description: 'Kirito and Asuna get married in-game and spend their honeymoon in a cabin on the 22nd floor.',
    image: 'https://images.pexels.com/photos/6056701/pexels-photo-6056701.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: <Heart className="w-5 h-5" />,
  },
  {
    id: 6,
    title: 'Final Battle',
    date: 'November 7, 2024',
    description: 'Kirito faces Heathcliff in a duel and discovers his true identity as Kayaba Akihiko, the creator of SAO.',
    image: 'https://images.pexels.com/photos/1480738/pexels-photo-1480738.jpeg?auto=compress&cs=tinysrgb&w=1600',
    icon: <Trophy className="w-5 h-5" />,
  },
];

const Moments: React.FC = () => {
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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
              <span className="text-blue-500">KEY</span> MOMENTS
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The most significant events that shaped the two-year journey through Aincrad.
              From tragic losses to triumphant victories, these moments defined the SAO experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-dark-900" ref={ref}>
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            className="relative"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {/* Vertical Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500/80 to-blue-500/20 transform md:translate-x-[-0.5px] hidden md:block"></div>

            {keyMoments.map((moment, index) => (
              <motion.div
                key={moment.id}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                } mb-16 md:mb-24`}
                variants={itemVariants}
              >
                {/* Timeline Content */}
                <div className="w-full md:w-1/2 md:px-8">
                  <div className="bg-dark-800 rounded-lg p-6 shadow-lg border border-gray-800 hover:border-blue-500/30 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4 border border-blue-500/50 text-blue-500">
                        {moment.icon}
                      </div>
                      <h3 className="text-2xl font-exo font-semibold text-white">
                        {moment.title}
                      </h3>
                    </div>
                    <p className="text-blue-500 text-sm mb-4">{moment.date}</p>
                    <p className="text-gray-300 mb-6">{moment.description}</p>
                    <div className="relative overflow-hidden rounded-lg h-48">
                      <img
                        src={moment.image}
                        alt={moment.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                    </div>
                  </div>
                </div>

                {/* Timeline Dot (visible on medium and larger screens) */}
                <div className="absolute left-[-8px] md:left-1/2 top-10 w-4 h-4 bg-blue-500 rounded-full transform md:translate-x-[-50%] shadow-[0_0_10px_rgba(0,191,255,0.8)] z-10 hidden md:block"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Moments;