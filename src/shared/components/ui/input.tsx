import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  'flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  {
    variants: {
      type: {
        text: '',
        checkbox: '',
      },
      ctrlsize: {
        small: '',
        medium: '',
        large: '',
      },
    },
    compoundVariants: [
      { type: 'text', ctrlsize: 'small', className: 'h-6 text-sm' },
      { type: 'text', ctrlsize: 'medium', className: 'h-9 text-base' },
      { type: 'text', ctrlsize: 'large', className: 'h-12 text-lg' },
      { type: 'checkbox', ctrlsize: 'small', className: 'h-3 w-3' },
      { type: 'checkbox', ctrlsize: 'medium', className: 'h-4 w-4' },
      { type: 'checkbox', ctrlsize: 'large', className: 'h-5 w-5' },
    ],
    defaultVariants: {
      type: 'text',
      ctrlsize: 'medium',
    },
  }
);

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<'input'> & VariantProps<typeof inputVariants>
>(({ className, type = 'text', ctrlsize, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(inputVariants({ type, ctrlsize }), className)}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
