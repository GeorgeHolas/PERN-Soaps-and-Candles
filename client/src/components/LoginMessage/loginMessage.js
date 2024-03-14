// LoginMessage.js
import React from "react";
import styles from "./loginMessage.module.css";

// LoginMessage component
const LoginMessage = ({ message }) => {
  return (
    <div className={styles.loginMessageContainer}>
      <div className={styles.loginMessage}>{message}</div>
    </div>
  );
};

export default LoginMessage;
