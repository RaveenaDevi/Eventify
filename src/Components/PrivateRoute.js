import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const authToken = useSelector((state) => state.Auth.token);
  return authToken ? children : <Navigate to="/" />;
};

export default PrivateRoute;
