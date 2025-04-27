function CartTile({ cartItem }) {
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
          <img src="/assets/icon-remove-item.svg" alt="Remove item" />
        </div>
      </div>
    </div>
  );
}

export default CartTile;
