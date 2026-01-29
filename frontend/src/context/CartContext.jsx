import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find(
        (i) => i.id === item.id && i.weight === item.weight
      );
      if (exists) {
        return prev.map((i) =>
          i.id === item.id && i.weight === item.weight
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const increaseQty = (id, weight) => {
    setCart((prev) =>
      prev.map((i) =>
        i.id === id && i.weight === weight ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  };

  const decreaseQty = (id, weight) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id && i.weight === weight
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const removeFromCart = (id, weight) => {
    setCart((prev) => prev.filter((i) => !(i.id === id && i.weight === weight)));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increaseQty, decreaseQty, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
