import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../Context/AppContext";

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
  } = useContext(AppContext);
  const [notPrefer, setNotPrefer] = useState(false);

  useEffect(() => {
    return setOrderStatusFilter("");
  }, []);

  return (
    <div>
      <h1>Sell Orders</h1>
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
      {handleOrderStatusFilter(user.sell.orders).map((item, index) => {
        return (
          <div key={index}>
            <h1>{item.order_id}</h1>
            <p>{item.trader.userName}</p>
            <p>{item.status}</p>
            <button
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
        );
      })}
      {isCancel && (
        <div>
          <h2>Please provide the reason for cancelling order</h2>
          <form onSubmit={(e) => cancelOrder(e, isCancel)}>
            <input
              type="checkbox"
              name="reason"
              id="not-prefer"
              checked={notPrefer}
              onChange={() => {
                setNotPrefer((p) => !p);
                setIsCancel((c) => ({
                  ...c,
                  cancelReason: "prefer not to say",
                }));
              }}
            />
            <label htmlFor="not-prefer">Prefer not to say</label>
            {!notPrefer && (
              <textarea
                name="reason"
                id="reason"
                onChange={(e) => {
                  setIsCancel((c) => ({ ...c, cancelReason: e.target.value }));
                }}
                required
              ></textarea>
            )}
            <button type="submit">Confirm Cancellation</button>
            <button onClick={() => setIsCancel(null)}>Go Back</button>
          </form>
        </div>
      )}
      {orderStatus && (
        <div>
          <h2>Update Order Status</h2>
          <form onSubmit={(e) => updateOrderStatus(e)}>
            <select
              name="orderStatus"
              id="orderStatus"
              onChange={(e) => {
                setOrderStatus((prev) => ({ ...prev, status: e.target.value }));
              }}
              required
            >
              <option value="">Select</option>
              <option value="accepted">Accepted</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
            <button type="submit">Update Status</button>
            <button type="reset" onClick={() => setOrderStatus(null)}>
              Go Back
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default SellOrders;
