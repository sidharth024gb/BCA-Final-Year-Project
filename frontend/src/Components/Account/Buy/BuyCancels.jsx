import React, { useContext } from "react";
import { AppContext } from "../../../Context/AppContext";

function BuyCancels() {
  const { user } = useContext(AppContext);
  return (
    <div>
      <h1>Buy Cancels</h1>
      {user.buy.cancelled.map((item, index) => {
        return (
          <div key={index}>
            <h1>{item.order_id}</h1>
            <p>{item.trader.userName}</p>
            <p>{item.status}</p>
            <p>{item.cancelBy}</p>
            <p>{item.cancelReason}</p>
          </div>
        );
      })}
    </div>
  );
}

export default BuyCancels;
