// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../routes/AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useAuth();
    if (!user) {
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render the protected component
  return element;
};

export default PrivateRoute;
