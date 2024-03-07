/**
 * PaymentMessage component displays a message related to a payment.
 * It takes in a message prop and displays it within a styled div.
 */
// PaymentMessage.js
import React from "react";
import styles from "./paymentMessage.module.css";

// PaymentMessage component
const PaymentMessage = ({ message }) => {
  return (
    <div className={styles.paymentMessageContainer}>
      <div className={styles.paymentMessage}>{message}</div>
    </div>
  );
};

export default PaymentMessage;
