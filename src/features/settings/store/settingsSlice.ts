import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppSettings, SettingsState } from '@/shared/types/settings.type';
import { RootState } from '@/shared/services/redux/rootReducer';

const initialState: SettingsState = {
  settings: {
    language: 'en',
    theme: 'light',
    timezone: 'UTC',
    fontSize: 12,
  },
  isLoading: false,
  error: null,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings: (state, action: PayloadAction<Partial<AppSettings>>) => {
      state.settings = { ...state.settings, ...action.payload };
    },
  },
});

export const selectSettings = (state: RootState) => state.settings.settings;
export const selectLanguage = (state: RootState) =>
  state.settings.settings.language;
export const selectTheme = (state: RootState) => state.settings.settings.theme;

export const { updateSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
