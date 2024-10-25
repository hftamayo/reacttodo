import { combineReducers } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';

const rootReducer = combineReducers({
  task: taskReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
