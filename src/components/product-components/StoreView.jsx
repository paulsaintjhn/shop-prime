import { useContext } from "react";
import { ShoppingCartContext } from "../../contexts";
import ProductTile from "./ProductTIle";

function StoreView() {
  const { fetchedProducts, isFetchingStatus, } = useContext(ShoppingCartContext);

  console.log("context products", fetchedProducts);

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
    <div className="py-5 bg-gray-100 text-gray-800">
      <div className="max-w-2xl mx-auto ">
        <h2 className="text-4xl font-extrabold mb-2">Desserts</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-2">
          {fetchedProducts && fetchedProducts.length > 0 ? (
            fetchedProducts.map((product) => (
              <ProductTile key={product.id} product={product} />
            ))
          ) : (
            <h3 className="flex items-center justify-center h-screen w-full  col-span-full text-center">
              No products available yet...
            </h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default StoreView;
