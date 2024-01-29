// LogoutMessage.js
import React from "react";
import styles from "./logoutMessage.module.css";

// LogoutMessage component
const LogoutMessage = ({ message }) => {
  return (
    <div className={styles.logoutMessageContainer}>
      <div className={styles.logoutMessage}>{message}</div>
    </div>
  );
};

export default LogoutMessage;
