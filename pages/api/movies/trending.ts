import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { api_key } = req.query;

  // Demo data if no API key provided
  if (!api_key || api_key === 'demo-key') {
    const demoMovies = [
      {
        id: 1,
        title: 'The Future Chronicles',
        overview: 'A thrilling sci-fi adventure set in the year 2050, exploring the boundaries of technology and humanity.',
        poster_path: '/demo-movie-1.jpg',
        backdrop_path: '/demo-backdrop-1.jpg',
        release_date: '2025-01-15',
        vote_average: 8.2,
      },
      {
        id: 2,
        title: 'Ocean\'s Mystery',
        overview: 'Deep sea explorers discover an ancient civilization beneath the Pacific Ocean.',
        poster_path: '/demo-movie-2.jpg',
        backdrop_path: '/demo-backdrop-2.jpg',
        release_date: '2025-02-20',
        vote_average: 7.8,
      },
      {
        id: 3,
        title: 'Digital Dreams',
        overview: 'A programmer discovers that reality might be nothing more than an elaborate simulation.',
        poster_path: '/demo-movie-3.jpg',
        backdrop_path: '/demo-backdrop-3.jpg',
        release_date: '2025-03-10',
        vote_average: 9.1,
      },
    ];

    return res.status(200).json(demoMovies);
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key}`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.status_message || 'Failed to fetch movies');
    }

    res.status(200).json(data.results || []);
  } catch (error) {
    console.error('TMDB API error:', error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
}