import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom';
import RelatedItems from './RelatedItems';
import { AppContext } from '../../Context/AppContext';

function Card() {
    const location = useLocation();
  const itemDetails = location.state;
  const { addToCart } = useContext(AppContext);

    return (
      <div>
        <h1>{itemDetails.itemName}</h1>
        <p>{itemDetails.price}</p>
        <p>{itemDetails.discount}</p>
        <p>{itemDetails.bought}</p>
        <p>{itemDetails.seller}</p>
        <p>{itemDetails.tags}</p>
        <p>{itemDetails.deliveryOption}</p>
        <p>{itemDetails.location}</p>
        <button
          onClick={() =>
            addToCart(itemDetails.item_id, itemDetails.category, itemDetails.seller)
          }
        >
          Add to Cart
        </button>
        <RelatedItems
          Tags={itemDetails.tags}
          Category={itemDetails.category}
          Id={itemDetails.item_id}
        />
      </div>
    );
}

export default Card;
