import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import React from "react";
import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import { AppProvider } from "./Context/AppContext.js";
import Form from "./Components/LoginAndSignup/Form.jsx";
import Home from "./Components/Home/Home.jsx";
import Account from "./Components/Account/Account.jsx";
import Products from "./Components/Products/Products.jsx";
import UserPreview from "./Components/UserPreview/UserPreview.jsx";
import Card from "./Components/Card/Card.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";

function AppWrapper() {
  const navigate = useNavigate();
  return (
    <AppProvider navigate={navigate}>
      <Header />
      <Routes>
        <Route path="/form" element={<Form />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/userpreview" element={<UserPreview />} />
        <Route path="/card" element={<Card />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/account/*" element={<Account />} />
        </Route>
      </Routes>
      <Footer />
    </AppProvider>
  );
}
function App() {
  return (
    <div>
      <BrowserRouter>
        <AppWrapper />
      </BrowserRouter>
    </div>
  );
}

export default App;
