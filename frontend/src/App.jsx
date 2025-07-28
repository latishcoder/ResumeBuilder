import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import UserProvider  from "./context/UserProvider.jsx";
import DashBoard from "./pages/DashBoard.jsx";
const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </UserProvider>
  );
};

export default App;
