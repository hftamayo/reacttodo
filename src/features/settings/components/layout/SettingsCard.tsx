import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card/Card';
import { FaTimes } from 'react-icons/fa';
import { formStyles } from '@/shared/utils/twind/styles';
import { SettingsCardProps } from '@/shared/types/settings/settings.type';

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
          <div className="flex-1 text-center">
            <CardTitle className={formStyles.title}>{title}</CardTitle>
            <CardDescription className={formStyles.description}>
              {description}
            </CardDescription>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className={formStyles.closeButton}
              aria-label="Close settings"
            >
              <FaTimes className={formStyles.closeIcon} />
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
