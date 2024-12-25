// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const loggedUser = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("jwtoken");

//   if (!loggedUser || !token) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;



// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const authToken = localStorage.getItem('jwtoken');

  // If no token, redirect to login page
  if (!authToken) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
