import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
}

export interface SocialPost {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface ContentItem {
  id: string;
  type: 'news' | 'movie' | 'social';
  title: string;
  description: string;
  image?: string;
  url?: string;
  meta?: any;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: ['News', 'Movies', 'Social'],
  endpoints: (builder) => ({
    getNews: builder.query<NewsArticle[], { category?: string; q?: string }>({
      query: ({ category = 'technology', q }) => {
        const params = new URLSearchParams();
        if (q) {
          params.append('q', q);
        } else {
          params.append('category', category);
        }
        params.append('apiKey', process.env.NEXT_PUBLIC_NEWS_API_KEY || 'demo-key');
        return `/api/news?${params.toString()}`;
      },
      providesTags: ['News'],
    }),
    getTrendingMovies: builder.query<Movie[], { query?: string }>({
      query: ({ query }) => {
        const params = new URLSearchParams();
        params.append('api_key', process.env.NEXT_PUBLIC_TMDB_API_KEY || 'demo-key');
        if (query) {
          params.append('query', query);
          return `/api/movies/search?${params.toString()}`;
        }
        return `/api/movies/trending?${params.toString()}`;
      },
      providesTags: ['Movies'],
    }),
    getSocialPosts: builder.query<SocialPost[], { query?: string }>({
      query: ({ query }) => {
        const params = new URLSearchParams();
        if (query) {
          params.append('q', query);
        }
        return `/api/social?${params.toString()}`;
      },
      providesTags: ['Social'],
    }),
  }),
});

export const {
  useGetNewsQuery,
  useGetTrendingMoviesQuery,
  useGetSocialPostsQuery,
} = apiSlice;