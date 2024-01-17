import React from 'react';
import { createRoot } from 'react-dom/client';
import { Elements } from 'react-stripe-elements';
import App from './components/App';
import { AuthProvider } from './routes/AuthContext';
import './index.css';

const root = document.getElementById('root');
const reactRoot = createRoot(root);

const stripeKey = 'pk_test_51OSinJAdtQPayGzAJ4J6nek6Fh9i4iUFrkDRRw0J9OonrY2dhAr6yBcE3WR2XnVEudZ2myYnBjSSjHbomQ55M8QS00EYO911Dl'; 

reactRoot.render(
  <React.StrictMode>
    <AuthProvider stripeKey={stripeKey}>
      <Elements>
        <App />
      </Elements>
    </AuthProvider>
  </React.StrictMode>
);
