import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';

const CheckoutPage: React.FC = () => {
  const { items, total, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual payment processing
    clearCart();
    alert('Order Placed Successfully!');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600">Please add items to your cart before checking out.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Checkout</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" 
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="border p-3 rounded-md"
              />
              <input 
                type="text" 
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="border p-3 rounded-md"
              />
            </div>
            
            <input 
              type="email" 
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full border p-3 rounded-md"
            />
            
            <input 
              type="text" 
              name="address"
              placeholder="Shipping Address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="w-full border p-3 rounded-md"
            />
            
            <div className="grid grid-cols-3 gap-4">
              <input 
                type="text" 
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="border p-3 rounded-md"
              />
              <input 
                type="text" 
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleInputChange}
                required
                className="border p-3 rounded-md"
              />
              <input 
                type="text" 
                name="zipCode"
                placeholder="ZIP Code"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
                className="border p-3 rounded-md"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <input 
                type="text" 
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={handleInputChange}
                required
                className="col-span-2 border p-3 rounded-md"
              />
              <input 
                type="text" 
                name="cvv"
                placeholder="CVV"
                value={formData.cvv}
                onChange={handleInputChange}
                required
                className="border p-3 rounded-md"
              />
            </div>
            
            <input 
              type="text" 
              name="expiryDate"
              placeholder="Expiry Date (MM/YY)"
              value={formData.expiryDate}
              onChange={handleInputChange}
              required
              className="w-full border p-3 rounded-md"
            />
            
            <button 
              type="submit" 
              className="w-full bg-brand-primary text-white py-3 rounded-full hover:bg-opacity-90 transition"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          {items.map((item, index) => (
            <div 
              key={`${item.id}-${index}`} 
              className="flex justify-between items-center border-b py-4"
            >
              <div className="flex items-center">
                <img 
                  src={item.product.imageUrls[0]} 
                  alt={item.product.name} 
                  className="w-20 h-20 object-cover rounded-md mr-4"
                />
                <div>
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                  {(item.selectedSize || item.selectedColor) && (
                    <p className="text-gray-600">
                      {item.selectedSize && `Size: ${item.selectedSize}`}
                      {item.selectedSize && item.selectedColor && ' | '}
                      {item.selectedColor && `Color: ${item.selectedColor}`}
                    </p>
                  )}
                </div>
              </div>
              <span className="font-bold">
                ${(item.product.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          
          <div className="mt-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold">Free</span>
            </div>
            <div className="flex justify-between border-t pt-4">
              <span className="text-xl font-bold">Total</span>
              <span className="text-xl font-bold text-brand-primary">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
