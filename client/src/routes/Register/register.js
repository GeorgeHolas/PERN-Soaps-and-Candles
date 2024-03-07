/**
 * Register component handles user registration.
 *
 * Uses Formik for form validation and submission.
 * Handles registration request to backend and redirects to login on success.
 * Displays error messages on failure.
 */
// register.js
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../AuthContext";
import styles from "./register.module.css";
import { useNavigate } from "react-router-dom";

//Validation
const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

// Register function
function Registration() {
  useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const onSubmit = async (values) => {
    try {
      console.log("Form values:", values);
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Registration successful!");
        setError(null);
        setRegistrationSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className={styles["register-body"]}>
      <div className={styles["register-container"]}>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className={styles["register-form"]}>
            <label className={styles.label} htmlFor="username">
              Username:
            </label>
            <Field
              type="text"
              id="username"
              name="username"
              autoComplete="username"
              className={styles.input}
            />
            <ErrorMessage name="username" component="span" />

            <label className={styles.label} htmlFor="password">
              Password:
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              className={styles.input}
            />
            <ErrorMessage name="password" component="span" />

            {error && <div className={styles.error}>{error}</div>}

            {registrationSuccess && (
              <div className={styles.success}>Registration successful!</div>
            )}

            <button type="submit" className={styles.button}>
              Register
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Registration;
