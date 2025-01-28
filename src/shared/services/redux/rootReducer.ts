import { combineReducers } from '@reduxjs/toolkit';
import taskReducer from './slices/taskSlice';
import themeReducer from './slices/themeSlice';
import languageReducer from './slices/languageSlice';

export const rootReducer = combineReducers({
  task: taskReducer,
  theme: themeReducer,
  language: languageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
