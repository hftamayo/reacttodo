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
import { SignUpProps, SignUpCardProps } from '@/shared/types/domains/user.type';
import { SignUpForm } from './SignUpForm';
import { useAuthMutations } from '../../hooks/core/useAuthMutations';

export const SignUpCard: FC<SignUpCardProps> = ({
  onClose = () => {},
  title,
}) => {
  const { group } = useTranslation('signupForm');
  const { signupMutation } = useAuthMutations();

  const handleSignUp = async (credentials: SignUpProps) => {
    await signupMutation.mutateAsync(credentials);
  };

  const handleSuccess = () => {
    onClose();
  };

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
          >
            <FaTimes className={formStyles.closeIcon} />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <SignUpForm
          onSignUp={handleSignUp}
          onSuccess={handleSuccess}
          onClose={onClose}
        />
      </CardContent>
    </Card>
  );
};
