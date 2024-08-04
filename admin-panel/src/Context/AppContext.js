import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("adminToken") || ""
  );
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [placedOrders, setPlacedOrders] = useState([]);
  const [delivered, setDelivered] = useState([]);
  const [returns, setReturns] = useState([]);
  const [cancels, setCancels] = useState([]);

  useEffect(() => {
    if (authToken) {
      fetchOrdersDetails();
    }
  }, [authToken]);

  async function fetchOrdersDetails() {
    await axios
      .get("http://localhost:8000/admin/orders/details")
      .then((res) => {
        if (res.data.success) {
          setPlacedOrders(res.data.placedOrders);
          setDelivered(res.data.delivered);
          setReturns(res.data.returns);
          setCancels(res.data.cancels);
        } else {
          alert(res.data.message);
        }
      });
  }

  async function adminLogin(e) {
    e.preventDefault();
    await axios
      .post("http://localhost:8000/admin/login", loginForm)
      .then(async (res) => {
        if (res.data.success) {
          localStorage.setItem("adminToken", res.data.token);
          setAuthToken(res.data.token);
          alert(res.data.message);
          fetchOrdersDetails();
          navigate("/dashboard");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function logout() {
    localStorage.removeItem("adminToken");
    setAuthToken("");
    navigate("/");
  }

  return (
    <AppContext.Provider
      value={{
        authToken,
        setLoginForm,
        adminLogin,
        placedOrders,
        delivered,
        returns,
        cancels,
        fetchOrdersDetails,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
