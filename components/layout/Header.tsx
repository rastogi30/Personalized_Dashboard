'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Moon, Sun, User, Heart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { useDebounce } from '@/hooks/useDebounce';
import { toggleDarkMode } from '@/store/slices/userPrefsSlice';
import { setSearchQuery } from '@/store/slices/contentSlice';

export default function Header() {
  const dispatch = useAppDispatch();
  const { darkMode } = useAppSelector((state) => state.userPrefs);
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearchValue));
  }, [debouncedSearchValue, dispatch]);

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search news, movies, and posts..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 ml-6">
          {/* Dark mode toggle */}
          <motion.button
            data-testid="dark-mode-toggle"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch(toggleDarkMode())}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </motion.button>


          {/* Favorites button */}
          <a
            href="/favorites"
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-pink-900/20 transition-colors flex items-center gap-2"
            data-testid="favorites-header-btn"
          >
            <Heart className="w-5 h-5" />
            <span className="hidden sm:block text-sm font-medium">Favorites</span>
          </a>

          {/* User avatar */}
          <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
              John Doe
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}