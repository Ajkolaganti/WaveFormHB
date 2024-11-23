import React from 'react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { PRODUCTS } from '../types/Product';
import { StarIcon } from '@heroicons/react/24/solid';
import Scene from '../components/3d/Scene';

const HomePage: React.FC = () => {
  const featuredProducts = PRODUCTS.slice(0, 3);

  const fadeIn: Variants = {
    initial: { 
      opacity: 0, 
      y: 20 
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const stagger: Variants = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="relative">
      {/* Hero Section with 3D Scene */}
      <div className="relative h-screen">
        <Scene />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-warm-gray">
          <div className="container mx-auto px-4 h-full flex items-center justify-center">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
                The Future of Comfort
              </h1>
              <p className="text-2xl mb-8 text-gray-800">
                Experience revolutionary heating technology
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/products" 
                  className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition duration-300"
                >
                  Explore Collection
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-warm-gray py-20">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Featured Products
          </motion.h2>
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {featuredProducts.map(product => (
              <motion.div 
                key={product.id}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative">
                  <img 
                    src={product.imageUrls[0]} 
                    alt={product.name} 
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon 
                        key={i} 
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-400' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                    <span className="ml-2 text-gray-600">({product.reviewCount})</span>
                  </div>
                  <p className="text-gray-600 mb-4">{product.description.slice(0, 100)}...</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
                      ${product.price}
                    </span>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link 
                        to={`/product/${product.id}`} 
                        className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-6 py-2 rounded-full hover:shadow-lg transition duration-300"
                      >
                        View Details
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-b from-warm-gray to-white">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Next-Gen Features
          </motion.h2>
          <motion.div 
            className="grid md:grid-cols-3 gap-12"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div 
              variants={fadeIn}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-brand-primary to-brand-secondary p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-12 w-12 text-white"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Smart Temperature Control</h3>
              <p className="text-gray-600">AI-powered heating adjusts to your comfort preferences</p>
            </motion.div>

            <motion.div 
              variants={fadeIn}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-brand-primary to-brand-secondary p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-12 w-12 text-white"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Advanced Safety</h3>
              <p className="text-gray-600">Multiple sensors ensure worry-free operation</p>
            </motion.div>

            <motion.div 
              variants={fadeIn}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-brand-primary to-brand-secondary p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-12 w-12 text-white"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">Energy Efficient</h3>
              <p className="text-gray-600">Smart power management saves energy and money</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
