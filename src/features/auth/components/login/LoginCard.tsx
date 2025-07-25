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
import { useAuthMutations } from '../../hooks/core/useAuthMutations';

export const LoginCard: FC<LoginCardProps & { isLogginIn?: boolean }> = ({
  credentials,
  onClose = () => {},
  onLogin,
  isLogginIn = false,
}) => {
  const { group } = useTranslation('loginForm');
  const { email, password } = credentials;

  const { loginMutation } = useAuthMutations();

  const handleLogin = async () => {
    await loginMutation.mutateAsync({ email, password });
  };

  if (!group) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex-1 text-center">
            <CardTitle className={formStyles.title}>
              {group.cardTitle}
            </CardTitle>
          </div>
          <button
            onClick={onClose}
            className={formStyles.closeButton}
            aria-label="Close Form"
            disabled={isLogginIn}
          >
            <FaTimes className={formStyles.closeIcon} />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <LoginForm
          credentials={credentials}
          onCancel={onClose}
          onLogin={handleLogin}
          isLogginIn={isLogginIn}
        />
      </CardContent>
    </Card>
  );
};
