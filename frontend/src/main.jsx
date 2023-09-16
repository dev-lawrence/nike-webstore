import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Auth0Provider } from '@auth0/auth0-react';
const { VITE_APP_AUTH0_DOMAIN, VITE_APP_AUTH0_CLIENT_ID } = import.meta.env;
const domain = VITE_APP_AUTH0_DOMAIN;
const clientId = VITE_APP_AUTH0_CLIENT_ID;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </QueryClientProvider>
    </Auth0Provider>
  </React.StrictMode>
);
