import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../AuthContext';
import styles from './register.module.css';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
});

function Registration() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    // Call your registration endpoint here
    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // Registration successful, log in the user
        login(values);
        console.log('Registration successful!');
        navigate('/login');
      } else {
        const errorData = await response.json();
        // Handle registration errors
        console.error('Registration error:', errorData.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
<div className={styles['register-body']}>
      <div className={styles['register-container']}>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className={styles['register-form']}>
            <label className={styles.label} htmlFor="username">
              Username:
            </label>
            <Field type="text" id="username" name="username" className={styles.input} />
            <ErrorMessage name="username" component="span" />

            <label className={styles.label} htmlFor="password">
              Password:
            </label>
            <Field type="password" id="password" name="password" className={styles.input} />
            <ErrorMessage name="password" component="span" />

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
