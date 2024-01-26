// AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { StripeProvider } from 'react-stripe-elements';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [logoutMessage, setLogoutMessage] = useState(null);
  const [stripeKey, setStripeKey] = useState(null);

  useEffect(() => {
    const publishableKey = process.env.REACT_APP_STRIPE_SECRET_KEY;

    setStripeKey(publishableKey);
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setLogoutMessage('Logout successful. Goodbye!');
  };

  const clearLogoutMessage = () => {
    setLogoutMessage(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, logoutMessage, clearLogoutMessage, isAuthenticated: !!user }}>
      {stripeKey && <StripeProvider apiKey={stripeKey}>{children}</StripeProvider>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
