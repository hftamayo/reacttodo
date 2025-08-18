import { FC, useState } from 'react';
import { Label } from '@/shared/components/ui/label/Label';
import { Input } from '@/shared/components/ui/input/Input';
import { Button } from '@/shared/components/ui/button/Button';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { formStyles } from '@/shared/utils/twind/styles';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { SignUpFormProps } from '@/shared/types/domains/user.type';
import { useSignUpForm } from '../../hooks/form/useSignUpForm';
import { type SignupFormData } from '../../schemas';

export const SignUpForm: FC<SignUpFormProps> = ({
  onSignUp,
  onSuccess,
  onClose,
  defaultCredentials,
}) => {
  const { group } = useTranslation('singUpForm');
  const [showPassword, setShowPassword] = useState(false);

  const { register, errors, isSubmitting, handleSignUpSubmit } = useSignUpForm({
    onSignUp,
    onSuccess,
    onClose,
    defaultCredentials,
  });

  if (!group) {
    return null;
  }

  const isDisabled = isSubmitting;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      onSubmit={handleSignUpSubmit}
      className={formStyles.form}
      aria-label="SignUp Form"
    >
      <div className={formStyles.formGrid}>
        <div className={formStyles.formRow}>
          <Label className={formStyles.label} htmlFor="txtname">
            {group.lblName}
          </Label>
          <Input
            id="txtname"
            className={formStyles.input}
            {...register('name')}
            disabled={isDisabled}
          />
          {errors.name && (
            <span className={formStyles.error}>{errors.name.message}</span>
          )}
        </div>

        <div className={formStyles.formRow}>
          <Label className={formStyles.label} htmlFor="txtage">
            {group.lblAge}
          </Label>
          <Input
            id="txtage"
            className={formStyles.input}
            {...register('age')}
            disabled={isDisabled}
          />
          {errors.age && (
            <span className={formStyles.error}>{errors.age.message}</span>
          )}
        </div>

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
            <Input
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
          <Label className={formStyles.label} htmlFor="txtrepeatpassword">
            {group.lblRepeatPassword}
          </Label>
          <div className="relative">
            <Input
              id="txtrepeatpassword"
              type={showPassword ? 'text' : 'password'}
              className={formStyles.input}
              {...register('repeatPassword')}
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
          {errors.repeatPassword && (
            <span className={formStyles.error}>
              {errors.repeatPassword.message}
            </span>
          )}
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
          {isSubmitting ? group.btnSignUp || 'Signing up...' : group.btnSignUp}
        </button>
      </div>
    </form>
  );
};
