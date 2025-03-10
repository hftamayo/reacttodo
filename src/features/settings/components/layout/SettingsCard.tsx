import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card/Card';
import { formSettingsStyles } from '@/shared/utils/twind/styles';
import { SettingsCardProps } from '@/shared/types/settings.type';

export const SettingsCard: React.FC<SettingsCardProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={formSettingsStyles.title}>{title}</CardTitle>
        <CardDescription className={formSettingsStyles.description}>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
