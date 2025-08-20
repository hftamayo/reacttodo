import { z } from 'zod';

/**
 * Login Form Validation Schema
 * Provides comprehensive validation for email, password, and remember me fields
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .max(254, 'Email address is too long')
    .toLowerCase()
    .trim()
    .refine(
      (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      'Please enter a valid email address'
    ),

  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .max(128, 'Password is too long'),
  // .regex(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
  //   'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)'
  // ),

  rememberMe: z.boolean(),
});

/**
 * TypeScript type inferred from the schema
 * Use this type instead of manually defining LoginProps
 */
export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Schema with defaults for form initialization
 */
export const loginSchemaWithDefaults = loginSchema.extend({
  rememberMe: z.boolean().default(false),
});

/**
 * Validation schema for email-only (useful for two-stage auth)
 * Can be used when implementing the two-stage login flow
 */
export const emailOnlySchema = z.object({
  email: loginSchema.shape.email,
});

export type EmailOnlyData = z.infer<typeof emailOnlySchema>;

/**
 * Validation schema for password-only (useful for two-stage auth)
 * Can be used when implementing the two-stage login flow
 */
export const passwordOnlySchema = z.object({
  password: loginSchema.shape.password,
  rememberMe: z.boolean().default(false),
});

export type PasswordOnlyData = z.infer<typeof passwordOnlySchema>;
