/**
 * PrivateRoute component that checks if user is authenticated
 * and redirects to login if not. If authenticated, renders
 * the protected component. Uses AuthContext to check
 * authentication status.
 */
// PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../routes/AuthContext";

// PrivateRoute component
const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render the protected component
  return element;
};

export default PrivateRoute;
