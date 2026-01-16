import axios from 'axios';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface PostWithCommentCount {
  postId: number;
  title: string;
  totalComments: number;
}

async function mapPostWithCommentCount(): Promise<PostWithCommentCount[]> {
  try {
    const [postsResponse, commentsResponse] = await Promise.all([
      axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts'),
      axios.get<Comment[]>('https://jsonplaceholder.typicode.com/comments')
    ]);

    const posts = postsResponse.data;
    const comments = commentsResponse.data;

    const commentCountMap = comments.reduce((acc, comment) => {
      acc[comment.postId] = (acc[comment.postId] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    return posts.map((post) => ({
      postId: post.id,
      title: post.title,
      totalComments: commentCountMap[post.id] || 0
    }));
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export default mapPostWithCommentCount;
