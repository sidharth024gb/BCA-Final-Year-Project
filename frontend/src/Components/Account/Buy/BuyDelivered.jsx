import React, { useContext, useState } from "react";
import { AppContext } from "../../../Context/AppContext";
import Rating from "../../Rating/Rating";

function BuyDelivered() {
  const {
    user,
    returnOrder,
    setReturnOrder,
    returnRequest,
    isRating,
    setIsRating,
  } = useContext(AppContext);
  const [rateItem, setRateItem] = useState(null);
  const [rateId, setRateId] = useState(null);
  const [rateCategory, setRateCategory] = useState(null);

  return (
    <div>
      <h1>Buy Delivered</h1>
      {user.buy.delivered.map((order, index) => {
        const isAllowedToReturn =
          Date.now() - order.dateOfDelivery <=
          order.item.returnDays* 24 * 60 * 60 * 1000;
        return (
          <div key={index}>
            <h2>{order.order_id}</h2>
            <p>{order.status}</p>
            <p>{order.trader.userName}</p>
            <p>{order.trader.returnPolicy}</p>
            <p>{order.item.itemName}</p>
            <button
              onClick={() => {
                setIsRating(true);
                setRateItem("user");
                setRateId(order.trader.user_id);
              }}
            >
              Rate Seller
            </button>
            <button
              onClick={() => {
                setIsRating(true);
                setRateItem("product");
                setRateId(order.item.item_id);
                setRateCategory(order.item.category);
              }}
            >
              Rate Product
            </button>
            {isAllowedToReturn && (
              <button
                onClick={() =>
                  setReturnOrder({
                    order_id: order.order_id,
                    trader_id: order.trader.user_id,
                  })
                }
              >
                Return
              </button>
            )}
          </div>
        );
      })}
      {isRating && (
        <Rating id={rateId} category={rateCategory} rateItem={rateItem} />
      )}
      {returnOrder && (
        <div>
          <h1>Please provide the reason for return</h1>
          <form onSubmit={(e) => returnRequest(e)}>
            <textarea
              name="return-reason"
              id="return-reason"
              onChange={(e) => {
                setReturnOrder((r) => ({ ...r, returnReason: e.target.value }));
              }}
              required
            ></textarea>
            <button type="submit">Submit</button>
            <button type="reset" onClick={() => setReturnOrder(null)}>
              Go Back
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default BuyDelivered;
