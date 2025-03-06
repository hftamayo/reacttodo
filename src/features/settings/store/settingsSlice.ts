import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AppSettings, SettingsState } from '@/shared/types/settings.type';
import { settingsService } from '../services/SettingsService';

const initialState: SettingsState = {
  settings: settingsService.getSettings(),
  isLoading: false,
  error: null,
};

export const fetchSettings = createAsyncThunk(
  'settings/fetchSettings',
  async (_, { rejectWithValue }) => {
    try {
      return settingsService.getSettings();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateSettings = createAsyncThunk(
  'settings/updateSettings',
  async (settings: Partial<AppSettings>, { rejectWithValue }) => {
    try {
      const currentSettings = settingsService.getSettings();
      const newSettings = { ...currentSettings, ...settings };
      settingsService.saveSettings(newSettings);

      if (settings.theme) {
        settingsService.updateTheme(settings.theme);
      }
      return newSettings;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.settings = action.payload;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateSettings.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.settings = action.payload;
      })
      .addCase(updateSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default settingsSlice.reducer;
