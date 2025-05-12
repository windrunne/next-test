'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { PaginationProps } from '@/types';

export default function Pagination({ totalItems, itemsPerPage, currentPage }: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const currentParams = useMemo(() => {
    return new URLSearchParams(searchParams.toString());
  }, [searchParams]);
  
  const handlePageChange = useCallback((page: number) => {
    const params = new URLSearchParams(currentParams);
    
    params.set('page', page.toString());
    
    router.push(`/?${params.toString()}`);
  }, [currentParams, router]);
  
  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      if (currentPage <= 2) {
        end = 4;
      }
      
      if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
      }
      
      if (start > 2) {
        pages.push('...');
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages - 1) {
        pages.push('...');
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  }, [totalPages, currentPage]);
  
  if (totalPages <= 1) return null;
  
  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      {currentPage > 1 && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          Previous
        </button>
      )}
      
      {pageNumbers.map((page, index) => (
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="px-2">...</span>
        ) : (
          <button
            key={page}
            onClick={() => handlePageChange(page as number)}
            className={`px-3 py-1 rounded ${
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            } transition-colors`}
          >
            {page}
          </button>
        )
      ))}
      
      {currentPage < totalPages && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          Next
        </button>
      )}
    </div>
  );
} 