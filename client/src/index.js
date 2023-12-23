import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { AuthProvider } from './routes/AuthContext';
import './index.css';

const root = document.getElementById('root');
const reactRoot = createRoot(root);

reactRoot.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);