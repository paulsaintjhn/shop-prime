import { useContext } from "react";
import { ShoppingCartContext } from "../../contexts";
import StoreView from "../../components/product-components/StoreView";
import CartView from "../../components/cart-components/CartView";

function HomePage() {
  return (
    <section className="min-h-screen bg-gray-50">
      <div className="flex">
        <StoreView />
        <CartView />
      </div>
    </section>
  );
}

export default HomePage;
