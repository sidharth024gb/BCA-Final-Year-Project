import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { AppProvider } from "./Context/AppContext";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";


function App() {
  return (
    <div>
      <BrowserRouter>
        <AppProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
