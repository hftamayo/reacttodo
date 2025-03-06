import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/shared/services/redux/rootReducer';
import { AppDispatch } from '@/shared/services/redux/store';
import { updateSettings } from '../store/settingsSlice';
import { AppSettings } from '@/shared/types/settings.type';

export const useSettings = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { settings, isLoading, error } = useSelector((state: RootState) => useSelector(
        (state: RootState) => state.settings
      );

      const updateSettingsHandler = async (newSettings: Partial<AppSettings>) => {
        await dispatch(updateSettings(newSettings)).unwrap();
      };
    
      return {
        settings,
        isLoading,
        error,
        updateSettings: updateSettingsHandler
      };
    };      