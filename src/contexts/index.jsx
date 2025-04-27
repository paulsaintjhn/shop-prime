import { createContext, useEffect, useState } from "react";

//create the context
//provide the state to context
//wrap context in root component
//consume the context using useContext

export const ShoppingCartContext = createContext(null);

function ShoppingCartProvider({ children }) {
  const [isFetchingStatus, setFetchingStatus] = useState(false);
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [error, setError] = useState("");
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [cartError, setCartError] = useState("");

  async function fetchAvailableProducts() {
    setFetchingStatus(true);

    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();

      if (data?.products) {
        // Optional chaining replaces && check
        setFetchedProducts(data.products);
      } else {
        setError("Products data is missing"); // Add error state
      }
    } catch (e) {
      setError("Failed to fetch products:", e); // Network errors
    } finally {
      setFetchingStatus(false); // Always runs last
    }
  }

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

  useEffect(() => {
    fetchAvailableProducts();
  }, []);

  const value = { fetchedProducts, isFetchingStatus, addToCart, cart };

  //   console.log(fetchedProducts);

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider;
