import React from 'react';
import { createRoot } from 'react-dom/client';
import { Elements } from 'react-stripe-elements';
import App from './components/App';
import { AuthProvider } from './routes/AuthContext';
import './index.css';

const root = document.getElementById('root');
const reactRoot = createRoot(root);

const stripeKey = process.env.REACT_APP_STRIPE_SECRET_KEY;

reactRoot.render(
  <React.StrictMode>
    <AuthProvider stripeKey={stripeKey}>
      <Elements>
        <App />
      </Elements>
    </AuthProvider>
  </React.StrictMode>
);
