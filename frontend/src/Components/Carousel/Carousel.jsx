import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import "./Carousel.css";

function Carousel({ carouselItems, carouselType }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselContainerRef = useRef(null);
  const carouselItemsRef = useRef([]);
  const {
    itemImageAccessUrl,
    addToCart,
    calculate_Rating,
    calculate_Discount,
    profileImageAccessUrl,
    timestampToDate,
  } = useContext(AppContext);

  function updateCarousel() {
    const itemWidth = carouselItemsRef.current[0]?.clientWidth || 0;
    const offset = -currentIndex * (itemWidth + 10);
    if (carouselContainerRef.current) {
      carouselContainerRef.current.style.transform = `translateX(${offset}px)`;
    }
  }

  function showNext() {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  }

  function showPrev() {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + carouselItems.length) % carouselItems.length
    );
  }

  useEffect(() => {
    setCurrentIndex(0);
    carouselItemsRef.current = [];
  }, [carouselItems]);

  useEffect(() => {
    updateCarousel();
  }, [currentIndex]);

  if (carouselType === "products") {
    return (
      <div className="carousel flex-center">
        <div className="carousel-holder box-4">
          <div className="carousel-container" ref={carouselContainerRef}>
            {carouselItems?.map((item, index) => {
              return (
                <Link
                  to="/card"
                  state={item}
                  ref={(element) => (carouselItemsRef.current[index] = element)}
                  key={item.item_id}
                  className="carousel-card-holder box-hover-2"
                >
                  <div className="carousel-card box-4 remove-padding">
                    <div className="carousel-card-image box remove-padding box-radius-0">
                      <img
                        src={itemImageAccessUrl + item.itemImage}
                        alt={item.name}
                      />
                    </div>
                    {item.discount > 0 && (
                      <span className="discount">{item.discount}% OFF</span>
                    )}
                    <div className="carousel-card-content box-1">
                      <div className="carousel-card-title flex-start">
                        <h3>{item.itemName}</h3>
                        <p>
                          ⭐{calculate_Rating(item.rating)}
                          <span className="side-small-text">
                            ({item.rating.length})
                          </span>
                        </p>
                      </div>
                      <div className="carousel-card-description">
                        <p>
                          Price:&nbsp;&#8377;
                          {calculate_Discount(item.price, item.discount)}
                          {item.discount > 0 ? (
                            <span className="org-price">
                              &#8377;{item.price}
                            </span>
                          ) : (
                            <></>
                          )}
                        </p>
                        <p>
                          {item.deliveryCharge === 0 ? (
                            <span className="second">Free Delivery</span>
                          ) : (
                            <span>
                              Delivery Charge:&nbsp;&#8377;
                              {item.deliveryCharge}
                            </span>
                          )}
                        </p>
                        <p>
                          Condition:&nbsp;
                          <span className="accent-1">{item.condition}</span>
                        </p>
                        <p>Return Days:&nbsp;{item.returnDays}</p>
                        <button
                          className="btn-third"
                          onClick={(e) => {
                            e.preventDefault();
                            addToCart(item.item_id, item.category, item.seller);
                          }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="carousel-buttons">
          <button
            type="button"
            className="prev box-4 accent-1"
            onClick={() => showPrev()}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button
            type="button"
            className="next box-4 accent-1"
            onClick={() => showNext()}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </div>
    );
  }
  if (carouselType === "users") {
    return (
      <div className="carousel flex-center">
        <div className="carousel-holder box-4">
          <div className="carousel-container" ref={carouselContainerRef}>
            {carouselItems?.map((trader, index) => {
              return (
                <Link
                  to="/userpreview"
                  state={trader.user_id}
                  ref={(element) => (carouselItemsRef.current[index] = element)}
                  key={trader.user_id}
                  className="carousel-card-holder carousel-user-card-holder box-4 box-hover-2"
                >
                  <div className="carousel-user-card flex-1">
                    <div className="carousel-user-card-image">
                      <img
                        src={profileImageAccessUrl + trader.profileImage}
                        alt={trader.userName}
                        className="box remove-padding"
                      />
                    </div>
                    <h1>{trader.userName}</h1>
                    <p>
                      Rating:&nbsp;⭐{calculate_Rating(trader.rating)}
                      <span className="side-small-text">
                        ({trader.rating.length})
                      </span>
                    </p>
                    <br />
                    <p>
                      Member Since&nbsp;
                      <span className="accent-1">
                        {timestampToDate(trader.created_at, false)}
                      </span>
                    </p>
                    <br />
                    <p>{trader.bio}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="carousel-buttons">
          <button
            type="button"
            className="prev box-4 accent-1"
            onClick={() => showPrev()}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button
            type="button"
            className="next box-4 accent-1"
            onClick={() => showNext()}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </div>
    );
  }

  return <></>;
}

export default Carousel;
