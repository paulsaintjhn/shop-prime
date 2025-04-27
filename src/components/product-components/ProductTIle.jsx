import { useContext } from "react";
import { useCart } from "../../contexts/CartContext";
import { ShoppingCartContext } from "../../contexts";

function ProductTile({ product }) {
  // const { addToCart } = useCart();
  const { addToCart } = useContext(ShoppingCartContext);

  return (
    <div className="flex flex-col border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full">
      {/* Image at the top */}
      <div className="aspect-square bg-gray-100 overflow-hidden">
        {product?.thumbnail ? (
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Button at the bottom */}
      <div className="p-4 pt-0">
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
        >
          Add to Cart
        </button>
      </div>

      {/* Product details in the middle */}
      <div className="p-4 flex-grow">
        <h3 className="font-semibold text-lg mb-1">
          {product?.title || "Untitled Product"}
        </h3>
        {/* {product?.description && (
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
            {product.description}
          </p>
        )} */}
        {product?.price && (
          <p className="text-lg font-bold mt-2">${product.price.toFixed(2)}</p>
        )}
      </div>
    </div>
  );
}

export default ProductTile;
