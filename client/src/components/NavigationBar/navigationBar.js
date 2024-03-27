/**
 * NavigationBar component renders a responsive navigation bar
 * with branding, navigation links, and authenticated user controls.
 *
 * Uses React hooks for state management and AuthContext for auth state.
 * Conditionally shows login/register links when unauthenticated,
 * and logout button + cart link when authenticated.
 *
 * Displays temporary logout messages on logout.
 */
// NavigationBar.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./navigationBar.module.css";
import LogoutMessage from "../LogoutMessage/logoutMessage";
import { useAuth } from "../../routes/AuthContext";

function NavigationBar({ cartItems }) {
  const {
    user,
    username,
    logout,
    logoutMessage,
    clearLogoutMessage,
    isAuthenticated,
  } = useAuth();
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);

  useEffect(() => {
    if (logoutMessage) {
      setShowLogoutMessage(true);

      const timeoutId = setTimeout(() => {
        setShowLogoutMessage(false);
        clearLogoutMessage();
      }, 1000);

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
          <li>
            <Link to="/">Home</Link>
          </li>
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
            <Link to="/orders">My orders</Link>
          </li>
          {user && isAuthenticated && (
            <>
              <li>
                <Link to="/cart">Cart ({cartItems.length})</Link>
              </li>
              {username && (
                <>
                  <span className={styles.welcome}>Welcome,</span>
                  <span className={styles.username}> {username}</span>
                </>
              )}
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
