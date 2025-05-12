import { Post, User, SortOrder } from '@/types';
import { API_BASE_URL } from '@/constants';
import { 
  filterPostsByQuery, 
  sortPosts 
} from '@/utils';

export async function getPosts(query: string = '', userId?: number, sortOrder?: SortOrder): Promise<Post[]> {
  try {
    let url = `${API_BASE_URL}/posts`;
    if (userId) {
      url += `?userId=${userId}`;
    }
    
    const response = await fetch(url, {
      next: { revalidate: 300 } 
    });
    
    if (!response.ok) throw new Error('Failed to fetch posts');
    
    let posts: Post[] = await response.json();
    
    if (query) {
      posts = filterPostsByQuery(posts, query);
    }
    
    if (sortOrder) {
      posts = sortPosts(posts, sortOrder);
    }
    
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPost(id: string): Promise<Post | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      next: { revalidate: 300 } 
    });
    
    if (!response.ok) throw new Error('Failed to fetch post');
    
    const post = await response.json();
    
    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function getUser(id: string): Promise<User | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      next: { revalidate: 300 } 
    });
    
    if (!response.ok) throw new Error('Failed to fetch user');
    
    const user = await response.json();
    
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
} 