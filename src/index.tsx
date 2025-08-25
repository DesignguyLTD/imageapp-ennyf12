import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './fontawesome';

// Import the Auth0Provider
import { Auth0Provider } from '@auth0/auth0-react';

// Get your Auth0 credentials
const auth0Domain = "dev-6akstqak6411jaqe.us.auth0.com";
const auth0ClientId = "mTRdoMZ5szAyQXHubwzAceJV3p9Xmg5w";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    {/* Wrap your App component with Auth0Provider */}
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);