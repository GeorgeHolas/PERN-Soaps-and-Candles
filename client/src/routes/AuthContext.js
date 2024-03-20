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
    setUser(user);
    setCustomerId(user.Customer_id);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("customerId", user.Customer_id);
    setLogoutMessage("Login successful. Welcome!");
  };

  const getUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const customerId = localStorage.getItem("customerId"); 
    if (customerId) {
      return user;
    }
    return null;
  };

  const getCustomerId = () => localStorage.getItem("customerId");

  const logout = () => {
    setUser(null);
    setLogoutMessage("Logout successful. Goodbye!");
  };

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
