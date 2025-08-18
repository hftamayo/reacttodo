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

// Signup schemas
export { signupSchema, type SignupFormData } from './signupSchema';

// Future schemas can be added here:
// export { resetPasswordSchema, type ResetPasswordFormData } from './resetPasswordSchema';
