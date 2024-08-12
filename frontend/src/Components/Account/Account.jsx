import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import ListedItems from "./ListedItems/ListedItems";
import ProfileDetails from "./Profile/ProfileDetails";
import Cart from "./Cart/Cart";
import SellOrders from "./Sell/SellOrders";
import SellCancels from "./Sell/SellCancels";
import BuyOrders from "./Buy/BuyOrders";
import BuyCancels from "./Buy/BuyCancels";
import SellDelivered from "./Sell/SellDelivered";
import BuyDelivered from "./Buy/BuyDelivered";
import SellReturns from "./Sell/SellReturns";
import BuyReturns from "./Buy/BuyReturns";
import "./Account.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faUser,
  faCartShopping,
  faList,
  faMoneyBill,
  faBoxesStacked,
  faTruckFast,
  faBan,
  faCircleLeft,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";

function Account() {
  const {
    user,
    getUser,
    products,
    filterListedItems,
    filterCart,
    deleteConfirm,
    setDeleteConfirm,
    setIsCheckingOut,
    isCheckingOut,
    isCancel,
    orderStatus,
    setIsCancel,
    setOrderStatus,
    rejection,
    setRejection,
    returnOrder,
    setReturnOrder,
    isRating,
    showAlertBox,
    setIsRating,
  } = useContext(AppContext);
  const [showSellOptions, setShowSellOptions] = useState(false);
  const [showBuyOptions, setShowBuyOptions] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!user) {
      getUser();
    }
    filterListedItems();
    filterCart();
  }, [user, products]);

  useEffect(() => {
    if (location.pathname !== "/account/") {
      setDeleteConfirm(false);
    }
    if (location.pathname !== "/account/cart") {
      setIsCheckingOut(false);
    }
    if (location.pathname !== "/account/sell/orders") {
      setIsCancel(null);
      setOrderStatus(null);
    }
    if (location.pathname !== "/account/buy/orders") {
      setIsCancel(null);
    }
    if (location.pathname !== "/account/sell/returns") {
      setRejection(null);
    }
    if (location.pathname !== "/account/buy/delivered") {
      setReturnOrder(null);
      setIsRating(false);
    }
  }, [location.pathname]);

  if (!user) {
    return (
      <div className="empty-page">
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div className="account-page">
      <div
        className={`account-nav-holder app-body ${
          isRating ||
          returnOrder ||
          rejection ||
          isCancel ||
          orderStatus ||
          deleteConfirm ||
          isCheckingOut ||
          showAlertBox
            ? "blurred"
            : ""
        }`}
      >
        <div className="account-nav">
          <h2>
            <FontAwesomeIcon icon={faChartSimple} />
            &nbsp; My Dashboard
          </h2>
          <Link
            to="/account/"
            className={
              location.pathname === "/account/" ? "account-section-active" : ""
            }
          >
            <FontAwesomeIcon icon={faUser} />
            Profile
          </Link>
          <Link
            to="/account/cart"
            className={
              location.pathname === "/account/cart"
                ? "account-section-active"
                : ""
            }
          >
            <FontAwesomeIcon icon={faCartShopping} />
            Cart
          </Link>
          <Link
            to="/account/listeditems"
            className={
              location.pathname === "/account/listeditems"
                ? "account-section-active"
                : ""
            }
          >
            <FontAwesomeIcon icon={faList} />
            Listed Items
          </Link>
          <p
            onClick={() => {
              setShowSellOptions((o) => !o);
              setShowBuyOptions(false);
            }}
          >
            <FontAwesomeIcon icon={faMoneyBill} />
            Sell
          </p>
          {showSellOptions && (
            <div className="account-options">
              <Link
                to="/account/sell/orders"
                className={
                  location.pathname === "/account/sell/orders"
                    ? "account-section-active"
                    : ""
                }
              >
                <FontAwesomeIcon icon={faBoxesStacked} />
                Sell Orders
              </Link>
              <Link
                to="/account/sell/delivered"
                className={
                  location.pathname === "/account/sell/delivered"
                    ? "account-section-active"
                    : ""
                }
              >
                <FontAwesomeIcon icon={faTruckFast} />
                Sell Delivered
              </Link>
              <Link
                to="/account/sell/cancels"
                className={
                  location.pathname === "/account/sell/cancels"
                    ? "account-section-active"
                    : ""
                }
              >
                <FontAwesomeIcon icon={faBan} />
                Sell Cancels
              </Link>
              <Link
                to="/account/sell/returns"
                className={
                  location.pathname === "/account/sell/returns"
                    ? "account-section-active"
                    : ""
                }
              >
                <FontAwesomeIcon icon={faCircleLeft} />
                Sell Returns
              </Link>
            </div>
          )}
          <p
            onClick={() => {
              setShowBuyOptions((o) => !o);
              setShowSellOptions(false);
            }}
          >
            <FontAwesomeIcon icon={faCreditCard} />
            Buy
          </p>
          {showBuyOptions && (
            <div className="account-options">
              <Link
                to="/account/buy/orders"
                className={
                  location.pathname === "/account/buy/orders"
                    ? "account-section-active"
                    : ""
                }
              >
                <FontAwesomeIcon icon={faBoxesStacked} />
                Buy Orders
              </Link>
              <Link
                to="/account/buy/delivered"
                className={
                  location.pathname === "/account/buy/delivered"
                    ? "account-section-active"
                    : ""
                }
              >
                <FontAwesomeIcon icon={faTruckFast} />
                Buy Delivered
              </Link>
              <Link
                to="/account/buy/cancels"
                className={
                  location.pathname === "/account/buy/cancels"
                    ? "account-section-active"
                    : ""
                }
              >
                <FontAwesomeIcon icon={faBan} />
                Buy Cancels
              </Link>
              <Link
                to="/account/buy/returns"
                className={
                  location.pathname === "/account/buy/returns"
                    ? "account-section-active"
                    : ""
                }
              >
                <FontAwesomeIcon icon={faCircleLeft} />
                Buy Returns
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="account-page-content">
        <Routes>
          <Route path="/" element={<ProfileDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/listeditems" element={<ListedItems />} />
          <Route path="/sell/orders" element={<SellOrders />} />
          <Route path="/sell/delivered" element={<SellDelivered />} />
          <Route path="/sell/cancels" element={<SellCancels />} />
          <Route path="/sell/returns" element={<SellReturns />} />
          <Route path="/buy/orders" element={<BuyOrders />} />
          <Route path="/buy/delivered" element={<BuyDelivered />} />
          <Route path="/buy/cancels" element={<BuyCancels />} />
          <Route path="/buy/returns" element={<BuyReturns />} />
        </Routes>
      </div>
    </div>
  );
}

export default Account;
