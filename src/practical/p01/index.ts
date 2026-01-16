import axios from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface EdgePost {
  id: number;
  title: string;
}

export async function getEdgePosts(): Promise<EdgePost[]> {
  try {
    const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
    const posts = response.data;

    
    if (posts.length === 0) {
      return [];
    }

    const firstPost = posts[0];
    const lastPost = posts[posts.length - 1];

    const edgePosts: EdgePost[] = [firstPost, lastPost].map(post => ({
      id: post.id,
      title: post.title
    }));

    return edgePosts;
  } catch (error) {
    throw new Error('Failed to fetch posts');
  }
}
