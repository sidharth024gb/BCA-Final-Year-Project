import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../Context/AppContext";

function PlaceOrder() {
  const {
    user,
    filterCart,
    filteredCartItems,
    removeFromCart,
    handleItemQuantityChange,
    setIsCheckingOut,
    setOrders,
    placeOrders,
  } = useContext(AppContext);
  const [isMyAddress, setIsMyAddress] = useState(false);

  useEffect(() => {
    filterCart();
    setOrders((o) => ({ ...o, items: user.cart }));
    if (user.cart.length === 0) {
      setIsCheckingOut(false);
    }
  }, [user.cart]);

  useEffect(() => {
    if (isMyAddress) {
      setOrders((o) => ({ ...o, deliveryAddress: user.address }));
    } else {
      setOrders((o) => ({ ...o, deliveryAddress: "" }));
    }
  }, [isMyAddress]);

  return (
    <div>
      <h1>Place Orders</h1>
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
      <form onSubmit={(e) => placeOrders(e)}>
        <div>
          <h2>Payment Option</h2>
          <input
            type="radio"
            name="paymentOption"
            id="cash"
            value="cash"
            onChange={(e) => {
              setOrders((o) => ({ ...o, paymentOption: "cash" }));
            }}
            required
          />
          <label htmlFor="cash">Cash on delivery</label>
          <input
            type="radio"
            name="paymentOption"
            id="online "
            value="online"
            onChange={(e) => {
              setOrders((o) => ({ ...o, paymentOption: "online" }));
            }}
            required
          />
          <label htmlFor="online">Online Payment</label>
        </div>
        <div>
          <h2>Delivery Address</h2>
          <input
            type="checkbox"
            name="deliveryAddress"
            id="myaddress"
            onChange={async (e) => {
              setIsMyAddress((a) => !a);
            }}
          />
          <label htmlFor="myaddress">My Address</label>
          {!isMyAddress && (
            <textarea
              name="deliveryAddress"
              id="deliveryAddress"
              placeholder="Enter delivery address"
              onChange={(e) => {
                setOrders((o) => ({ ...o, deliveryAddress: e.target.value }));
              }}
              required
            ></textarea>
          )}
        </div>
        <button type="submit">Place Orders</button>
        <button type="reset" onClick={() => setIsCheckingOut(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default PlaceOrder;
