/**
 * Fetches order history for authenticated user and displays in UI.
 * Uses AuthContext hook for auth.
 * Fetches orders from API based on customer ID.
 * Displays order details and provides button to return to home page.
 */
// orderHistory.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./orderHistory.module.css";
import { useAuth } from "../../routes/AuthContext";

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const { getCustomerId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("User not authenticated");
      return;
    }

    const customerId = getCustomerId();
    fetch(`http://localhost:4000/orders?customerId=${customerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setOrderHistory(data))
      .catch((error) => console.error("Error fetching order history", error));
  }, [getCustomerId]);

  const handleReturnHome = () => {
    navigate("/");
  };

  return (
    <div className={styles.orderContainer}>
      <div className={styles.container}>
        <h2>Order History</h2>
        {orderHistory.map((order) => (
          <div key={order.Order_id} className={styles.order}>
            <p>
              <span>Order ID: </span> {order.Order_id}
            </p>
            <p>
              <span>Total: </span> {order.Total}
            </p>
            <p>
              <span>Day of purchase: </span> {order.Created}
            </p>
            <p>
              <span>Status: </span> {order.Status}
            </p>
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
