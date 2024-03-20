/**
 * AuthContext provides authentication state and functions via React Context API.
 * Includes user info, login/logout functions, messages, and Stripe integration.
 */
import React, { createContext, useContext, useState, useEffect } from "react";
import { StripeProvider } from "./StripeContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [username, setUsername] = useState(null); 
  const [logoutMessage, setLogoutMessage] = useState(null);
  const [stripeKey, setStripeKey] = useState(null);

  // Stripe key
  useEffect(() => {
    const publishableKey = process.env.REACT_APP_STRIPE_SECRET_KEY;
    setStripeKey(publishableKey);
  }, []);
  
  // Login function
  const login = (user) => {
    setUser(user);
    setCustomerId(user.Customer_id);
    setUsername(user.username); 
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("customerId", user.Customer_id);
    setLogoutMessage("Login successful. Welcome!");
  };
  
  // Get user from local storage
  const getUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const customerId = localStorage.getItem("customerId");
    if (customerId) {
      return user;
    }
    return null;
  };
  
  // Get customer id from local storage
  const getCustomerId = () => localStorage.getItem("customerId");
  
  // Logout function
  const logout = () => {
    setUser(null);
    setUsername(null); 
    setLogoutMessage("Logout successful. Goodbye!");
  };
  
  // Clear logout message
  const clearLogoutMessage = () => {
    setLogoutMessage(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        customerId,
        username, 
        getCustomerId,
        getUser,
        login,
        logout,
        logoutMessage,
        clearLogoutMessage,
        isAuthenticated: !!user,
        stripeKey,
      }}
    >
      {stripeKey && (
        <StripeProvider stripeKey={stripeKey}>{children}</StripeProvider>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
