import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../Context/AppContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import "../Orders.css";

function SellReturns() {
  const {
    user,
    updateReturnStatus,
    orderStatusFilter,
    setOrderStatusFilter,
    handleOrderStatusFilter,
    itemImageAccessUrl,
    profileImageAccessUrl,
    calculate_Discount,
    timestampToDate,
    capitalizeFirstLetter,
    rejection,
    setRejection,
  } = useContext(AppContext);

  useEffect(() => {
    return setOrderStatusFilter("");
  }, []);

  return (
    <div className="orders-blurred-container">
      <div className={`orders-page ${rejection ? "blurred" : ""}`}>
        <div className="orders-filters flex-between box">
          <h2>
            <FontAwesomeIcon icon={faCircleLeft} className="accent-1" />
            &nbsp;Sell Return:-
          </h2>
          <div className="orders-filters-container flex-center">
            <p>Order-Status:&nbsp;</p>
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
          </div>
        </div>
        <div className="orders-container box">
          {handleOrderStatusFilter(user.sell.returns).map((item, index) => {
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
                        Order Status:&nbsp;
                        <span className="accent-1">
                          {capitalizeFirstLetter(item.status)}
                        </span>
                      </p>
                      <p>
                        Return Status:&nbsp;
                        <span className="accent-1">
                          {capitalizeFirstLetter(item.returnStatus)}
                        </span>
                      </p>
                      <p>
                        Delivered On:&nbsp;
                        <span className="accent-1">
                          {timestampToDate(item.dateOfDelivery, false)}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="orders-order-group-field col-span-2 flex-center">
                    <p>
                      Returned On:&nbsp;
                      <span className="accent-1">
                        {timestampToDate(item.dateOfReturn, false)}
                      </span>
                    </p>
                  </div>
                  <div className="orders-order-group-field col-span-2 flex-center">
                    <p>
                      <span className="accent-2">Return Reason:</span>&nbsp;
                      {item.returnReason}
                    </p>
                  </div>
                  {item.returnStatus === "rejected" && (
                    <div className="orders-order-group-field col-span-2 flex-center">
                      <p>
                        <span className="third">Rejection Reason:</span>
                        &nbsp;
                        {item.rejectionReason}
                      </p>
                    </div>
                  )}
                </div>
                {item.returnStatus === "requested" ? (
                  <div className="orders-order-group-buttons col-span-2 flex-center">
                    <button
                      className="btn-second"
                      onClick={() =>
                        updateReturnStatus({
                          order_id: item.order_id,
                          trader_id: item.trader.user_id,
                          returnStatus: "accepted",
                          rejectionReason: "none",
                        })
                      }
                    >
                      Accepted
                    </button>
                    <button
                      className="btn-third"
                      onClick={() => {
                        setRejection({
                          order_id: item.order_id,
                          trader_id: item.trader.user_id,
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
          {handleOrderStatusFilter(user.sell.returns).length === 0 && (
            <div className="flex-center full-space">
              <h1>🍃No Orders found</h1>
            </div>
          )}
        </div>
      </div>
      {rejection && (
        <div className="orders-popup-box popup-box box flex-center flex-col gap-10">
          <h2>Please provide a reason for Rejection</h2>
          <form
            className="flex-center flex-col gap-10"
            onSubmit={(e) => {
              e.preventDefault(); 
              updateReturnStatus(rejection);
            }}
          >
            <div className="orders-poppu-group full-space flex-center">
              <textarea
                className="full-space"
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
            </div>
            <div className="orders-popup-group flex-center gap-10">
              <button type="submit" className="btn-second">
                Submit
              </button>
              <button
                type="reset"
                className="btn-third"
                onClick={() => setRejection(null)}
              >
                Go Back
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default SellReturns;
