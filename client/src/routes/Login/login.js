import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../AuthContext'; 
import './login.css'; 

function Login() {
  const { login } = useAuth();
  const { register, handleSubmit, setError, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    // Call your login endpoint here
    try {
      const response = await fetch('/api/login', {
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
      } else {
        const errorData = await response.json();
        // Handle login errors
        setError('username', { type: 'manual', message: errorData.message });
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };
   
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Username:
          <input {...register('username', { required: 'Username is required' })} />
          {errors.username && <span>{errors.username.message}</span>}
        </label>

        <label>
          Password:
          <input {...register('password', { required: 'Password is required' })} type="password" />
          {errors.password && <span>{errors.password.message}</span>}
        </label>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;