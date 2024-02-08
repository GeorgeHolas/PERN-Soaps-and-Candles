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
