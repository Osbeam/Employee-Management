import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("jwtoken");

  if (!loggedUser || !token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

