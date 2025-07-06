import React, { useState, FormEvent } from 'react';
import { UserData, SignupSuccessResponse, ErrorResponse, APIResponse } from '../types/api';
import styles from '../App.module.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [messageColor, setMessageColor] = useState<string>('text-gray-700');
  const PUBLIC_CLIENT_API_KEY: string = 'fc3489038c424752bfc2ffd505807b36';
  const API_BASE_URL: string = 'https://auth-api-lg46.onrender.com/api/auth';


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setMessage('');
    setMessageColor('text-gray-700');

    if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setMessage('All fields are required.');
      setMessageColor('text-red-500');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setMessageColor('text-red-500');
      return;
    }

    if (password.length < 8) {
      setMessage('Password must be at least 8 characters long.');
      setMessageColor('text-red-500');
      return;
    }

    if (!PUBLIC_CLIENT_API_KEY) {
      setMessage('Public Client API Key is not configured in .env. Please check REACT_APP_PUBLIC_CLIENT_API_KEY.');
      setMessageColor('text-orange-500');
      console.error('API Key environment variable missing.');
      return;
    }

    try {
      const requestBody = {
        username,
        email,
        password,
      };

      const response = await fetch(`${API_BASE_URL}/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': PUBLIC_CLIENT_API_KEY,
        },
        body: JSON.stringify(requestBody),
      });

      const data: APIResponse = await response.json();

      if (response.ok) {
        const successData = data as SignupSuccessResponse;
        setMessage(successData.message || 'Registration successful! You can now log in.');
        setMessageColor('text-green-500');

          const registeredUser: UserData | undefined = successData.user;
        if (registeredUser) {
          console.log('Registered User ID:', registeredUser.id);
          console.log('Registered Username:', registeredUser.username);
          console.log('Registered Email:', registeredUser.email);
        }

        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

        setTimeout(() => {
          window.location.href = '/Login';
        }, 2000);
      } else {
        const errorData = data as ErrorResponse;
        setMessage(errorData.message || 'Registration failed. Please try again.');
        setMessageColor('text-red-500');
        console.error('API Error:', response.status, errorData);
        if (errorData.detail) {
          console.error('Error Details:', errorData.detail);
        }
        if (errorData.errors) {
          console.error('Validation Errors:', errorData.errors);
        }
      }
    } catch (error) {
      setMessage('Network error. Please check your connection or try again later.');
      setMessageColor('text-red-500');
      console.error('Fetch operation failed:', error);
    }
  };
    const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.form}>
      <div className={styles.forms}>
        <h1 className={styles.logoLinks}>DesignGuy Img</h1>
        <h2 className={styles.signuph2}>Sign Up</h2>
        <form onSubmit={handleSubmit} className={styles.space}>
          <div>
            <label htmlFor="username" className={styles.username}>Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.username_input}
            />
          </div>
          <div>
            <label htmlFor="email" className={styles.username}>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
           <div className={styles.passwordGroupContainer}> 
            <label htmlFor="password" className={styles.username}>Confirm Password:</label>
            
            <div className={styles.passwordInputWrapper}>
              <input
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
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



          <button
            type="submit"
            className={styles.signup}
          >
            Sign Up
          </button>
          <p id="message" className={`text-center mt-4 text-sm font-medium ${messageColor}`}>
            {message}
          </p>
        </form>
        <p className={styles.already}>
          Already have an account?
          <Link to="/login" className={styles.logintext}> Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
