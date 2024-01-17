// NavigationBar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './navigationBar.module.css';
import LogoutMessage from '../LogoutMessage/logoutMessage';
import { useAuth } from '../../routes/AuthContext';

function NavigationBar({ cartItems }) {
  const { logout, logoutMessage, clearLogoutMessage } = useAuth();
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);

  useEffect(() => {
    if (logoutMessage) {
      setShowLogoutMessage(true);

      // Clear the logout message after a certain duration
      const timeoutId = setTimeout(() => {
        setShowLogoutMessage(false);
        clearLogoutMessage();
      }, 5000); // Display the message for 5 seconds

      return () => clearTimeout(timeoutId);
    }
  }, [logoutMessage, clearLogoutMessage]);

  const handleLogout = () => {
    logout();
  };

  return (
    <React.Fragment>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.logo}></Link>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Sign up</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/orders">Orders</Link></li>
          <li><Link to="/cart">Cart ({cartItems.length})</Link></li>
        </ul>
        <button onClick={handleLogout}>Logout</button>
      </nav>

      {showLogoutMessage && (
        <LogoutMessage message={logoutMessage} />
      )}
    </React.Fragment>
  );
}

export default NavigationBar;