import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../Context/AppContext";
import PlaceOrder from "./PlaceOrder";

function Cart() {
  const {
    user,
    filterCart,
    filteredCartItems,
    removeFromCart,
    handleItemQuantityChange,
    setIsCheckingOut,
    isCheckingOut,
  } = useContext(AppContext);

  useEffect(() => {
    filterCart();
  }, [user.cart]);

  return (
    <div>
      <h1>Cart</h1>
      {filteredCartItems &&
        filteredCartItems.map((item, index) => {
          return (
            <div key={index}>
              <h4>{item.itemName}</h4>
              <h4>{item.price}</h4>
              <h4>{item.discount}</h4>
              <h4>{item.quantity}</h4>
              <button
                onClick={() =>
                  handleItemQuantityChange(item.item_id, item.quantity, "-")
                }
              >
                -
              </button>
              <span>{user.cart[index]?.quantity}</span>
              <button
                onClick={() =>
                  handleItemQuantityChange(item.item_id, item.quantity, "+")
                }
              >
                +
              </button>
              <p>{}</p>
              <button onClick={() => removeFromCart(item.item_id)}>
                Remove
              </button>
            </div>
          );
        })}
      {filteredCartItems.length > 0 && (
        <button onClick={() => setIsCheckingOut(true)}>Checkout</button>
      )}
      {isCheckingOut && <PlaceOrder />}
    </div>
  );
}

export default Cart;
