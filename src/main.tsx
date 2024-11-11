import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import TaskBoard from './containers/TaskBoard';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <TaskBoard />
  </React.StrictMode>
);
