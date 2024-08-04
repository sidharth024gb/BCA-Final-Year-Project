import React, { useContext } from "react";
import { AppContext } from "../../../Context/AppContext";

function SellCancels() {
  const { user} = useContext(AppContext);
  return (
    <div>
      <h1>Sell Cancels</h1>
      {user.sell.cancelled.map((item, index) => {
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

export default SellCancels;
