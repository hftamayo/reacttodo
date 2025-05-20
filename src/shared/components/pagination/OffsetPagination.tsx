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
            isActive={currentPage === 1}
            aria-label="Go to previous page"
          />
        </PaginationItem>
        <PaginationItem className="flex items-center">
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={handleNext}
            isActive={currentPage === totalPages}
            aria-label="Go to next page"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
