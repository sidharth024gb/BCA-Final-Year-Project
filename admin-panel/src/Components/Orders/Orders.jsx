import React, { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";

function Orders() {
  const { placedOrders } = useContext(AppContext);
  const [orderStatus, setOrderstatus] = useState("");
  const [paymentOption, setPaymentOption] = useState("");

  function filterOrders() {
    let orders = [...placedOrders];

    if (orderStatus) {
      orders = orders.filter((order) => order.status === orderStatus);
    }

    if (paymentOption) {
      orders = orders.filter((order) => order.paymentOption === paymentOption);
    }

    return orders;
  }

  const displayOrders = filterOrders();

  return (
    <div>
      <h1>Orders</h1>
      <select
        name="orderStatus"
        id="orderStatus"
        onChange={(e) => {
          setOrderstatus(e.target.value);
        }}
      >
        <option value="">Select Status</option>
        <option value="pending">Pending</option>
        <option value="accepted">Accepted</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="not received">Not Received</option>
      </select>
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

export default Orders;
