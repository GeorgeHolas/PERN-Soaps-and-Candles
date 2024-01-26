// NavigationBar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './navigationBar.module.css';
import LogoutMessage from '../LogoutMessage/logoutMessage';
import { useAuth } from '../../routes/AuthContext';

// Logout message function and clear up of cart
function NavigationBar({ cartItems }) {
  const { user, logout, logoutMessage, clearLogoutMessage } = useAuth();
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);

  useEffect(() => {
    if (logoutMessage) {
      setShowLogoutMessage(true);

      // Clear the logout message after a certain duration
      const timeoutId = setTimeout(() => {
        setShowLogoutMessage(false);
        clearLogoutMessage();
      }, 3000); 

      return () => clearTimeout(timeoutId);
    }
  }, [logoutMessage, clearLogoutMessage]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.logo}></Link>
        <h1 className={styles.header}>LIŠKA Soaps & Candles</h1>
        <ul className={styles.navList}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Sign up</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/orders">Orders</Link></li>
          {user && (
              <><li><Link to="/cart">Cart ({cartItems.length})</Link></li><button className={styles.buttonLogout} onClick={handleLogout}>Logout</button></>
          )}
        </ul>
      </nav>

      {showLogoutMessage && (
        <LogoutMessage message={logoutMessage} />
      )}
    </div>
  );
}

export default NavigationBar;
