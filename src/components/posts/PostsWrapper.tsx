'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getPosts } from '@/services/api';
import SearchBar from '@/components/search/SearchBar';
import PostList from '@/components/posts/PostList';
import Pagination from '@/components/pagination/Pagination';
import { PostListSkeleton } from '@/components/ui/Skeleton';
import { Post, SortOrder } from '@/types';
import { ITEMS_PER_PAGE } from '@/constants';
import { parsePageNumber, getPaginationData } from '@/utils';

export default function PostsWrapper() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const q = searchParams.get('q') || '';
  const page = searchParams.get('page') || '1';
  const userId = searchParams.get('userId') || '';
  const sort = searchParams.get('sort') || '';
  
  const currentPage = parsePageNumber(page);
  const userIdNumber = userId ? parseInt(userId, 10) : undefined;
  const sortOrder = sort === 'desc' ? 'desc' as SortOrder : 'asc' as SortOrder;
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const allPosts = await getPosts(q, userIdNumber, sortOrder);
      setPosts(allPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  }, [q, userIdNumber, sortOrder]);
  
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  
  const { paginatedItems: paginatedPosts, totalItems } = useMemo(() => {
    return getPaginationData(posts, currentPage, ITEMS_PER_PAGE);
  }, [posts, currentPage]);
  
  const pageTitle = useMemo(() => {
    return userIdNumber !== undefined 
      ? `Posts by Author #${userIdNumber}`
      : "All Posts";
  }, [userIdNumber]);
  
  const handleSort = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    params.set('sort', newSortOrder);
    
    if (sort !== newSortOrder) {
      params.set('page', '1');
    }
    
    router.push(`/?${params.toString()}`);
  }, [searchParams, sort, sortOrder, router]);
  
  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        {pageTitle}
      </h1>
      
      {userIdNumber !== undefined && (
        <div className="text-center mb-6">
          <Link
            href="/"
            className="inline-block text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← View All Posts
          </Link>
        </div>
      )}
      
      <div className="flex justify-between items-center mb-6 gap-2">
        <SearchBar />
        <button
          onClick={handleSort}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors min-w-fit"
        >
          Sort By Name {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>
      
      {isLoading ? (
        <PostListSkeleton />
      ) : (
        <>
          <PostList posts={paginatedPosts} />
          
          <Pagination 
            totalItems={totalItems} 
            itemsPerPage={ITEMS_PER_PAGE} 
            currentPage={currentPage} 
          />
        </>
      )}
    </>
  );
} 