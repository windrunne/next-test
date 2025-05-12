export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export type SortOrder = 'asc' | 'desc';

export interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}

export interface SkeletonProps {
  className?: string;
}

export interface SearchParams {
  q?: string;
  page?: string;
  userId?: string;
  sort?: string;
}