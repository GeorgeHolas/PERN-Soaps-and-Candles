// AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { StripeProvider } from "react-stripe-elements";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [logoutMessage, setLogoutMessage] = useState(null);
  const [stripeKey, setStripeKey] = useState(null);

  useEffect(() => {
    const publishableKey = process.env.REACT_APP_STRIPE_SECRET_KEY;
    setStripeKey(publishableKey);
  }, []);


  // Login
  const login = (user) => {
    console.log("Logging in"); 
    setUser(user); 
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userId", user.id);
  }

  // Get user
  const getUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = localStorage.getItem("userId");
    console.log(localStorage.getItem("user"));
    console.log(localStorage.getItem("userId"));
    if (userId) {
      return user; 
    }
    return null;
  }
  
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
        getUser,
        login,
        logout,
        logoutMessage,
        clearLogoutMessage,
        isAuthenticated: !!user,
      }}
    >
      {stripeKey && (
        <StripeProvider apiKey={stripeKey}>{children}</StripeProvider>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
