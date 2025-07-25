import { FC } from 'react';
import { Label } from '@/shared/components/ui/label/Label';
import { Input } from '@/shared/components/ui/input/Input';
import { Checkbox } from '@/shared/components/ui/checkbox/Checkbox';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { formStyles } from '@/shared/utils/twind/styles';
import { LoginCardProps } from '@/shared/types/domains/user.type';

export const LoginForm: FC<LoginCardProps> = ({
  credentials,
  onClose,
  onLogin,
  isLogginIn = false,
}) => {
  const { group } = useTranslation('loginForm');
  const { login, errors, isSubmitting, handleFormSubmit } = useLoginForm({
    credentials,
    onSuccess: onClose,
    onLogin,
  });

  if (!group) {
    return null;
  }

  const isDisabled = isSubmitting;

  const emailValidation = {
    required: {
      value: true,
      message: group.lblEmailError,
    },
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className={formStyles.form}
      aria-label="Login Form"
    >
      <div className={formStyles.formGrid}>
        <div className={formStyles.formRow}>
          <Label className={formStyles.label} htmlFor="txtemail">
            {group.lblEmail}
          </Label>
          <Input
            id="txtemail"
            className="{formStyles.input}"
            {...login('email', emailValidation)}
            disabled={isDisabled}
          />
          {errors.email && (
            <span className={formStyles.error}>{errors.email.message}</span>
          )}
        </div>

        <div className={formStyles.formRow}>
          <Label className={formStyles.label} htmlFor="txtpassword">
            {group.lblPassword}
          </Label>
          <Input
            id="txtpassword"
            className="{formStyles.input}"
            {...login('password', passwordValidation)}
            disabled={isDisabled}
          />
          {errors.email && (
            <span className={formStyles.error}>{errors.password.message}</span>
          )}
        </div>

        <div className={formStyles.formRow}>
          <div className="flex items-center gap-2">
            <Checkbox
              id="chkremember"
              className="{formStyles.checkbox}"
              {...login('remember')}
              disabled={isDisabled}
            />
            <Label className={formStyles.label} htmlFor="chkremember">
              {group.lblRememberMe}
            </Label>
          </div>
        </div>
      </div>

      <div className={formStyles.footer}>
        <button
          type="button"
          className={formStyles.cancelButton}
          onClick={onClose}
          disabled={isDisabled}
        >
          {group.btnCancel}
        </button>
        <button
          type="submit"
          className={formStyles.submitButton}
          disabled={isDisabled}
        >
          {group.btnLogin}
        </button>
      </div>
    </form>
  );
};
