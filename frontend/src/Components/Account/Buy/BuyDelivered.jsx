import React, { useContext, useState } from "react";
import { AppContext } from "../../../Context/AppContext";
import Rating from "../../Rating/Rating";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";
import "../Orders.css";

function BuyDelivered() {
  const {
    user,
    returnOrder,
    setReturnOrder,
    returnRequest,
    isRating,
    setIsRating,
    itemImageAccessUrl,
    calculate_Discount,
    profileImageAccessUrl,
    timestampToDate,
    capitalizeFirstLetter,
  } = useContext(AppContext);
  const [rateItem, setRateItem] = useState(null);
  const [rateId, setRateId] = useState(null);
  const [rateCategory, setRateCategory] = useState(null);

  return (
    <div className="orders-blurred-container">
      <div className={`orders-page ${isRating||returnOrder?"blurred":""}`}>
        <div className="orders-filters flex-between box">
          <h2>
            <FontAwesomeIcon icon={faTruckFast} className="accent-1" />
            &nbsp;Buy Delivered:-
          </h2>
        </div>
        <div className="orders-container box">
          {user.buy.delivered.map((item, index) => {
            const isAllowedToReturn =
              Date.now() - item.dateOfDelivery <=
              item.item.returnDays * 24 * 60 * 60 * 1000;
            return (
              <div key={index} className="orders-order box-2 box-hover">
                <div className="orders-order-group order-img-height-adjust box-2 box-hover">
                  <div className="orders-order-group-field col-span-2 flex-center">
                    <h3>Item Details</h3>
                  </div>
                  <div className="orders-order-group-field box box-hover remove-padding">
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
                  <div className="orders-order-group-field order-img-height-adjust col-span-2 flex-center">
                    <h3>Seller Details</h3>
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
                      View Seller
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
                        Ordered On:&nbsp;
                        <span className="accent-1">
                          {timestampToDate(item.dateOfOrder, false)}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="orders-order-group-field col-span-2 flex-center">
                    <p>
                      Delivered On:&nbsp;
                      <span className="accent-1">
                        {timestampToDate(item.dateOfDelivery, false)}
                      </span>
                    </p>
                  </div>
                  <div className="orders-order-group-buttons col-span-2 flex-center">
                    <button
                      className="btn-accent-2"
                      onClick={() => {
                        setIsRating(true);
                        setRateItem("user");
                        setRateId(item.trader.user_id);
                      }}
                    >
                      Rate Seller
                    </button>
                    <button
                      className="btn-accent-2"
                      onClick={() => {
                        setIsRating(true);
                        setRateItem("product");
                        setRateId(item.item.item_id);
                        setRateCategory(item.item.category);
                      }}
                    >
                      Rate Product
                    </button>
                    {isAllowedToReturn && (
                      <button
                        className="btn-third"
                        onClick={() =>
                          setReturnOrder({
                            order_id: item.order_id,
                            trader_id: item.trader.user_id,
                          })
                        }
                      >
                        Return
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {user.buy.delivered.length === 0 && (
            <div className="flex-center full-space">
              <h1>🍃No Orders found</h1>
            </div>
          )}
        </div>
      </div>
      {isRating && (
        <Rating id={rateId} category={rateCategory} rateItem={rateItem} />
      )}
      {returnOrder && (
        <div className="orders-popup-box popup-box box flex-center flex-col gap-10">
          <h2>Please provide the reason for return</h2>
          <form
            className="flex-center flex-col gap-10"
            onSubmit={(e) => returnRequest(e)}
          >
            <div className="orders-poppu-group full-space flex-center">
              <textarea
                name="return-reason"
                id="return-reason"
                onChange={(e) => {
                  setReturnOrder((r) => ({
                    ...r,
                    returnReason: e.target.value,
                  }));
                }}
                required
              ></textarea>
            </div>
            <div className="orders-popup-group flex-center gap-10">
              <button type="submit" className="btn-second">Submit</button>
              <button type="reset" className="btn-third" onClick={() => setReturnOrder(null)}>
                Go Back
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default BuyDelivered;
