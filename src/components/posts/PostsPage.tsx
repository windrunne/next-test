'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getPosts } from '@/services/api';
import { Post } from '@/types';
import SearchBar from '@/components/search/SearchBar';
import PostList from '@/components/posts/PostList';
import Pagination from '@/components/pagination/Pagination';
import { PostListSkeleton } from '@/components/ui/Skeleton';

const ITEMS_PER_PAGE = 10;

interface PostsPageProps {
  initialSearchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default function PostsPage({ initialSearchParams }: PostsPageProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  
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