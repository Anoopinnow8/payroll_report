import React, { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "../page/Home";
import Login from "../page/Login";
import PageNotFound from "../page/PageNotFound";


const RouteContainer = () => {
  const isUserLoggedIn = localStorage.getItem('access_token');
  //const isUserLoggedIn = false;

  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLoggedIn && (window.location.pathname === "/login" )) {
      navigate("/home");
    }
    if (!isUserLoggedIn) {
      navigate("/login");
    }
  }, [isUserLoggedIn, navigate]);

  return (
    <>
      <Routes>
      
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/*" element={  <PageNotFound />} />

        
      </Routes>
    </>
  );
};

export default RouteContainer;
