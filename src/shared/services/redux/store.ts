import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { EXECUTION_MODE } from '@/shared/utils/envvars';
import logger from 'redux-logger'; // for development

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware();
    if (EXECUTION_MODE === 'development') {
      middlewares.push(logger);
    }
    return middlewares;
  },
  devTools: EXECUTION_MODE !== 'production',
});

export type AppDispatch = typeof store.dispatch;
