import { useContext } from "react";
import { useCart } from "../../contexts/CartContext";
import CartTile from "./CartTile";
import { ShoppingCartContext } from "../../contexts";

function CartView() {
  //   const { cart } = useCart();

  const { cart } = useContext(ShoppingCartContext);

  console.log("Items in cart include:", cart);

  return (
    <div className="mt-25 bg-white text-gray-400">
      <div>
        <h3>Your Cart</h3>
      </div>

      {cart.length > 0 ? (
        cart.map((cartItem) => (
          <CartTile key={cartItem.id} cartItem={cartItem} />
        ))
      ) : (
        <p>Your cart is empty. Are you broke??</p>
      )}

      <div>
        <p>Order Total:</p>
        <p></p>
      </div>
      <div>
        <button type="button">Confirm Order</button>
      </div>
    </div>
  );
}

export default CartView;
