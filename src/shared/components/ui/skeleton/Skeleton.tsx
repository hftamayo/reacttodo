import React from 'react';
import { cn } from '@/shared/components/ui/cn';

const Skeleton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-[var(--cameo-200)]',
        className
      )}
      {...props}
    />
  );
};

export { Skeleton };
