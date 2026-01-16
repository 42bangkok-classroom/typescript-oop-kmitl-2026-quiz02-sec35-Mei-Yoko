import axios from "axios";
import { Interface } from "readline";

interface Post{
  userID: number;
  id: number;
  title: string;
  body: string;
}

interface PostResult {
  id: number;
  title: string;
}

export async function getPostsByUser(userId: number): Promise<PostResult[]> {
  try {
    const response = await axios.get<Post[]>(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    return response.data.map((post) => ({
      id: post.id,
      title: post.title
    }));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch posts: ${error.message}`);
    }
    throw new Error(`Failed to fetch posts: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}


