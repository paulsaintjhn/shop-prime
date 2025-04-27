import { useContext } from "react";
import { ShoppingCartContext } from "../../contexts";
import StoreView from "../../components/product-components/StoreView";
import { CartProvider } from "../../contexts/CartContext";
import CartView from "../../components/cart-components/CartView";

function HomePage() {
  //   const { fetchedProducts } = useContext(ShoppingCartContext);

  //   console.log("data available in the context: ", fetchedProducts);

  return (
    <section>
      {/* <div>SHOP PRIME HOME PAGE VIEW</div> */}

      <div className="flex justify-evenly">
        <StoreView />

        <CartView />
      </div>
    </section>
  );
}

export default HomePage;
