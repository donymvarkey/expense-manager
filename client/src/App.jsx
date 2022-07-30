import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import DetailedReport from "./pages/DetailedReport";

const App = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Home currentUser={currentUser} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/report" element={<DetailedReport />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
