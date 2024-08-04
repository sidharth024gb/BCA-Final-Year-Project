import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { Outlet, useNavigate } from "react-router-dom";

function ProtectedRoute({ component: Component, ...rest }) {
  const { authToken } = useContext(AppContext);
  const navigate = useNavigate();
  const hasAlerted = useRef(false);

  useEffect(() => {
    if (!authToken && !hasAlerted.current) {
      alert("Please Login or Sign up to access the page");
      hasAlerted.current = true;
      navigate(-1);
    }
  }, [authToken, navigate]);

  return authToken ? <Outlet /> : null;
}

export default ProtectedRoute;
