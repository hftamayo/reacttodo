// src/shared/services/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import logger from 'redux-logger'; // for development

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware();
    if (process.env.NODE_ENV === 'development') {
      middlewares.push(logger);
    }
    return middlewares;
  },
  devTools: process.env.NODE_ENV !== 'production',
});
