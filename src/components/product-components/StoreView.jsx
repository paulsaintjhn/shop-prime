import { useContext } from "react";
import { ShoppingCartContext } from "../../contexts";
import ProductTile from "./ProductTIle";

function StoreView() {
  const { fetchedProducts, isFetchingStatus } = useContext(ShoppingCartContext);

  if (isFetchingStatus) {
    return (
      <div className="flex items-center justify-center">
        <h1 className="text-xl font-semibold text-gray-700">
          Products Loading...
        </h1>
      </div>
    );
  }

  return (
    <div className="py-5 bg-gray-100 text-gray-800 w-3/4">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Desserts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fetchedProducts && fetchedProducts.length > 0 ? (
            fetchedProducts.map((product) => (
              <ProductTile key={product.id} product={product} />
            ))
          ) : (
            <h3 className="flex items-center justify-center h-40 w-full col-span-full text-center">
              No products available yet...
            </h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default StoreView;
