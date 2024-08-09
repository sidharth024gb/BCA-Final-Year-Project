import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { Link } from "react-router-dom";
import Carousel from "../Carousel/Carousel";
import "./Card.css";

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

  if (relatedItems.length === 0) {
    return <></>;
  }

  return (
    <div className="related-items box">
      <h2>Related Items:-</h2>
      <Carousel carouselItems={relatedItems} carouselType="products" />
    </div>
  );
}

export default RelatedItems;
