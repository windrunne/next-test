import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getPostData } from '@/app/actions';
import dynamic from 'next/dynamic';
import { PostDetailSkeleton } from '@/components/ui/Skeleton';

const PostDetail = dynamic(() => import('@/components/posts/PostDetail'), {
  ssr: true,
  loading: () => <PostDetailSkeleton />
});

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  
  const postId = parseInt(id, 10);
  if (isNaN(postId)) {
    notFound();
  }

  const postData = await getPostData(id);
  if (!postData) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Suspense fallback={<PostDetailSkeleton />}>
        <PostDetail post={postData.post} author={postData.author} />
      </Suspense>
    </div>
  );
} 