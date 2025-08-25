'use client';

import React  from 'react';
import './App.module.css';
import Navbar from './components/navbar/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchResultPage from './pages/searchresultpage/SearchResultPage';
import DownloadPage from './pages/downloadpage/DownloadPage';
import Dashboard from './pages/dashoard/Dashboard';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';

// A full-screen loading modal
const LoadingModal = () => (
 <div className=" inset-0 p-6 m-auto flex items-center justify-center bg-gray-900 bg-opacity-75 backdrop-blur-sm transition-opacity duration-500">
    <div className="bg-white max-w-md p-12 rounded-2xl shadow-2xl text-center mx-4 transform scale-100 animate-fade-in-up">
      <h2 className="text-4xl font-extrabold text-blue-600 mb-2 mx-auto">Welcome to ImageDownload App!</h2>
      <p className="text-xl text-center text-gray-700 mb-6 mx-auto flex items-center justify-center">Your go-to source for high-quality images and assets.</p>
      <p className="text-lg text-center text-gray-500 mx-auto">Just a moment while we get everything ready for you...</p>
    </div>
  </div>
);

// The Dashboard component, now wrapped with the HOC
const ProtectedDashboard = withAuthenticationRequired(Dashboard, {
  onRedirecting: () => <LoadingModal />,
});

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  const [showLoadingModal, setShowLoadingModal] = useState(true);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setShowLoadingModal(false);
    }, 10000); // 3-second delay

    return () => clearTimeout(timer);
  }, []);

  // Show the welcome modal while Auth0 is loading OR during our artificial delay
  if (isLoading || showLoadingModal) {
    return <LoadingModal />;
  }

  return (
    <Router>
      <div className="App">
        {/* Conditionally render the Navbar */}
        {isAuthenticated && <Navbar />}
        <Routes>
          {/* Protect the Dashboard route */}
          <Route
            path="/"
            element={<ProtectedDashboard />}
          />
          <Route path="/search/:queryParam" element={<SearchResultPage />} />
          <Route path="/download/:imageId" element={<DownloadPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
