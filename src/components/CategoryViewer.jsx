import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Grid } from 'lucide-react';

const CategoryViewer = ({ images = [], category = '', onClose }) => {
  const [mode, setMode] = useState('single'); // 'single' or 'grid'
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
    setMode('single');
  }, [category]);

  const prev = () => setIndex(i => (i - 1 + images.length) % images.length);
  const next = () => setIndex(i => (i + 1) % images.length);
  const openGrid = () => setMode('grid');
  const openSingle = (i) => { setIndex(i); setMode('single'); };

  if (!images.length) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="category-viewer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center p-6"
      >
        <motion.div
          initial={{ y: 40, scale: 0.98 }}
          animate={{ y: 0, scale: 1 }}
          exit={{ y: 40, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-6xl h-[90vh] bg-black/95 rounded-xl shadow-xl overflow-hidden flex flex-col"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="text-gray-200 bg-black/30 hover:bg-black/40 px-3 py-2 rounded"
              >
                <X className="w-5 h-5" />
              </button>
              <div>
                <div className="text-sm text-gray-400">Category</div>
                <div className="text-lg font-light tracking-wider">{category}</div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setMode(mode === 'grid' ? 'single' : 'grid')}
                title="Toggle layout"
                className="text-gray-200 bg-black/30 hover:bg-black/40 px-3 py-2 rounded flex items-center space-x-2"
              >
                <Grid className="w-4 h-4" />
                <span className="text-sm">{mode === 'grid' ? 'Grid' : 'Single'}</span>
              </button>

              {mode === 'single' && (
                <>
                  <button
                    onClick={prev}
                    title="Previous"
                    className="text-gray-200 bg-black/30 hover:bg-black/40 px-3 py-2 rounded"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={next}
                    title="Next"
                    className="text-gray-200 bg-black/30 hover:bg-black/40 px-3 py-2 rounded"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-auto p-6">
            {mode === 'single' ? (
              <div className="h-full flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 w-full h-full flex items-center justify-center">
                  <motion.img
                    key={images[index].src}
                    src={images[index].src}
                    alt={images[index].title}
                    className="max-h-[75vh] max-w-full object-contain rounded-md"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25 }}
                  />
                </div>

                <div className="w-full md:w-80 mt-4 md:mt-0">
                  <div className="text-xl font-light mb-2">{images[index].title}</div>
                  <div className="text-gray-400 mb-4">{images[index].description}</div>
                  <div className="text-xs uppercase text-gray-500 tracking-wider">{images[index].category}</div>

                  <div className="mt-6 flex space-x-3">
                    <button
                      onClick={() => window.open(images[index].src, '_blank')}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded text-sm"
                    >
                      Open image
                    </button>
                    <button
                      onClick={() => openGrid()}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded text-sm"
                    >
                      View all
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((img, i) => (
                  <motion.div
                    key={img.id + '-' + i}
                    className="relative cursor-pointer rounded overflow-hidden border border-gray-800 bg-gray-900"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => openSingle(i)}
                  >
                    <div className="h-44 overflow-hidden bg-black/40">
                      <img src={img.src} alt={img.title} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="p-3">
                      <div className="text-sm font-light">{img.title}</div>
                      <div className="text-xs text-gray-400 mt-1">{img.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="px-4 py-3 border-t border-gray-800 flex items-center justify-between">
            <div className="text-sm text-gray-500">{index + 1} / {images.length}</div>
            <div className="text-xs text-gray-400">Use Prev/Next or click grid items to navigate</div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CategoryViewer;