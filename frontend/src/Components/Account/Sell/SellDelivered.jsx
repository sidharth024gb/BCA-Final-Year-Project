import React, { useContext } from 'react'
import { AppContext } from '../../../Context/AppContext';

function SellDelivered() {
    const { user } = useContext(AppContext);
    return (
      <div>
        <h1>Sell Delivered</h1>
        {user.sell.delivered.map((order, index) => {
          return (
            <div key={index}>
              <h2>{order.order_id}</h2>
              <p>{order.status}</p>
              <p>{order.trader.userName}</p>
              <p>{order.item.itemName}</p>
            </div>
          );
        })}
      </div>
    );
}

export default SellDelivered
