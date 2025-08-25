import { FC, useState } from 'react';
import { Label } from '@/shared/components/ui/label/Label';
import { Input } from '@/shared/components/ui/input/Input';
import { Button } from '@/shared/components/ui/button/Button';
import { useTranslation } from '@/shared/services/redux/hooks/useTranslation';
import { formStyles } from '@/shared/utils/twind/styles';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useSignUpForm } from '../../hooks/form/useSignUpForm';
import { SignUpFormProps } from '@/shared/types/domains/user.type';

/**
 * SignUpForm Component
 *
 * A comprehensive signup form with Zod validation featuring:
 * - Name, age, email, password, and confirm password fields
 * - Real-time validation with descriptive error messages
 * - Password visibility toggle for both password fields
 * - Mobile-first responsive design
 * - TypeScript type safety with Zod schema validation
 *
 * @param onSignUp - Function to handle form submission
 * @param onSuccess - Optional callback for successful signup
 * @param onClose - Optional callback to close the form
 * @param defaultCredentials - Optional default form values
 */
export const SignUpForm: FC<SignUpFormProps> = ({
  onSignUp,
  onSuccess,
  onClose,
  defaultCredentials,
}) => {
  const { group } = useTranslation('SignUpForm');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const togglePasswordVisibility = (field: 'password' | 'confirm') => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <form
      onSubmit={handleSignUpSubmit}
      className={formStyles.form}
      aria-label="SignUp Form"
      autoComplete="off"
    >
      <div className={formStyles.formGrid}>
        <div className={formStyles.formRow}>
          <Label className={formStyles.label} htmlFor="txtname">
            {group.lblName}
          </Label>
          <Input
            id="txtname"
            type="text"
            placeholder="Enter your full name"
            className={formStyles.input}
            {...register('name')}
            disabled={isDisabled}
            autoComplete="off"
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
            type="text"
            placeholder="Enter your age"
            className={formStyles.input}
            {...register('age')}
            disabled={isDisabled}
            autoComplete="off"
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
            type="text"
            placeholder="Enter your email address"
            className={formStyles.input}
            {...register('email')}
            disabled={isDisabled}
            autoComplete="off"
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
              placeholder="Create a strong password"
              className={formStyles.input}
              {...register('password')}
              disabled={isDisabled}
              autoComplete="off"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 p-1 sm:p-1.5 h-auto w-auto min-w-[32px] sm:min-w-[36px]"
              onClick={() => togglePasswordVisibility('password')}
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
          <Label className={formStyles.label} htmlFor="txtconfirmpassword">
            {group.lblRepeatPassword}
          </Label>
          <div className="relative">
            <Input
              id="txtconfirmpassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              className={formStyles.input}
              {...register('confirmPassword')}
              disabled={isDisabled}
              autoComplete="off"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 p-1 sm:p-1.5 h-auto w-auto min-w-[32px] sm:min-w-[36px]"
              onClick={() => togglePasswordVisibility('confirm')}
              disabled={isDisabled}
              aria-label={
                showConfirmPassword ? 'Hide password' : 'Show password'
              }
            >
              {showConfirmPassword ? (
                <FaEyeSlash className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
              ) : (
                <FaEye className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
              )}
            </Button>
          </div>
          {errors.confirmPassword && (
            <span className={formStyles.error}>
              {errors.confirmPassword.message}
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
          aria-describedby={isSubmitting ? 'signup-loading' : undefined}
        >
          {isSubmitting ? (
            <>
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
              {group.btnSignUp || 'Creating account...'}
            </>
          ) : (
            group.btnSignUp || 'Create Account'
          )}
        </button>
      </div>
    </form>
  );
};
