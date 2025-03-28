import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login route */}
        <Route path="/" element={<Login />} />
        
        {/* Home route */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
