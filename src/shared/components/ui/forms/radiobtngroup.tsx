import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/components/ui/forms/utils/cn';
import { Radio } from '@shadcn/ui';

const radioButtonGroupVariants = cva('flex items-center space-x-4', {
  variants: {
    direction: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
  },
  defaultVariants: {
    direction: 'horizontal',
  },
});

const RadioButtonGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> &
    VariantProps<typeof radioButtonGroupVariants>
>(({ className, direction, children, ...props }, ref) => {
  return (
    <div
      className={cn(radioButtonGroupVariants({ direction }), className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});
RadioButtonGroup.displayName = 'RadioButtonGroup';

export { RadioButtonGroup, Radio };
