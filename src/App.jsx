import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation, useDragControls } from 'framer-motion';
import { X, Camera, Instagram, Mail, Phone, Pause, Play } from 'lucide-react';

const PhotographerPortfolio = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  
  const constraintsRef = useRef(null);
  const controls = useAnimation();
  const dragControls = useDragControls();

  // Sample portfolio images - duplicated for infinite scroll effect
  const baseImages = [
    {
      id: 1,
      src: "https://ik.imagekit.io/papi/21.jpg?updatedAt=1757931251836",
      category: "PAPI-PIXELS",
      title: "Graduation",
      description: "Captured during the magical golden moment"
    },
    {
      id: 2,
      src: "https://ik.imagekit.io/papi/23.jpg?updatedAt=1757931247474",
      category: "PAPI-PIXELS",
      title: "Fun",
      description: "A moment of pure joy and love"
    },
    {
      id: 3,
      src: "https://ik.imagekit.io/papi/20.jpg?updatedAt=1757931234913",
      category: "PAPI-PIXELS",
      title: "Meeting",
      description: "Innovation meeting at Zetech university"
    },
    {
      id: 4,
      src: "https://ik.imagekit.io/papi/7.jpg?updatedAt=1757931209186",
      category: "PAPI-PIXELS",
      title: "Beauty",
      description: "Street photography"
    },
    {
      id: 5,
      src: "https://ik.imagekit.io/papi/10.jpg?updatedAt=1757931226203",
      category: "PAPI-PIXELS",
      title: "Official shoots",
      description: "For professional use only"
    },
    {
      id: 6,
      src: "https://ik.imagekit.io/papi/13.jpg?updatedAt=1757931224009",
      category: "PAPI-PIXELS",
      title: "Vacation",
      description: "Cool weather along the coast"
    },
    {
      id: 7,
      src: "https://ik.imagekit.io/papi/25.jpg?updatedAt=1757931219396",
      category: "PAPI-PIXELS",
      title: "Family ",
      description: "Mother and son bonding"
    },
    {
      id: 8,
      src: "https://ik.imagekit.io/papi/2.jpg?updatedAt=1757931209915",
      category: "PAPI-PIXELS",
      title: "Self branding",
      description: "Showcasing potrait business"
    },
    {
      id: 9,
      src: "https://ik.imagekit.io/papi/4.jpg?updatedAt=1757931205532",
      category: "PAPI-PIXELS",
      title: "Natural Beauty",
      description: "Beauty in black melanin"
    }
  ];

  const categories = ['all'];

  // Create infinite scroll array by tripling the images
  const filteredBaseImages = filter === 'all' 
    ? baseImages 
    : baseImages.filter(img => img.category === filter);
  
  const infiniteImages = [...filteredBaseImages, ...filteredBaseImages, ...filteredBaseImages];

  // Auto-scroll effect
  useEffect(() => {
    if (isAutoPlaying && !isDragging) {
      const imageWidth = 400; // Width of each image card
      const totalWidth = filteredBaseImages.length * imageWidth;
      
      const animate = async () => {
        await controls.start({
          x: -totalWidth,
          transition: {
            duration: filteredBaseImages.length * 2.5, // 3 seconds per image
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop"
          }
        });
      };
      
      animate();
    } else {
      controls.stop();
    }
  }, [isAutoPlaying, isDragging, filteredBaseImages.length, controls]);

  // Reset position when filter changes
  useEffect(() => {
    controls.set({ x: 0 });
  }, [filter, controls]);

  const handleDragStart = () => {
    setIsDragging(true);
    setIsAutoPlaying(false);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    // Resume auto-play after 3 seconds of no interaction
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 3000);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

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
            <Camera className="w-16 h-16 mx-auto mb-4 text-white" />
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
          
          {/* Filter Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8 space-x-8 px-4"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 tracking-widest uppercase transition-all duration-300 ${
                  filter === category 
                    ? 'text-white border-b-2 border-white' 
                    : 'text-gray-500 hover:text-white'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

            {/* Auto-play Control */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleAutoPlay}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-600 rounded-full hover:border-white transition-colors"
            >
              {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span className="text-sm tracking-wider">
                {isAutoPlaying ? 'PAUSE' : 'PLAY'}
              </span>
            </motion.button>
          </motion.div>

          {/* Horizontal Scrolling Gallery */}
          <div className="relative overflow-hidden" ref={constraintsRef}>
            <motion.div
              className="flex space-x-6 cursor-grab active:cursor-grabbing"
              animate={controls}
              drag="x"
              dragControls={dragControls}
              dragConstraints={{ left: -filteredBaseImages.length * 400, right: 0 }}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              dragElastic={0.1}
              style={{ width: `${infiniteImages.length * 400}px` }}
            >
              {infiniteImages.map((image, index) => (
                <motion.div
                  key={`${image.id}-${index}`}
                  className="group cursor-pointer flex-shrink-0"
                  style={{ width: '380px' }}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedImage(image)}
                >
                  {/* Image Container */}
                  <motion.div
                    className="relative overflow-hidden bg-gray-900 mb-4"
                    style={{ height: '400px' }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Hover Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-black/30 flex items-center justify-center"
                    >
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-white text-sm uppercase tracking-widest bg-black/50 px-4 py-2 rounded"
                      >
                        View Full Size
                      </motion.div>
                    </motion.div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-black/70 text-white text-xs uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm">
                      {image.category}
                    </div>
                    
                    {/* Hover Border Effect */}
                    <motion.div
                      className="absolute inset-0 border-2 border-white opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                  
                  {/* Title and Description - Always Visible Below Image */}
                  <motion.div 
                    className="px-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <h3 className="text-xl font-light mb-3 text-white group-hover:text-gray-300 transition-colors duration-300">
                      {image.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {image.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-8 text-gray-500 text-sm tracking-wider"
          >
            ← DRAG TO EXPLORE MORE →
          </motion.div>
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
    </div>
  );
};

export default PhotographerPortfolio;