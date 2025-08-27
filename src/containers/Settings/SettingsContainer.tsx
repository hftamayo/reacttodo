import React from 'react';
import { useSettingsForm } from '../../features/settings/hooks/useSettingsForm';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { SettingsPresenter } from './SettingsPresenter';
import { SettingsFormProps } from '@/shared/types/settings/settings.type';

type SettingsContainerProps = Pick<SettingsFormProps, 'onCancel' | 'onSubmit'>;

export const SettingsContainer: React.FC<SettingsContainerProps> = ({
  onCancel,
  onSubmit,
}) => {
  const { formValues, handlers } = useSettingsForm({
    onSubmit,
    onCancel,
  });
  const { title = '', text = '' } = useTranslation('settingsForm');
  const { group } = useTranslation('settingsFormElements');

  if (!group) {
    return null;
  }

  return (
    <div className="p-6">
      <SettingsPresenter
        title={title}
        description={text}
        formValues={formValues}
        handlers={handlers}
        onSubmit={onSubmit}
        onCancel={onCancel}
        labels={{
          language: group.lbllanguage,
          theme: group.lbltheme,
          timezone: group.lbltimezone,
          fontSize: group.lblfsize,
          backup: group.lblbackup,
          cancel: group.btncancel,
          save: group.btnsave,
          themeLight: group.theme01,
          themeDark: group.theme02,
          timezonePlaceholder: group.tzpholder,
          fontSizePlaceholder: group.fsizepholder,
        }}
      />
    </div>
  );
};
