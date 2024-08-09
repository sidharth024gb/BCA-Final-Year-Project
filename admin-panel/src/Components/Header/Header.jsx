import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import logo from "../../Assets/trading.png";
import "./Header.css";

function Header() {
  const { logout } = useContext(AppContext);
  return (
    <div className="panel-header flex-between">
      <div className="header-title flex-center">
        <img src={logo} alt="logo" className="website-logo" />
        <h2>
          <span className="accent-1">Trade</span>Connect
        </h2>
      </div>
      <div className="panel-nav accent-1 flex-center gap-20">
        <Link to="/dashboard/">Orders</Link>
        <Link to="/dashboard/delivered">Delivered</Link>
        <Link to="/dashboard/cancels">Cancels</Link>
        <Link to="/dashboard/returns">Returns</Link>
      </div>
      <button className="btn-accent-1" onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
}

export default Header;
