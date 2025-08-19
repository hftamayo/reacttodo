import { FC } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/shared/components/ui/card/Card';
import { FaTimes } from 'react-icons/fa';
import { formStyles } from '@/shared/utils/twind/styles';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { LoginCardProps } from '@/shared/types/domains/user.type';
import { LoginForm } from './LoginForm';

export const LoginCard: FC<LoginCardProps> = ({
  onLogin,
  onSuccess,
  onClose = () => {},
  title,
  isLoading = false,
}) => {
  const { group } = useTranslation('loginForm');

  if (!group) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start sm:items-center">
          <div className="flex-1 text-center">
            <CardTitle className={formStyles.title}>
              {title || group.cardTitle}
            </CardTitle>
          </div>
          <button
            onClick={onClose}
            className={formStyles.closeButton}
            aria-label="Close Form"
            disabled={isLoading}
          >
            <FaTimes className={formStyles.closeIcon} />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <LoginForm onLogin={onLogin} onSuccess={onSuccess} onClose={onClose} />
      </CardContent>
    </Card>
  );
};
