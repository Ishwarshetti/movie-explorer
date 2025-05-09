// Wrapper for protecting routes that require authentication
// If not logged in, redirects user to the login page

import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("auth-token");
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
