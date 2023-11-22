import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const IsLoggedIn = () => {
  const location = useLocation();
  const redirectPath = location.state?.path || "/";
  const { user } = useAuth();
  if (user) {
    return <Navigate to={redirectPath} state={{ path: location.pathname }} />;
  } else {
    return <Outlet />;
  }
};

export default IsLoggedIn;
