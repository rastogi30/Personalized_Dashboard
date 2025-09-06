'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/useRedux';
import { initializeTheme } from '@/store/slices/userPrefsSlice';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

const inter = Inter({ subsets: ['latin'] });

function ThemeInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeTheme());
  }, [dispatch]);

  return null;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <ThemeInitializer />
          <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
              <Header />
              <main className="flex-1 overflow-auto p-6">
                {children}
              </main>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}