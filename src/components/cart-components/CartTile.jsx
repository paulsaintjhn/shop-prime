import { useContext } from "react";
import { ShoppingCartContext } from "../../contexts";

function CartTile({ cartItem }) {
  const { removeProductFromCart } = useContext(ShoppingCartContext);

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <p>{cartItem.title}</p>
          <div className="flex justify-evenly">
            <p>{cartItem.quantity}x</p>
            <p>@{cartItem.price}</p>
            <p></p>
          </div>
        </div>
        <div>
          <img
            onClick={() => removeProductFromCart(cartItem)}
            src="/assets/icon-remove-item.svg"
            alt="Remove item"
          />
        </div>
      </div>
    </div>
  );
}

export default CartTile;
