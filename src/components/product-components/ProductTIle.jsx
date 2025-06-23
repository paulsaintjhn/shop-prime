import { useContext } from "react";
import { ShoppingCartContext } from "../../contexts";
import { useNavigate } from "react-router-dom";

function ProductTile({ product }) {
  const { addToCart, cart, decreaseProductQuantity } =
    useContext(ShoppingCartContext);
  const navigate = useNavigate();

  // Check if the product is already in the cart
  const cartItem = cart.find((item) => item.id === product.id);

  const handleImageClick = () => {
    navigate(`/product-details/${product.id}`);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {/* Image */}
      <div
        className="aspect-square overflow-hidden cursor-pointer"
        onClick={handleImageClick}
      >
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

      {/* Product Details */}
      <div className="p-4">
        <div className="text-sm text-gray-500 mb-1">{product?.category}</div>
        <h3 className="font-semibold text-lg mb-2 text-gray-800">
          {product?.title || "Untitled Product"}
        </h3>
        {product?.price && (
          <p className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
        )}
      </div>
      {/* Add to Cart / Quantity Control Button */}
      <div className="px-4 pb-4">
        {cartItem ? (
          <div className="w-full bg-white border border-gray-300 text-gray-800 py-2 px-4 rounded-full flex items-center justify-between">
            <button
              onClick={() => decreaseProductQuantity(product)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <span className="text-lg font-bold">-</span>
            </button>
            <span className="font-semibold text-lg">{cartItem.quantity}</span>
            <button
              onClick={() => addToCart(product)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <span className="text-lg font-bold">+</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 py-2 px-4 rounded-full transition-colors flex items-center justify-center"
          >
            <span className="mr-2">Add to Cart</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductTile;
