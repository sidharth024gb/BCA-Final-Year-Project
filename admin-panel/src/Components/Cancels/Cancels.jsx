import React, { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";

function Cancels() {
  const { cancels } = useContext(AppContext);
  const [paymentOption, setPaymentOption] = useState("");

  function filterOrders() {
    let orders = [...cancels];

    if (paymentOption) {
      orders = orders.filter((order) => order.paymentOption === paymentOption);
    }

    return orders;
  }

  const displayOrders = filterOrders();

  return (
    <div>
      <h1>Cancels</h1>
      <select
        name="paymentOption"
        id="paymentOption"
        onChange={(e) => {
          setPaymentOption(e.target.value);
        }}
      >
        <option value="">All</option>
        <option value="cash">Cash on Delivery</option>
        <option value="online">Online Payment</option>
      </select>
      {displayOrders?.map((order, index) => {
        return (
          <div key={index}>
            <h1>{order.order_id}</h1>
            <p>{order.status}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Cancels;
