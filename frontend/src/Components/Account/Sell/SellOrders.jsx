import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../Context/AppContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxesStacked } from "@fortawesome/free-solid-svg-icons";
import "../Orders.css";

function SellOrders() {
  const {
    user,
    cancelOrder,
    isCancel,
    setIsCancel,
    orderStatus,
    setOrderStatus,
    updateOrderStatus,
    orderStatusFilter,
    setOrderStatusFilter,
    handleOrderStatusFilter,
    itemImageAccessUrl,
    profileImageAccessUrl,
    calculate_Discount,
    timestampToDate,
    capitalizeFirstLetter,
  } = useContext(AppContext);
  const [notPrefer, setNotPrefer] = useState(false);

  useEffect(() => {
    return setOrderStatusFilter("");
  }, []);

  return (
    <div className="orders-blurred-container">
      <div
        className={`orders-page  ${isCancel || orderStatus ? "blurred" : ""}`}
      >
        <div className="orders-filters flex-between box">
          <h2>
            <FontAwesomeIcon icon={faBoxesStacked} className="accent-1" />
            &nbsp;Sell Orders:-
          </h2>
          <div className="orders-filters-container flex-center">
            <p>Order-Status:&nbsp;</p>
            <select
              name="order-status-filter"
              id="order-status-filter"
              value={orderStatusFilter}
              onChange={(e) => {
                setOrderStatusFilter(e.target.value);
              }}
            >
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="not received">Not Received</option>
            </select>
          </div>
        </div>
        <div className="orders-container box">
          {handleOrderStatusFilter(user.sell.orders).map((item, index) => {
            return (
              <div key={index} className="orders-order box-2 box-hover">
                <div className="orders-order-group order-img-height-adjust box-2 box-hover">
                  <div className="orders-order-group-field col-span-2 flex-center">
                    <h3>Item Details</h3>
                  </div>
                  <div className="orders-order-group-field box box-hover remove-padding">
                    <img
                      src={itemImageAccessUrl + item.item.itemImage}
                      alt="Item"
                    />
                  </div>
                  <div className="orders-order-group-field">
                    <p>
                      Item Name:&nbsp;
                      {capitalizeFirstLetter(item.item.itemName)}
                    </p>
                    <p>
                      Price:&nbsp;&#8377;
                      {calculate_Discount(item.item.price, item.item.discount)}
                      {item.item.discount > 0 ? (
                        <span className="org-price">
                          &#8377;{item.item.price}
                        </span>
                      ) : (
                        <></>
                      )}
                    </p>
                    <p>Discount:&nbsp;{item.item.discount}</p>
                    <p>Return Days:&nbsp;{item.item.returnDays}</p>
                    <p>Delivery Charge:&nbsp;{item.item.deliveryCharge}</p>
                  </div>
                </div>
                <div className="orders-order-group order-img-height-adjust box-2 box-hover">
                  <div className="orders-order-group-field col-span-2 flex-center">
                    <h3>Buyer Details</h3>
                  </div>
                  <div className="orders-order-group-field box box-hover remove-padding">
                    <img
                      src={profileImageAccessUrl + item.trader.profileImage}
                      alt="Trader Profile"
                    />
                  </div>
                  <div className="orders-order-group-field">
                    <p>
                      Trader Name:&nbsp;
                      {capitalizeFirstLetter(item.trader.userName)}
                    </p>
                    <p>phone:&nbsp;{item.trader.phone}</p>
                    <p>E-mail:&nbsp;{item.trader.email}</p>
                    <p>
                      location:&nbsp;
                      {item.trader.location}
                    </p>
                    <Link
                      to="/userpreview"
                      state={item.trader.user_id}
                      className="accent-1"
                    >
                      View Buyer
                    </Link>
                  </div>
                </div>
                <div className="orders-order-group col-span-2 box-2 box-hover">
                  <div className="orders-order-group-field col-span-2 flex-center">
                    <h3>Order Details</h3>
                  </div>
                  <div className="orders-order-group-field flex-center">
                    <div className="orders-order-group-field-centered">
                      <p>
                        Payment Method:&nbsp;
                        {item.paymentOption === "cash"
                          ? "Cash On Delivery"
                          : "Online Payment"}
                      </p>
                      <p>Delivery Address:&nbsp;{item.deliveryAddress}</p>
                      <p>Total Price:&nbsp;&#8377;{item.totalPrice}</p>
                    </div>
                  </div>
                  <div className="orders-order-group-field flex-center">
                    <div className="orders-order-group-field-centered">
                      <p>Quantity:&nbsp;{item.quantity}</p>
                      <p>
                        Oreder Status:&nbsp;
                        <span className="accent-1">
                          {capitalizeFirstLetter(item.status)}
                        </span>
                      </p>
                      <p>
                        Ordered On:&nbsp;
                        <span className="accent-1">
                          {timestampToDate(item.dateOfOrder, false)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="orders-order-group-buttons col-span-2 flex-center">
                  <button
                    className="btn-accent-2"
                    onClick={() =>
                      setOrderStatus({
                        order_id: item.order_id,
                        trader_id: item.trader.user_id,
                        userState: "seller",
                      })
                    }
                  >
                    Update Status
                  </button>
                  {item.status === "pending" ? (
                    <button
                      className="btn-third"
                      onClick={() => {
                        setNotPrefer(false);
                        setIsCancel({
                          order_id: item.order_id,
                          trader_id: item.trader.user_id,
                          userState: "seller",
                        });
                      }}
                    >
                      Cancel Order
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            );
          })}
          {handleOrderStatusFilter(user.sell.orders).length === 0 && (
            <div className="flex-center full-space">
              <h1>🍃No Orders found</h1>
            </div>
          )}
        </div>
      </div>
      {isCancel && (
        <div className="orders-popup-box popup-box box flex-center flex-col">
          <h3>Please provide the reason for cancelling order</h3>
          <form
            className="flex-center flex-col gap-10"
            onSubmit={(e) => cancelOrder(e, isCancel)}
          >
            {!notPrefer && (
              <div className="orders-popup-group">
                <textarea
                  name="reason"
                  id="reason"
                  onChange={(e) => {
                    setIsCancel((c) => ({
                      ...c,
                      cancelReason: e.target.value,
                    }));
                  }}
                  required
                ></textarea>
              </div>
            )}
            <div className="orders-popup-group">
              <input
                type="checkbox"
                name="reason"
                id="not-prefer"
                checked={notPrefer}
                onChange={() => {
                  setNotPrefer((p) => !p);
                  setIsCancel((c) => ({
                    ...c,
                    cancelReason: "Prefer not to say",
                  }));
                }}
              />
              <label htmlFor="not-prefer">Prefer not to say</label>
            </div>
            <div className="orders-popup-group flex-center gap-10">
              <button type="submit" className="btn-third">
                Cancel Order
              </button>
              <button className="btn-second" onClick={() => setIsCancel(null)}>
                Go Back
              </button>
            </div>
          </form>
        </div>
      )}
      {orderStatus && (
        <div className="orders-popup-box popup-box box flex-center flex-col gap-10">
          <h2>Update Order Status</h2>
          <form
            className="flex-center flex-col gap-10 full-space"
            onSubmit={(e) => updateOrderStatus(e)}
          >
            <div className="order-popup-group flex-center pad-10">
              <select
                name="orderStatus"
                id="orderStatus"
                onChange={(e) => {
                  setOrderStatus((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }));
                }}
                required
              >
                <option value="">Select</option>
                <option value="accepted">Accepted</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
            <div className="order-popup-group flex-center gap-5">
              <button type="submit" className="btn-second">
                Update Status
              </button>
              <button
                type="reset"
                className="btn-third"
                onClick={() => setOrderStatus(null)}
              >
                Go Back
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default SellOrders;
