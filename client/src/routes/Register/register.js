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
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null); // State to hold the error message

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
  
      if (response.ok) {
        const data = await response.json();
        login(data); 
        console.log("Registration successful!");
        navigate("/products");
      } else {
        const errorResponse = await response.json();
        setError(errorResponse.error); // Set the error message in state
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed. Please try again."); // Set a generic error message
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

            {error && <div className={styles.error}>{error}</div>} {/* Display error message */}
            
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
