import React, { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxesStacked } from "@fortawesome/free-solid-svg-icons";

function Orders() {
  const {
    placedOrders,
    profileImageAccessUrl,
    itemImageAccessUrl,
    calculate_Discount,
    capitalizeFirstLetter,
    timestampToDate,
  } = useContext(AppContext);
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
    <div className="orders-page box-1">
      <div className="orders-header flex-between box-4">
        <div className="orders-title">
          <h1>
            <FontAwesomeIcon icon={faBoxesStacked} className="accent-1" />
            Orders:-
          </h1>
        </div>
        <div className="orders-filters flex-center gap-10">
          <p>Order Status:&nbsp;</p>
          <select
            name="orderStatus"
            id="orderStatus"
            onChange={(e) => {
              setOrderstatus(e.target.value);
            }}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="not received">Not Received</option>
          </select>
          <p>Payment Option:&nbsp;</p>
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
        </div>
      </div>
      <div className="orders-content gap-10 flex-col">
        {displayOrders.length > 0 ? (
          displayOrders.map((order) => {
            return (
              <div
                key={order.order_id}
                className="order-container box-4 gap-10 flex-1 box-hover"
              >
                <div className="order-container-group flex-center flex-col box-2 box-hover-2">
                  <h2>Buyer Details</h2>
                  <div className="order-group-details gap-10">
                    <div className="order-group-image box-4 remove-padding box-hover-2">
                      <img
                        src={profileImageAccessUrl + order.buyer.profileImage}
                        alt="buyer"
                      />
                    </div>
                    <div className="order-group-description flex-col">
                      <p>Buyer Name:&nbsp;{order.buyer.userName}</p>
                      <p>Phone:&nbsp;{order.buyer.phone}</p>
                      <p>E-mail:&nbsp;{order.buyer.email}</p>
                      <p>Age:&nbsp;{order.buyer.age}</p>
                      <p>Gender:&nbsp;{order.buyer.gender}</p>
                      <p>Location:&nbsp;{order.buyer.location}</p>
                    </div>
                  </div>
                </div>
                <div className="order-container-group flex-center flex-col box-2 box-hover-2">
                  <h2>Item Details</h2>
                  <div className="order-group-details gap-10">
                    <div className="order-group-image box-4 remove-padding box-hover-2">
                      <img
                        src={itemImageAccessUrl + order.item.itemImage}
                        alt="item"
                      />
                    </div>
                    <div className="order-group-description flex-col">
                      <p>Item Name:&nbsp;{order.item.itemName}</p>
                      <p>
                        Price:&nbsp;&#8377;
                        {calculate_Discount(
                          order.item.price,
                          order.item.discount
                        )}
                        {order.item.discount > 0 ? (
                          <span className="org-price">
                            &#8377;{order.item.price}
                          </span>
                        ) : (
                          <></>
                        )}
                      </p>
                      <p>Discount:&nbsp;{order.item.discount}%</p>
                      <p>
                        Delivery Charge:&nbsp;&#8377;{order.item.deliveryCharge}
                      </p>
                      <p>
                        Condition:&nbsp;
                        {capitalizeFirstLetter(order.item.condition)}
                      </p>
                      <p>Return Days:&nbsp;{order.item.returnDays}</p>
                    </div>
                  </div>
                </div>
                <div className="order-container-group flex-center flex-col box-2 box-hover-2">
                  <h2>Seller Details</h2>
                  <div className="order-group-details gap-10">
                    <div className="order-group-image box-4 remove-padding box-hover-2">
                      <img
                        src={profileImageAccessUrl + order.seller.profileImage}
                        alt="seller"
                      />
                    </div>
                    <div className="order-group-description flex-col">
                      <p>Seller Name:&nbsp;{order.seller.userName}</p>
                      <p>Phone:&nbsp;{order.seller.phone}</p>
                      <p>E-mail:&nbsp;{order.seller.email}</p>
                      <p>Age:&nbsp;{order.seller.age}</p>
                      <p>Gender:&nbsp;{order.seller.gender}</p>
                      <p>Location:&nbsp;{order.seller.location}</p>
                    </div>
                  </div>
                </div>
                <div className="order-container-group order-details col-span-3 flex-center box-2 box-hover-2">
                  <div className="col-span-3 flex-center">
                    <h2>Order Details</h2>
                  </div>
                  <div className="order-details-group flex-center flex-col">
                    <p>Order Id:&nbsp;{order.order_id}</p>
                    <p>Razorpay Order Id:&nbsp;{order.razorpay_order_id}</p>
                    <p>Razorpay Order Id:&nbsp;{order.razorpay_payment_id}</p>
                  </div>
                  <div className="order-details-group flex-center flex-col">
                    <p>Ouantity:&nbsp;{order.quantity}</p>
                    <p>Total Price:&nbsp;&#8377;{order.totalPrice}</p>
                    <p>
                      Order Status:&nbsp;
                      <span className="accent-1">
                        {capitalizeFirstLetter(order.status)}
                      </span>
                    </p>
                  </div>
                  <div className="order-details-group flex-center flex-col">
                    <p>
                      Ordered On:&nbsp;
                      <span className="accent-1">{timestampToDate(order.dateOfOrder, false)}</span>
                    </p>
                    <p>
                      Payment Method:&nbsp;
                      <span className="accent-1">
                        {capitalizeFirstLetter(order.paymentOption)}
                      </span>
                    </p>
                    <p>Delivery Address:&nbsp;{order.deliveryAddress}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-page box-4">
            <h1>🍃No Orders Found</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
