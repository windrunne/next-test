'use client';

import { useRouter } from 'next/navigation';
import { Post } from '@/types';

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  const router = useRouter();
  
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    
    const postItem = target.closest('article');
    
    if (postItem) {
      const postId = postItem.dataset.postId;
      if (postId) {
        router.push(`/post/${postId}`);
      }
    }
  };
  
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">No posts found. Try a different search term.</p>
      </div>
    );
  }
  
  return (
    <div onClick={handleClick} className="grid gap-6 mt-6">
      {posts.map(post => (
        <article 
          key={post.id} 
          data-post-id={post.id}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
            {post.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {post.body.substring(0, 150)}
            {post.body.length > 150 ? '...' : ''}
          </p>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Post #{post.id}
            </span>
            <span className="text-blue-500 hover:underline">Read more</span>
          </div>
        </article>
      ))}
    </div>
  );
} 