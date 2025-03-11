import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppSettings, SettingsState } from '@/shared/types/settings.type';
import { RootState } from '@/shared/services/redux/rootReducer';

const initialState: SettingsState = {
  settings: {
    language: 'en',
    theme: 'light',
    timezone: 'UTC',
    fontSize: 14,
  },
  isLoading: false,
  error: null,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<AppSettings['language']>) => {
      state.settings.language = action.payload;
    },
    setTheme: (state, action: PayloadAction<AppSettings['theme']>) => {
      state.settings.theme = action.payload;
    },
    updateSettings: (state, action: PayloadAction<Partial<AppSettings>>) => {
      state.settings = { ...state.settings, ...action.payload };
    },
  },
});

export const { setLanguage, setTheme, updateSettings } = settingsSlice.actions;
export const selectSettings = (state: RootState) => state;
export const selectLanguage = (state: RootState) => state.settings.language;
export const selectTheme = (state: RootState) => state.settings.theme;
export default settingsSlice.reducer;
