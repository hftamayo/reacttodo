import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../rootReducer';

const initialState = {
  language: localStorage.getItem('language') ?? 'en',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem('language', action.payload);
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export const selectLanguage = (state: RootState) => state.language.language;
export default languageSlice.reducer;
