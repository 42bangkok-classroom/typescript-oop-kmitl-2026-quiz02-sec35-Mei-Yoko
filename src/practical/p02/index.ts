import axios from 'axios';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostResult {
  id: number;
  title: string;
}

async function getPostsByUser(userId: number): Promise<PostResult[]> {
  try {
    const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
    
    return response.data
      .filter((post) => post.userId === userId)
      .map((post) => ({
        id: post.id,
        title: post.title
      }));
  } catch (error) {
    throw new Error(`Failed to fetch posts: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export default getPostsByUser;
