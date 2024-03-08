/**
 * Renders the React application.
 *
 * Imports React with Suspense for lazy loading.
 * Provides AuthProvider and StripeProvider contexts.
 * Renders App component wrapped in Suspense fallback.
 * Renders to DOM root element.
 */
// index.js
import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./routes/AuthContext";
import StripeProvider from "./routes/StripeProvider";
import "./index.css";

const App = React.lazy(() => import("./components/App"));

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const stripeKey = process.env.REACT_APP_STRIPE_KEY;

root.render(
  <React.StrictMode>
    <AuthProvider>
      <StripeProvider stripeKey={stripeKey}>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </StripeProvider>
    </AuthProvider>
  </React.StrictMode>
);
