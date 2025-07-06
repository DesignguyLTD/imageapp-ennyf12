

import React, { useState } from 'react';
import styles from '../App.module.css'; 
import { LoginRequest, LoginSuccessResponse, ApiErrorResponse } from '../types/loginapi'; 
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const API_KEY: string = 'fc3489038c424752bfc2ffd505807b36'; 
const API_BASE_URL: string = 'https://auth-api-lg46.onrender.com/api/auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success' | null; text: string | null }>(
    { type: null, text: null }
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); 
    setMessage({ type: null, text: null }); 
    setIsLoading(true); 

    const loginData: LoginRequest = { email, password };

    try {
      const response = await fetch(`${API_BASE_URL}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY, 
        },
        body: JSON.stringify(loginData),
      });

      
      const data: LoginSuccessResponse | ApiErrorResponse = await response.json();

      if (response.ok) { 
        const successData = data as LoginSuccessResponse;
        console.log('Login successful!', successData);

        
        localStorage.setItem('accessToken', successData.access);
        localStorage.setItem('refreshToken', successData.refresh);
        localStorage.setItem('username', successData.username);
        
        setMessage({ type: 'success', text: 'Login successful! Redirecting...' });

        
        alert('Login successful! ');
         window.location.href = '/App'; 
        

      } else {
        
        const errorData = data as ApiErrorResponse;
        console.error('Login failed:', response.status, errorData);

        let errorMessage = 'Login failed. Please check your credentials.';
        if (errorData && errorData.detail) {
          errorMessage = errorData.detail;
        } else if (errorData && typeof errorData === 'object') {
          
          errorMessage = Object.values(errorData)
            .flat() 
            .filter(msg => typeof msg === 'string') 
            .join(' ') || errorMessage; 
        }
        setMessage({ type: 'error', text: errorMessage });
      }
    } catch (error) {
      
      console.error('Network error or unexpected issue:', error);
      setMessage({ type: 'error', text: 'A network error occurred. Please check your connection or CORS settings.' });
    } finally {
      setIsLoading(false); 
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.form}>
      <div className={styles.formslog}>
        <h1 className={styles.logoLinks}>DesignGuy Img</h1>
      <h2 className={styles.signuph3}>Enter your details</h2>
      <form onSubmit={handleSubmit}>
        <div >
          <label htmlFor="email" className={styles.username}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            disabled={isLoading} 
            className={styles.username_input}
          />
        </div>
      <div className={styles.passwordGroupContainer}> 
            <label htmlFor="password" className={styles.username}>Password:</label>
            
            <div className={styles.passwordInputWrapper}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                disabled={isLoading}
               
                className={`${styles.username_input} ${styles.passwordInputWithPadding}`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={styles.passwordToggleButtonInWrapper} 
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </button>
            </div>
          </div>

          <div className={styles.forgotPasswordContainer}>
            <Link to="/forgot-password" className={styles.forgotPasswordLink}>
              Forgot Password?
            </Link>
          </div>

        <button type="submit" className={styles.signup1} disabled={isLoading}>
          {isLoading ? (
            <>
              <div className={styles.spinner}></div> Logging in...
            </>
          ) : (
            'Login'
          )}
        </button>
      </form>
      {message.text && (
        <div className={`${styles.message} ${message.type === 'error' ? styles.error : styles.success}`}>
          {message.text}
        </div>
      )}
      <p className={styles.already}>
          Don't have an account?
          <Link to="/Signup" className={styles.logintext}> Signup here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;