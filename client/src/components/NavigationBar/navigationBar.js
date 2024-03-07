/**
 * NavigationBar component renders a navigation bar with links
 * and logout button. Shows logout message on logout.
 */
// NavigationBar.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./navigationBar.module.css";
import LogoutMessage from "../LogoutMessage/logoutMessage";
import { useAuth } from "../../routes/AuthContext";

function NavigationBar({ cartItems }) {
  const { user, logout, logoutMessage, clearLogoutMessage, isAuthenticated } =
    useAuth();
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);

  // Show the logout message after a certain duration
  useEffect(() => {
    if (logoutMessage) {
      setShowLogoutMessage(true);

      // Clear the logout message after a certain duration
      const timeoutId = setTimeout(() => {
        setShowLogoutMessage(false);
        clearLogoutMessage();
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [logoutMessage, clearLogoutMessage]);

  // Logout
  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <nav className={styles.navbar}>
        <Link to="/" className={styles.logo}></Link>
        <h1 className={styles.header}>LIŠKA Soaps & Candles</h1>
        <ul className={styles.navList}>
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* Render login and sign up links only when not authenticated */}
          {!isAuthenticated && (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Sign up</Link>
              </li>
            </>
          )}
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/orders">Orders</Link>
          </li>
          {user && (
            <>
              <li>
                <Link to="/cart">Cart ({cartItems.length})</Link>
              </li>
              <button className={styles.buttonLogout} onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </ul>
      </nav>
      {showLogoutMessage && <LogoutMessage message={logoutMessage} />}
    </div>
  );
}

export default NavigationBar;
