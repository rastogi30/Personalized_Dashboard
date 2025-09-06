'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Home,
  TrendingUp,
  Heart,
  Settings,
  Menu,
  X,
  Rss,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Feed', href: '/', icon: Home },
  { name: 'Trending', href: '/trending', icon: TrendingUp },
  { name: 'Favorites', href: '/favorites', icon: Heart },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isMobileOpen ? 0 : '-100%',
        }}
        className={cn(
          'fixed lg:static lg:translate-x-0 inset-y-0 left-0 z-50',
          'w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700',
          'flex flex-col transition-transform duration-300 ease-in-out lg:transition-none'
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Rss className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            ContentHub
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200',
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="ml-auto w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2025 ContentHub
          </p>
        </div>
      </motion.aside>
    </>
  );
}