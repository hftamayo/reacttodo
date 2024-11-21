import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './shared/services/redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TaskBoard from './containers/TaskBoard';
import './index.css';
import { taskBoard } from './shared/utils/twind/styles';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div className={taskBoard.boardContainer}>
          <TaskBoard />
        </div>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
