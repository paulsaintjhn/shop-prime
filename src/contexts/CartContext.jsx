import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [cartError, setCartError] = useState("");

  function addToCart(productItem) {
    try {
      setCart((prevCart) => {
        const existingItem = prevCart.find(
          (item) => item.id === productItem.id
        );

        let updatedCart;
        if (existingItem) {
          updatedCart = prevCart.map((item) =>
            item.id === productItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          updatedCart = [...prevCart, { ...productItem, quantity: 1 }];
        }

        // Save updated cart to localStorage
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        return updatedCart;
      });
    } catch (error) {
      setCartError("Error occurred while trying to add item to cart", error);
    }
  }

  

  const value = { addToCart, cart };
  return <CartContext.Provider value={value}> {children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
