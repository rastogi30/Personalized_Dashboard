'use client';

import { motion } from 'framer-motion';
import { Heart, ExternalLink, Play, Clock, Star } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { addFavorite, removeFavorite } from '@/store/slices/favoritesSlice';
import { ContentItem } from '@/store/api/apiSlice';
import { cn } from '@/lib/utils';

interface ContentCardProps {
  item: ContentItem;
  index?: number;
}

export default function ContentCard({ item, index = 0 }: ContentCardProps) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((fav) => fav.id === item.id);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFavorite(item.id));
    } else {
      dispatch(addFavorite(item));
    }
  };

  const getTypeIcon = () => {
    switch (item.type) {
      case 'movie':
        return <Play className="w-4 h-4" />;
      case 'news':
        return <Clock className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  const getTypeColor = () => {
    switch (item.type) {
      case 'movie':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
      case 'news':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      default:
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
    }
  };

  return (
    <motion.div
      data-testid="content-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden group"
    >
      {/* Image */}
      {item.image && (
        <div className="relative aspect-video overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Type badge */}
          <div className={cn(
            'absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1',
            getTypeColor()
          )}>
            {getTypeIcon()}
            {item.type}
          </div>

          {/* Rating for movies */}
          {item.type === 'movie' && item.meta?.vote_average && (
            <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-yellow-400 text-xs font-medium flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" />
              {item.meta.vote_average.toFixed(1)}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {item.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {item.description}
        </p>

        {/* Meta info */}
        {item.meta && (
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
            {item.meta.source?.name && (
              <span className="font-medium">{item.meta.source.name}</span>
            )}
            {item.meta.publishedAt && (
              <span>{String(item.meta.publishedAt).slice(0, 10)}</span>
            )}
            {item.meta.release_date && (
              <span>{String(item.meta.release_date).slice(0, 4)}</span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => item.url && window.open(item.url, '_blank')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            {getTypeIcon()}
            {item.type === 'movie' ? 'Watch Now' : 'Read More'}
          </motion.button>

          <motion.button
            data-testid="favorite-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleFavoriteToggle}
            className={cn(
              'p-2 rounded-full transition-colors',
              isFavorite
                ? 'text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-900/20'
                : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
            )}
          >
            <Heart className={cn('w-5 h-5', isFavorite && 'fill-current')} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}