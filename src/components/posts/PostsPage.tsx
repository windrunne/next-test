'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getPosts } from '@/services/api';
import { Post } from '@/types';
import SearchBar from '@/components/search/SearchBar';
import PostList from '@/components/posts/PostList';
import Pagination from '@/components/pagination/Pagination';
import { PostListSkeleton } from '@/components/ui/Skeleton';
import { ITEMS_PER_PAGE } from '@/constants';
import { parsePageNumber } from '@/utils';

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const currentPage = parsePageNumber(searchParams.get('page'));
  
  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      const allPosts = await getPosts(searchQuery);
      setPosts(allPosts);
      
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      
      setFilteredPosts(allPosts.slice(startIndex, endIndex));
      
      setIsLoading(false);
    }
    
    fetchPosts();
  }, [searchQuery, currentPage]);
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        JSONPlaceholder Posts
      </h1>
      
      <SearchBar />
      
      {isLoading ? (
        <PostListSkeleton />
      ) : (
        <>
          <PostList posts={filteredPosts} />
          
          <Pagination 
            totalItems={posts.length} 
            itemsPerPage={ITEMS_PER_PAGE} 
            currentPage={currentPage} 
          />
        </>
      )}
    </div>
  );
} 