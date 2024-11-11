import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import TaskContainer from './containers/TaskContainer';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <TaskContainer />
  </React.StrictMode>
);
