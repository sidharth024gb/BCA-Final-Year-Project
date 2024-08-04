import React, { useContext,useEffect } from "react";
import { AppContext } from "../../../Context/AppContext";

function BuyReturns() {
  const {
    user,
    orderStatusFilter,
    setOrderStatusFilter,
    handleOrderStatusFilter,
  } = useContext(AppContext);

  useEffect(() => {
   return setOrderStatusFilter("");
  }, []);

  return (
    <div>
      <h1>Buy Returns</h1>
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
      {handleOrderStatusFilter(user.buy.returns).map((order, index) => {
        return (
          <div key={index}>
            <h2>{order.returnStatus}</h2>
            <p>{order.item.itemName}</p>
            <p>{order.trader.userName}</p>
            <p>{order.returnReason}</p>
            <p>{order.rejectionReason}</p>
            <p>{order.totalPrice}</p>
          </div>
        );
      })}
    </div>
  );
}

export default BuyReturns;
