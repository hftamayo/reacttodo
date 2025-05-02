import React from 'react';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { useSettingsForm } from '@/features/settings/hooks/useSettingsForm';
import { DashBoardHeaderActionsStyles } from '@/shared/utils/twind/styles';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';

export const ThemeButton: React.FC = () => {
  const { formValues, handlers } = useSettingsForm({
    onSubmit: () => {}, // Empty since we handle theme change directly
    onCancel: () => {}, // Empty since we don't need cancel functionality
  });
  const { text: textOn } = useTranslation('themeButtonOn');
  const { text: textOff } = useTranslation('themeButtonOff');

  const handleToggle = () => {
    const newTheme = formValues.theme === 'light' ? 'dark' : 'light';
    handlers.handleSettingChange('theme', newTheme);
  };

  return (
    <div className="flex items-center text-xl mr-4">
      {formValues.theme === 'light' ? (
        <FaToggleOff
          className={DashBoardHeaderActionsStyles.toggleButton}
          onClick={handleToggle}
          title={textOff}
        />
      ) : (
        <FaToggleOn
          className={DashBoardHeaderActionsStyles.toggleButton}
          onClick={handleToggle}
          title={textOn}
        />
      )}
    </div>
  );
};
