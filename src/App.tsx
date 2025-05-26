import React from 'react';
import  './App.module.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AssetCategories from './components/AssetCategories';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchResultPage from './pages/SearchResultPage';
import { ImageProvider } from './context/ImageContext';
import DownloadPage from './pages/DownloadPage';

function App() {
  return (
    <Router>
      <ImageProvider>
    <div className="App">
      <Navbar/>
      <Routes>
         <Route
            path="/"
            element={
              <> 
                <Hero />
                <AssetCategories />
                
              </>
            }
          />
          <Route path="/search/:queryParam" element={
            <>
            <SearchResultPage />
            </>
            } />
          <Route path="/download/:imageId" element={<DownloadPage />} />
      </Routes>
    </div>
    </ImageProvider>
    </Router>
  );
}

export default App;
