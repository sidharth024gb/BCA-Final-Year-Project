import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Orders from "../Orders/Orders";
import Delivered from "../Delivered/Delivered";
import Returns from "../Returns/Returns";
import Cancels from "../Cancels/Cancels";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">
      <Header />
      <div className="app-body dashboard-pages-container">
        <Routes>
          <Route path="/" element={<Orders />} />
          <Route path="/delivered" element={<Delivered />} />
          <Route path="/cancels" element={<Cancels />} />
          <Route path="/returns" element={<Returns />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
