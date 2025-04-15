import { createContext, useEffect, useState } from "react";

//create the context
//provide the state to context
//wrap context in root component
//consume the context using useContext

export const ShoppingCartContext = createContext(null);

function ShoppingCartProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [fetchedProducts, setFetchedProducts] = useState([]);

  async function fetchAvailableProducts() {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    console.log(data);

    if (data && data?.products) {
      setFetchedProducts(data?.products);
    }
  }

  useEffect(() => {
    fetchAvailableProducts();
  }, []);

  //   console.log(fetchedProducts);

  return (
    <ShoppingCartContext.Provider value={{ fetchedProducts }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider;
