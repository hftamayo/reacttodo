import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from '../ui/pagination/pagination';
import { OffsetPaginationProps } from '@/shared/types/api.type';

export const OffsetPagination: React.FC<OffsetPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
  isLoading = false,
  isFirstPage, // Use these derived props if available
  isLastPage,
  hasMore,
  hasPrev,
}) => {
  // Use provided derived props or calculate from currentPage/totalPages
  const isFirst = isFirstPage ?? currentPage === 1;
  const isLast = isLastPage ?? currentPage === totalPages;
  const canGoNext = hasMore ?? currentPage < totalPages;
  const canGoPrev = hasPrev ?? currentPage > 1;

  const handlePrevious = () => {
    if (canGoPrev && !isLoading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext && !isLoading) {
      onPageChange(currentPage + 1);
    }
  };

  // Hide pagination if there's only one page or no pages
  if (totalPages <= 1) return null;

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePrevious}
            isActive={isLoading ?? isFirst}
            aria-label="Go to previous page"
            aria-disabled={isLoading ?? isFirst}
          />
        </PaginationItem>
        <PaginationItem className="flex items-center">
          <span className="text-sm font-bold">
            Page {currentPage} of {totalPages}
          </span>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={handleNext}
            isActive={isLoading ?? isLast}
            aria-label="Go to next page"
            aria-disabled={isLoading ?? isLast}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
