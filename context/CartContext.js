import React, { createContext, useState } from 'react';

// Create the CartContext
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
 
  // Function to add an item to the cart
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.productid === item.productid);
      if (existingItem) {
        // Increase quantity if the item already exists in the cart
        return prevItems.map((cartItem) =>
          cartItem.productid === item.productid ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevItems, { ...item, quantity: 1 }]; // Add new item with quantity 1
    });
  };

  // Function to remove an item from the cart
  const removeFromCart = (productid) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.productid !== productid));
  };

  const clearCart = () => {
    setCartItems([]); // Reset the cart items to an empty array
  };
  // Function to increase quantity of an item
  const increaseQuantity = (productid) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productid === productid ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to decrease quantity of an item
  const decreaseQuantity = (productid) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productid === productid
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };
    
  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, increaseQuantity,clearCart, decreaseQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};