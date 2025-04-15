import { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import ProductTile from "./ProductTIle";

function StoreView() {
  const { fetchedProducts } = useContext(ShoppingCartContext);

  console.log("context products", fetchedProducts);

  return (
    <div className="px-6 py-16 bg-gray-100 text-gray-800">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-4">Desserts</h2>
        <p className="text-lg mb-8 text-gray-600">
          Discover amazing products at unbeatable prices. Shop with confidence,
          anytime, anywhere.
        </p>

        <div>
          {fetchedProducts && fetchedProducts.length > 0 ? (
            fetchedProducts.map((product) => <ProductTile product={product} />)
          ) : (
            <h3>No product available yet...</h3>
          )}
        </div>

        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all">
          Start Shopping
        </button>
      </div>
    </div>
  );
}

export default StoreView;
