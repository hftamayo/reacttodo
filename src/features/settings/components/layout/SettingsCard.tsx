import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card/Card';
import { FaTimes } from 'react-icons/fa';
import { formSettingsStyles } from '@/shared/utils/twind/styles';
import { SettingsCardProps } from '@/shared/types/settings.type';

export const SettingsCard: React.FC<SettingsCardProps> = ({
  title,
  description,
  children,
  onClose,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className={formSettingsStyles.title}>{title}</CardTitle>
            <CardDescription className={formSettingsStyles.description}>
              {description}
            </CardDescription>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className={formSettingsStyles.closeButton}
              aria-label="Close settings"
            >
              <FaTimes className={formSettingsStyles.closeIcon} />
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
