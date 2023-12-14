import React from 'react'
import { createRoot } from 'react-dom/client';
import './index.css'
import App from './App'

const root = document.getElementById('root');
const rootElement = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Use createRoot to render your app
const rootInstance = createRoot(root);
rootInstance.render(rootElement);