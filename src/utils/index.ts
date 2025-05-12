import { SortOrder, Post } from '@/types';

export function sortPosts(posts: Post[], sortOrder?: SortOrder): Post[] {
  if (!sortOrder) return posts;
  
  return [...posts].sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    return sortOrder === 'asc' 
      ? titleA.localeCompare(titleB)
      : titleB.localeCompare(titleA);
  });
}

export function filterPostsByQuery(posts: Post[], query: string): Post[] {
  if (!query) return posts;
  
  const searchTerm = query.toLowerCase();
  return posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) || 
    post.body.toLowerCase().includes(searchTerm)
  );
}

export function parsePageNumber(page: string | null): number {
  const parsed = parseInt(page || '1', 10);
  return isNaN(parsed) ? 1 : parsed;
}

export function getPaginationData(
  items: any[], 
  currentPage: number, 
  itemsPerPage: number
) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  return {
    paginatedItems: items.slice(startIndex, endIndex),
    totalItems: items.length
  };
} 