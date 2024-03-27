/**
 * AuthContext provides authentication state and functions via React Context API.
 * Includes user object, customer ID, username, login/logout functions,
 * and Stripe integration.
 */
// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { StripeProvider } from "./StripeContext";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [customerId, setCustomerId] = useState(null);
  const [username, setUsername] = useState("");
  const [logoutMessage, setLogoutMessage] = useState(null);
  const [stripeKey, setStripeKey] = useState(null);

  // Stripe key
  useEffect(() => {
    const publishableKey = process.env.REACT_APP_STRIPE_SECRET_KEY;
    setStripeKey(publishableKey);
  }, []);

  // Check for user in local storage on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedCustomerId = localStorage.getItem("customerId");
    const storedUsername = localStorage.getItem("username");

    const localUser =
      storedUser && storedCustomerId && storedUsername
        ? {
            user: storedUser,
            customerId: storedCustomerId,
            username: storedUsername,
          }
        : { user: null, customerId: null, username: "" };

    setUser(localUser.user);
    setCustomerId(localUser.customerId);
    setUsername(localUser.username);
  }, []);

  // Login function
  const login = (userData) => {
    const { Customer_id, username } = userData;

    setUser(userData);
    setCustomerId(Customer_id);
    setUsername(username || "");
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("customerId", Customer_id);
    localStorage.setItem("username", username || "");
    setLogoutMessage("Login successful. Welcome!");
  };

  // Get user from local storage
  const getUser = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedCustomerId = localStorage.getItem("customerId");

    if (storedUser && storedCustomerId) {
      return storedUser;
    }
    return null;
  };

  // Get customer id and username from local storage
  const getCustomerId = () => localStorage.getItem("customerId");
  const getUsername = () => localStorage.getItem("username");

  // Logout function
  const logout = () => {
    setUser(null);
    setCustomerId(null);
    setUsername("");
    localStorage.removeItem("user");
    localStorage.removeItem("customerId");
    localStorage.removeItem("username");
    sessionStorage.clear();
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
        getUsername,
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
