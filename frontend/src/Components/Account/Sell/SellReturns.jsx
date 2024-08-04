import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../Context/AppContext";

function SellReturns() {
  const {
    user,
    updateReturnStatus,
    orderStatusFilter,
    setOrderStatusFilter,
    handleOrderStatusFilter,
  } = useContext(AppContext);
  const [rejection, setRejection] = useState(null);

  useEffect(() => {
    return setOrderStatusFilter(""); 
  },[])

  return (
    <div>
      <h1>Sell Returns</h1>
      <select
        name="order-status-filter"
        id="order-status-filter"
        value={orderStatusFilter}
        onChange={(e) => {
          setOrderStatusFilter(e.target.value);
        }}
      >
        <option value="">All</option>
        <option value="requested">Requested</option>
        <option value="accepted">Accepted</option>
        <option value="rejected">Rejected</option>
      </select>
      {handleOrderStatusFilter(user.sell.returns).map((order, index) => {
        return (
          <div key={index}>
            <h2>{order.returnStatus}</h2>
            <p>{order.item.itemName}</p>
            <p>{order.trader.userName}</p>
            <p>{order.returnReason}</p>
            <p>{order.rejectionReason}</p>
            <p>{order.totalPrice}</p>
            {order.returnStatus === "requested" ? (
              <div>
                <button
                  onClick={() =>
                    updateReturnStatus({
                      order_id: order.order_id,
                      trader_id: order.trader.user_id,
                      returnStatus: "accepted",
                      rejectionReason: "none",
                    })
                  }
                >
                  Accepted
                </button>
                <button
                  onClick={() => {
                    setRejection({
                      order_id: order.order_id,
                      trader_id: order.trader.user_id,
                      returnStatus: "rejected",
                    });
                  }}
                >
                  Rejected
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        );
      })}
      {rejection && (
        <div>
          <h2>Please provide a reason for Rejection</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateReturnStatus(rejection);
            }}
          >
            <textarea
              name="rejectReason"
              id="rejectReason"
              onChange={(e) => {
                setRejection((r) => ({
                  ...r,
                  rejectionReason: e.target.value,
                }));
              }}
              required
            ></textarea>
            <button type="submit">Submit</button>
            <button type="reset" onClick={() => setRejection(null)}>
              Go Back
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default SellReturns;
