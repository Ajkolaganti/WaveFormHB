import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext';

const Navbar: React.FC = () => {
  const { cart } = useCart();

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-brand-primary">
          WarmWave
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-gray-800 hover:text-brand-primary transition">
            Home
          </Link>
          <Link to="/products" className="text-gray-800 hover:text-brand-primary transition">
            Products
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/wishlist" className="text-gray-600 hover:text-brand-secondary">
              <HeartIcon className="h-6 w-6" />
            </Link>
            <Link to="/cart" className="relative text-gray-600 hover:text-brand-secondary">
              <ShoppingCartIcon className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
