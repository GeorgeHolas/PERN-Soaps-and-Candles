import React from 'react';
import { Link } from 'react-router-dom';
import'./navigationBar.css';

function NavigationBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo"></Link>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </nav>
  );
}

export default NavigationBar;