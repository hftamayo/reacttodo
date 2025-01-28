import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './shared/services/redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';
import { Toaster } from 'sonner';
import { taskBoard } from './shared/utils/twind/styles';
import { MainLayout } from './shared/components/ui/layout/dashboard/MainLayout';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div className={taskBoard.boardContainer}>
          <MainLayout />
        </div>
        <Toaster position="bottom-left" />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
