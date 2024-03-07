/**
 * Renders the React app into the DOM.
 * - Imports React and other dependencies.
 * - Gets reference to root DOM element.
 * - Gets Stripe API key from env var.
 * - Wraps app in context providers.
 * - Renders app wrapped in context providers into root element.
 */
// index.js
import React from "react";
import { createRoot } from "react-dom/client";
import { Elements } from "react-stripe-elements";
import App from "./components/App";
import { AuthProvider } from "./routes/AuthContext";
import "./index.css";

// Create a root element that will be rendered
const root = document.getElementById("root");
const reactRoot = createRoot(root);

// Stripe test key
const stripeKey = process.env.REACT_APP_STRIPE_SECRET_KEY;

// Render the app
reactRoot.render(
  <React.StrictMode>
    <AuthProvider stripeKey={stripeKey}>
      <Elements>
        <App />
      </Elements>
    </AuthProvider>
  </React.StrictMode>
);
