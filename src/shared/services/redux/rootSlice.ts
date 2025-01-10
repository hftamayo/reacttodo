import { combineReducers } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import themeReducer from './themeSlice';
import languageReducer from './languageSlice';

const rootReducer = combineReducers({
  task: taskReducer,
  theme: themeReducer,
  language: languageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
