import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";

function Home() {
  const {
    bestSellers,
    bestDeals,
    getHomePageContent,
    recommendations,
    features,
    authToken,
  } = useContext(AppContext);
  const category = Object.keys(bestDeals);
  const [i, setI] = useState(0);
  
  console.log(category[i])

  useEffect(() => {
    if (!bestDeals || !bestSellers || !recommendations) {
      getHomePageContent();
    }
  }, [bestDeals, bestSellers, recommendations]);

  return (
    <div>
      {
        features.map((feature, index) => {
          return (
            <div key={index}>
              <h3>{feature.featureTitle}</h3>
              <p>{feature.featureDescription}</p>
            </div>
          )
        })
      }
      {authToken &&
        recommendations.map((product, index) => {
          return (
            <div key={index}>
              <h2>{product.tags}</h2>
              <p>{product.itemName}</p>
              <p>{product.price}</p>
              <p>{product.bought}</p>
            </div>
          );
        })}
      {Object.keys(bestDeals).length>0&&<div>
        <button onClick={() => (i === 0 ? (setI(0)) : (setI(i => i - 1)))}>⬅️</button>
        <button onClick={() => (i === 5 ? (setI(5)) : (setI(i => i + 1)))}>➡️</button>
      </div>}
      {bestDeals[category[i]]?.map((item, index) => {
        return (
          <div key={index}>
            <h2>{item.tags}</h2>
            <p>{item.itemName}</p>
            <p>{item.price}</p>
            <p>{item.bought}</p>
          </div>
        )
      })}
      {bestSellers.map((seller, index) => (
        <div key={index}>
          <h2>{seller.userName}</h2>
          <p>{seller.returnPolicy}</p>
          <p>{seller.age}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
