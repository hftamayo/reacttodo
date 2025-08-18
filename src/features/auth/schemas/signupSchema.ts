import { z } from 'zod';
import { loginSchema } from './loginSchema';

/**
 * Signup Form Validation Schema
 * Extends loginSchema and adds name and age validation
 */
export const signupSchema = loginSchema.extend({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(3, 'Name must be at least 3 characters long')
    .max(50, 'Name must be less than 50 characters')
    .regex(
      /^[a-zA-Z\s'-]+$/,
      'Name can only contain letters, spaces, hyphens, and apostrophes'
    )
    .trim(),

  age: z.coerce
    .number({
      message: 'Age must be a valid number',
    })
    .int('Age must be a whole number')
    .min(13, 'You must be at least 13 years old')
    .max(120, 'Please enter a valid age'),
});

/**
 * TypeScript type inferred from the signup schema
 */
export type SignupFormData = z.infer<typeof signupSchema>;

/**
 * Validation schema for signup with password confirmation
 * This adds an extra confirmation field and validation
 */
export const signupWithConfirmSchema = signupSchema
  .extend({
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // Error will show on confirmPassword field
  });

export type SignupWithConfirmData = z.infer<typeof signupWithConfirmSchema>;
