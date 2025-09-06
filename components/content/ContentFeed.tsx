'use client';

import { useEffect, useMemo } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { Loader2, AlertCircle } from 'lucide-react';
import ContentCard from './ContentCard';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { useGetNewsQuery, useGetTrendingMoviesQuery, useGetSocialPostsQuery, ContentItem } from '@/store/api/apiSlice';
import { setFeed, setLoading, reorderFeed } from '@/store/slices/contentSlice';

interface ContentFeedProps {
  type?: 'feed' | 'trending' | 'favorites' | 'search';
  allowReorder?: boolean;
}

export default function ContentFeed({ type = 'feed', allowReorder = false }: ContentFeedProps) {
  const dispatch = useAppDispatch();
  const { searchQuery, feed, searchResults } = useAppSelector((state) => state.content);
  const { categories } = useAppSelector((state) => state.userPrefs);
  const { items: favorites } = useAppSelector((state) => state.favorites);

  // API queries
  const { data: news, isLoading: newsLoading, error: newsError } = useGetNewsQuery({
    category: categories[0] || 'technology',
    q: searchQuery || undefined,
  });

  const { data: movies, isLoading: moviesLoading, error: moviesError } = useGetTrendingMoviesQuery({
    query: searchQuery || undefined,
  });

  const { data: social, isLoading: socialLoading, error: socialError } = useGetSocialPostsQuery({
    query: searchQuery || undefined,
  });

  // Transform API data to ContentItems
  const contentItems = useMemo(() => {
    const items: ContentItem[] = [];

    // Add news articles
    if (news?.length) {
      news.slice(0, 10).forEach((article, index) => {
        items.push({
          id: `news-${index}`,
          type: 'news',
          title: article.title,
          description: article.description || '',
          image: article.urlToImage || undefined,
          url: article.url,
          meta: {
            source: article.source,
            publishedAt: article.publishedAt,
          },
        });
      });
    }

    // Add movies
    if (movies?.length) {
      movies.slice(0, 8).forEach((movie) => {
        items.push({
          id: `movie-${movie.id}`,
          type: 'movie',
          title: movie.title,
          description: movie.overview,
          image: movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : undefined,
          url: `https://www.themoviedb.org/movie/${movie.id}`,
          meta: {
            release_date: movie.release_date,
            vote_average: movie.vote_average,
          },
        });
      });
    }

    // Add social posts
    if (social?.length) {
      social.slice(0, 6).forEach((post) => {
        items.push({
          id: `social-${post.id}`,
          type: 'social',
          title: post.title,
          description: post.body,
          url: `https://jsonplaceholder.typicode.com/posts/${post.id}`,
          meta: {
            userId: post.userId,
          },
        });
      });
    }

  // Do not shuffle items to avoid hydration errors
  return items;
  }, [news, movies, social]);

  // Update feed when content changes
  useEffect(() => {
    dispatch(setFeed(contentItems));
  }, [contentItems, dispatch]);

  // Update loading state
  useEffect(() => {
    dispatch(setLoading(newsLoading || moviesLoading || socialLoading));
  }, [newsLoading, moviesLoading, socialLoading, dispatch]);

  // Determine what to show based on type
  const getDisplayItems = () => {
    switch (type) {
      case 'favorites':
        return favorites;
      case 'search':
        return searchQuery ? feed : [];
      case 'trending':
        return feed.filter(item => item.type === 'movie').slice(0, 12);
      default:
        return feed;
    }
  };

  const displayItems = getDisplayItems();
  const isLoading = newsLoading || moviesLoading || socialLoading;
  const hasError = newsError || moviesError || socialError;

  // Loading state
  if (isLoading && displayItems.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-8 h-8 text-blue-500" />
        </motion.div>
        <span className="ml-3 text-gray-600 dark:text-gray-400">Loading content...</span>
      </div>
    );
  }

  // Error state
  if (hasError && displayItems.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-center">
        <div>
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Failed to load content
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Please check your API keys and try again.
          </p>
        </div>
      </div>
    );
  }

  // Empty state
  if (displayItems.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-center">
        <div>
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {type === 'search' && searchQuery 
              ? 'No search results found'
              : type === 'favorites' 
              ? 'No favorites yet'
              : 'No content available'
            }
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {type === 'search' && searchQuery
              ? 'Try a different search term'
              : type === 'favorites'
              ? 'Start adding content to your favorites'
              : 'Content will appear here once loaded'
            }
          </p>
        </div>
      </div>
    );
  }

  // Content grid
  const ContentGrid = ({ items }: { items: ContentItem[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      <AnimatePresence>
        {items.map((item, index) => (
          <ContentCard key={item.id} item={item} index={index} />
        ))}
      </AnimatePresence>
    </div>
  );

  // Reorderable content (for favorites)
  if (allowReorder && type === 'favorites') {
    return (
      <Reorder.Group
        values={displayItems}
        onReorder={(newOrder) => dispatch(reorderFeed(newOrder))}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
      >
        <AnimatePresence>
          {displayItems.map((item, index) => (
            <Reorder.Item
              key={item.id}
              value={item}
              whileDrag={{ scale: 1.05, zIndex: 10 }}
              className="cursor-grab active:cursor-grabbing"
            >
              <ContentCard item={item} index={index} />
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>
    );
  }

  return <ContentGrid items={displayItems} />;
}