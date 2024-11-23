import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '../types/Product';
import ProductCard from '../components/ProductCard';
import { CartContext } from '../contexts/CartContext';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

const ProductsPage: React.FC = () => {
  const { addToCart } = useContext(CartContext);
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filterProducts = () => {
    let filtered = [...PRODUCTS];
    switch (priceFilter) {
      case 'under100':
        filtered = filtered.filter(p => p.price < 100);
        break;
      case '100to150':
        filtered = filtered.filter(p => p.price >= 100 && p.price <= 150);
        break;
      case 'over150':
        filtered = filtered.filter(p => p.price > 150);
        break;
      default:
        break;
    }
    return filtered;
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <motion.div 
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.h1 
            className="text-4xl font-bold text-gray-900"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.3 }}
          >
            Our Products
          </motion.h1>
          
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FunnelIcon className="w-5 h-5" />
            Filters
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filter by Price</h2>
                <button onClick={() => setShowFilters(false)}>
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex gap-4 flex-wrap">
                {[
                  { value: 'all', label: 'All Prices' },
                  { value: 'under100', label: 'Under $100' },
                  { value: '100to150', label: '$100 - $150' },
                  { value: 'over150', label: 'Over $150' }
                ].map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => setPriceFilter(option.value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      priceFilter === option.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filterProducts().map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard
                  product={product}
                  onAddToCart={addToCart}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filterProducts().length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <h3 className="text-xl text-gray-600">
              No products found matching your criteria
            </h3>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ProductsPage;
