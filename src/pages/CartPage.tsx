import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { TrashIcon } from '@heroicons/react/24/outline';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
        <Link 
          to="/" 
          className="bg-brand-primary text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2">
          {cart.map((item, index) => (
            <div 
              key={`${item.product.id}-${index}`} 
              className="flex items-center border-b py-4"
            >
              <img 
                src={item.product.imageUrls[0]} 
                alt={item.product.name} 
                className="w-24 h-24 object-cover rounded-md mr-6"
              />
              
              <div className="flex-grow">
                <h3 className="text-xl font-semibold">{item.product.name}</h3>
                <p className="text-gray-600">
                  {item.selectedSize} | {item.selectedColor}
                </p>
                <p className="text-brand-primary font-bold">${item.product.price}</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <button 
                    onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                    className="bg-gray-200 px-3 py-1 rounded-l-md"
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    value={item.quantity} 
                    readOnly
                    className="w-16 text-center border-t border-b border-gray-200 py-1"
                  />
                  <button 
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="bg-gray-200 px-3 py-1 rounded-r-md"
                  >
                    +
                  </button>
                </div>
                
                <button 
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Order Summary */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold">Free</span>
            </div>
            <div className="flex justify-between border-t pt-4">
              <span className="text-xl font-bold">Total</span>
              <span className="text-xl font-bold text-brand-primary">
                ${getTotalPrice().toFixed(2)}
              </span>
            </div>
          </div>
          
          <Link 
            to="/checkout" 
            className="w-full bg-brand-primary text-white py-3 rounded-full text-center block hover:bg-opacity-90 transition"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
