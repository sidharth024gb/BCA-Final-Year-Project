import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Orders from "../Orders/Orders";
import Delivered from "../Delivered/Delivered";
import Returns from "../Returns/Returns";
import Cancels from "../Cancels/Cancels";

function Dashboard() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Orders />} />
        <Route path="/delivered" element={<Delivered />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/cancels" element={<Cancels />} />
      </Routes>
    </div>
  );
}

export default Dashboard;
