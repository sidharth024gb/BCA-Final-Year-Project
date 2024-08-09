import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../Context/AppContext";
import "./Cart.css";

function Cart() {
  const {
    user,
    filterCart,
    filteredCartItems,
    removeFromCart,
    handleItemQuantityChange,
    setIsCheckingOut,
    isCheckingOut,
    calculate_Discount,
    calculate_Rating,
    setOrders,
    placeOrders,
    itemImageAccessUrl,
    cartInfo,
  } = useContext(AppContext);
  const [isMyAddress, setIsMyAddress] = useState(false);
  useEffect(() => {
    filterCart();
    setOrders((o) => ({ ...o, items: user.cart }));
  }, [user.cart]);

  useEffect(() => {
    if (isMyAddress) {
      setOrders((o) => ({ ...o, deliveryAddress: user.address }));
    } else {
      setOrders((o) => ({ ...o, deliveryAddress: "" }));
    }

    if (!isCheckingOut) {
      setIsMyAddress(false);
    }
  }, [isMyAddress, isCheckingOut]);

  if (user.cart.length === 0) {
    return (
      <div className="empty-page box">
        <h1>🍃Cart is empty</h1>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className={`cart-container box ${isCheckingOut ? "blurred" : ""}`}>
        <div className="cart-header">
          <div className="cart-header-group title col-span-4">
            <h1>Cart 🛒</h1>
            <h1>
              <span className="accent-1">{user.cart.length}</span>&nbsp;Items
            </h1>
          </div>
          <div className="cart-header-group col-span-2">
            <h3>Description</h3>
          </div>
          <div className="cart-header-group">
            <h3>Quantity</h3>
          </div>
          <div className="cart-header-group">
            <h3>Remove</h3>
            <h3>Price</h3>
          </div>
        </div>
        {filteredCartItems &&
          filteredCartItems.map((item, index) => {
            return (
              <div key={index} className="cart-item-container box-hover box-1">
                <div className="cart-item-container-group col-span-2">
                  <div className="cart-item-image box box-hover remove-padding">
                    <img src={itemImageAccessUrl + item.itemImage} alt="" />
                  </div>
                  <div className="cart-item-description">
                    <div className="cart-item-description-title flex-center">
                      <h2>{item.itemName}</h2>&nbsp;
                      <p>
                        ⭐{calculate_Rating(item.rating)}
                        <span className="side-small-text">
                          ({item.rating.length})
                        </span>
                      </p>
                    </div>
                    <p>
                      Price:&nbsp;&#8377;
                      {calculate_Discount(item.price, item.discount)}
                      {item.discount > 0 ? (
                        <span className="org-price">&#8377;{item.price}</span>
                      ) : (
                        <></>
                      )}
                    </p>
                    <p>Discount:&nbsp;{item.discount}%</p>
                  </div>
                </div>
                <div className="cart-item-container-group">
                  <button
                    onClick={() =>
                      handleItemQuantityChange(item.item_id, item.quantity, "-")
                    }
                    className="btn-accent-1"
                  >
                    -
                  </button>
                  <span>{user.cart[index]?.quantity}</span>
                  <button
                    onClick={() =>
                      handleItemQuantityChange(item.item_id, item.quantity, "+")
                    }
                    className="btn-accent-1"
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-container-group flex-between">
                  <button
                    className="btn-third"
                    onClick={() => removeFromCart(item.item_id)}
                  >
                    Remove
                  </button>
                  <p>
                    &#8377;
                    {calculate_Discount(item.price, item.discount) *
                      user.cart[index]?.quantity}
                  </p>
                </div>
              </div>
            );
          })}

        <div className="cart-summary box-2">
          <div className="cart-summary-group col-span-4 flex-start">
            <h3>Cart Summary:-</h3>
          </div>
          <div className="cart-summary-group">
            <p>Discount:&nbsp;</p>
            <span>&#8377;{cartInfo.discounts}</span>
          </div>
          <div className="cart-summary-group">
            <p>Delivery Charges:&nbsp;</p>
            <span>&#8377;{cartInfo.deliveryCharges}</span>
          </div>
          <div className="cart-summary-group">
            <p>Subtotal:&nbsp;</p>
            <span>&#8377;{cartInfo.subtotal}</span>
          </div>
          <div className="cart-summary-group">
            <p>Total:&nbsp;</p>
            <span>&#8377;{cartInfo.total}</span>
          </div>
          <div className="cart-summary-group col-span-4 flex-end">
            <button
              onClick={() => setIsCheckingOut(true)}
              className="btn-accent-1"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
      {isCheckingOut && (
        <div className="cart-popup-checkout box flex-center flex-col">
          <h2>Order Summary</h2>
          <form className="cart-popup-form" onSubmit={(e) => placeOrders(e)}>
            <div className="cart-popup-form-group">
              <p>Total Price:&nbsp;</p>
              <span>&#8377;{cartInfo.total}</span>
            </div>
            <div className="cart-popup-form-group">
              <p>Payment Option:&nbsp;</p>
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
            {!isMyAddress && (
              <div className="cart-popup-form-group">
                <p>Delivery Address:&nbsp;</p>
                <textarea
                  name="deliveryAddress"
                  id="deliveryAddress"
                  placeholder="Enter delivery address"
                  onChange={(e) => {
                    setOrders((o) => ({
                      ...o,
                      deliveryAddress: e.target.value,
                    }));
                  }}
                  required
                ></textarea>
              </div>
            )}
            <div className="cart-popup-form-group">
              <input
                type="checkbox"
                name="deliveryAddress"
                id="myaddress"
                checked={isMyAddress}
                onChange={async (e) => {
                  setIsMyAddress((a) => !a);
                }}
              />
              <label htmlFor="myaddress">Deliver to My Address</label>
            </div>
            <div className="cart-popup-form-group flex-center pad-10">
              <button type="submit" className="btn-second">
                Place Orders
              </button>
              <button
                type="reset"
                className="btn-third"
                onClick={() => setIsCheckingOut(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Cart;
