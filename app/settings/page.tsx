'use client';

import { motion } from 'framer-motion';
import { Save, Palette, Globe, Bell } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { updateCategories, toggleDarkMode } from '@/store/slices/userPrefsSlice';

const availableCategories = [
  'business', 'entertainment', 'general', 'health', 
  'science', 'sports', 'technology'
];

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const { categories, darkMode } = useAppSelector((state) => state.userPrefs);

  const handleCategoryToggle = (category: string) => {
    const newCategories = categories.includes(category)
      ? categories.filter(c => c !== category)
      : [...categories, category];
    dispatch(updateCategories(newCategories));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Customize your content preferences and app experience
        </p>
      </motion.div>

      <div className="grid gap-6">
        {/* Appearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-3 mb-4">
            <Palette className="w-5 h-5 text-purple-500" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Appearance
            </h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-900 dark:text-white">
                  Dark Mode
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Switch between light and dark themes
                </p>
              </div>
              <button
                onClick={() => dispatch(toggleDarkMode())}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  darkMode ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Content Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5 text-green-500" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Content Preferences
            </h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-900 dark:text-white mb-3 block">
                Preferred News Categories
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {availableCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryToggle(category)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                      categories.includes(category)
                        ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:border-blue-700 dark:text-blue-300'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* API Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-orange-500" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              API Configuration
            </h2>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
              Setup Instructions
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
              To get real data, add your API keys to the <code>.env.local</code> file:
            </p>
            <div className="bg-blue-100 dark:bg-blue-900/40 rounded p-3 text-sm font-mono text-blue-800 dark:text-blue-300">
              NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key<br />
              NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
              Get your API keys from NewsAPI.org and TMDB
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}