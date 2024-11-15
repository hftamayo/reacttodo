import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './shared/services/redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TaskBoard from './containers/TaskBoard';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TaskBoard />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
