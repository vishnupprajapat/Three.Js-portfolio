import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import SmoothScrolling from './lib/SmoothScrolling.jsx';
import Cursor from './lib/Cursor.jsx';

createRoot(document.getElementById('root')).render(
  <SmoothScrolling>
    <Cursor />
    <App />
  </SmoothScrolling>,
);
