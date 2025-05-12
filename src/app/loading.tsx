import { PostListSkeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <PostListSkeleton />
    </div>
  );
} 