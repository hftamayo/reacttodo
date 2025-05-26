import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from '../ui/pagination/pagination';
import { OffsetPaginationProps } from '@/shared/types/api.type';

export const OffsetPagination: React.FC<OffsetPaginationProps> & {
  isLoading?: boolean;
} = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
  isLoading = false,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePrevious}
            isActive={isLoading || currentPage === 1}
            aria-label="Go to previous page"
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
            isActive={isLoading || currentPage === totalPages}
            aria-label="Go to next page"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
