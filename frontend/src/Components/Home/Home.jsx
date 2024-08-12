import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import Carousel from "../Carousel/Carousel.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./Home.css";

function Home() {
  const {
    bestSellers,
    bestDeals,
    getHomePageContent,
    recommendations,
    features,
    authToken,
    user,
    navigate,
    featureImageAccessUrl,
  } = useContext(AppContext);
  const category = Object.keys(bestDeals);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (Object.keys(bestDeals).length === 0 || bestSellers.length === 0) {
      getHomePageContent();
      if (authToken && recommendations.length === 0) {
        getHomePageContent();
      }
    }
  }, [bestDeals, bestSellers, recommendations, authToken, user]);
  
  useEffect(() => {
    getHomePageContent();
  }, [user]);

  return (
    <div className="home-page flex-center flex-col pad-20 gap-20">
      <div className="home-welcome-box box">
        {user && authToken ? (
          <div className="home-welcome-content flex-center flex-col gap-10 flex-1 box-1">
            <div className="welcome-title flex-center flex-col">
              <h1>Welcome back, {user.userName}</h1>
              <p>Explore your marketplace activities.</p>
            </div>
            <div className="welcome-description flex-1 flex-center pad-20">
              <p>
                Dive into your personalized marketplace dashboard and explore
                your activities with ease. Manage your listed items
                effortlessly, track your sales, and keep an eye on your cart.
                Our intuitive interface ensures a seamless experience, making it
                easier for you to navigate and enjoy all that TradeConnect has
                to offer.
              </p>
            </div>
            <div className="welcome-call-to-action flex-center gap-10">
              <button
                className="btn-second"
                onClick={() => navigate("/account/listeditems")}
              >
                Listed Items
              </button>
              <button
                className="btn-second"
                onClick={() => navigate("/account/cart")}
              >
                Shopping Cart
              </button>
            </div>
          </div>
        ) : (
          <div className="home-welcome-content flex-center flex-col gap-10 flex-1 box-1">
            <div className="welcome-title flex-center flex-col">
              <h1>Welcome to TradeConnect</h1>
              <p>Your gateway to a peer-to-peer marketplace.</p>
            </div>
            <div className="welcome-description flex-1 flex-center pad-20">
              <p>
                Discover a dynamic and secure platform where buyers and sellers
                connect directly. TradeConnect empowers you to explore a diverse
                marketplace, offering unique products from individuals just like
                you. Experience the benefits of peer-to-peer trading, with no
                middlemen involved.
              </p>
            </div>
            <div className="welcome-call-to-action flex-center gap-10">
              <button className="btn-second" onClick={() => navigate("/form")}>
                Login / Sign up
              </button>
            </div>
          </div>
        )}
      </div>
      {authToken && recommendations.length > 0 && (
        <div className="home-page-recommendations box-4">
          <h1>Recommendations:-</h1>
          <Carousel carouselItems={recommendations} carouselType="products" />
        </div>
      )}
      <div className="home-features-container box-1 flex-center flex-col gap-10">
        <h1>
          Why Choose <span className="accent-1">TradeConnect?</span>
        </h1>
        <div className="home-features flex-center gap-10">
          {features.map((feature, index) => {
            return (
              <div key={index} className=" feature-box box-4 box-hover-2">
                <br />
                <img
                  src={featureImageAccessUrl + feature.featureImage}
                  alt=""
                />
                <h3>{feature.featureTitle}</h3>
                <p>{feature.featureDescription}</p>
              </div>
            );
          })}
        </div>
      </div>

      {bestDeals && (
        <div className="home-best-deals box-4">
          <h1>Best Deals:-</h1>
          <br />
          {Object.keys(bestDeals).length > 0 && (
            <div className="best-deals-nav flex-between">
              <button
                className="btn-accent-2 box-4 pad-5"
                onClick={() => (i === 0 ? setI(5) : setI((i) => i - 1))}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              {bestDeals && (
                <h2 className="accent-1">{category[i].replace(/_/g, " ")}</h2>
              )}
              <button
                className="btn-accent-2 box-4 pad-5"
                onClick={() => (i === 5 ? setI(0) : setI((i) => i + 1))}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          )}
          {bestDeals[category[i]]?.length > 0 ? (
            <Carousel
              carouselItems={bestDeals[category[i]]}
              carouselType="products"
            />
          ) : (
            <div className="empty-page best-deals-empty box-4">
              <h1>🍃No Deals Today</h1>
            </div>
          )}
        </div>
      )}
      {bestSellers && (
        <div className="home-best-sellers box-4">
          <h1>Best Sellers:-</h1>
          <Carousel carouselItems={bestSellers} carouselType="users" />
        </div>
      )}
    </div>
  );
}

export default Home;
