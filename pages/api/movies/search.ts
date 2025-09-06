import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query, api_key } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter required' });
  }

  // Demo data if no API key provided
  if (!api_key || api_key === 'demo-key') {
    const demoMovies = [
      {
        id: 1,
        title: 'The Future Chronicles',
        overview: 'A thrilling sci-fi adventure set in the year 2050.',
        poster_path: '/demo-movie-1.jpg',
        release_date: '2025-01-15',
        vote_average: 8.2,
      },
    ];

    const filtered = demoMovies.filter(movie =>
      movie.title.toLowerCase().includes(query.toString().toLowerCase())
    );

    return res.status(200).json(filtered);
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${encodeURIComponent(query.toString())}`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.status_message || 'Failed to search movies');
    }

    res.status(200).json(data.results || []);
  } catch (error) {
    console.error('TMDB Search API error:', error);
    res.status(500).json({ error: 'Failed to search movies' });
  }
}