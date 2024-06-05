import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './utils/auth';
import Dashboard from './components/Dashboard';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  </React.StrictMode>,
);