import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
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

function Account() {
  const { user, getUser, products, filterListedItems, filterCart } =
    useContext(AppContext);

  useEffect(() => {
    if (!user) {
      getUser();
    }
    filterListedItems();
    filterCart();
  }, [user, products]);

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Link to="/account/">Profile</Link> <Link to="/account/cart">Cart</Link>{" "}
      <Link to="/account/listeditems">Listed Items</Link>{" "}
      <Link to="/account/sell/orders">Sell Orders</Link>{" "}
      <Link to="/account/sell/delivered">Sell Delivered</Link>{" "}
      <Link to="/account/sell/cancels">Sell Cancels</Link>{" "}
      <Link to="/account/sell/returns">Sell Returns</Link>{" "}
      <Link to="/account/buy/orders">Buy Orders</Link>{" "}
      <Link to="/account/buy/delivered">Buy Delivered</Link>{" "}
      <Link to="/account/buy/cancels">Buy Cancels</Link>{" "}
      <Link to="/account/buy/returns">Buy Returns</Link>{" "}
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
  );
}

export default Account;
