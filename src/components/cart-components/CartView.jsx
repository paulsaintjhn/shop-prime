import { useContext } from "react";
import CartTile from "./CartTile";
import { ShoppingCartContext } from "../../contexts";

function CartView() {
  const { cart, calculateTotalPrice, calculateTotalItems } = useContext(ShoppingCartContext);

  return (
    <div className="w-1/4 bg-white shadow-md p-6 h-screen sticky top-0 overflow-y-auto">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Your Cart ({calculateTotalItems()})</h3>
      </div>

      <div className="space-y-4 mb-6">
        {cart.length > 0 ? (
          cart.map((cartItem) => (
            <CartTile key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <p className="text-gray-500">Your cart is empty</p>
        )}
      </div>

      {cart.length > 0 && (
        <div className="border-t pt-4">
          <div className="flex justify-between mb-4">
            <p className="font-medium text-gray-700">Order Total:</p>
            <p className="font-bold text-gray-900">${calculateTotalPrice().toFixed(2)}</p>
          </div>
          <button 
            type="button"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-md transition-colors font-medium"
          >
            Confirm Order
          </button>
        </div>
      )}
    </div>
  );
}

export default CartView;
