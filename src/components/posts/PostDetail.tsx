'use client';

import Link from 'next/link';
import { Post, User } from '@/types';

interface PostDetailProps {
  post: Post;
  author: User | null;
}

export default function PostDetail({ post, author }: PostDetailProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        {post.title}
      </h1>
      
      {author && (
        <div className="mb-6 text-sm text-gray-600 dark:text-gray-300">
          <p>Written by: {author.name}</p>
          <p>Email: {author.email}</p>
        </div>
      )}
      
      <div className="prose dark:prose-invert max-w-none mb-8">
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
          {post.body}
        </p>
      </div>
      
      <Link
        href={`/?userId=${post.userId}`}
        className="inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
      >
        More from this author
      </Link>
      
      <div className="mt-6">
        <Link
          href="/"
          className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          ← Back to all posts
        </Link>
      </div>
    </div>
  );
} 