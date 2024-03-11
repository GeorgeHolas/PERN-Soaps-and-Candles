// StripeContext.js
import React, { createContext, useContext } from 'react';

const StripeContext = createContext();

export const useStripe = () => {
  return useContext(StripeContext);
};

export const StripeProvider = ({ stripeKey, children }) => {
  return <StripeContext.Provider value={{ stripeKey }}>{children}</StripeContext.Provider>;
};