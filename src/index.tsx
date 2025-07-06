import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components

// Import your Login and Signup components directly
import Login from './pages/Login';   // Adjust path if your Login.tsx is elsewhere
import Signup from './pages/Signup'; // Adjust path if your Signup.tsx is elsewhere

// Remove the import for App.tsx if it was here:
// import App from './App'; 

// Your global CSS (if any)
import './index.css'; 
// import './fontawesome'; // If you have fontawesome setup

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router> {/* This provides the routing context */}
      <Routes>
        {/* Route for the Login page */}
        <Route path="/" element={<Login />} />        {/* Default route will show Login */}
        <Route path="/login" element={<Login />} />    {/* Explicit route for Login */}

        {/* Route for the Sign Up page */}
        <Route path="/signup" element={<Signup />} /> {/* Route for Signup */}

        {/* Optional: A fallback for any other path, redirecting back to Login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
