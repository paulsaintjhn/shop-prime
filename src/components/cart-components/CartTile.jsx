import { useContext } from "react";
import { ShoppingCartContext } from "../../contexts";

function CartTile({ cartItem }) {
  const { removeProductFromCart } = useContext(ShoppingCartContext);

  return (
    <div className="border-b pb-3">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium text-gray-800">{cartItem.title}</p>
          <div className="flex items-center text-sm text-gray-500 mt-1 space-x-2">
            <p>{cartItem.quantity}×</p>
            <p>${cartItem.price.toFixed(2)}</p>
          </div>
        </div>
        <button
          onClick={() => removeProductFromCart(cartItem)}
          className="text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default CartTile;
