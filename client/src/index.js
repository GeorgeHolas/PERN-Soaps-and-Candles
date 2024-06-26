/**
 * Imports and configures React DOM and React Suspense.
 * Wraps app in context providers for authentication and Stripe.
 * Renders Suspense boundary and App component in React root.
 */
// index.js
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "./routes/AuthContext";
import { StripeProvider } from "./routes/StripeContext"; 
import "./index.css";

const App = React.lazy(() => import("./components/App"));

const rootElement = document.getElementById("root");

const stripeKey = process.env.REACT_APP_STRIPE_KEY;

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <StripeProvider stripeKey={stripeKey}>
        {/* Pass stripeKey */}
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </StripeProvider>
    </AuthProvider>
  </React.StrictMode>,
  rootElement
);
