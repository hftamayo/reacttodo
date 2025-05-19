import React, { useEffect, useRef } from 'react';
import { ScrollArea } from '../ui/pagination/scroll-area';
import { Skeleton } from '../ui/skeleton/Skeleton';
import { CursorPaginationProps } from '@/shared/types/api.type';

export const CursorPagination: React.FC<CursorPaginationProps> = ({
  hasMore,
  isLoading,
  onLoadMore,
  children,
  className,
  maxHeight = '600px',
}) => {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      { threshold: 0.5 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, onLoadMore]);

  return (
    <ScrollArea className={className} style={{ maxHeight }}>
      {children}
      <div ref={observerRef}>
        {isLoading && (
          <div className="space-y-2 p-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        )}
      </div>
    </ScrollArea>
  );
};
