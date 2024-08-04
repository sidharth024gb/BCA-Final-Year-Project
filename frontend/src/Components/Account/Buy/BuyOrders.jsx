import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../Context/AppContext";

function BuyOrders() {
  const {
    user,
    cancelOrder,
    isCancel,
    setIsCancel,
    deliveryConfirmation,
    setOrderStatus,
    updateOrderStatus,
    orderStatusFilter,
    setOrderStatusFilter,
    handleOrderStatusFilter,
  } = useContext(AppContext);
  const [notPrefer, setNotPrefer] = useState(false);
  const [orderStatusReady, setOrderStatusReady] = useState(false);

  useEffect(() => {
    if (orderStatusReady) {
      updateOrderStatus();
      setOrderStatusReady(false);
    }
  }, [orderStatusReady]);

  useEffect(() => {
    return setOrderStatusFilter("");
  }, []);
  
  return (
    <div>
      <h1>Buy Orders</h1>
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
      {handleOrderStatusFilter(user.buy.orders).map((item, index) => {
        return (
          <div key={index}>
            <h1>{item.order_id}</h1>
            <p>{item.trader.userName}</p>
            <p>{item.status}</p>
            {item.status === "delivered" || item.status === "not received" ? (
              <div>
                <button
                  onClick={() =>
                    deliveryConfirmation(item.order_id, item.trader.user_id)
                  }
                >
                  Package Received
                </button>
                <button
                  onClick={async () => {
                    await setOrderStatus({
                      order_id: item.order_id,
                      trader_id: item.trader.user_id,
                      status: "not received",
                      userState: "buyer",
                    });

                    setOrderStatusReady(true);
                  }}
                >
                  Package Not Received
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setNotPrefer(false);
                  setIsCancel({
                    order_id: item.order_id,
                    trader_id: item.trader.user_id,
                    userState: "buyer",
                  });
                }}
              >
                Cancel Order
              </button>
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
            <button type="reset" onClick={() => setIsCancel(null)}>
              Go Back
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default BuyOrders;
