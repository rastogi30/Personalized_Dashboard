'use client';

import { motion } from 'framer-motion';
import { useAppSelector } from '@/hooks/useRedux';
import ContentFeed from '@/components/content/ContentFeed';

export default function Home() {
  const { searchQuery } = useAppSelector((state) => state.content);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Your Personalized Feed'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {searchQuery 
            ? 'Discover content across news, movies, and social posts'
            : 'Stay updated with the latest news, trending movies, and social content'
          }
        </p>
      </motion.div>

      <ContentFeed type={searchQuery ? 'search' : 'feed'} />
    </div>
  );
}