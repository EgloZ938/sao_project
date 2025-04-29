import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Gallery images
const galleryImages = [
  {
    id: 1,
    title: 'Aincrad Castle',
    category: 'landscape',
    image: 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 2,
    title: 'Black Swordsman',
    category: 'character',
    image: 'https://images.pexels.com/photos/33041/antelope-canyon-lower-canyon-page.jpg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 3,
    title: 'Forest of Beginnings',
    category: 'landscape',
    image: 'https://images.pexels.com/photos/775201/pexels-photo-775201.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 4,
    title: 'Final Duel',
    category: 'moment',
    image: 'https://images.pexels.com/photos/358528/pexels-photo-358528.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 5,
    title: 'Town of Beginnings',
    category: 'landscape',
    image: 'https://images.pexels.com/photos/534164/pexels-photo-534164.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 6,
    title: 'Knights of Blood Oath',
    category: 'character',
    image: 'https://images.pexels.com/photos/1434608/pexels-photo-1434608.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 7,
    title: 'Ruby Palace',
    category: 'landscape',
    image: 'https://images.pexels.com/photos/1624895/pexels-photo-1624895.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 8,
    title: 'Boss Battle',
    category: 'moment',
    image: 'https://images.pexels.com/photos/1485894/pexels-photo-1485894.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    id: 9,
    title: 'Floating Islands',
    category: 'landscape',
    image: 'https://images.pexels.com/photos/624022/pexels-photo-624022.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
];

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<null | typeof galleryImages[0]>(null);
  const [filter, setFilter] = useState('all');

  const filteredImages = galleryImages.filter(
    (image) => filter === 'all' || image.category === filter
  );

  // Open lightbox
  const openLightbox = (image: typeof galleryImages[0]) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  // Close lightbox
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  // Filter categories
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'landscape', label: 'Landscapes' },
    { id: 'character', label: 'Characters' },
    { id: 'moment', label: 'Moments' },
  ];

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
              <span className="text-blue-500">GALLERY</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A visual journey through the breathtaking landscapes, memorable characters,
              and defining moments of Sword Art Online's Aincrad arc.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-dark-900">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6">
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  filter === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            layout
          >
            <AnimatePresence>
              {filteredImages.map((image) => (
                <motion.div
                  key={image.id}
                  layoutId={`gallery-${image.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="cursor-pointer overflow-hidden rounded-lg aspect-[4/3] relative group"
                  onClick={() => openLightbox(image)}
                >
                  <img
                    src={image.image}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4">
                      <h3 className="text-white text-lg font-bold">{image.title}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 text-white p-2 rounded-full bg-dark-800/50 hover:bg-dark-700/50 transition-colors duration-300"
              onClick={closeLightbox}
            >
              <X size={24} />
            </button>
            <motion.div
              layoutId={`gallery-${selectedImage.id}`}
              className="relative max-w-4xl max-h-[80vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
              <div className="bg-dark-800/80 rounded-b-lg p-4 mt-2">
                <h3 className="text-white text-xl font-bold">{selectedImage.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;