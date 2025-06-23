import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//create the context
//provide the state to context
//wrap context in root component
//consume the context using useContext

export const ShoppingCartContext = createContext(null);

function ShoppingCartProvider({ children }) {
  const [isFetchingStatus, setFetchingStatus] = useState(false);
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [cartError, setCartError] = useState("");
  const { id } = useParams();

  // useEffect(() => {
  //   async function fetchProductDetails() {
  //     setFetchingStatus(true);

  //     try {
  //       const response = await fetch(`https://dummyjson.com/products/${id}`);
  //       const data = await response.json();

  //       if (data && data.id) {
  //         // Optional chaining replaces && check
  //         setProduct(data.product);
  //       } else {
  //         setError("Product data is missing"); // Add error state
  //       }
  //     } catch (e) {
  //       setError("Failed to fetch product details: " + e.message);
  //     } finally {
  //       setFetchingStatus(false);
  //     }
  //   }

  //   if (id) {
  //     fetchProductDetails();
  //   }
  // }, [id]);


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

  function decreaseProductQuantity(productItem) {
    const updatedCart = cart
      .map((item) =>
        item.id === productItem.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0); // Remove if quantity reaches 0

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    console.log("Removed item with id:", productItem.id);
    console.log("Updated cart length:", updatedCart.length);
  }

  function removeProductFromCart(productItem) {
    const updatedCart = cart.filter((item) => item.id !== productItem.id);

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  // function removeProductFromCart(productItem) {
  //   // Filter out the item to be removed
  //   const updatedCart = cart.filter((item) => item.id !== productItem.id);

  //   // Update state
  //   setCart(updatedCart);

  //   // Update localStorage
  //   localStorage.setItem("cart", JSON.stringify(updatedCart));

  //   console.log("Removed item with id:", productItem.id);
  //   console.log("Updated cart length:", updatedCart.length);
  // }

  // function removeProductFromCart(productItem) {
  //   setCart((prevCart) => {
  //     const cartItemId = prevCart.findIndex(
  //       (item) => item.id === productItem.id
  //     );
  //     let updatedCart;
  //     if (cartItemId) {
  //       updatedCart = prevCart.splice(cartItemId, 1);
  //     }
  //     // Save updated cart to localStorage
  //     localStorage.setItem("cart", JSON.stringify(updatedCart));

  //     return updatedCart;
  //   });

  //   console.log("Index of existing item in cart is", cartItemId);

  //   console.log("Number of items in cart", updatedCart.length);
  // }
  // function removeProductFromCart(productItem) {
  //   const cartItemId = cart.findIndex((item) => item.id === productItem.id);
  //   console.log("Index of existing item in cart is", cartItemId);

  //   cart.splice(cartItemId, 1);

  //   console.log("Number of items in cart", cart.length);
  // }

  function addToCart(productItem) {
    try {
      const updatedCart = (() => {
        const existingItem = cart.find((item) => item.id === productItem.id);

        if (existingItem) {
          return cart.map((item) =>
            item.id === productItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...cart, { ...productItem, quantity: 1 }];
        }
      })();

      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      console.log("Added to cart:", calculateTotalPrice);
      console.log("Total amount of items added to cart is:", productItem.name);
    } catch (error) {
      console.error("Error occurred while trying to add item to cart:", error);
      setError("Something went wrong while adding to cart.");
    }
  }

  function calculateTotalPrice() {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }

  function calculateTotalItems() {
    return cart.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  }

  useEffect(() => {
    fetchAvailableProducts();
  }, []);

  const value = {
    fetchedProducts,
    addToCart,
    cart,
    removeProductFromCart,
    decreaseProductQuantity,
    calculateTotalPrice,
    calculateTotalItems,
    isFetchingStatus,
    product,
  };

  //   console.log(fetchedProducts);

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider;
