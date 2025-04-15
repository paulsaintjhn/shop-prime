import { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import StoreView from "../../components/product-components/StoreView";

function HomePage() {
  const { fetchedProducts } = useContext(ShoppingCartContext);

  console.log("data available in the context: ", fetchedProducts);

  return (
    <section>
      <div>SHOP PRIME HOME PAGE VIEW</div>
      <StoreView />
    </section>
  );
}

export default HomePage;
