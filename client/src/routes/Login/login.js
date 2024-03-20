/**
 * Login component.
 *
 * Renders a login form with username and password fields.
 * Validates input using react-hook-form.
 * On submit, calls login API and handles response.
 * If login succeeds, redirects to /products route.
 */
// login.js
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import LoginMessage from "../../components/LoginMessage/loginMessage";
import styles from "./login.module.css";

function Login() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [loginSuccess, setLoginSuccess] = React.useState(false);
  const navigate = useNavigate();

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
        const responseData = await response.json();

        if (responseData.Customer_id) {
          login(responseData);
          setLoginSuccess(true);
          setTimeout(() => {
            navigate("/products");
          }, 2000);
        } else {
          console.error("Login API Error: Customer_id missing in response.");
          setError("username", {
            type: "manual",
            message: "Login failed. Please try again.",
          });
        }
      } else {
        const errorData = await response.json();
        console.error("Login API Error:", errorData);
        setError("username", {
          type: "manual",
          message: errorData.message || "Login failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("username", {
        type: "manual",
        message: "Login failed. Please try again.",
      });
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

          {loginSuccess && <LoginMessage message="Login successful. Welcome!" />}

          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;