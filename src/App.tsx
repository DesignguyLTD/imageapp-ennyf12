import React from 'react';
import  './App.module.css';
import Navbar from './components/navbar/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchResultPage from './pages/searchresultpage/SearchResultPage';
import DownloadPage from './pages/downloadpage/DownloadPage';
import Dashboard from './pages/dashoard/Dashboard';
function App() {
  return (
    <Router>
      
    <div className="App">
      <Navbar/>
      <Routes>
         <Route
            path="/"
            element={
              <> 
                <Dashboard/>
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

    </Router>
  );
}

export default App;
