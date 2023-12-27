import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navigationBar.module.css';

function NavigationBar({ cartItems }) {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}></Link>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/Products">Products</Link></li>
        <li><Link to="/cart">Cart ({cartItems.length})</Link></li>
      </ul>
    </nav>
  );
}

export default NavigationBar;