import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PRODUCTS } from '../types/Product';
import { StarIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';
import { useCart } from '../contexts/CartContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === id);
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  return (
    <div className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-12">
      {/* Product Images */}
      <div>
        <div className="mb-4">
          <img 
            src={product.imageUrls[activeImage]} 
            alt={product.name} 
            className="w-full h-[500px] object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="flex space-x-4">
          {product.imageUrls.map((img, index) => (
            <img 
              key={index}
              src={img} 
              alt={`${product.name} view ${index + 1}`}
              className={`w-20 h-20 object-cover rounded-md cursor-pointer ${
                activeImage === index ? 'border-2 border-brand-primary' : ''
              }`}
              onClick={() => setActiveImage(index)}
            />
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        
        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <StarIcon 
                key={i} 
                className={`h-6 w-6 ${
                  i < Math.floor(product.rating) 
                    ? 'text-yellow-400' 
                    : 'text-gray-300'
                }`} 
              />
            ))}
          </div>
          <span className="ml-2 text-gray-600">
            ({product.rating} / {product.reviewCount} reviews)
          </span>
        </div>

        {/* Price */}
        <p className="text-3xl font-bold text-brand-primary mb-4">${product.price}</p>

        {/* Description */}
        <p className="text-gray-600 mb-6">{product.description}</p>

        {/* Features */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Key Features</h3>
          <ul className="list-disc list-inside text-gray-600">
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        {/* Size Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Size</label>
          <div className="flex space-x-2">
            {product.sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-md ${
                  selectedSize === size 
                    ? 'bg-brand-primary text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Color</label>
          <div className="flex space-x-2">
            {product.colors.map(color => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 rounded-md ${
                  selectedColor === color 
                    ? 'border-2 border-brand-primary' 
                    : 'border border-gray-300'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Quantity</label>
          <div className="flex items-center">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="bg-gray-200 px-3 py-1 rounded-l-md"
            >
              -
            </button>
            <input 
              type="number" 
              value={quantity} 
              readOnly
              className="w-16 text-center border-t border-b border-gray-200 py-1"
            />
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="bg-gray-200 px-3 py-1 rounded-r-md"
            >
              +
            </button>
          </div>
        </div>

        {/* Add to Cart */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleAddToCart}
            className="bg-brand-primary text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition flex items-center"
          >
            Add to Cart
          </button>
          <div className="flex items-center text-gray-600">
            <ShieldCheckIcon className="h-6 w-6 mr-2 text-green-500" />
            <span>Secure checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
