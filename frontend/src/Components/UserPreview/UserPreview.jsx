import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Carousel from "../Carousel/Carousel";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./UserPreview.css";

function UserPreview() {
  const {
    userPreview,
    profileImageAccessUrl,
    products,
    calculate_Rating,
    capitalizeFirstLetter,
    timestampToDate,
    user,
  } = useContext(AppContext);
  const location = useLocation();
  const trader_id = location.state;
  const [traderData, setTraderData] = useState(null);
  const [listedItems, setListedItems] = useState([]);
  const categories = products && Object.keys(products);
  const [carouselItems, setCarouselItems] = useState([]);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (trader_id) {
      userPreview(trader_id).then((Data) => {
        if (Data && products && user) {
          const items = Data.listedItems
            .map((listedItem) => {
              return products[listedItem.category]?.find(
                (item) => item.item_id === listedItem.item_id
              );
            })
            .filter(
              (item) =>
                item.category === categories[i] &&
                (item.location === user.location ||
                  item.deliveryOption === "domestic")
            );
          setListedItems(items);
        }
        setTraderData(Data);
      });
    }
  }, [trader_id, products, userPreview, i, user]);

  if (!traderData) {
    return (
      <div className="empty-page flex-center">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="user-preview-page flex-center flex-col pad-10 gap-10">
      <div className="user-preview-details gap-10">
        <div className="user-preview-image box-4">
          <img
            src={profileImageAccessUrl + traderData.profileImage}
            alt={traderData.userName}
            className="box remove-padding box-hover"
          />
        </div>
        <div className="user-preview-content box-4 flex-1 flex-start flex-col">
          <div className="user-preview-title">
            <h1>
              {traderData.userName}
              <span className="side-small-text">
                <FontAwesomeIcon icon={faLocationDot} />
                &nbsp;
                {traderData.location}
              </span>
            </h1>
          </div>
          <h2>
            ⭐{calculate_Rating(traderData.rating)}
            <span className="side-small-text">
              ({traderData.rating.length})
            </span>
          </h2>
          <p>Bio:&nbsp;{traderData.bio}</p>
          <p>E-mail:&nbsp;{traderData.email}</p>
          <p>Age:&nbsp;{traderData.age}</p>
          <p>Gender:&nbsp;{traderData.gender}</p>
          <p>
            <span className="accent-1">
              {capitalizeFirstLetter(traderData.deliveryOption)}
            </span>
            &nbsp;Seller
          </p>
          <p>
            <span className="accent-1">Return Policy:</span>&nbsp;
            {traderData.returnPolicy}
          </p>
          <div className="user-preview-end-text flex-1 flex-center">
            <p>
              Member of TradeConnect Since&nbsp;
              <span className="accent-1">
                {timestampToDate(traderData.created_at)}
              </span>
            </p>
          </div>
        </div>
      </div>
      <hr />
      {products && (
        <div className="user-preview-listed-items box-4 remove-padding">
          <h1>
            Listed Items(<span className="accent-1">{listedItems.length}</span>
            ):-
          </h1>

          <div className="flex-between user-preview-carousel-nav">
            <button
              className="btn-accent-2 box-4 pad-5"
              onClick={() => (i === 0 ? setI(5) : setI((i) => i - 1))}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <h1 className="accent-1">{categories[i].replace(/_/g, " ")}</h1>
            <button
              className="btn-accent-2 box-4 pad-5"
              onClick={() =>
                i === categories.length - 1 ? setI(0) : setI((i) => i + 1)
              }
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          {listedItems.length > 0 ? (
            <Carousel carouselItems={listedItems} carouselType="products" />
          ) : (
            <div className="flex-center">
              <div className="flex-center box-4 user-preview-empty-listed-items">
                <h1>🍃No Items Listed</h1>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserPreview;
