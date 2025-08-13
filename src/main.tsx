import React from 'react';
import ReactDOM from 'react-dom/client';
import { onCLS, onFCP, onLCP, onTTFB } from 'web-vitals';
import './index.css';
import { App } from './App';

// WebVitals reporting function
const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry);
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  }
};

// Send to console in development, analytics in production
if (process.env.NODE_ENV === 'development') {
  reportWebVitals(console.log);
} else {
  // In production, you might want to send to analytics
  reportWebVitals((metric) => {
    // Send to Google Analytics, custom analytics, etc.
    console.log('WebVitals:', metric);
  });
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
