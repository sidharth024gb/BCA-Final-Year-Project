import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

function Header() {
  const { logout } = useContext(AppContext);
  return (
    <div>
      <Link to="/dashboard/">Orders</Link>{" "}
      <Link to="/dashboard/delivered">Delivered</Link>{" "}
      <Link to="/dashboard/returns">Returns</Link>{" "}
      <Link to="/dashboard/cancels">Cancels</Link>{" "}
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}

export default Header;
