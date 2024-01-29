// Login.js
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";

// Login function
function Login() {
const { login } = useAuth();
const {
  register,
  handleSubmit,
  setError,
  formState: { errors },
} = useForm();
const navigate = useNavigate();

// Login function
const onSubmit = async (data) => {
  try {
    const response = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      // Login successful, log in the user
      login(data);
      navigate("/products");
    } else {
      const errorData = await response.json();
      // Handle login errors
      setError("username", { type: "manual", message: errorData.message });
    }
  } catch (error) {
    console.error("Login error:", error);
  }
};

return (
  <div className={styles["login-body"]}>
    <div className={styles["login-container"]}>
      <form
        className={styles["login-form"]}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className={styles.label}>
          Username:
          <input
            {...register("username", { required: "Username is required" })}
            className={styles.input}
            autoComplete="username"
          />
          {errors.username && <span>{errors.username.message}</span>}
        </label>

        <label className={styles.label}>
          Password:
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            className={styles.input}
            autoComplete="current-password"
          />
          {errors.password && <span>{errors.password.message}</span>}
        </label>

        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </div>
  </div>
);
}

export default Login;
