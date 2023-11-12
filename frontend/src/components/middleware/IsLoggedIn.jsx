import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const IsLoggedIn = () => {
  const location = useLocation();
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/sign-in" state={{ path: location.pathname }} />;
  }
  return <Outlet />;
};

export default IsLoggedIn;
