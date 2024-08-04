import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import Rating from "../Rating/Rating";

function UserPreview() {
  const {
    userPreview,
    profileImageAccessUrl,
    products,
    addToCart,
    isRating,
    setIsRating,
  } = useContext(AppContext);
  const location = useLocation();
  const trader_id = location.state;
  const [traderData, setTraderData] = useState({});
  const [listedItems, setListedItems] = useState([]);

  useEffect(() => {
    if (trader_id) {
      userPreview(trader_id).then((Data) => {
        if (Data && products) {
          const items = Data.listedItems.map((listedItem) => {
            return products[listedItem.category]?.find(
              (item) => item.item_id === listedItem.item_id
            );
          });
          setListedItems(items);
        }
        setTraderData(Data);
      });
    }
  }, [trader_id, products, userPreview]);

  if (!traderData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {traderData.profileImage && (
        <img
          src={profileImageAccessUrl + traderData.profileImage}
          alt="Profile"
          style={{
            width: "100px",
            height: "100px",
          }}
        />
      )}
      <p>{traderData.userName}</p>
      <p>{traderData.age}</p>
      <p>{traderData.email}</p>
      <p>{traderData.bio}</p>
      <p>{traderData.returnPolicy}</p>
      <button onClick={() => setIsRating(true)}>Rate the User</button>
      {isRating && <Rating id={traderData.user_id} rateItem={"user"} />}
      {listedItems.length > 0 ? (
        listedItems.map((item, index) => (
          <Link to="/card" state={item} key={index}>
            <div>
              <p>{item.itemName}</p>
              <p>{item.price}</p>
              <p>{item.bought}</p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(item.item_id, item.category, item.seller);
                }}
              >
                Add to Cart
              </button>
            </div>
          </Link>
        ))
      ) : (
        <p>no products Listed</p>
      )}
    </div>
  );
}

export default UserPreview;
