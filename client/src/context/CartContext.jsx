
// src/context/CartContext.jsx
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (food) => {
    setCart(prev => {
      const existing = prev.find(item => item.food._id === food._id);
      if (existing) {
        return prev.map(item =>
          item.food._id === food._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { food, quantity: 1 }];
    });
  };

  const removeFromCart = (foodId) => {
    setCart(prev => prev.filter(item => item.food._id !== foodId));
  };

  const updateQuantity = (foodId, quantity) => {
    setCart(prev =>
      prev.map(item =>
        item.food._id === foodId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, item) => sum + item.food.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
