import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { category, q, apiKey } = req.query;

  // Demo data if no API key provided
  if (!apiKey || apiKey === 'demo-key') {
    const demoNews = [
      {
        title: 'Breaking: AI Technology Advances in 2025',
        description: 'Artificial Intelligence continues to transform industries with groundbreaking innovations.',
        url: 'https://example.com/ai-advances-2025',
        urlToImage: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
        publishedAt: new Date().toISOString(),
        source: { name: 'Tech News' },
      },
      {
        title: 'Sustainable Technology Solutions Emerge',
        description: 'New eco-friendly technologies are helping combat climate change.',
        url: 'https://example.com/sustainable-tech',
        urlToImage: 'https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg?auto=compress&cs=tinysrgb&w=800',
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        source: { name: 'Green Tech Today' },
      },
      {
        title: 'Quantum Computing Breakthrough',
        description: 'Scientists achieve major milestone in quantum computing research.',
        url: 'https://example.com/quantum-breakthrough',
        urlToImage: 'https://images.pexels.com/photos/2881232/pexels-photo-2881232.jpeg?auto=compress&cs=tinysrgb&w=800',
        publishedAt: new Date(Date.now() - 172800000).toISOString(),
        source: { name: 'Science Daily' },
      },
    ];

    // Filter by query if provided
    const filtered = q 
      ? demoNews.filter(article => 
          article.title.toLowerCase().includes(q.toString().toLowerCase()) ||
          article.description.toLowerCase().includes(q.toString().toLowerCase())
        )
      : demoNews;

    return res.status(200).json(filtered);
  }

  try {
    const baseUrl = 'https://newsapi.org/v2/top-headlines';
    const params = new URLSearchParams();
    
    if (q) {
      params.append('q', q.toString());
    } else {
      params.append('category', category?.toString() || 'technology');
    }
    
    params.append('apiKey', apiKey.toString());
    params.append('pageSize', '20');

    const response = await fetch(`${baseUrl}?${params.toString()}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch news');
    }

    res.status(200).json(data.articles || []);
  } catch (error) {
    console.error('News API error:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
}