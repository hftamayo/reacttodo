import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppSettings, Language, Theme } from '@/shared/types/settings.type';
import { RootState } from '@/shared/services/redux/rootReducer';

const initialState: AppSettings = {
  language: (localStorage.getItem('language') as Language) ?? 'en',
  theme: (localStorage.getItem('theme') as Theme) ?? 'light',
  timezone: 'UTC',
  fontSize: 12,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
      localStorage.setItem('language', action.payload);
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
      document.documentElement.classList.toggle(
        'dark',
        action.payload === 'dark'
      );
    },
    updateSettings: (state, action: PayloadAction<Partial<AppSettings>>) => {
      Object.assign(state, action.payload);
      localStorage.setItem('settings', JSON.stringify(state));
    },
  },
});

export const { setLanguage, setTheme, updateSettings } = settingsSlice.actions;
export const selectSettings = (state: RootState) => state;
export const selectLanguage = (state: RootState) => state.settings.language;
export const selectTheme = (state: RootState) => state.settings.theme;
export default settingsSlice.reducer;
