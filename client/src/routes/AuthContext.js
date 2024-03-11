/**
 * AuthContext provides authentication state and functions via React Context API.
 * Maintains user object, customer ID, and login/logout functions in context.
 * Also provides access to Stripe publishable key for StripeProvider.
 */
// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { StripeProvider } from "./StripeContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [logoutMessage, setLogoutMessage] = useState(null);
  const [stripeKey, setStripeKey] = useState(null);

  useEffect(() => {
    const publishableKey = process.env.REACT_APP_STRIPE_SECRET_KEY;
    setStripeKey(publishableKey);
  }, []);

  const login = (user) => {
    // Update to expect user object
    setUser(user);

    // Get Customer_id from user object
    setCustomerId(user.Customer_id);

    localStorage.setItem("user", JSON.stringify(user));

    // Store user object in localStorage
    localStorage.setItem("customerId", user.Customer_id);

    setLogoutMessage("Login successful. Welcome!");
  };

  // Get user
  const getUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = localStorage.getItem("userId"); // This should be "customerId" instead of "userId"
    console.log(localStorage.getItem("user"));
    console.log(localStorage.getItem("userId"));
    if (userId) {
      return user;
    }
    return null;
  };

  const getCustomerId = () => localStorage.getItem("customerId");

  // Logout
  const logout = () => {
    setUser(null);
    setLogoutMessage("Logout successful. Goodbye!");
  };

  // Logout message
  const clearLogoutMessage = () => {
    setLogoutMessage(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        customerId,
        getCustomerId,
        getUser,
        login,
        logout,
        logoutMessage,
        clearLogoutMessage,
        isAuthenticated: !!user,
        stripeKey, // Add stripeKey to the context
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
