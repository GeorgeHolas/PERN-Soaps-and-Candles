// Login.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import GoogleButton from '../../components/GoogleButton/GoogleButton';

function Login() {
  const { login } = useAuth();
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const navigate = useNavigate();
  
  const onSubmit = async (data) => {
    // Call your login endpoint here
    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Login successful, you may redirect or handle as needed
        console.log('Login successful!');
        login(data); // Assuming login function sets the user in the context
        navigate('/');
      } else {
        const errorData = await response.json();
        // Handle login errors
        setError('username', { type: 'manual', message: errorData.message });
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleGoogleLoginSuccess = (response) => {
    // Handle the successful login response from Google
    console.log('Google login successful:', response);
  };

  const handleGoogleLoginFailure = (error) => {
    // Handle the failed login response from Google
    console.error('Google login failed:', error);
  };

  return (
    <div className={styles['login-body']}>
    <div className={styles['login-container']}> 
      <form className={styles['login-form']} onSubmit={handleSubmit(onSubmit)}> 
        <label className={styles.label}> 
          Username:
          <input {...register('username', { required: 'Username is required' })} className={styles.input} /> 
          {errors.username && <span>{errors.username.message}</span>}
        </label>

        <label className={styles.label}> 
          Password:
          <input {...register('password', { required: 'Password is required' })} type="password" className={styles.input} /> 
          {errors.password && <span>{errors.password.message}</span>}
        </label>
          <GoogleButton onSuccess={handleGoogleLoginSuccess} onFailure={handleGoogleLoginFailure} />
          <button type="submit" className={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
