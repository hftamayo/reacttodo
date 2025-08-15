import { FC, useState } from 'react';
import { Label } from '@/shared/components/ui/label/Label';
import { Input } from '@/shared/components/ui/input/Input';
import { Checkbox } from '@/shared/components/ui/checkbox/Checkbox';
import { Button } from '@/shared/components/ui/button/Button';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { formStyles } from '@/shared/utils/twind/styles';
import { useLoginForm } from '../../hooks/form/useLoginForm';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { type LoginFormData } from '../../schemas';

// Updated props to work with Zod validation
interface ZodLoginFormProps {
  onLogin: (credentials: LoginFormData) => Promise<void>;
  onSuccess?: () => void;
  onClose?: () => void;
  defaultCredentials?: Partial<LoginFormData>;
}

export const LoginForm: FC<ZodLoginFormProps> = ({
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
            {...register('email')}
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
              {...register('password')}
              disabled={isDisabled}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 p-1 sm:p-1.5 h-auto w-auto min-w-[32px] sm:min-w-[36px]"
              onClick={togglePasswordVisibility}
              disabled={isDisabled}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <FaEyeSlash className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
              ) : (
                <FaEye className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
              )}
            </Button>
          </div>
          {errors.password && (
            <span className={formStyles.error}>{errors.password.message}</span>
          )}
        </div>

        <div className={formStyles.formRow}>
          <div className="flex items-center gap-1 sm:gap-2">
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
          {isSubmitting
            ? group.btnLoggingIn || 'Logging in...'
            : group.btnLogin}
        </button>
      </div>
    </form>
  );
};
