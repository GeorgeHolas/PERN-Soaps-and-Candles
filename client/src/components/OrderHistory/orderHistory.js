// OrderHistory.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import styles from './orderHistory.module.css';

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const navigate = useNavigate();  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('User not authenticated');
      return;
    }

    fetch('http://localhost:4000/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => setOrderHistory(data))
      .catch(error => console.error('Error fetching order history', error));
  }, []);

  const handleReturnHome = () => {
    navigate('/');  // Navigate to the home page
  };

  return (
    <div className={styles.orderContainer}> 
    <div className={styles.container}>
      <h2>Order History</h2>
      {orderHistory.map(order => (
        <div key={order.Order_id} className={styles.order}>
          <p><span>Order ID: </span> {order.Order_id}</p>
          <p><span>Total: </span> {order.Total}</p>
          <p><span>Day of purchase: </span> {order.Created}</p>
          <p><span>Status: </span> {order.Status}</p>
        </div>
      ))}
      <button onClick={handleReturnHome} className={styles.returnButton}>
        Return to Home
      </button>
    </div>
   </div>
  );
};

export default OrderHistory;
