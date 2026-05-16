import React from 'react';
import { createRoot } from 'react-dom/client';
import AgencyApp from './AgencyApp.jsx';
import { ToastProvider } from './ui/Toast.jsx';

createRoot(document.getElementById('root')).render(
  <ToastProvider>
    <AgencyApp />
  </ToastProvider>
);
