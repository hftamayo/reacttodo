import { FC, useState } from 'react';
import { Label } from '@/shared/components/ui/label/Label';
import { Input } from '@/shared/components/ui/input/Input';
import { Checkbox } from '@/shared/components/ui/checkbox/Checkbox';
import { Button } from '@/shared/components/ui/button/Button';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { formStyles } from '@/shared/utils/twind/styles';
import { useLoginForm } from '../../hooks/form/useLoginForm';
import { LoginFormProps } from '@/shared/types/domains/user.type';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export const LoginForm: FC<LoginFormProps> = ({
  onLogin,
  onSuccess,
  onClose,
  defaultCredentials,
}) => {
  const { group } = useTranslation('loginForm');
  const [showPassword, setShowPassword] = useState(false);
  
  const { register, errors, isValid, isSubmitting, handleLoginSubmit } =
    useLoginForm({
      onLogin,
      onSuccess,
      onClose,
      defaultCredentials,
    });

  if (!group) {
    return null;
  }

  const isDisabled = isSubmitting || !isValid;

  const emailValidation = {
    required: {
      value: true,
      message: group.lblEmailError,
    },
  };

  const passwordValidation = {
    required: {
      value: true,
      message: group.lblPasswordError,
    },
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      onSubmit={handleLoginSubmit}
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
            className={formStyles.input}
            {...register('email', emailValidation)}
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
          <div className="relative">
            <input
              id="txtpassword"
              type={showPassword ? 'text' : 'password'}
              className={formStyles.input}
              {...register('password', passwordValidation)}
              disabled={isDisabled}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-auto w-auto"
              onClick={togglePasswordVisibility}
              disabled={isDisabled}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <FaEyeSlash className="w-4 h-4 text-gray-500" />
              ) : (
                <FaEye className="w-4 h-4 text-gray-500" />
              )}
            </Button>
          </div>
          {errors.password && (
            <span className={formStyles.error}>{errors.password.message}</span>
          )}
        </div>

        <div className={formStyles.formRow}>
          <div className="flex items-center gap-2">
            <Checkbox
              id="chkremember"
              className={formStyles.checkbox}
              {...register('rememberMe')}
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
          {isSubmitting ? group.btnLoggingIn || 'Logging in...' : group.btnLogin}
        </button>
      </div>
    </form>
  );
};
