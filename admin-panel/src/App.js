import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./Context/AppContext";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import AlertBox from "./Components/AlertBox/AlertBox";

function App() {
  return (
    <div>
        <BrowserRouter>
          <AppProvider>
          <AlertBox />
          <div id="alert-blur">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
          </Routes>
          </div>
          </AppProvider>
        </BrowserRouter>
      
    </div>
  );
}

export default App;
