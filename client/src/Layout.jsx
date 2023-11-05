import React from "react";
import Header from "./Header";
import Banner from "./assets/Hero-20230113_mealdeliveryhero.jpeg";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  return (
    <div>
      <Header />
      {location.pathname !== "/register" && location.pathname !== "/login" && (
        <img src={Banner} alt="Banner" style={{ width: "100%" }} />
      )}
      <Outlet />
    </div>
  );
};

export default Layout;
