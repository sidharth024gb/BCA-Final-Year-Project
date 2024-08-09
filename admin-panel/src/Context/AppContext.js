import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

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
  const [showAlertBox, setShowAlertBox] = useState(false);
  const profileImageAccessUrl = "http://localhost:8000/profileImages/";
  const itemImageAccessUrl = "http://localhost:8000/itemImages/";
  const location = useLocation();

  useEffect(() => {
    if (authToken) {
      fetchOrdersDetails();
    }
  }, [authToken]);

  useEffect(() => {
    window.scrollTo(0, 0);
  },[location.pathname])

  function alertBox(message) {
    setShowAlertBox(true);
    document.getElementById("alert-message").textContent = message;
  }

  useEffect(() => {
    if (showAlertBox) {
      document.getElementById("alert-blur").style.filter = "blur(5px)";
    }
    if (!showAlertBox) {
      document.getElementById("alert-blur").style.filter = "";
    }
  }, [showAlertBox]);

  function calculate_Discount(price, discount) {
    return parseInt(price - price * (discount / 100));
  }

  function capitalizeFirstLetter(string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function timestampToDate(timestamp, time) {
    const date = new Date(timestamp);
    let options;
    if (time) {
      options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      };
    } else {
      options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
    }

    return date.toLocaleString("en-GB", options);
  }

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
          alertBox(res.data.message);
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
          alertBox(res.data.message);
          fetchOrdersDetails();
          navigate("/dashboard");
        } else {
          alertBox(res.data.message);
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
    setPlacedOrders([]);
    setDelivered([]);
    setReturns([]);
    setCancels([]);
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
        showAlertBox,
        setShowAlertBox,
        profileImageAccessUrl,
        itemImageAccessUrl,
        calculate_Discount,
        capitalizeFirstLetter,
        timestampToDate
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
