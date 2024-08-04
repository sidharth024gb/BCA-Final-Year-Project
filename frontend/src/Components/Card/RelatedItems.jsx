import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { Link } from "react-router-dom";

function RelatedItems({ Tags, Category, Id }) {
  const { products, user, authToken, addToCart } = useContext(AppContext);
  const [relatedItems, setRelatedItems] = useState([]);
  useEffect(() => {
    if (products && products[Category]) {
      const tagsArray = Tags.split(",").map((tag) => tag.trim().toLowerCase());

      let filteredRelatedItems = products[Category].filter((item) => {
        const itemTagsArray = item.tags
          .split(",")
          .map((tag) => tag.trim().toLowerCase());

        return (
          itemTagsArray.some((tag) => tagsArray.includes(tag)) &&
          item.item_id !== Id
        );
      });

      if (user && authToken) {
        filteredRelatedItems = filteredRelatedItems.filter(
          (item) =>
            item.location === user.location ||
            item.deliveryOption === "domestic"
        );
      }

      setRelatedItems(filteredRelatedItems);
    }
  }, [products, Tags, Category, user, authToken, Id]);

  if (!relatedItems) {
    return (
      <div>
        <h1>No Related Items Found</h1>
      </div>
    );
  }

  return (
    <div>
      {relatedItems.map((item, index) => {
        return (
          <Link to="/card" state={item} key={index}>
            <div>
              <h2>{item.tags}</h2>
              <p>{item.itemName}</p>
              <p>{item.price}</p>
              <p>{item.discount}</p>
              <p>{item.deliveryOption}</p>
              <p>{item.location}</p>
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
        );
      })}
    </div>
  );
}

export default RelatedItems;
