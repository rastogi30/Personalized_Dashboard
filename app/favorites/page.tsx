'use client';

import { motion } from 'framer-motion';
import ContentFeed from '@/components/content/ContentFeed';

export default function FavoritesPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Your Favorites
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Your saved content - drag to reorder
        </p>
      </motion.div>

      <ContentFeed type="favorites" allowReorder />
    </div>
  );
}