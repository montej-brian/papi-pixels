import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, Mail, Phone } from 'lucide-react';
import { baseImages } from './data/images';
import CategoryViewer from './components/CategoryViewer';
import logo from './assets/logo.png';
import { Analytics } from "@vercel/analytics/next";

const PhotographerPortfolio = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // new state: open category viewer in free space
  const [activeCategory, setActiveCategory] = useState(null);
  const [viewerOpen, setViewerOpen] = useState(false);

  const constraintsRef = useRef(null);

  // derive categories from images
  // only real categories — "VIEW ALL" stays as its own card
  const categories = useMemo(() => Array.from(new Set(baseImages.map(i => i.category))), [baseImages]);

  // filtered arrays removed — CategoryViewer receives images on open

  const openCategoryViewer = (category) => {
    setActiveCategory(category);
    setViewerOpen(true);
  };

  const closeCategoryViewer = () => {
    setViewerOpen(false);
    setActiveCategory(null);
    // remain on categories view (do not change theme/background). keep filter 'all'
    // setFilter('all');
  };
  
    <Analytics/>

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  // helper: get representative image per category
  const categoryMeta = useMemo(() => {
    const map = {};
    baseImages.forEach(img => {
      if (!map[img.category]) map[img.category] = { count: 0, thumb: img.src };
      map[img.category].count += 1;
    });
    return map;
  }, [baseImages]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800"
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative text-center z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-6"
          >
            {/* logo image — keeps same spacing & alignment as previous icon */}
            <img src={logo} alt="PAPI PIXELS" className="w-20 h-20 mx-auto mb-4" />
          </motion.div>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-6xl md:text-8xl font-thin mb-4 tracking-wider"
          >
            PAPI PIXELS
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 tracking-widest"
          >
            Capturing Elegance in Every Frame
          </motion.p>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 tracking-wider"
              onClick={() => document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' })}
            >
              VIEW PORTFOLIO
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-thin text-center mb-16 tracking-wider px-4">PORTFOLIO</h2>
          
          {/* Category Pack */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 mb-10"
          >
            {categories.filter(c => c !== 'all').map(category => (
              <motion.div
                key={category}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="relative cursor-pointer rounded-lg overflow-hidden bg-gray-900 border border-gray-800"
                onClick={() => openCategoryViewer(category)}
              >
                <div className="h-48 bg-black/40 overflow-hidden">
                  <img
                    src={categoryMeta[category]?.thumb}
                    alt={category}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-light tracking-wider">{category}</h3>
                  <p className="text-gray-400 text-sm mt-2">{categoryMeta[category]?.count || 0} photos</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}

            {/* "All" card to reset */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="relative cursor-pointer rounded-lg overflow-hidden bg-gray-900 border border-dashed border-gray-700 flex items-center justify-center p-6"
              onClick={() => openCategoryViewer('ALL')}
            >
              <div className="text-center">
                <h3 className="text-2xl font-light tracking-wider">View All</h3>
                <p className="text-gray-400 text-sm mt-2">{baseImages.length} photos</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Inline gallery removed — photos are only opened via the CategoryViewer (free space / tab) */}
        </motion.div>
      </section>

      {/* About Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="py-20 px-4 bg-gray-900"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-thin mb-12 tracking-wider">ABOUT</h2>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 leading-relaxed mb-8"
          >
            At Papi Pixels, photography is more than capturing images
            it’s about preserving emotions, stories, and memories that last a lifetime. 
            Every shot I take is guided by passion, creativity, and an eye for detail, 
            turning ordinary moments into extraordinary works of art.
            Whether it’s portraits, events, or creative projects, 
            my goal is to freeze time in a way that speaks to the heart and inspires the soul..
          </motion.p>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center space-x-8 mt-12"
          >
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="https://www.instagram.com/matiko2146/"
              className="text-white hover:text-gray-300 transition-colors"
            >
              <Instagram className="w-8 h-8" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="mailto:matikojackson453@gmail.com"
              className="text-white hover:text-gray-300 transition-colors"
            >
              <Mail className="w-8 h-8" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="tel:+254794235694"
              className="text-white hover:text-gray-300 transition-colors"
            >
              <Phone className="w-8 h-8" />
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* Modal for enlarged image */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative max-w-5xl max-h-[90vh] mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 z-10 backdrop-blur-sm"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-6 h-6" />
              </motion.button>
              <motion.img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-full object-contain rounded-lg"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              />
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 rounded-b-lg"
              >
                <h3 className="text-2xl font-light mb-2">{selectedImage.title}</h3>
                <p className="text-gray-300 mb-2">{selectedImage.description}</p>
                <div className="text-sm text-gray-400 uppercase tracking-wider">
                  {selectedImage.category}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Viewer modal / free space */}
      <AnimatePresence>
        {viewerOpen && activeCategory && (
          <CategoryViewer
            key={activeCategory}
            category={activeCategory}
            images={activeCategory === 'ALL' ? baseImages : baseImages.filter(img => img.category === activeCategory)}
            onClose={closeCategoryViewer}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotographerPortfolio;