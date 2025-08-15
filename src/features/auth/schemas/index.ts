/**
 * Auth Validation Schemas
 * Centralized export for all authentication-related validation schemas
 */

// Login schemas
export {
  loginSchema,
  emailOnlySchema,
  passwordOnlySchema,
  type LoginFormData,
  type EmailOnlyData,
  type PasswordOnlyData,
} from './loginSchema';

// Future schemas can be added here:
// export { signupSchema, type SignupFormData } from './signupSchema';
// export { resetPasswordSchema, type ResetPasswordFormData } from './resetPasswordSchema';
