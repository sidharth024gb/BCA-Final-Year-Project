import React, { useContext } from "react";
import "./Header.css";
import { AppContext } from "../../Context/AppContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faList,
} from "@fortawesome/free-solid-svg-icons";

function Header() {
  const {
    authToken,
    changeSearchVisiblity,
    searchVisible,
    setSearchTerm,
    navigate,
  } = useContext(AppContext);

  return (
    <header>
      <h2 className="head-all head-start" onClick={()=>navigate("/")}>
        <span>Origin</span>Trade
      </h2>
      {searchVisible && (
        <div className="search-bar">
          <input
            type="search"
            name="searchBar"
            id="searchBar"
            placeholder="Search here..."
            onChange={(e) => {
              setSearchTerm(e.target.value);
              navigate("/products", { state: "Search" });
            }}
          />
          <button
            className="search-close"
            onClick={() => changeSearchVisiblity()}
          >
            ❌
          </button>
        </div>
      )}
      <div className="nav head-all">
        <Link to="/">Home</Link>
        <div className="dropdown-menu">
          <span>Categories</span>
          <div className="drop">
            <Link to="/products" state="Electronics" className="dropdown">
              Electronics
            </Link>
            <Link to="/products" state="Fashion" className="dropdown">
              Fashion
            </Link>
            <Link to="/products" state="Home_And_Garden" className="dropdown">
              Home&nbsp;&&nbsp;Garden
            </Link>
            <Link
              to="/products"
              state="Sports_And_Outdoors"
              className="dropdown"
            >
              Sports&nbsp;&&nbsp;Outdoors
            </Link>
            <Link to="/products" state="Toys_And_Hobbies" className="dropdown">
              Toys&nbsp;&&nbsp;Hobbies
            </Link>
            <Link to="/products" state="Stationery" className="dropdown">
              Stationery
            </Link>
          </div>
        </div>
        <span className="search" onClick={changeSearchVisiblity}>
          Search
        </span>
      </div>
      <div className="nav head-all head-end">
        {authToken ? (
          <div className="login-nav">
            <FontAwesomeIcon
              className="login-nav-icon"
              icon={faList}
              onClick={() => navigate("/account/listeditems")}
            />
            <FontAwesomeIcon
              className="login-nav-icon"
              icon={faShoppingCart}
              onClick={() => navigate("/account/cart")}
            />
            <Link to="/account">My Account</Link>
          </div>
        ) : (
          <Link to="/form">Login / Signup</Link>
        )}
      </div>
    </header>
  );
}

export default Header;
