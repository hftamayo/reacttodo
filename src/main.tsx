import React from 'react';
import ReactDOM from 'react-dom/client';
import { onCLS, onFCP, onLCP, onTTFB } from 'web-vitals';
import { Provider } from 'react-redux';
import { store } from './shared/services/redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import { Toaster } from 'sonner';
import { MainLayout } from './shared/components/ui/layout/dashboard/MainLayout';

const queryClient = new QueryClient();

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
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div>
          <MainLayout />
        </div>
        <Toaster position="bottom-left" />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
