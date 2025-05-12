import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { PostListSkeleton } from '@/components/ui/Skeleton';

const PostsWrapper = dynamic(() => import('@/components/posts/PostsWrapper'), {
  ssr: true,
  loading: () => <PostListSkeleton />
});

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <Suspense fallback={<PostListSkeleton />}>
        <PostsWrapper />
      </Suspense>
    </div>
  );
}
