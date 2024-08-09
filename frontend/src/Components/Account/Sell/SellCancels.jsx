import React, { useContext } from "react";
import { AppContext } from "../../../Context/AppContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import "../Orders.css";

function SellCancels() {
  const {
    user,
    itemImageAccessUrl,
    profileImageAccessUrl,
    calculate_Discount,
    timestampToDate,
    capitalizeFirstLetter,
  } = useContext(AppContext);
  return (
    <div className="orders-blurred-container">
      <div className={`orders-page`}>
        <div className="orders-filters flex-between box">
          <h2>
            <FontAwesomeIcon icon={faBan} className="accent-1" />
            &nbsp;Sell Cancels:-
          </h2>
        </div>
        <div className="orders-container box">
          {user.sell.cancelled.map((item, index) => {
            return (
              <div key={index} className="orders-order box-2 box-hover">
                <div className="orders-order-group order-img-height-adjust box-2 box-hover">
                  <div className="orders-order-group-field col-span-2 flex-center">
                    <h3>Item Details</h3>
                  </div>
                  <div className="orders-order-group-field order-img-height-adjust box box-hover remove-padding">
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
                    <p>location:&nbsp;{item.trader.location}</p>
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
                      <p>
                        Ordered On:&nbsp;
                        <span className="accent-1">
                          {timestampToDate(item.dateOfOrder, false)}
                        </span>
                      </p>
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
                        Cancelled By:&nbsp;
                        <span className="accent-1">{item.cancelBy}</span>
                      </p>
                      <p>
                        Cancelled On:&nbsp;
                        <span className="accent-1">
                          {timestampToDate(item.dateOfCancel, false)}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="orders-order-group-field col-span-2 flex-center">
                    <p>
                      <span className="accent-2">Cancel Reason:</span>&nbsp;
                      {item.cancelReason}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          {user.sell.cancelled.length === 0 && (
            <div className="flex-center full-space">
              <h1>🍃No Orders found</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SellCancels;
