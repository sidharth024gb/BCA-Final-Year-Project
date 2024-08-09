import React, { useContext, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import RelatedItems from "./RelatedItems";
import { AppContext } from "../../Context/AppContext";
import "./Card.css";

function Card() {
  const location = useLocation();
  const itemDetails = location.state;
  const {
    addToCart,
    itemImageAccessUrl,
    calculate_Rating,
    calculate_Discount,
    capitalizeFirstLetter,
  } = useContext(AppContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  },[itemDetails])

  return (
    <div className="card-page flex-center box-1 flex-col gap-10">
      <div className="card-page-container box">
        <div className="card-image box-4 remove-padding">
          <img
            src={itemImageAccessUrl + itemDetails.itemImage}
            alt={itemDetails.itemImage}
          />
        </div>
        <div className="card-vertical-line"></div>
        <div className="card-page-content">
          <div className="card-head">
            <div className="card-title flex-start">
              <h1>{itemDetails.itemName}</h1>
              <p>
                ⭐{calculate_Rating(itemDetails.rating)}
                <span className="side-small-text">
                  ({itemDetails.rating.length})
                </span>
              </p>
            </div>
            <p className="side-small-text pad-5">{itemDetails.bought}&nbsp;Bought</p>
            <h2 className="accent-2">
              &#8377;
              {calculate_Discount(itemDetails.price, itemDetails.discount)}
              {itemDetails.discount > 0 ? (
                <span className="org-price">&#8377;{itemDetails.price}</span>
              ) : (
                <></>
              )}
            </h2>
          </div>
          {itemDetails.discount > 0 && (
            <p>
              Discount:&nbsp;
              <span className="second">{itemDetails.discount}%</span>
            </p>
          )}
          {itemDetails.deliveryCharge === 0 ? (
            <span className="second">Free Delivery</span>
          ) : (
            <span>
              Delivery Charge:&nbsp;&#8377;{itemDetails.deliveryCharge}
            </span>
          )}
          <p>
            Category:&nbsp;
            <span className="accent-1">{itemDetails.category}</span>
          </p>
          <p>
            Condition:&nbsp;
            <span className="accent-1">
              {capitalizeFirstLetter(itemDetails.condition)}
            </span>
          </p>
          <p>Return Days:&nbsp;{itemDetails.returnDays}</p>
          <Link
            to="/userpreview"
            state={itemDetails.seller}
            className="accent-1"
          >
            Veiw Seller
          </Link>
          <p>Description:-</p>
          <div className="card-description">
            <p>🔹{itemDetails.description}</p>
            <p>
              🔹Stock Availability:&nbsp;
              <span className="accent-1">{itemDetails.quantity}</span>
              &nbsp;Units
            </p>
          </div>
          <div className="card-button flex-end flex-col">
            <button
              className="btn-third"
              onClick={() =>
                addToCart(
                  itemDetails.item_id,
                  itemDetails.category,
                  itemDetails.seller
                )
              }
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <RelatedItems
        Tags={itemDetails.tags}
        Category={itemDetails.category}
        Id={itemDetails.item_id}
      />
    </div>
  );
}

export default Card;
