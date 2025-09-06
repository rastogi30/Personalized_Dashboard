import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { q } = req.query;

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let posts = await response.json();

    // Filter by query if provided
    if (q) {
      posts = posts.filter((post: any) =>
        post.title.toLowerCase().includes(q.toString().toLowerCase()) ||
        post.body.toLowerCase().includes(q.toString().toLowerCase())
      );
    }

    // Limit to 20 posts
    posts = posts.slice(0, 20);

    res.status(200).json(posts);
  } catch (error) {
    console.error('Social API error:', error);
    res.status(500).json({ error: 'Failed to fetch social posts' });
  }
}