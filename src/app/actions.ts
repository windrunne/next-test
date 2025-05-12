'use server';

import { getPost, getUser } from '@/services/api';

export async function logSearch(formData: FormData) {
  const searchTerm = formData.get('q')?.toString() || '';
  
  console.log(`[SEARCH LOG] User searched for: "${searchTerm}"`);
  
  return { searchTerm };
}

export async function getPostData(id: string) {
  try {
    const post = await getPost(id);
    if (!post) return null;

    const author = await getUser(post.userId.toString());
    
    return {
      post,
      author
    };
  } catch (error) {
    console.error('Error fetching post data:', error);
    return null;
  }
} 