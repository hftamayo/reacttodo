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
import { SignUpCardProps } from '@/shared/types/domains/user.type';
import { SignUpForm } from './SignUpForm';

export const SignUpCard: FC<SignUpCardProps> = ({
  onSignUp,
  onSuccess,
  onClose = () => {},
  title,
  isLoading = false,
}) => {
  const { group } = useTranslation('SignUpForm');

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
        <SignUpForm
          onSignUp={onSignUp}
          onSuccess={onSuccess}
          onClose={onClose}
        />
      </CardContent>
    </Card>
  );
};
