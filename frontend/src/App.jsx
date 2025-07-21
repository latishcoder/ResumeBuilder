import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import UserProvider from "./context/UserContext.jsx";
const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </UserProvider>
  );
};

export default App;
