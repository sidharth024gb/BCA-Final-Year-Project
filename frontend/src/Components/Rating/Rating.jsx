import React, { useContext, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../../Context/AppContext";

const RatingContainer = styled.div``;
const RatingStar = styled.span`
  font-size: 24px;
  cursor: pointer;
`;

function Rating({ id, rateItem, category }) {
  const { handleRating, setIsRating } = useContext(AppContext);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  console.log(rateItem, id);

  return (
    <RatingContainer>
      <h2>Rate the {rateItem}</h2>
      {[...Array(5)].map((_, index) => {
        const isSelected = index < rating || index < hoverRating;
        return (
          <RatingStar
            key={index}
            style={{ color: isSelected ? "gold" : "gray" }}
            onMouseOver={() => setHoverRating(index + 1)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(index + 1)}
          >
            <FontAwesomeIcon icon={faStar} />
          </RatingStar>
        );
      })}
      <br />
      <button onClick={() => handleRating(id, rateItem, category,rating)}>
        Submit
      </button>
      <button onClick={() => setIsRating(false)}>Go Back</button>
    </RatingContainer>
  );
}

export default Rating;
